import React from "react";
import "./Head.css";

function Head() {
  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleDateString("ko-KR", { weekday: "long" });

  return (
    <>
      <div className="header">
        <h1 className="title">My To Do List</h1>
        <h2 className="date">
          {dateString} {dayName}
        </h2>
        <div className="task-left">할 일 2개 남음</div>
      </div>
    </>
  );
}

export default Head;
