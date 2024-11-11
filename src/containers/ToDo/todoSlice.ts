import {createAsyncThunk, createSlice, PayloadAction,} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.tsx";

interface ITodo  {
    title: string,
    status: boolean,
}

interface ITodoState  {
    todos: ITodo[]
    loading: boolean
    error: boolean
}

const initialState: ITodoState = {
    todos: [],
    loading: false,
    error: false
};


export const fetchTodo = createAsyncThunk('todo/fetchTodo', async () => {
    const response :{data: ITodo[]} = await axiosAPI<ITodo[]>('todo.json');
    return response.data;
});

// const addTodo = createAsyncThunk('todo/addTodo', async () => {
//     const response = await axiosAPI.post<ITodo>('todo.json',)
// })


export const todoSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        increase: (state) => {
            console.log(state.todos);
        }
    },
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
            });

    }
});


export const todoReducer = todoSlice.reducer;
export const {increase} = todoSlice.actions;