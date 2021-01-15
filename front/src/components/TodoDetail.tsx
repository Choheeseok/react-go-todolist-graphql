import React, { useEffect } from "react";
import { getTodo, useTodoDispatch, useTodoState } from "../TodoContext";

function TodoDetail({ id }: { id: number }) {
  const state = useTodoState();
  const dispatch = useTodoDispatch();
  const { data: todo, loading, error } = state.todo;

  useEffect(() => {
    getTodo(dispatch, { id });
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!todo) return null;

  return (
    <>
      <h1>{todo.data.getTodo.text}</h1>
      <h3>중요도 : {todo.data.getTodo.importance}</h3>
      {todo.data.getTodo.done ? <h5>완료</h5> : <h5>미완료</h5>}
    </>
  );
}

export default TodoDetail;
