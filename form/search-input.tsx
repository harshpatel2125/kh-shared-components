import React from "react";
import SearchIcon from "@/assets/icons/SearchIcon";

const SearchInput: React.FC = () => {
  return (
    <div className="inline-block relative">
      <SearchIcon />
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered pl-9 pr-3 py-2 h-min"
      />
    </div>
  );
};

export default SearchInput;
