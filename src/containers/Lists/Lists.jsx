import { addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { LazyRender, useViewport } from 'frontend-essentials'

import Note, { TYPE_LIST } from 'components/Note'

import style from './Lists.scss'

const Lists = ({ collectionRef, lists }) => {
  const { viewport12 } = useViewport({ viewport12: '(min-width: 1200px)' })

  const onCreateList = async (list, reset) => {
    addDoc(collectionRef, list)
    reset()
  }

  return (
    <div className={style.wrapper}>
      <Note variant={TYPE_LIST} empty list items={[{ value: '', checked: false }]} onCreate={onCreateList} />

      <LazyRender items={lists} batch={viewport12 ? 20 : 8} rootMargin="100%">
        {({ documentRef, id, pinned, title, items, date }) => (
          <Note
            key={id}
            variant={TYPE_LIST}
            pinned={pinned}
            title={title}
            items={items}
            date={date}
            onUpdate={list => updateDoc(documentRef, list)}
            onDelete={deleteDoc}
          />
        )}
      </LazyRender>
    </div>
  )
}

export default Lists
