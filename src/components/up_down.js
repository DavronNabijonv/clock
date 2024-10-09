import React, { useContext } from "react";

export default function Up_down({ id_name, set_function, for_icon, for_icon2 }) {

  return (
    <button id={id_name} onClick={set_function}>
      {for_icon}{for_icon2}
    </button>
  );
}
