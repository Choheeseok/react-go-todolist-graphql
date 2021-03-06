import React from "react";
import { Link } from "react-router-dom";
import TodoDetail from "../components/TodoDetail";
import "../components/TodoDetail.css";

// props의 id를 type으로 받는 법 ?
function Detail(props: any) {
  const id: number = props.match.params.id;

  return (
    <>
      <TodoDetail id={id} />
      <Link className="text" to="/">
        뒤로가기
      </Link>
    </>
  );
}

export default Detail;
