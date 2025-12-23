// mouse-cursor-api.js
// Works with or without GSAP. If GSAP is present, it uses gsap.quickTo for buttery motion.

export class MouseCursor {
  /**
   * @param {Object} options
   * @param {HTMLElement|Document} [options.root=document]  // 이벤트 붙일 루트
   * @param {HTMLElement} options.cursorEl                  // 필수: 커서 메인 엘리먼트
   * @param {HTMLElement|null} [options.trailEl=null]       // 선택: 꼬리/잔상
   * @param {HTMLElement|null} [options.boundsEl=null]      // 선택: 이동 범위 요소(기본 viewport)
   * @param {boolean} [options.hideNative=true]             // 네이티브 커서 숨김
   * @param {number} [options.speed=0.18]                   // 부드러움(작을수록 천천히)
   * @param {string} [options.ease="expo.out"]              // GSAP 사용 시 easing
   * @param {boolean} [options.center=true]                 // 커서 요소의 중심을 포인터 위치에 맞출지
   * @param {boolean} [options.clampToBounds=false]         // bounds 안으로 좌표 클램프
   * @param {Object} [options.states]                       // 상태명 → {className?, style?}
   */
  constructor({
    root = document,
    cursorEl,
    trailEl = null,
    boundsEl = null,
    hideNative = true,
    speed = 0.18,
    ease = "expo.out",
    center = true,
    clampToBounds = false,
    states = {
      default: { className: "cursor-default" },
      pointer: { className: "cursor-pointer" },
      glow: { className: "cursor-glow" },
    },
  } = {}) {
    if (!cursorEl) throw new Error("cursorEl is required");

    this.root = root;
    this.cursorEl = cursorEl;
    this.trailEl = trailEl;
    this.boundsEl = boundsEl;
    this.hideNative = hideNative;
    this.speed = speed;
    this.ease = ease;
    this.center = center;
    this.clampToBounds = clampToBounds;
    this.states = states;
    this.stateNames = Object.keys(states);
    this.currentState = "default";

    // 변환 백엔드 선택: gsap 있으면 gsap, 없으면 rAF 보간
    this.hasGsap = typeof window !== "undefined" && window.gsap;
    this.qx = null; this.qy = null;
    this.tx = null; this.ty = null;
    this.raf = 0; this.running = false;

    // rAF 백업용 좌표
    this.cx = 0; this.cy = 0;     // current
    this.tx0 = 0; this.ty0 = 0;   // target

    this.prevCursorCss = this.root?.style?.cursor ?? "";

    // 초기 스타일
    this._initStyle();
  }

  _initStyle() {
    const set = (el) => {
      if (!el) return;
      el.style.willChange = "transform, opacity";
      el.style.transformOrigin = this.center ? "50% 50%" : "0 0";
      // 중심 정렬 효과(translate(-50%,-50%))를 transform chain에 포함시킬지 결정
      if (this.center) {
        // CSS로 translate(-50%, -50%)는 쓰지 않고 JS 좌표로 퍼센트 처리
        // GSAP이면 xPercent/yPercent를 사용하고, rAF면 좌표에서 크기/2를 빼줌
      }
    };
    set(this.cursorEl);
    set(this.trailEl);

    if (this.hideNative && this.root instanceof HTMLElement) {
      this.root.style.cursor = "none";
    }

    // GSAP 준비
    if (this.hasGsap) {
      const gsap = window.gsap;
      // 중심 보정은 xPercent/yPercent로
      if (this.center) {
        gsap.set(this.cursorEl, { xPercent: -50, yPercent: -50, force3D: true });
        if (this.trailEl) gsap.set(this.trailEl, { xPercent: -50, yPercent: -50, force3D: true, opacity: 0.9 });
      } else {
        gsap.set(this.cursorEl, { force3D: true });
        if (this.trailEl) gsap.set(this.trailEl, { force3D: true, opacity: 0.9 });
      }

      this.qx = gsap.quickTo(this.cursorEl, "x", { duration: this.speed, ease: this.ease });
      this.qy = gsap.quickTo(this.cursorEl, "y", { duration: this.speed, ease: this.ease });
      if (this.trailEl) {
        this.tx = gsap.quickTo(this.trailEl, "x", { duration: this.speed * 1.6, ease: this.ease });
        this.ty = gsap.quickTo(this.trailEl, "y", { duration: this.speed * 1.6, ease: this.ease });
      }
    }
  }

  _getBoundsRect() {
    const target = this.boundsEl || this.root;
    if (target && target.getBoundingClientRect) return target.getBoundingClientRect();
    return { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight, right: window.innerWidth, bottom: window.innerHeight };
  }

  _calcPos(clientX, clientY) {
    if (!this.clampToBounds) return { x: clientX, y: clientY };
    const r = this._getBoundsRect();
    const x = Math.min(Math.max(clientX, r.left), r.right);
    const y = Math.min(Math.max(clientY, r.top), r.bottom);
    return { x, y };
  }

