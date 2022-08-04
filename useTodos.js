import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";
const initialState = []

const init = () => {
    //Intenta parsear y si es nulo regresa un arreglo
    return JSON.parse(localStorage.getItem('todos')) || [];
}
export const useTodos = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));

    }, [todos])
    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        //Funcion para mandar la acción
        dispatch(action);
    }
    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }
    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });

    }

    return{
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo=>!todo.done).length,
        handleDeleteTodo,
        handleToggleTodo,
        handleNewTodo,
    }
}