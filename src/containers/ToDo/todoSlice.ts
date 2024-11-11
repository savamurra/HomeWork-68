import {createAsyncThunk, createSlice, PayloadAction,} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.tsx";
import {RootState} from "../../app/store.ts";

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
    const response = await axiosAPI<{ [key: string]: ITodo }>('todo.json');
    return Object.keys(response.data).map((keyAPI) => {
        return {
            ...response.data[keyAPI],
            id: keyAPI,
        };
    });
});

export const addTodo = createAsyncThunk('todo/addTodo', async (title: string) => {
    const response = await axiosAPI.post<{ name: string }>('todo.json', {title, status: false});
    return {id: response.data.name, title, status: false};
});

export const changeTodo = createAsyncThunk<{ id: string, status: boolean }, { id: string }, { state: RootState }>('todo/changeTodo', async ({id}, thunkAPI) => {
    const currentStatusFromState = thunkAPI.getState().todo.todos.find(todo => todo.id === id);

    if (!currentStatusFromState) {
        return {id, status: false};
    }
    const changeStatus = !currentStatusFromState.status;
    await axiosAPI.put(`todo/${id}.json`, {...currentStatusFromState, status: changeStatus});

    return {id, status: changeStatus};
});

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (id: string) => {
    await axiosAPI.delete(`todo/${id}.json`);
    return id;
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
            .addCase(addTodo.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(addTodo.fulfilled, (state, action: PayloadAction<ITodo>) => {
                state.loading = false
                state.todos.push(action.payload);
            })
            .addCase(addTodo.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(changeTodo.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(changeTodo.fulfilled , (state, action: PayloadAction<{id: string, status: boolean}>) =>{
                state.loading = false;
                const changeTodo = state.todos.find(todo => todo.id === action.payload.id);
                if (changeTodo) {
                    changeTodo.status = action.payload.status;
                }
            })
            .addCase(changeTodo.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(deleteTodo.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            })
            .addCase(deleteTodo.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    }
});


export const todoReducer = todoSlice.reducer;