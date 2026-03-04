export default function Input_test({
  type,
  name,
  value,
  label,
  rows,
  cols,
  handleOnChange,
  handlePaste,
  handleClick,
  disable,
  placeholder,
  updateValues,
  myInputTest,
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
        name={name}
        rows={rows}
        cols={cols}
        onChange={handleOnChange}
        onPaste={handlePaste}
        onClick={handleClick}
        value={value}
        disabled={disable}
        placeholder={placeholder}
        // value={string}
      />
    ) : type === "input" ? (
      <input
        name={name}
        type={type}
        onChange={handleOnChange}
        onPaste={handlePaste}
        onClick={handleClick}
        disabled={disable}
        placeholder={placeholder}
      />
    ) : (
      <input name={name} placeholder={placeholder} />
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
