import React from "react";
import TodoItem from "./TodoItem";
import { useTodoState } from "../TodoContext";

function TodoList() {
  const todos = useTodoState();
  return (
    <ul>
      {todos.map((toDo) => (
        <TodoItem
          key={toDo.id}
          id={toDo.id}
          text={toDo.text}
          done={toDo.done}
          importance={toDo.importance}
        />
      ))}
    </ul>
  );
}

export default TodoList;
