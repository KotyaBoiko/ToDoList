import { useEffect, useState } from "react";
import "./App.css";
import { TaskType } from "./components/type/data";
import TaskItem from "./components/TaskItem";
import Menu from "./components/Menu";
import SkeletonTaskList from "./components/TaskList/SkeletonTaskList";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [queryParams, setQueryParams] = useState("");
  const [category, setCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getTasks = (): void => {
    setIsLoading(true)
    fetch(`https://6758801b60576a194d10c782.mockapi.io/tasks${queryParams}`)
      .then((res) => res.json())
      .then((data) => (Array.isArray(data) ? setTasks(data) : setTasks([])))
      .catch((error: Error) => console.log(error.message))
      .finally(() => setIsLoading(false))
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

  const addTask = (): void => {
    let task: TaskType = {
      title: "Enter your task",
      isComplited: false,
      priority: 0,
      time: new Date(),
      id: Number(new Date()),
    };
    toast.promise(fetch(`https://6758801b60576a194d10c782.mockapi.io/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then(() => getTasks()),
       {
        pending: 'Loading...',
        success: "Task added",
        error: 'Error'
      })
  };

  const removeTask = (id: number): void => {
   toast.promise(fetch(`https://6758801b60576a194d10c782.mockapi.io/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => setTasks(tasks.filter((t) => t.id !== id))),
    {
      pending: 'Loading...',
      success: 'Task remove',
      error: 'Error'
    })
  };


  const saveEditTask = (task: TaskType, message: string): void => {
    toast.promise(fetch(`https://6758801b60576a194d10c782.mockapi.io/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => setTasks(tasks.map((t) => (t.id == task.id ? task : t)))),
     {
      pending: 'Loading...',
      success: message,
      error: 'Error'
    })
  };

  return (
    <div className="p-16 overflow-hidden">
      <div className="bg-purple-400 rounded-lg -rotate-4.2">
        <div className="bg-purple-300 rounded-lg rotate-2.2">
          <div className="bg-purple-200 p-2 rounded-lg rotate-2">
            <div className="px-3 py-4 bg-gray-100 rounded-lg">
              <div className="">
                <Menu
                  addTask={addTask}
                  setCategory={setCategory}
                  activeCategory={category}
                />
              </div>
              <div className="container__task-list rounded-lg border p-5 bg-white z-10 relative">
                {!tasks.length && !isLoading ? (
                  <p className="text-7xl ml-auto text-center mt-20">
                    No task found
                  </p>
                ) : (
                  <table className="task-list">
                    <thead>
                      <tr className="bg-violet-100">
                        <td className="w-2 rounded-tl-lg">Check</td>
                        <td className="whitespace-normal break-words">Task</td>
                        <td className="w-2">Priority</td>
                        <td className="w-1/6">Due Date</td>
                        <td className="w-2 rounded-tr-lg">Del</td>
                      </tr>
                    </thead>
                    {isLoading
                    ? 
                      <SkeletonTaskList/>

                    :
                      <tbody>
                        {tasks?.map((item) => (
                          <TaskItem
                            key={item.id}
                            task={item}
                            removeTask={removeTask}
                            saveEditTask={saveEditTask}
                          />
                        ))}
                      </tbody>
                    }
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
