import {useState} from "react";
import * as React from "react";
import {useDispatch} from "react-redux";
import {addTodo} from "../../containers/ToDo/todoSlice.ts";
import {AppDispatch} from "../../app/store.ts";

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
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={title}
                    name='title'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />
                <button type="submit">
                    Send
                </button>
            </form>
        </div>
    );
};

export default TodoForm;