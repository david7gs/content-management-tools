import { useState, useRef } from "react";

export default function Input({
  type,
  name,
  dataType,
  ref,
  isError,
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
  updateValues,
  children,
}) {
  const inputField =
    type === "textarea" ? (
      <textarea
        id={name}
        className={isError ? "error" : undefined}
        name={name}
        data-type={dataType}
        rows={rows}
        cols={cols}
        maxLength={maxLength}
        onChange={onChange}
        onPaste={handlePaste}
        value={value}
        placeholder={placeholder}
        disabled={disable}
        // onClick={handleClick}
        onFocus={onFocus}
        // ref={ref}
      />
    ) : type === "input" ? (
      <input
        type={type}
        // className={isError ? "error" : undefined}
        className={!isError ? className : `${className} error`}
        id={name}
        name={name}
        data-type={dataType}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        onPaste={handlePaste}
        disabled={disable}
        autoComplete={`off`}
        // ref={ref}
        // onClick={handleClick}
        onFocus={onFocus}
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
    <div className="input-field">
      {/* <div className={`input-field ${inputClass && inputClass}`}> */}
      {label && <label className="compare-wrap__label">{label}</label>}
      <div className="flex-row">
        {inputField}
        {children}
      </div>
    </div>
  );
}
