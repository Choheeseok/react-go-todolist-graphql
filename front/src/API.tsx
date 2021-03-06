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
  const response = await axios.delete(`http://localhost:8000/graphql`, {
    data: {
      query: `mutation {
      deleteTodo(id:${id}) {
        id
      }
    }`,
    },
  });
  return response.data;
}

type UpdateForm = {
  id: number;
  done: boolean;
};

async function updateTodo({ id, done }: UpdateForm) {
  const response = await axios.put(`http://localhost:8000/graphql`, {
    query: `mutation {
      updateTodo(id:${id}, done:${done}) {
        id
        text
        done
        detailText
        importance 
      }
    }`,
  });
  return response.data;
}

async function getTodo({ id }: ID) {
  const response = await axios.get(
    `http://localhost:8000/graphql?query={getTodo(id:${id}){id, text, done, detailText, importance}}`
  );
  console.log(response.data);
  return response.data;
}

export { getTodos, createTodo, deleteTodo, updateTodo, getTodo };
