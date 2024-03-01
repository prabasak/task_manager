import React, { useRef, useState } from "react";
import Button from "./Button";
import styled from "styled-components";

const SortBy = styled.section`
  margin-bottom: 30px;

  & select {
    padding: 15px;
    border-radius: 10px;
    width: 200px;
    margin-right: 15px;
  }

  & .sort-type-btn {
    margin: 0;
    background: #fff;
    border: 1px solid #444;
    color: #444;
    padding: 15px;
    cursor: pointer;
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    transition: all 0.2s;
    border-radius: 10px;
  }
`;

function Sort({ itemlist, setItemlist, resetSort }) {
  const [isAscending, setIsAscending] = useState(true);
  const sortType = useRef();

  const handleSortType = () => {
    let sortedList = [];
    if (sortType.current.value !== "") {
      sortedList = itemlist.sort((i, j) => {
        if (i[sortType.current.value] < j[sortType.current.value]) {
          return -1;
        } else if (i[sortType.current.value] > j[sortType.current.value]) {
          return 1;
        }
        return 0;
      });
      setItemlist({ items: sortedList });
    } else {
      resetSort();
    }
  };

  const handleSortToggle = () => {
    let sortedList = [];
    setIsAscending((prevIsAscending) => !prevIsAscending);
    if (isAscending) {
      sortedList = itemlist.sort((i, j) => {
        if (i[sortType.current.value] < j[sortType.current.value]) {
          return -1;
        } else if (i[sortType.current.value] > j[sortType.current.value]) {
          return 1;
        }
        return 0;
      });
    } else {
      sortedList = itemlist.sort((i, j) => {
        if (i[sortType.current.value] > j[sortType.current.value]) {
          return -1;
        } else if (i[sortType.current.value] < j[sortType.current.value]) {
          return 1;
        }
        return 0;
      });
    }
    setItemlist({ items: sortedList });
  };

  return (
    <SortBy className="sortby">
      <h2>SORT BY</h2>
      <select onChange={handleSortType} ref={sortType}>
        <option value="id">Select sorting type</option>
        <option value="title">Title</option>
        <option value="completed">Status</option>
      </select>
      <Button className="sort-type-btn asc" onClick={handleSortToggle}>
        {isAscending ? "Ascending" : "Descending"}
      </Button>
    </SortBy>
  );
}

export default Sort;
