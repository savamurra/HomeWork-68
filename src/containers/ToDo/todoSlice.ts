import {createAsyncThunk, createSlice, PayloadAction,} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.tsx";

interface ITodo {
    title: string,
    id: string,
    status: boolean,
}

interface ITodoProps {
    todos: ITodo[]
    loading: boolean
    error: boolean
}

const initialState: ITodoProps = {
    todos: [],
    loading: false,
    error: false
};


export const fetchTodo = createAsyncThunk('todo/fetchTodo', async () => {
    const response = await axiosAPI<{[key: string]: ITodo}>('todo.json');
    return Object.keys(response.data).map((keyAPI) => {
        return {
            ...response.data[keyAPI],
            id: keyAPI,
        };
    });
});

export const addTodo = createAsyncThunk('todo/addTodo', async (title: string) => {
    const response = await axiosAPI.post<ITodo>('todo.json', {title, status: true});
    return response.data;
});


export const todoSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodo.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
            .addCase(fetchTodo.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodo.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(addTodo.fulfilled, (state, action: PayloadAction<ITodo>) => {
                state.todos.push(action.payload);
            });

    }
});


export const todoReducer = todoSlice.reducer;