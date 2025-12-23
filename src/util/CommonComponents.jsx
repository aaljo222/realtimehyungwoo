const TextRingComponent = () => {
  return (
    <svg viewBox="0 0 200 200" className="w-[130%] h-[130%] spin-reverse">
      <defs>
        <path
          id="logoCirclePath"
          d="
                  M 100,100
                  m -80,0
                  a 80,80 0 1,1 160,0
                  a 80,80 0 1,1 -160,0
                "
        />
      </defs>
      <text fontSize="10" letterSpacing="4" className="uppercase">
        <textPath href="#logoCirclePath" startOffset="0%">
          GREEN UNIVERSITY · LMS · GREEN UNIVERSITY · LMS · DESIGN ·
        </textPath>
      </text>
    </svg>
  );
};

export { TextRingComponent };
