import { useState } from "react"

function TodoItems({ todo, deleteTodo, toggleComplete, editTodo }) {

    // This state controls edit mode
    const [isEditing, setIsEditing] = useState(false);

    // This stores the updated task text.
    const [newText, setNewText] = useState(todo.text);

    // This runs when user clicks add.
    const handleSave = () => {
        editTodo(todo.id, newText);
        console.log("save todo", todo);
        
        setIsEditing(false);
    }

    return (
        <div className="bg-gray-800 px-4 py-3 rounded mb-2 gap-3 flex justify-between items-center">

        {/* LEFT — task text or edit input */}
         <div className="flex-1">
            {isEditing ? (
                <input
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      onKeyDown={(e) => {if (e.key === "Enter") handleSave()}}
                      className="bg-gray-700 border border-blue-400 text-white px-2 py-1 rounded w-full text-sm outline-none"
                />
                ) : (

                    <span
                        // onClick={()=>toggleComplete(todo.id)}
                        // className={
                        //     todo.complete
                        //     ? "line-through cursor-pointer"
                        //     : "cursor-pointer"
                        // }
                        className={`cursor-pointer text-sm transition-all
                            ${todo.completed
                               ? "line-through text-gray-500"  // ✅ strikethrough when done
                               : "text-white" 
                            }`}
                    >
                        {todo.text}
                    </span>
            )}
           </div>

           {/* RIGHT — buttons */}
            <div className="flex gap-2 shrink-0">
 
                {/* Edit / Save */}
                {isEditing ? (
                    <button 
                      onClick={handleSave}
                      className="px-3 py-1 rounded border border-blue-400 hover:bg-blue-400/20 transition-colors text-xs text-blue-400">Save
                    </button>
                ) : (

                    <button
                      onClick={() => {
                        setIsEditing(true);
                    }}
                      className="px-3 py-1 rounded border border-blue-400 hover:bg-blue-400/20 transition-colors text-xs text-blue-400"> Edit
                    </button>

                )}

                {/* ✅ Done / Undo */}

                <button

                    onClick={() => toggleComplete(todo.id)}
                    className={`text-xs px-3 py-1 rounded border transition-colors
                        ${todo.completed
                            ? "border-gray-500 text-gray-500 hover:bg-gray-500/20" // undo style
                            : "border-green-400 text-green-500 hover:bg-green-400/20"  // done style
                        }`} 
                >       
                {todo.completed ? "undo" : "done"}  {/* label flips */}
                </button>

                {/* Delete */}
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="border border-red-400 text-red-400 text-xs px-3 py-1 rounded hover:bg-red-400/20 transition-colors"
                >Delete

                </button>

            </div>

        </div>
    )
}

export default TodoItems