import React from "react";

import "./letter.scss";

const Letter = (props) => {
  return (
    <div
      className={`letter letter-${props.letter.status}`}
      key={`letter-${props.letter.value}`}
    >
      {props.letter.value}
    </div>
  );
};

export default Letter;
