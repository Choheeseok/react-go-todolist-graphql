import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAsync } from "react-async";
import { CreateForm, useTodoDispatch } from "../TodoContext";

async function addTodo({ text, detailText, importance }: CreateForm) {
  console.log("im here");
  const response = await axios.post(`http://localhost:8000/graphql`, {
    // query: `mutation {
    //   createTodo(text:"${text}", detailText:"${detailText}", importance:${importance}) {
    //       { id
    //         text
    //         done
    //         detailText
    //         importance }
    //   }
    // }`,

    query: `
    mutation {
      createTodo(text:${text}, detailText:${detailText}, importance:${importance}){
          id
          text
          done
          detailText
          importance
      }
  }`,
  });
  console.log(response.data);
  return response.data;
}

function CreateTodo() {
  const [open, setOpen] = useState(true);
  const [inputs, setInputs] = useState<CreateForm>({
    text: "",
    detailText: "",
    importance: 1,
  });
  const { data, error, isLoading, run } = useAsync({
    deferFn: () => addTodo(inputs),
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
    run();
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
