import React, { useReducer, createContext, useContext } from "react";
import * as api from "./API";
import {
  createAsyncDispatcher,
  createAsyncHandler,
  initialAsyncState,
  StateForm,
} from "./AsyncActionUtil";

type ToDo = {
  id: number;
  text: string;
  done: boolean;
  detailText: string;
  importance: number;
};

type CreateForm = {
  text: string;
  detailText: string;
  importance: number;
};

type ToDoState = {
  todos: StateForm;
  todo: StateForm;
};

const initialState: ToDoState = {
  todos: initialAsyncState,
  todo: initialAsyncState,
};

const todosHandler = createAsyncHandler("GET_TODOS", "todos");
const createTodoHandler = createAsyncHandler("CREATE_TODO", "todo");
const deleteTodoHandler = createAsyncHandler("DELETE_TODO", "todo");

// action {type: "GET_TODO"}
function reducer(state: ToDoState, action: any): ToDoState {
  switch (action.type) {
    case "GET_TODOS":
    case "GET_TODOS_SUCCESS":
    case "GET_TODOS_ERROR":
      return todosHandler(state, action);
    case "CREATE_TODO":
    case "CREATE_TODO_SUCCESS":
    case "CREATE_TODO_ERROR":
      return createTodoHandler(state, action);
    case "DELETE_TODO":
    case "DELETE_TODO_SUCCESS":
    case "DELETE_TODO_ERROR":
      return deleteTodoHandler(state, action);
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}

const TodoStateContext = createContext<ToDoState>(initialState);
const TodoDispatchContext = createContext<Function | null>(null);

function useTodoState(): ToDoState {
  const state = useContext(TodoStateContext);
  if (!state) throw new Error("Cannot find TodoStateProvider");
  return state;
}

function useTodoDispatch(): Function {
  const dispatch = useContext(TodoDispatchContext);
  if (!dispatch) throw new Error("Cannot find TodoDispatchProvider");
  return dispatch;
}

const getTodos = createAsyncDispatcher("GET_TODOS", api.getTodos);
const createTodo = createAsyncDispatcher("CREATE_TODO", api.createTodo);
const deleteTodo = createAsyncDispatcher("DELETE_TODO", api.deleteTodo);

function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export {
  useTodoState,
  useTodoDispatch,
  getTodos,
  createTodo,
  deleteTodo,
  TodoProvider,
};
export type { ToDo, ToDoState, CreateForm };
