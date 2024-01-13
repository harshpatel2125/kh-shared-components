import React from "react";
import AutoComplete from "../select/autocomplete";

const GlobalSearch: React.FC = () => {
  return (
    <div className="flex gap-2 items-center ml-3 search-bar">
      <AutoComplete
        options={["One", "Two", "Three", "Four", "Five", "Six"]}
        label="Search Page"
        icon={true}
      />
    </div>
  );
};

export default GlobalSearch;
