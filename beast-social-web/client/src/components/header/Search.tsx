import React from 'react';

const Search = () => {
    return (
      <form className="col-auto">
        <input
          type="search"
          className="form-control form-control-dark"
          placeholder="Search..."
          aria-label="Search"
        />
      </form>
    );
};

export default Search;