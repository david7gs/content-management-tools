import { useContext } from "react";
import { McToolsContext } from "../store/mcTools_context.jsx";
import Input from "./Input";
import DownArrow from "../assets/svg/DownArrow.svg";

export default function LocaleGenerator() {
  const {
    localeList,
    errorType,
    handleLocaleGeneratorOnPaste,
    handleGetLocaleGeneratorList,
    handleResetLocaleGeneratorListInput,
    handleLocaleGeneratorOnChange,
    handleLocaleGeneratorOnFocus,
    handleToolTipClick,
  } = useContext(McToolsContext);

  const data = localeList;
  const results =
    errorType === "localeListInputIsEmpty" ? (
      <div className="compare-wrap slide-in error">
        Input is needed in both fields
      </div>
    ) : errorType === "localeListInputNotEqual" ? (
      <div className="compare-wrap slide-in error">
        Number of locales do not match number of indicators from matrix
      </div>
    ) : (
      // <div className="compare-wrap slide-in">here</div>
      <div className="compare-wrap g1 slide-in">
        <h4>Locales in scope ({data.localesWithContentArr?.length})</h4>
        {data.localesWithContentArr?.join(", ")}
        <ul>
          Input map
          {data.firstInputArr.map((locale, i) => {
            return (
              <li className="compare-wrap__row" key={i}>
                <span>{locale}</span>
                <span>{data.secondInputArr[i] != "" && "⦿"}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );

  const LocaleError = data.isError
    ? data.errorLocation === "BOTH" || data.errorLocation === "firstInput"
      ? true
      : false
    : false;
  const urlError = data.isError
    ? data.errorLocation === "BOTH" || data.errorLocation === "secondInput"
      ? true
      : false
    : false;

  const isDisabled = data.firstInputArr?.length === 0 ? true : false;
  return (
    <>
      <div className="locale-list slide-in">
        <div className="description">
          <h4>Locale List Generator</h4>
          <p>
            Quickly generate a list of locales in scope for a given content
            update or variation.
            <button
              className="tool-tip"
              title="See examples of content that can be entered in this tool"
              onClick={() => handleToolTipClick("LOCALE_LIST_GENERATOR")}
            >
              ?
            </button>
          </p>
          <p>
            In this first field, input a string of locales copied from source
            such as a content matrix in the first field.
          </p>
        </div>
        <div className="input-wrap">
          <div className="input-col">
            <label htmlFor="firstInput">
              Locales&nbsp;
              {data?.firstInputArr?.length != 0 && (
                <span className="locale-count">
                  ({data.firstInputArr.length})
                </span>
              )}
            </label>
            <Input
              type="textarea"
              name="firstInput"
              id="firstInput"
              value={data.firstInputArr.join(", ")}
              dataType="firstInput"
              onChange={handleLocaleGeneratorOnChange}
              handlePaste={handleLocaleGeneratorOnPaste}
              onFocus={handleLocaleGeneratorOnFocus}
              isError={LocaleError}
              placeholder="ex: en_AU, en_CA, fr_CA, es_CL, de_DE"
              rows="4"
              cols="50"
            />
            <div className="error-container">
              {LocaleError
                ? data.errorType === "noValidLocales"
                  ? `Valid locales are required to retrieve data. Please enter valid locales. ex: en_CA, es_MX`
                  : `Please enter required data. Unable to generate locale list`
                : null}
            </div>
          </div>
          <div className="input-col">
            <div className="description">
              <p>
                In the second field paste data copied from matrix from the
                appropriate column indicating if the locale is in/out of scope.
                (usually column of cells represented by dots)
              </p>
            </div>
            <label htmlFor="secondInput">
              Indicator cells&nbsp;
              {data.secondInputArr.length != 0 && (
                <span className="locale-count">
                  ({data.secondInputArr.length})&nbsp;(should match number of
                  locales)
                </span>
              )}
            </label>
            <Input
              disable={isDisabled}
              type="textarea"
              id="secondInput"
              name="secondInput"
              dataType="secondInput"
              value={data.secondInputArr.join(", ")}
              isError={urlError}
              onChange={handleLocaleGeneratorOnChange}
              handlePaste={handleLocaleGeneratorOnPaste}
              onFocus={handleLocaleGeneratorOnFocus}
              placeholder="ex: usually cells copied from a spreadsheet with something indicating yes/no"
              rows="4"
              cols="50"
            />
            <div className="error-container">
              {urlError &&
                `Please enter required data. Unable to generate locale list`}
            </div>
            <div className="seperator-button">
              <button
                className="compare-button"
                onClick={handleGetLocaleGeneratorList}
              >
                Generate list of locales in scope
              </button>
              <button
                className="reset-button"
                onClick={handleResetLocaleGeneratorListInput}
              >
                Reset input fields
              </button>
              {data?.isLocaleListGenerate && (
                <span className="down-arrow bounce">
                  <DownArrow />
                </span>
              )}
            </div>
          </div>
        </div>
        {/* <button
          className="compare-button"
          onClick={handleGetLocaleGeneratorList}
        >
          Generate list of locales in scope
        </button> */}
        {data.isError && data.errorType === "localeListInputNotEqual" && (
          <div className="error">
            Number of locales do not match number of cells. Unable to generate
            locale list. Please reset the fields and try pasting locales before
            pasting indicator cells.
          </div>
        )}
        {data.isLocaleListGenerate && <div>{results}</div>}
      </div>
    </>
  );
}
