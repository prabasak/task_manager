import React, { useState, useRef } from "react";
import styled from "styled-components";
import Button from "./Button";

const SearchSection = styled.section`
  width: 30%;
  display: flex;
  margin-bottom: 30px;
  z-index: 10;
  position: relative;
  justify-content: space-between;

  & button {
    background: #fff;
    border: 1px solid #444;
    color: #444;
    padding: 15px;
    cursor: pointer;
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    transition: all 0.2s;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    margin: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    &:hover {
      color: #888;
    }
  }

  & label {
    margin-right: 20px;
    align-self: center;
  }

  & input[type="text"] {
    width: 70%;
    padding: 15px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border: 1px solid #444;
  }

  & .clear {
    margin-left: 15px;
    border-radius: 5px;
  }
`;

function Search({ itemlist, setItemlist, resetFilter }) {
  const [showSearchQuery, setShowSearchQuery] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const searchString = useRef();

  const handleClick = () => {
    // search logic
    const filteredItems = itemlist.filter((item) => {
      if (item.title.indexOf(searchString.current.value) >= 0) {
        return item;
      }
    });
    // console.log(filteredItems);
    setItemlist({ items: filteredItems });
    if (filteredItems.length > 0) {
      setShowSearchQuery(true);
    } else {
      setNoResults(true);
    }
  };

  const handleClear = () => {
    searchString.current.value = "";
    setShowSearchQuery(false);
    setNoResults(false);
    resetFilter();
  };

  // const debounce = (fn, delay) => {
  //   let timerId;
  //   return (...args) => {
  //     clearTimeout(timerId);
  //     timerId = setTimeout(() => fn(...args), delay);
  //   };
  // };

  return (
    <>
      <h2>SEARCH</h2>
      <SearchSection className="search">
        <input
          type="text"
          id="search"
          placeholder="Search ..."
          ref={searchString}
        />
        <Button onClick={handleClick}>Search</Button>
        <Button className="clear" onClick={handleClear}>
          Clear
        </Button>
      </SearchSection>
      {showSearchQuery && (
        <p>
          The search results for <strong>"{searchString.current.value}"</strong> are shown
          below:
        </p>
      )}
      {noResults && (
        <p>
          The search string did not return any result. Please search with a
          different string
        </p>
      )}
    </>
  );
}

export default Search;
