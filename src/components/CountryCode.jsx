import { useContext, useEffect } from "react";
import Input from "./Input";
import { McToolsContext } from "../store/mcTools_context.jsx";
import { OnEnterHook } from "../helpers/OnEnterHook.jsx";

export default function CountryCode() {
  const {
    countryCode,
    handleGetCountryCodeOnChange,
    handleGetCountryCode,
    handleGetCountryCodeOnFocus,
    handleToolTipClick,
  } = useContext(McToolsContext);
  const data = countryCode;
  // console.log(`CountryCode and data =`, data);

  OnEnterHook(handleGetCountryCode);

  const errorMessage =
    data.isValid === "SHORT" || data.isValid === "EMPTY"
      ? `Please enter either a country code (usually 2-3 digits) or a valid locale string`
      : data.isValid === "LONG"
        ? `The string you entered is too long. Please enter either a country code (usually 2-3 digits) or a valid locale string (2 characters, an underscore, followed by 2-3 characters)`
        : data.isValid === "NONCHARACTER"
          ? `Please enter only alpha numeric characters, underscore, or hyphen`
          : `There is an error in your input`;

  function getKeyPress(e) {
    console.log(`enter key pressed =`, e);
    // if (e.key === "return") {
    //   console.log(`enter key pressed`);
    // }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Your action here
      console.log("Enter key pressed");
    }
  };

  return (
    <>
      <div className="locale-list slide-in">
        <div className="description">
          Enter a country code (e.g., ca) to get its locale (en_CA), or enter a
          locale (e.g., en_CA) to get its country code (ca).
          <button
            className="tool-tip"
            title="See examples of content that can be entered in this tool"
            onClick={() => handleToolTipClick("COUNTRY_CODE")}
          >
            ?
          </button>
        </div>
        <div className="seperator"></div>
        <div className="input-wrap">
          <div className="input-col flex-row">
            <label htmlFor="localeCountryCode">
              Enter locale or country code
            </label>
            <Input
              type="input"
              name="localeCountryCode"
              id="localeCountryCode"
              isError={data.isError}
              className="country-code__input"
              maxLength={`10`}
              onChange={handleGetCountryCodeOnChange}
              onFocus={handleGetCountryCodeOnFocus}
              value={data.value ?? ""}
            >
              <button className="cc-button" onClick={handleGetCountryCode}>
                Get Country Code
              </button>
            </Input>
          </div>
        </div>
        <div className="error-container error">
          {data.isError && errorMessage}
        </div>

        {data.showResult && (
          <div className="result">
            {data.resultType === "COUNTRYCODE"
              ? "Your Country Code is"
              : data.resultType === "LOCALECODE"
                ? "Your Locale is"
                : data.resultType === "LOCALENOTFOUND"
                  ? "There is no match, please try again"
                  : data.resultType === "COUNTRYNOTFOUND"
                    ? "There is no match, please try again"
                    : undefined}{" "}
            {/* {data.resultType === "COUNTRYCODE" ||
              (data.resultType === "LOCALECODE" && (
                <span className="return-value">{data.result}</span>
              ))} */}
            <span className="return-value">{data?.result}</span>
          </div>
        )}
      </div>
    </>
  );
}