  _apply(x, y) {
    if (this.hasGsap) {
      this.qx && this.qx(x);
      this.qy && this.qy(y);
      if (this.tx && this.ty) { this.tx(x); this.ty(y); }
    } else {
      // rAF 보간: target 업데이트만, 실제 적용은 tick에서
      this.tx0 = x; this.ty0 = y;
      if (!this.running) this._startRaf();
    }
  }

  _tick = () => {
    const lerp = this.speed <= 1 ? this.speed : 0.18;
    this.cx += (this.tx0 - this.cx) * lerp;
    this.cy += (this.ty0 - this.cy) * lerp;

    const x = this.center ? this.cx - (this.cursorEl.offsetWidth / 2) : this.cx;
    const y = this.center ? this.cy - (this.cursorEl.offsetHeight / 2) : this.cy;

    this.cursorEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (this.trailEl) {
      const tx = this.center ? this.cx - (this.trailEl.offsetWidth / 2) : this.cx;
      const ty = this.center ? this.cy - (this.trailEl.offsetHeight / 2) : this.cy;
      // trail을 살짝 뒤따르게
      const k = 0.85;
      const prev = this.trailEl._pos || { x: tx, y: ty };
      const nx = prev.x + (tx - prev.x) * 0.2;
      const ny = prev.y + (ty - prev.y) * 0.2;
      this.trailEl.style.transform = `translate3d(${nx}px, ${ny}px, 0)`;
      this.trailEl._pos = { x: nx, y: ny };
    }

    this.raf = requestAnimationFrame(this._tick);
  };

  _startRaf() {
    if (this.running || this.hasGsap) return;
    this.running = true;
    this.raf = requestAnimationFrame(this._tick);
  }

  _stopRaf() {
    if (!this.running) return;
    cancelAnimationFrame(this.raf);
    this.running = false;
  }

  _onMove = (e) => {
    const { x, y } = this._calcPos(e.clientX, e.clientY);
    this._apply(x, y);
  };

  _onEnter = () => {
    // 살짝 나타나게
    if (this.hasGsap) {
      window.gsap.to(this.cursorEl, { autoAlpha: 1, duration: 0.2 });
      if (this.trailEl) window.gsap.to(this.trailEl, { autoAlpha: 1, duration: 0.2 });
    } else {
      this.cursorEl.style.opacity = 1;
      if (this.trailEl) this.trailEl.style.opacity = 0.9;
    }
  };

  _onLeave = () => {
    if (this.hasGsap) {
      window.gsap.to(this.cursorEl, { autoAlpha: 0.6, duration: 0.2 });
      if (this.trailEl) window.gsap.to(this.trailEl, { autoAlpha: 0.4, duration: 0.2 });
    } else {
      this.cursorEl.style.opacity = 0.6;
      if (this.trailEl) this.trailEl.style.opacity = 0.4;
    }
  };

  _onOver = (e) => {
    const host = e.target?.closest?.("[data-cursor]");
    if (!host) return;
    const name = host.dataset.cursor;
    if (this.states[name]) this.setState(name);
  };

  _onOut = (e) => {
    if (e.target?.closest?.("[data-cursor]")) this.setState("default");
  };

  attach(target = this.root) {
    target.addEventListener("mousemove", this._onMove);
    target.addEventListener("mouseenter", this._onEnter);
    target.addEventListener("mouseleave", this._onLeave);
    target.addEventListener("mouseover", this._onOver);
    target.addEventListener("mouseout", this._onOut);

    this.setState("default");
    this._onEnter();
    return this;
  }

  detach(target = this.root) {
    target.removeEventListener("mousemove", this._onMove);
    target.removeEventListener("mouseenter", this._onEnter);
    target.removeEventListener("mouseleave", this._onLeave);
    target.removeEventListener("mouseover", this._onOver);
    target.removeEventListener("mouseout", this._onOut);
    if (!this.hasGsap) this._stopRaf();
    return this;
  }

  destroy() {
    this.detach();
    if (this.hideNative && this.root instanceof HTMLElement) {
      this.root.style.cursor = this.prevCursorCss || "";
    }
    return this;
  }

  setState(name = "default") {
    if (!this.states[name]) return this;
    // 클래스 스위칭
    this.stateNames.forEach((s) => {
      const cls = this.states[s]?.className;
      if (cls) {
        this.cursorEl.classList.remove(cls);
        if (this.trailEl) this.trailEl.classList.remove(cls);
      }
    });
    const cls = this.states[name]?.className;
    if (cls) {
      this.cursorEl.classList.add(cls);
      if (this.trailEl) this.trailEl.classList.add(cls);
    }
    // 인라인 스타일 적용
    const style = this.states[name]?.style;
    if (style) Object.assign(this.cursorEl.style, style);
    this.currentState = name;
    return this;
  }

  setPos(x, y) {
    const p = this._calcPos(x, y);
    this._apply(p.x, p.y);
    return this;
  }
}