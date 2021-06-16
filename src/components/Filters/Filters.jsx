import { useState } from 'react'
import { arrayOf, string, func } from 'prop-types'

import style from './Filters.scss'
import MagnifyingGlassIcon from 'images/magnifying-glass.svg'

const Filters = ({ categories, onSelect, onSearch }) => {
  const [searchFilter, setSearchFilter] = useState('')

  return (
    <div className={style.wrapper}>
      <select className={style.category} title="Category" onChange={event => onSelect(event.target.value)}>
        <option defaultValue value="">
          ALL
        </option>
        {categories.map(category => (
          <option key={category}>{category}</option>
        ))}
      </select>

      <div className={style.search}>
        <input
          className={style.searchBox}
          type="search"
          value={searchFilter}
          placeholder="Search..."
          aria-label="search"
          onChange={event => {
            setSearchFilter(event.target.value)
            onSearch(event.target.value.toLowerCase())
          }}
        />

        <MagnifyingGlassIcon className={style.magnifyingGlassIcon} />
      </div>
    </div>
  )
}

Filters.propTypes = {
  categories: arrayOf(string),
  onSelect: func,
  onSearch: func
}

export default Filters
