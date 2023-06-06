import React from "react";

const SearchBar = ({
  text = "Search your favourite books..",
  searchHandle,
}) => {
  return (
    <div className="text-right  flex items-center justify-center mb-10">
      <input
        onChange={(e) => searchHandle(e.target.value)}
        type="search"
        className="w-4/5 p-5 rounded-md shadow-lg mr-5"
        placeholder={text}
      />
    </div>
  );
};

export default SearchBar;
