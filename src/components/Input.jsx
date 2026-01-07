import { useState } from "react";

export default function Input({
  type,
  name,
  label,
  rows,
  cols,
  updateValues,
  disable,
}) {
  const [string, setString] = useState("");
  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    console.log(e.target.name, `& ${name}`);
    setString((prevState) => {
      prevState + value;
    });
    updateValues(value, name);
  }
  const inputField =
    type === "textarea" ? (
      <textarea
        id={name}
        name={name}
        rows={rows}
        cols={cols}
        onChange={handleChange}
        value={string}
        disabled={disable}
      />
    ) : type === "input" ? (
      <input name={name} type={type} disabled={disable} />
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
