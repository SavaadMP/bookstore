import React from "react";

const SearchBar = ({ text = "Search your favourite books.." }) => {
  return (
    <div className="text-right  flex items-center justify-center mb-10">
      <input
        type="search"
        className="w-4/5 p-5 rounded-md shadow-lg mr-5"
        placeholder={text}
      />
    </div>
  );
};

export default SearchBar;
