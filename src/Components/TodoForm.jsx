import { useState } from "react";


function TodoForm({ addTodo }) {

    const [task, setTask] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.trim()) return;

        addTodo(task);
        setTask("");
    }


    return(
        <form 
              onSubmit={handleSubmit}
              className="flex justify-center gap-2 mb-4"
              >

            <input value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add Task..."
            className="bg-gray-800 border border-gray-600 px-4 py-2 text-white rounded w-72 outline-none focus:border-blue-400 placeholder-gray-400"
            />

            <button className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600 text-white transition-colors">Add</button>    

        </form>
    )
}

export default TodoForm;