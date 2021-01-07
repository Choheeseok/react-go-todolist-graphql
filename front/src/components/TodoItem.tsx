import React from "react";

type ToDoItemProps = {
  id: number;
  text: string;
  done: boolean;
  importance: number;
};

function TodoItem({ id, text, done, importance }: ToDoItemProps) {
  return (
    <>
      <li>
        <span>{done}</span>
        <h3>{text}</h3>
        <h5>{importance}</h5>
      </li>
    </>
  );
}

export default TodoItem;
