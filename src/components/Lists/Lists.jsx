import { useState } from 'react'

import { RENDER_BATCH } from './constants'
import { useGetLists } from 'hooks'
import { List, LazyRender } from 'components'
import { ListsWrap } from './style'

const Lists = () => {
  const lists = useGetLists()

  const [renderedLists, setRenderedLists] = useState(lists.slice(0, RENDER_BATCH))

  return (
    <ListsWrap>
      <List newList items={[{ value: '', checked: false }]} />

      {renderedLists.map(({ _id, pinned, title, items, date }) => (
        <List key={_id} _id={_id} pinned={pinned} title={title} items={items} date={date} />
      ))}

      <LazyRender batch={RENDER_BATCH} items={lists} setItems={setRenderedLists} />
    </ListsWrap>
  )
}

export default Lists
