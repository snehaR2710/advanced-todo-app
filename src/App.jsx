import { useEffect, useState } from 'react';
import './App.css'
import TodoForm from './Components/TodoForm';
import TodoItems from './Components/TodoItem';
import TodoList from './Components/TodoList';

function App() {

  // store all todo
  const [todo, setTodo] = useState([]);

  // which task appears on screen
  const [filter, setFilter] = useState("all");

  // saved task from LocalStorage when app starts
  // JSON.parse() Convert string → object (LocalStorage stores only strings.)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todo"));

    if(saved) {
      setTodo(saved);
    }

  }, []);

  // Whenever todos change → save them to LocalStorage.
  // JSON.stringify() Convert object → string
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);


  // adds a new task
  const addTodo = (task) => {
    const newTodo = {
      id: Date.now(), //unique number like 1718293847123
      text: task,  //the actual task text
      completed: false // starts as not done
    };
    console.log("todo," ,newTodo);
    

    setTodo([...todo, newTodo]); //spread existing todos, add new one at the end, never use "todo.push()" in react always create new arrays so react detects the change
  };


  // deleting todo
  const deleteTodo = (id) => {
    const deletTodo = todo.filter(todo => todo.id != id);
    setTodo(deletTodo)
    // setTodo(todo.filter(todo => todo.id != id));
    console.log("deleted", deletTodo);
    
  };

  // mark task completed / not completed.
  const toggleComplete = (id) => {
    setTodo(
      todo.map(todo =>
          todo.id === id
            ? {...todo, completed: !todo.completed} //flip this one 
            : todo   //keep others unchanged
      )
      )
  }

  // editing todo
  const editTodo = (id, newText) => {
    setTodo(
      todo.map(todo => 
          todo.id === id
              ? {...todo, text: newText}
              : todo
      )
    )
  }

  // which task to do 
  const filteredTodo = todo.filter(todo => {

    // Show only completed tasks.
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true

  })

  return (
    <div className='min-h-screen bg-gray-900 text-white p-10'>
    <h1 className='text-6xl font-bold text-center mb-3'>My Tasks</h1>
    <h2 className='text-xm text-gray-400 text-center mb-6'>Stay focused. Get it done.</h2>

    {/* passes function as prop */}
    <TodoForm addTodo={addTodo}/>


    {/* Filter buttons */}
    <div className='flex gap-4 justify-center mt-6'>
      {["all", "completed", "pending"].map(f => (
        <button
           key={f}
           onClick={() => setFilter(f)}
           className={`px-4 py-1.5 rounded capitalize texts-sm font-medium transition-colors
            ${filter === f
              ? "bg-blue-500 text-white" // active
              : "bg-gray-700 text-gray-300 hover:bg-gray-600" //inactive
            }`}
        >

        </button>
      ))}
    </div>

        {/* passing propes */}
         <TodoList 
             todo={filteredTodo}
             deleteTodo={deleteTodo}
             toggleComplete={toggleComplete}
             editTodo={editTodo}
         />


    </div>
  )
}

export default App;
