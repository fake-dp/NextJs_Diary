import React from "react";
import styled from "styled-components";

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  width: 150px;
  padding: 6px 0px 6px 32px;
  border-radius: 50px;
  border: 1px solid #e5e5e5;
  color: #71717a;
  margin-right: 10px;
  &:hover {
    border: 1px solid #000000;
  }
  > input {
    width: 130px;
    margin-left: 5px;
    border: none;
  }
  > input:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

function Search(props) {
  return (
    <SearchWrapper>
      <input placeholder="키워드, 태그 검색" />
    </SearchWrapper>
  );
}

export default Search;