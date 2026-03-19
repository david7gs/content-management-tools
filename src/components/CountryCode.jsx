import { useState, useContext, useRef } from "react";

import { default as Input } from "./InputRef";
import { LocaleList, CountryCodes } from "../helpers/localeMaping.js";
import { McToolsContext } from "../store/mcTools_context.jsx";

export default function CountryCode() {
  const { handleToolTipClick } = useContext(McToolsContext);
  const [returnValue, setReturnValue] = useState({
    value: undefined,
    isValid: undefined,
    resultType: undefined,
    showResult: false,
  });
  const inputRef = useRef("");
  const Locales = [...LocaleList].map((locale) => {
    return locale.toLocaleLowerCase();
  });
  const Countries = [...CountryCodes].map((country) => {
    return country.toLocaleLowerCase();
  });
  var exp = new RegExp(/^[a-zA-Z0-9_-]+$/);
  function handleClick() {
    const value = inputRef.current.value;
    const valid = exp.test(value);
    if (!valid) {
      setReturnValue((prevState) => {
        return {
          ...prevState,
          isValid: "NONCHARACTER",
        };
      });
    } else {
      if (value.length < 2) {
        setReturnValue((prevState) => {
          return {
            ...prevState,
            isValid: "short",
          };
        });
      } else if (value.length > 6) {
        setReturnValue((prevState) => {
          return {
            ...prevState,
            isValid: "long",
          };
        });
      } else {
        const isLocale = value.includes("_");
        if (isLocale) {
          const index = Locales.indexOf(value.toLowerCase());
          if (index < 0) {
            setReturnValue((prevState) => {
              return {
                ...prevState,
                isValid: true,
                resultType: "LOCALENOTFOUND",
                showResult: true,
              };
            });
          } else {
            const countryCode = CountryCodes[index];
            setReturnValue((prevState) => {
              return {
                ...prevState,
                value: countryCode,
                isValid: true,
                resultType: "COUNTRYCODE",
                showResult: true,
              };
            });
          }
        } else {
          const index = Countries.indexOf(value.toLowerCase());
          if (index < 0) {
            setReturnValue((prevState) => {
              return {
                ...prevState,
                isValid: true,
                resultType: "COUNTRYNOTFOUND",
                showResult: true,
              };
            });
          } else {
            const locale = LocaleList[index];
            setReturnValue((prevState) => {
              return {
                ...prevState,
                value: locale,
                isValid: true,
                resultType: "LOCALECODE",
                showResult: true,
              };
            });
          }
        }
      }
    }
  }

  function handleFocus() {
    setReturnValue((prevState) => {
      return {
        ...prevState,
        value: undefined,
        isValid: undefined,
        showResult: false,
        resultType: undefined,
      };
    });
  }
  return (
    <>
      <div className="locale-list slide-in">
        <div className="description">
          Enter a country code (ex. "us") to get a locale ("en_US") or a locale
          (ex. "en_US") to get a country code ("us").
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
            <Input
              inputClass="flex-col"
              type="input"
              name="localeCountryCode"
              id="localeCountryCode"
              ref={inputRef}
              className="country-code__input"
              label="Enter locale or country code"
              maxLength={`10`}
              onFocus={handleFocus}
            >
              <button className="cc-button" onClick={handleClick}>
                Get Country Code
              </button>
            </Input>
          </div>
        </div>
        <div className="error-container error">
          {returnValue.isValid === "short" &&
            `Please enter either a country code (usually 2-3 digits) or a valid locale string`}
          {returnValue.isValid === "long" &&
            `The string you entered is too long. Please enter either a country code (usually 2-3 digits) or a valid locale string (2 characters, an underscore, followed by 2-3 characters)`}
          {returnValue.isValid === "NONCHARACTER" &&
            `Please enter only alpha numeric characters, underscore, or hyphen`}
        </div>

        {returnValue.showResult && (
          <div className="result">
            Your{" "}
            {returnValue.resultType === "COUNTRYCODE"
              ? "Country Code is"
              : returnValue.resultType === "LOCALECODE"
                ? "Locale is"
                : returnValue.resultType === "LOCALENOTFOUND"
                  ? "No match, please try again"
                  : returnValue.resultType === "COUNTRYNOTFOUND"
                    ? "No match, please try again"
                    : undefined}{" "}
            <span className="return-value">{returnValue.value}</span>
          </div>
        )}
      </div>
    </>
  );
}
