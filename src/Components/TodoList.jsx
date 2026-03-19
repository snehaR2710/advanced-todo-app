
import TodoItem from "./TodoItem";

function TodoList({ todo, deleteTodo, toggleComplete, editTodo }) {
    if (!todo.length) {
        return (
            <p className="text-center text-gray-500 text-sm mt-10">
                No task yet, Add one above!

            </p>
        )
    }

    return (
        <div className="max-w-md mx-auto mt-4">
            { todo.map(item => (
                <TodoItem 
                    key={item.id}
                    todo={item}
                    deleteTodo={deleteTodo}
                    toggleComplete={toggleComplete}
                    editTodo={editTodo}
                />
            ))}
        </div>
    )
}

export default TodoList