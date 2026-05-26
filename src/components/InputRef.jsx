import { useState, useRef } from "react";

export default function InputRef({
  type,
  name,
  ref,
  className,
  placeholder,
  inputClass,
  maxLength,
  value,
  label,
  rows,
  cols,
  onChange,
  handlePaste,
  handleClick,
  onFocus,
  disable,
  isError,
  errorType,
  errorLocation,
  updateValues,
  myInputTest,
  children,
}) {
  const inputField =
    type === "textarea" ? (
      <textarea
        id={name}
        className={className}
        name={name}
        rows={rows}
        cols={cols}
        maxLength={maxLength}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onPaste={handlePaste}
        isError={isError}
        errorType={errorType}
        errorLocation={errorLocation}
        autoComplete={`off`}
        // onClick={handleClick}
        // onFocus={onFocus}
        // ref={ref}
        // disabled={disable}
      />
    ) : type === "input" ? (
      <input
        className={className}
        name={name}
        type={type}
        maxLength={maxLength}
        onChange={onChange}
        onPaste={handlePaste}
        isError={isError}
        errorType={errorType}
        errorLocation={errorLocation}
        autoComplete={`off`}
        // disabled={disable}
        //ref={ref}
        // onClick={handleClick}
        // onFocus={onFocus}
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
