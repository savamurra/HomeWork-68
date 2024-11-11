import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";
import {fetchTodo, increase} from "./todoSlice.ts";
import {useEffect} from "react";


const ToDo = () => {
    const title = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTodo());
    }, [dispatch]);

    return (
        <div>
            <button onClick={() => dispatch(increase())}>Check status</button>
        </div>
    );
};

export default ToDo;