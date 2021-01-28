import React from "react";
import { Link } from "react-router-dom";
import { deleteTodo, updateTodo, useTodoDispatch } from "../TodoContext";
import "./TodoItem.css";

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
        <span className="importance">{importance}</span>
        <Link className="text" to={`/${id}`}>
          {text}
        </Link>
        <button className="btn" onClick={onClickUpdate}>
          {originDone ? "미완" : "완료"}
        </button>
        <button className="btn" onClick={onClickDelete}>
          삭제
        </button>
      </li>
    </>
  );
}

export default TodoItem;
