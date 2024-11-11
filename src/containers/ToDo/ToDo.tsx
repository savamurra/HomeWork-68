import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import {changeTodo, deleteTodo, fetchTodo} from "./todoSlice.ts";
import {useEffect} from "react";
import TodoForm from "../../components/TodoForm/TodoForm.tsx";
import {Button, List, ListItem} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";


const ToDo = () => {
    const {todos, loading} = useSelector((state: RootState) => state.todo);
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

    return (
        <>
            {loading ? (<Spinner/>) : (
                <>
                    <div style={{display: "flex", justifyContent: "space-between", width: "1200px"}}>
                        <TodoForm/>
                        {todos.length !== 0 ? (
                            <div style={{
                                width: "700px", boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                                padding: '10px',
                                borderRadius: '5px'
                            }}>
                                <List sx={{width: '100%', borderRadius: '5px', margin: 0, padding: 0,}}>
                                    {todos.map((todo) => (
                                        <div key={todo.id}>
                                            <ListItem
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: "space-between",
                                                    border: '2px solid #eee',
                                                    borderRadius: '5px',
                                                    margin: 5
                                                }}>
                                                <div style={{maxWidth: 300}}>
                                                    <input type="checkbox" checked={todo.status}
                                                           onChange={() => onChangeStatus(todo.id)}/>
                                                    <span style={{
                                                        marginLeft: 5,
                                                        wordBreak: 'break-all'
                                                    }}>{todo.title}</span>
                                                </div>
                                                <span>{todo.status ? <p>Сделано</p> : <p>Не сделано</p>}</span>
                                                <Button onClick={() => onDeleteTodo(todo.id)}>Delete</Button>
                                            </ListItem>
                                        </div>
                                    ))}
                                </List>
                            </div>
                        ) : <p>Нет задач</p>
                        }
                    </div>
                </>
            )}
        </>
    );
};

export default ToDo;