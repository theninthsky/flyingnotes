import { useState } from 'react'
import { arrayOf, string, func } from 'prop-types'

import { Wrapper, CategoryFilter, SearchFilter, SearchBox } from './style'

const Filters = ({ categories, onSelect, onSearch }) => {
  const [searchFilter, setSearchFilter] = useState('')

  return (
    <Wrapper>
      <CategoryFilter title="Category" onChange={event => onSelect(event.target.value)}>
        <option defaultValue value="">
          ALL
        </option>
        {categories.map(category => (
          <option key={category}>{category}</option>
        ))}
      </CategoryFilter>

      <SearchFilter>
        <SearchBox
          type="search"
          value={searchFilter}
          placeholder="Search..."
          aria-label="search"
          onChange={event => {
            setSearchFilter(event.target.value)
            onSearch(event.target.value.toLowerCase())
          }}
        />
      </SearchFilter>
    </Wrapper>
  )
}

Filters.propTypes = {
  categories: arrayOf(string),
  onSelect: func,
  onSearch: func
}

export default Filters
