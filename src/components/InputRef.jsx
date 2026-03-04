import { useState, useRef } from "react";

export default function Input_ref({
  type,
  name,
  ref,
  className,
  inputClass,
  maxLength,
  value,
  label,
  rows,
  cols,
  handleOnChange,
  handlePaste,
  handleClick,
  onFocus,
  disable,
  updateValues,
  myInputTest,
  children,
}) {
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
        className={className}
        name={name}
        rows={rows}
        cols={cols}
        maxLength={maxLength}
        onChange={handleOnChange}
        onPaste={handlePaste}
        onClick={handleClick}
        onFocus={onFocus}
        ref={ref}
        disabled={disable}
        // value={string}
      />
    ) : type === "input" ? (
      <input
        className={className}
        name={name}
        type={type}
        ref={ref}
        maxLength={maxLength}
        onChange={handleOnChange}
        onPaste={handlePaste}
        onClick={handleClick}
        onFocus={onFocus}
        disabled={disable}
        autoComplete={`off`}
      />
    ) : (
      <input
        className={className}
        ref={ref}
        name={name}
        maxLength={maxLength}
      />
    );
  return (
    <div className={`input-field ${inputClass && inputClass}`}>
      <label className="compare-wrap__label" htmlFor="localString">
        {label}
      </label>
      <div className="flex-row">
        {inputField}
        {children}
      </div>
    </div>
  );
}
