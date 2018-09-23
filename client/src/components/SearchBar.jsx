import * as React from "react";

export const SearchBar = props => {
  return (
    <div className="search">
      <input type="text" value={props.searchTerm} onChange={props.onChange} />
      <button onClick={props.onClick}>Search</button>
    </div>
  );
};
