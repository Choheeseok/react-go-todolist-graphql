import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  CreateForm,
  createTodo,
  useTodoDispatch,
  useTodoState,
} from "../TodoContext";

function CreateTodo() {
  const state = useTodoState();
  const dispatch = useTodoDispatch();
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState<CreateForm>({
    text: "",
    detailText: "",
    importance: 1,
  });
  const { data: todo, loading, error } = state.todo;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    createTodo(dispatch, inputs);
    setInputs({
      text: "",
      detailText: "",
      importance: 1,
    });
    setOpen(false);
  };

  const onWriteButtonClick = () => {
    setOpen(true);
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;
  return (
    <>
      {open ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="할 일 입력"
            value={inputs.text}
            onChange={onChange}
          />
          <input
            type="text"
            name="detailText"
            placeholder="세부사항"
            value={inputs.detailText}
            onChange={onChange}
          />
          <div className="importances">
            <input
              type="radio"
              name="importance"
              value={1}
              onChange={onChange}
            />
            1순위
            <input
              type="radio"
              name="importance"
              value={2}
              onChange={onChange}
            />
            2순위
            <input
              type="radio"
              name="importance"
              value={3}
              onChange={onChange}
            />
            3순위
            <input
              type="radio"
              name="importance"
              value={4}
              onChange={onChange}
            />
            4순위
          </div>
          <button type="submit">완료</button>
        </form>
      ) : (
        <button onClick={onWriteButtonClick}>할 일 추가</button>
      )}
    </>
  );
}

export default CreateTodo;
