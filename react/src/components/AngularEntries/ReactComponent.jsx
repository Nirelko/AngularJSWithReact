import React from "react";

import PrettyText from '../PrettyText'

export default function ReactComponent({ text }) {
  return (
    <div>
      <div>Hello From React!!</div>
      <PrettyText>Your text: {text}</PrettyText>
    </div>
  );
}
