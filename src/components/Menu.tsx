import React from 'react'

type Props = {
  addTask():void
}

const categories: string[] = [
  'All',
  'In Progress',
  'Complited',
]

const Menu:React.FC<Props> = ({addTask}) => {
  return (
    <div className='flex gap-1'>
    <button onClick={addTask} className='text-violet-600 border-none menu-item'>
      + New task
    </button>
    {categories.map(category => <button className='menu-item'>{category}</button>)}
    </div>
  )
}

export default Menu