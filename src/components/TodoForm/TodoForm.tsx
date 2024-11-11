import {useState} from "react";
import * as React from "react";
import {useDispatch} from "react-redux";
import {addTodo} from "../../containers/ToDo/todoSlice.ts";
import {AppDispatch} from "../../app/store.ts";
import {Button, TextField} from "@mui/material";

const TodoForm = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title) {
            dispatch(addTodo(title));
        }
        setTitle('');
    };

    return (
        <div>
            <form onSubmit={onSubmit} style={{width: '500px'}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                    padding: '10px',
                    borderRadius: '5px'
                }}>
                    <h2>Add Task</h2>
                    <TextField
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    />
                    <Button style={{marginTop: '5px'}} type='submit' variant="text">Send</Button>
                </div>
            </form>
        </div>
    );
};

export default TodoForm;