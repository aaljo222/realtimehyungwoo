const makeCommonContainer = (lists, style = "") => {
  return (
    <>
      {lists.map((list) => (
        <div className={style}>{list}</div>
      ))}
    </>
  );
}

const makeCommonTabItems =	(tabs = [], style = "") => {
  return (
    <>
      {tabs.map((tab, tabIdx) => (
        <div key={tabIdx} className={style}>
          {tab}
        </div>
      ))}
    </>
  )
}

export {makeCommonContainer, makeCommonTabItems}
