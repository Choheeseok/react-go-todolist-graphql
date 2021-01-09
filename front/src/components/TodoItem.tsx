import React from "react";
import { deleteTodo, useTodoDispatch } from "../TodoContext";

type ToDoItemProps = {
  id: number;
  text: string;
  done: boolean;
  importance: number;
};

function TodoItem({ id, text, done, importance }: ToDoItemProps) {
  const dispatch = useTodoDispatch();
  const onClick = () => {
    deleteTodo(dispatch, { id });
  };
  return (
    <>
      <li>
        <h3>{text}</h3>
        {done ? <span>완료</span> : <span>미완</span>}
        <h5>{importance}</h5>
        <button onClick={onClick}>삭제</button>
      </li>
    </>
  );
}

export default TodoItem;
