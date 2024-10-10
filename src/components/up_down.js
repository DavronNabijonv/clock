import React, { useContext } from "react";

export default function Up_down({
  togle_disabled,
  id_name,
  set_function,
  for_icon,
  for_icon2,
}) {
  return (
    <>
      {togle_disabled ? (
        <button id={id_name}>
          {for_icon}
          {for_icon2}
        </button>
      ) : (
        <button id={id_name} onClick={set_function}>
          {for_icon}
          {for_icon2}
        </button>
      )}
    </>
  );
}
