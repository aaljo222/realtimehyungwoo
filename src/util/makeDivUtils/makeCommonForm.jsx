// util/makeDivUtils/makeCommonForm.js

const makeCommonButton = (label, onClick) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#444] text-white h-9 px-4 text-sm hover:bg-[#222]"
    >
      {label}
    </button>
  );
};

const renderCommonInput = (placeholder, onChange, type, name) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="border border-[#ccc] h-9 px-3 text-sm text-[#444] w-48 md:w-64 focus:outline-none focus:border-[#002c62]"
    />
  );
};

const renderCommonSelectBox = (options, onChange) => {
  return (
    <select
      onChange={onChange}
      className="border border-[#ccc] h-9 px-2 text-sm text-[#444] focus:outline-none focus:border-[#002c62]"
    >
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const makeCommonSearchBar = ({
  options = [],
  onSelectChange,
  onInputChange,
  onSearch,
}) => {
  return (
    <div className="w-full bg-[#f8f9fa] border border-[#e5e5e5] p-4 flex justify-end gap-1">
      {renderCommonSelectBox(options, onSelectChange)}
      {renderCommonInput(
        "검색어를 입력해 주세요.",
        onInputChange,
        "text",
        "keyword"
      )}
      {makeCommonButton("검색", onSearch)}
    </div>
  );
};

export { makeCommonSearchBar };
