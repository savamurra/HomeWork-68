import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import {fetchTodo} from "./todoSlice.ts";
import {useEffect} from "react";
import TodoForm from "../../components/TodoForm/TodoForm.tsx";
import {List, ListItem} from "@mui/material";


const ToDo = () => {
    const {todos} = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchTodo());
    }, [dispatch]);


    return (
        <div style={{display: "flex", justifyContent: "space-around", width: "1000px"}}>
            <TodoForm/>
            <div style={{width: "400px"}}>
                <List sx={{ width: '100%', maxWidth: 360, background: '#eee',  borderRadius: '5px' }}>
                    {todos.map((todo) => (
                        <ListItem key={todo.id} style={{margin: '5px', display: 'flex', justifyContent:"space-around"}}>
                            <input type="checkbox" checked={todo.status}/>
                            <span>{todo.title}</span>
                            <span>{todo.status ? <p>Сделано</p> : <p>Не сделано</p>}</span>
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default ToDo;