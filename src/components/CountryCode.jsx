import { useContext, useEffect, useState } from "react";
import Input from "./Input";
import { McToolsContext } from "../store/mcTools_context.jsx";
import { OnEnterHook } from "../helpers/OnEnterHook.jsx";

export default function CountryCode() {
  const {
    countryCode,
    handleGetCountryCodeOnChange,
    handleGetCountryCode,
    handleGetCountryCodeOnFocus,
    handleCountryCodeLocaleSelect,
    handleToolTipClick,
  } = useContext(McToolsContext);
  const data = countryCode;
  // console.log(`CountryCode and data =`, data);

  OnEnterHook(handleGetCountryCode);
  const isMultiLanguage = data.multiLanguage?.length > 1 ? true : false;
  const isTarget = data.target != undefined ? true : false;
  // console.log(`isMultiLanguage =`, isMultiLanguage);
  // console.log(`isTarget =`, isTarget);

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
      <button className={className} onClick={handleCopy}>
        {copied
          ? "Copied!"
          : data.resultType === "COUNTRYCODE"
            ? "Copy Country Code"
            : "Copy Locale"}
      </button>
    );
  }

  const errorMessage =
    data.isValid === "SHORT" || data.isValid === "EMPTY"
      ? `Please enter either a country code (usually 2-3 digits) or a valid locale string`
      : data.isValid === "LONG"
        ? `Input is too long. Please enter either a country code (usually 2-3 digits) or a valid locale string (2 characters, an underscore, followed by 2-3 characters)`
        : data.isValid === "NONCHARACTER"
          ? `Please enter only alpha numeric characters, underscore, or hyphen`
          : `There is an error in your input`;

  return (
    <>
      <section className="country-code slide-in">
        <header>
          <h1>Get a Country Code</h1>
          <p>
            <span>
              Enter a country code (e.g., ca) to get its locale (en_CA), or
              enter a locale (e.g., en_CA) to get its country code (ca).
            </span>
            <button
              className="select tool-tip"
              title="See examples of content that can be entered in this tool"
              onClick={() => handleToolTipClick("COUNTRY_CODE")}
            >
              ?
            </button>
          </p>
        </header>
        {/* <div className="seperator"></div> */}
        <div className="content-wrap scroll">
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
                value={data.input ?? ""}
              >
                <button
                  className="select cc-button"
                  onClick={handleGetCountryCode}
                >
                  Get Country Code
                </button>
              </Input>
            </div>
          </div>
          <div className="error-container">{data.isError && errorMessage}</div>
          {isMultiLanguage && (
            <div className="slide-in">
              <div>
                It looks like the country you entered has more than one language
                site. Select the locale you are looking for:
              </div>
              <div className="locale-selector">
                {data.multiLanguage.map((lang, i) => {
                  return (
                    <button
                      className={
                        lang.id === data.result ? `select active` : `select`
                      }
                      key={i}
                      name={lang.id}
                      onClick={handleCountryCodeLocaleSelect}
                    >
                      {lang.id}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {data?.showResult && (
            <div className="result row-gap">
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
              {(data.resultType === "COUNTRYCODE" ||
                data.resultType === "LOCALECODE") && (
                <CopyButton
                  className="select copy-string"
                  textToCopy={data.result}
                />
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
