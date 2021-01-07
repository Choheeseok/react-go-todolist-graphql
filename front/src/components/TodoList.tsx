import React from "react";
import TodoItem from "./TodoItem";
import { useTodoDispatch, useTodoState } from "../TodoContext";
import axios from "axios";
import { useAsync } from "react-async";

async function getTodos() {
  const response = await axios.get(
    `http://localhost:8000/graphql?query={getTodos{id, text, done, detailText, importance}}`
  );
  return response.data;
}

function TodoList() {
  const todos = useTodoState();
  const { data, error, isLoading, reload } = useAsync({
    promiseFn: getTodos,
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;
  return (
    <>
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
      <button onClick={reload}>다시 불러오기</button>
    </>
  );
}

export default TodoList;
