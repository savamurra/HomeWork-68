import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import {fetchTodo} from "./todoSlice.ts";
import {useEffect} from "react";
import TodoForm from "../../components/TodoForm/TodoForm.tsx";


const ToDo = () => {
    const {todos} = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchTodo());
    }, [dispatch]);


    return (
        <div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input type="checkbox" checked={todo.status}/>
                        {todo.title}
                    </li>
                ))}
            </ul>
            <TodoForm/>
        </div>
    );
};

export default ToDo;