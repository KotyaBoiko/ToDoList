import React, { FC } from 'react'
import { priorities } from '../utils/constants/priorities';
import PriorityFlag from './UI/PriorityFlag';

type Props = {
  priority: number,
  setPriority: React.Dispatch<React.SetStateAction<number>>
}

const PrioritiesList:FC<Props> = ({priority, setPriority}) => {
  return (
    <ul className="flex gap-20 justify-center">
              {priorities.map((item, index) => {
                return (
                  <li
                    key={item}
                    className={`m-1 p-2 rounded shadow bg-white cursor-pointer
                    hover:scale-110 border-violet-400 ${
                      priority == index ? "border-b-2" : ""
                    }`}
                    onClick={() => setPriority(index)}
                  >
                    <PriorityFlag color={item} />
                  </li>
                );
              })}
            </ul>
  )
}

export default PrioritiesList