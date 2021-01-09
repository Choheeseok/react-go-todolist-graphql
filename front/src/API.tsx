import axios from "axios";
import { CreateForm } from "./TodoContext";

async function getTodos() {
  const response = await axios.get(
    `http://localhost:8000/graphql?query={getTodos{id, text, done, detailText, importance}}`
  );
  console.log(response.data);
  return response.data;
}

async function createTodo({ text, detailText, importance }: CreateForm) {
  const response = await axios.post(`http://localhost:8000/graphql`, {
    query: `mutation {
      createTodo(text:"${text}", detailText:"${detailText}", importance:${importance}) {
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

type ID = {
  id: number;
};

async function deleteTodo({ id }: ID) {
  console.log(id);
  const response = await axios.delete(`http://localhost:8000/graphql`, {
    data: {
      query: `mutation {
      deleteTodo(id:${id}) {
        id
      }
    }`,
    },
  });
  console.log(response.data);
  return response.data;
}

export { getTodos, createTodo, deleteTodo };
