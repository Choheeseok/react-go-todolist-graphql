import React from "react";

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
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="task-left">할 일 2개 남음</div>
    </>
  );
}

export default Head;
