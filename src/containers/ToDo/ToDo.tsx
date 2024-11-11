import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import {changeTodo, deleteTodo, fetchTodo} from "./todoSlice.ts";
import {useEffect} from "react";
import TodoForm from "../../components/TodoForm/TodoForm.tsx";
import {Button, List, ListItem} from "@mui/material";


const ToDo = () => {
    const {todos} = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchTodo());
    }, [dispatch]);

    const onChangeStatus = (id: string) => {
        dispatch(changeTodo({id}));
    };

    const onDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id));
    };

    console.log(todos)

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-around", width: "1200px"}}>
                <TodoForm/>
                {todos.length !== 0 ? (
                    <div style={{width: "700px"}}>
                        <List sx={{maxWidth: 600, background: '#eee', borderRadius: '5px'}}>
                            {todos.map((todo) => (
                                <div key={todo.id}>
                                    <ListItem
                                              style={{margin: '5px', display: 'flex', justifyContent: "space-between"}}>
                                        <div style={{maxWidth: 300}}>
                                            <input type="checkbox" checked={todo.status}
                                                   onChange={() => onChangeStatus(todo.id)}/>
                                            <span style={{marginLeft: 5, wordBreak: 'break-all'}}>{todo.title}</span>
                                        </div>
                                        <span>{todo.status ? <p>Сделано</p> : <p>Не сделано</p>}</span>
                                    </ListItem>
                                    <Button onClick={()=> onDeleteTodo(todo.id)}>Delete</Button>
                                </div>
                            ))}
                        </List>
                    </div>
                ) : <p>Нет задач</p>
                }

            </div>
        </>
    );
};

export default ToDo;