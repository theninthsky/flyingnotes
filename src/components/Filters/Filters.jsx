import { useState } from 'react'
import { arrayOf, string, func } from 'prop-types'

import style from './Filters.scss'
import MagnifyingGlassIcon from 'images/magnifying-glass.svg'

const Filters = ({ categories, onSelect, onSearch }) => {
  const [category, setCategory] = useState()
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className={style.wrapper}>
      <select
        className={style.category}
        title="Category"
        value={category}
        onChange={event => {
          setCategory(event.target.value)
          onSelect(event.target.value)
        }}
      >
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
          value={searchTerm}
          placeholder="Search..."
          aria-label="search"
          onChange={event => {
            setSearchTerm(event.target.value)
            onSearch(category, event.target.value)
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
