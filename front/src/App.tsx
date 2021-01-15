import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Head from "./components/Head";
import ToDoList from "./components/TodoList";
import CreateTodo from "./components/CreateTodo";
import Detail from "./routes/Detail";
import { TodoProvider } from "./TodoContext";

function App() {
  return (
    <TodoProvider>
      <Head />
      <Router>
        <Route exact path="/" component={ToDoList} />
        <Route path="/:id" component={Detail} />
      </Router>
      <CreateTodo />
    </TodoProvider>
  );
}

export default App;
