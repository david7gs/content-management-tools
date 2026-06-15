import { useContext, useState } from "react";
import { McToolsContext } from "../store/mcTools_context.jsx";
import { OnEnterHook } from "../helpers/OnEnterHook.jsx";
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

  OnEnterHook(handleGetLocaleGeneratorList);

  function CopyButton({ textToCopy, className }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      if (!textToCopy) return;
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset status after 2s
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    };

    return (
      <button
        className={className}
        onClick={() => handleCopy(data.firstInputArr)}
      >
        {copied ? "Copied!" : "Copy Locales"}
      </button>
    );
  }

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
        <div className="heading-wrap">
          <h4>Locales in scope ({data.localesWithContentArr?.length})</h4>
          <CopyButton
            className="select copy-string"
            textToCopy={data.localesWithContentArr.join(", ")}
          />
        </div>
        <div className="compare-wrap__locales">
          {data.localesWithContentArr?.join(", ")}
        </div>
        <ul>
          Input map - visualy compare results with matrix
          {data.firstInputArr.map((locale, i) => {
            return (
              <li
                className={
                  data.secondInputArr[i] != ""
                    ? "compare-wrap__row indicator"
                    : "compare-wrap__row"
                }
                key={i}
              >
                {/* <li className="compare-wrap__row" key={i}> */}
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
            Quickly generate a list of locales for a given content update or
            variation.
            <button
              className="select tool-tip"
              title="See examples of content that can be entered in this tool"
              onClick={() => handleToolTipClick("LOCALE_LIST_GENERATOR")}
            >
              ?
            </button>
          </p>
          <p>
            Paste a list of locales from your source (such as a content matrix)
            into the first field.
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
                  : `Unable to generate locale list, Please enter required data.`
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
                `Unable to generate locale list, Please enter required data.`}
            </div>
            <div className="seperator-button">
              <button
                className="select compare-button"
                onClick={handleGetLocaleGeneratorList}
              >
                Generate list of locales in scope
              </button>
              <button
                className="select reset-button"
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
            The number of locales does not match the number of indicator cells.
            Unable to generate locale list. This could be caused by hidden data
            from the document the data comes from. Please see this tool tip for
            more information.
            <button
              className="tool-tip"
              title="See examples of possible reasons this tool may not be working"
              onClick={() => handleToolTipClick("LOCALE_LIST_GENERATOR_HELP")}
            >
              ?
            </button>
          </div>
        )}
        {data.isLocaleListGenerate && <div>{results}</div>}
      </div>
    </>
  );
}
