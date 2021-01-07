import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { textChangeRangeIsUnchanged } from "typescript";
import { CreateForm, useTodoDispatch } from "../TodoContext";

function CreateTodo() {
  const [open, setOpen] = useState(true);
  const [inputs, setInputs] = useState<CreateForm>({
    text: "",
    detailText: "",
    importance: 1,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: "CREATE", todo: inputs });
    setInputs({
      text: "",
      detailText: "",
      importance: 1,
    });
  };

  const dispatch = useTodoDispatch();
  return (
    <>
      {open && (
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
            낮을수록 많이 중요
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
      )}
    </>
  );
}

export default CreateTodo;
