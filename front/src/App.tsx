import React from "react";
import Head from "./components/Head";
import ToDoList from "./components/TodoList";
import CreateTodo from "./components/CreateTodo";
import { TodoProvider } from "./TodoContext";

function App() {
  return (
    <TodoProvider>
      <Head />
      <ToDoList />
      <CreateTodo />
    </TodoProvider>
  );
}

export default App;
