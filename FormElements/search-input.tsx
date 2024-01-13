import React from "react";
import SearchIcon from "@/assets/icons/search-icon";

const SearchInput: React.FC = () => {
  return (
    <div className="inline-block relative">
      <SearchIcon className="absolute top-3 left-3" />
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered pl-9 pr-3 py-2 h-min"
      />
    </div>
  );
};

export default SearchInput;
