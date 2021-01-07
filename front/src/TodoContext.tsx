import React, { useReducer, createContext, useContext, Dispatch } from "react";

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

type Action =
  | { type: "INIT"; todos: ToDo[] }
  | {
      type: "CREATE";
      todo: CreateForm;
    }
  | {
      type: "TOGGLE";
    };

type TodoDispatch = Dispatch<Action>;

const initialTodos: ToDo[] = [
  {
    id: 1,
    text: "hello",
    done: true,
    detailText: "안녕하세요",
    importance: 1,
  },
  {
    id: 2,
    text: "world",
    done: true,
    detailText: "세상아",
    importance: 2,
  },
  {
    id: 3,
    text: "bye",
    done: false,
    detailText: "잘가",
    importance: 2,
  },
  {
    id: 4,
    text: "code",
    done: false,
    detailText: "코딩아",
    importance: 1,
  },
];

function reducer(state: ToDo[], action: Action): ToDo[] {
  switch (action.type) {
    case "INIT":
      return action.todos;
    case "CREATE":
      const newTodo = { ...action.todo, id: 100, done: false };
      return state.concat(newTodo);
    default:
      throw new Error("Unhandled action");
  }
}

const TodoStateContext = createContext<ToDo[] | null>(null);
const TodoDispatchContext = createContext<TodoDispatch | null>(null);

function useTodoState(): ToDo[] {
  const state = useContext(TodoStateContext);
  if (!state) throw new Error("Cannot find TodoStateProvider");
  return state;
}

function useTodoDispatch(): Dispatch<Action> {
  const dispatch = useContext(TodoDispatchContext);
  if (!dispatch) throw new Error("Cannot find TodoDispatchProvider");
  return dispatch;
}

function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialTodos);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export { useTodoState, useTodoDispatch, TodoProvider };
export type { CreateForm };
