import React, { useContext } from "react";

export default function Up_down({
  togle_disabled,
  id_name,
  set_function,
  for_icon,
  for_icon2,
  btn_style
}) {
  return (
    <>
      {togle_disabled ? (
        <button id={id_name} style={btn_style}>
          {for_icon}
          {for_icon2}
        </button>
      ) : (
        <button id={id_name} style={btn_style} onClick={set_function}>
          {for_icon}
          {for_icon2}
        </button>
      )}
    </>
  );
}
