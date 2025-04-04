import { FC, useState } from "react";
import { TaskType } from "../../type/TaskType";
import PrioritiesList from "../PrioritiesList";
import DatePicker from "../DateTimePicker/DatePicker";
import { toast } from "react-toastify";
import SimpleInput from "../UI/SimpleInput";

type Props = {
  addTask(task: TaskType): void;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
};

const today = new Date()

const FormAddTask: FC<Props> = ({ addTask, setIsAdding }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState(0);
  const [date, setDate] = useState(today)

  const resetPick = () => {
    setTaskTitle('');
    setPriority(0);
    setDate(today)
  }

  const saveTask = (): void => {
    if (taskTitle === "") {
      toast.error("Please enter the task name");
      return;
    }
    const task: TaskType = {
      id: 0,
      title: taskTitle,
      date: date,
      isComplited: false,
      priority: priority,
    };
    addTask(task);
    resetPick()
  };

  const cancelAdd = () => {
    setIsAdding(false)
    resetPick()
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <div className="flex flex-col gap-5">
          <div className="space-y-2">
            <h1 className="text-2xl mb-2">Task name</h1>
            <SimpleInput
              type="text"
              placeholder="Your task"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl mb-2">Priority</h2>
            <PrioritiesList priority={priority} setPriority={setPriority}/>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl mb-2">Date</h2>
            <DatePicker date={date} setDate={setDate}/>
          </div>
        </div>
        <div className="flex gap-5 mt-8 justify-center">
          <button
            className="py-2 px-4 rounded-xl border text-white bg-violet-500 hover:-translate-y-1"
            onClick={saveTask}
          >
            Save
          </button>
          <button
            className="py-2 px-4 rounded-xl border hover:-translate-y-1"
            onClick={cancelAdd}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormAddTask;
