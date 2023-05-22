import PropTypes from 'prop-types'
import React, { useState } from "react";
import { SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput, Searchbar } from "./Searchbar.Styled";
import { CiSearch } from 'react-icons/ci';

function SearchBar({onSubmit}) {
  const [searchQuery, setSarchQuery] = useState('')

  const handleSearchQuery = event => {
    setSarchQuery(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchQuery);
  };
    return (
      <Searchbar>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel> <CiSearch/></SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            value={searchQuery}
            onChange={handleSearchQuery}
            name="searchQuery"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Searchbar>
    );
  }

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
}