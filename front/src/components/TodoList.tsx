import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import { ToDo, getTodos, useTodoDispatch, useTodoState } from "../TodoContext";
import "./TodoList.css";

function TodoList() {
  const state = useTodoState();
  const dispatch = useTodoDispatch();
  const { data: todos, loading, error } = state.todos;

  const fetchData = () => {
    getTodos(dispatch);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!todos) return null;
  return (
    <>
      <ul className="lists">
        {todos.data.getTodos.map((toDo: ToDo) => (
          <TodoItem
            key={toDo.id}
            id={toDo.id}
            text={toDo.text}
            done={toDo.done}
            importance={toDo.importance}
          />
        ))}
      </ul>
      <button className="btn" onClick={fetchData}>
        다시 불러오기
      </button>
    </>
  );
}

export default TodoList;
