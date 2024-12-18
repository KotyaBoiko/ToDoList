import { useEffect, useState } from "react";
import "./App.css";
import { TaskType } from "./type/data";
import Menu from "./components/Menu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormAddTask from "./components/FormAddTask/FormAddTask";
import TaskList from "./components/TaskList/TaskList";
import Modal from "./components/Modal";

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [queryParams, setQueryParams] = useState("");
  const [category, setCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const getTasks = (): void => {
    setIsLoading(true);
    fetch(`https://6758801b60576a194d10c782.mockapi.io/tasks${queryParams}`)
      .then((res) => res.json())
      .then((data) => (Array.isArray(data) ? setTasks(data) : setTasks([])))
      .catch((error: Error) => console.log(error.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getTasks();
  }, [queryParams]);

  useEffect(() => {
    let query = "?sortBy=id&order=desc&";
    switch (category) {
      case 1:
        query += "isComplited=false&";
        break;
      case 2:
        query += "isComplited=true&";
        break;
      default:
        break;
    }
    setQueryParams(query);
  }, [category]);

  const addTask = (task:TaskType): void => {
    toast.promise(
      fetch(`https://6758801b60576a194d10c782.mockapi.io/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }).then(() => getTasks())
      .then(() => setIsAdding(false)),
      {
        pending: "Loading...",
        success: "Task added",
        error: "Error",
      }
    );
  };

  const removeTask = (id: number): void => {
    toast.promise(
      fetch(`https://6758801b60576a194d10c782.mockapi.io/tasks/${id}`, {
        method: "DELETE",
      }).then(() => setTasks(tasks.filter((t) => t.id !== id))),
      {
        pending: "Loading...",
        success: "Task remove",
        error: "Error",
      }
    );
  };

  const saveEditTask = (task: TaskType, message: string): void => {
    toast.promise(
      fetch(`https://6758801b60576a194d10c782.mockapi.io/tasks/${task.id}`, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => setTasks(tasks.map((t) => (t.id == task.id ? task : t)))),
      {
        pending: "Loading...",
        success: message,
        error: "Error",
      }
    );
  };

  return (
    <div className="p-16 overflow-hidden">
      <Modal
        visible={isAdding}
        setVisible={setIsAdding}
        children={<FormAddTask addTask={addTask} setIsAdding={setIsAdding}/>}
      />
      <div className="bg-purple-400 rounded-lg -rotate-4.2">
        <div className="bg-purple-300 rounded-lg rotate-2.2">
          <div className="bg-purple-200 p-2 rounded-lg rotate-2">
            <div className="px-3 py-4 bg-gray-100 rounded-lg">
              <div className="">
                <Menu
                  setIsAdding={setIsAdding}
                  setCategory={setCategory}
                  activeCategory={category}
                />
              </div>
              <TaskList
                tasks={tasks}
                isLoading={isLoading}
                removeTask={removeTask}
                saveEditTask={saveEditTask}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
