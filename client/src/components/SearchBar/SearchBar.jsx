import React from "react";

const SearchBar = () => {
  return (
    <div className="text-right  flex items-center justify-center">
      <input
        type="search"
        className="w-4/5 p-5 rounded-md shadow-lg mr-5"
        placeholder="Search your favourite books."
      />
    </div>
  );
};

export default SearchBar;
