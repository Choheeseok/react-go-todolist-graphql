import React from "react";
import { deleteTodo, updateTodo, useTodoDispatch } from "../TodoContext";

type ToDoItemProps = {
  id: number;
  text: string;
  done: boolean;
  importance: number;
};

function TodoItem({ id, text, done: originDone, importance }: ToDoItemProps) {
  const dispatch = useTodoDispatch();
  const onClickDelete = () => {
    deleteTodo(dispatch, { id });
  };
  const onClickUpdate = () => {
    const done = !originDone;
    const data = updateTodo(dispatch, { id, done });
  };
  return (
    <>
      <li>
        <h3>{text}</h3>
        <button onClick={onClickUpdate}>{originDone ? "미완" : "완료"}</button>
        <h5>{importance}</h5>
        <button onClick={onClickDelete}>삭제</button>
      </li>
    </>
  );
}

export default TodoItem;
