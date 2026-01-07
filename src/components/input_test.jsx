import { useState } from "react";

export default function Input_test({
  type,
  name,
  value,
  label,
  rows,
  cols,
  handleOnChange,
  handleClick,
  disable,
  updateValues,
  myInputTest,
}) {
  console.log(`## value =`, value);
  console.log(`## disable = ${disable}`);
  // const [string, setString] = useState("");
  // function handleChange(e) {
  //   const value = e.target.value;
  //   const name = e.target.name;
  //   console.log(e.target.name, `& ${name}`);
  //   setString((prevState) => {
  //     prevState + value;
  //   });
  //   updateValues(value, name);
  // }
  // const onChangeFunc = handleChange != undefined ? handleChange : myInputTest;
  const inputField =
    type === "textarea" ? (
      <textarea
        id={name}
        name={name}
        rows={rows}
        cols={cols}
        onChange={handleOnChange}
        onClick={handleClick}
        value={value}
        disabled={disable}
        // value={string}
      />
    ) : type === "input" ? (
      <input
        name={name}
        type={type}
        onChange={handleOnChange}
        onClick={handleClick}
        disabled={disable}
      />
    ) : (
      <input name={name} />
    );
  return (
    <div className="input-field">
      <label className="compare-wrap__label" htmlFor="localString">
        {label}
      </label>
      {inputField}
    </div>
  );
}
