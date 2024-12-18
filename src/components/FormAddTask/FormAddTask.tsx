import { FC, useState } from "react";
import { TaskType } from "../../type/data";
import PriorityFlag from "../UI/PriorityFlag";
import DateTimePick from "../DateTimePick";
import { priorities } from "../../utils/constants/priorities";

type Props = {
  addTask(task: TaskType): void;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormAddTask: FC<Props> = ({ addTask, setIsAdding }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState(0);

  const saveTask = (): void => {
    const task: TaskType = {
      id: 0,
      title: taskTitle,
      time: new Date(),
      isComplited: false,
      priority: priority,
    };
    addTask(task);
    setTaskTitle('');
    setPriority(0);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <div className="flex flex-col gap-10">
          <div className="space-y-2">
            <h1 className="text-3xl mb-2">Task name</h1>
            <input
              type="text"
              placeholder="Your task"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full p-2 border-2 rounded-md focus:outline-violet-600"
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl mb-2">Priority</h2>
            <ul className="flex gap-20 justify-center">
              {priorities.map((item, index) => {
                return (
                  <li
                    key={item}
                    className={`m-1 p-3 rounded shadow bg-white cursor-pointer
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
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl mb-2">Date</h2>
            <DateTimePick />
          </div>
        </div>
        <div className="flex gap-5 mt-20 justify-center">
          <button
            className="py-2 px-4 rounded-xl border text-white bg-violet-500"
            onClick={saveTask}
          >
            Save
          </button>
          <button
            className="py-2 px-4 rounded-xl border"
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormAddTask;
