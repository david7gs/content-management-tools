import { useContext, useState, useEffect, use } from "react";
import { McToolsContext } from "../store/mcTools_context.jsx";
import { OnEnterHook } from "../helpers/OnEnterHook.jsx";
import { GEO_API } from "../.env/.env_api.js";
import { API_SWAP } from "../.env/.env_geo_api.js";
//import { geoIApps } from "../helpers/geoIApps";
// import { enterLocaleOrCountryErrorMessage as LocaleError } from "../helpers/errorMessages.jsx";
import Input from "./Input";

export default function TokenGenerator() {
  const {
    tokenGen,
    geoInfo,
    handleTokenGeneratorOnChange,
    handleTokenGeneratorOnFocus,
    getLocaleOrCountryType,
    handleTokenGenLocaleSelect,
    handleTokenSelect,
    handleTokenGenChange,
    // handleSelectTokenQueryType,
  } = useContext(McToolsContext);
  OnEnterHook(getLocaleOrCountryType);

  const data = { ...tokenGen };
  const geo = { ...geoInfo };
  const isMultiLanguage = data.multiLanguage?.length > 1 ? true : false;
  const isTarget = data.target != undefined ? true : false;
  console.log(`isMultiLanguage =`, isMultiLanguage);
  console.log(`isTarget =`, isTarget);

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
        {copied ? "Copied!" : "Copy Token"}
      </button>
    );
  }

  const tokenErrorMessage =
    data.isError && (data.errorType === "SHORT" || data.errorType === "EMPTY")
      ? `Please enter either a country code (usually 2-3 digits) or a valid locale string`
      : data.isError && data.errorType === "LONG"
        ? `The string you entered is too long. Please enter either a country code (usually 2-3 digits) or a valid locale string (2 characters, an underscore, followed by 2-3 characters)`
        : data.isError && data.errorType === "NONCHARACTER"
          ? `Please enter only alpha numeric characters, underscore, or hyphen`
          : data.isError &&
              (data.errorType === "COUNTRYNOTFOUND" ||
                data.errorType === "LOCALENOTFOUND")
            ? `The country code or locale entered was not found. Please try again`
            : `There is an error in your input`;

  return (
    <div className="locale-list token-gen slide-in">
      <div className="description">
        <h3>Token Generator</h3>
        <div className="input-wrap">
          <div className="input-col flex-row">
            <label htmlFor="tokenGeneratorInput">
              Enter a locale or country code to get started
            </label>
            <Input
              type="input"
              name="tokenGeneratorInput"
              id="tokenGeneratorInput"
              // isError={data.isError}
              className="country-code__input"
              maxLength={`10`}
              onChange={handleTokenGeneratorOnChange}
              onFocus={handleTokenGeneratorOnFocus}
              value={tokenGen.input ?? ""}
            >
              <button
                className="select cc-button"
                onClick={getLocaleOrCountryType}
              >
                Generate token
              </button>
            </Input>
          </div>
        </div>
        <div className="error-container error">
          {data.isError && tokenErrorMessage}
        </div>
        {isMultiLanguage && (
          <div className="slide-in">
            <div>
              It looks like the country you entered has more than one language
              site. Select the locale you are looking for:
            </div>
            <div className="token-language">
              {data.multiLanguage.map((lang, i) => {
                return (
                  <button
                    className="select"
                    key={i}
                    name={lang.id}
                    onClick={handleTokenGenLocaleSelect}
                  >
                    {lang.id}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {data?.showResult && (
          <div className="result">
            <div className="compare-wrap g1 slide-in">
              <div className="token-locale">
                Selected Locale:&nbsp;
                <span className="locale">{data.target.id}</span>
              </div>
              <div className="token-build">
                <div>Your URL returned from Token</div>
                <div>
                  {/* {Object.entries(data.target.urlPaths).map(
                    ([key, value], i) => {
                      if (key === "support" || key === "locate") {
                        return;
                      }
                      return (
                        <span className="base">
                          {data.target?.wwwDomain ?? "www.myURL.com"}
                        </span>
                      );
                    },
                  )} */}
                  {data.token.token != "$support/" &&
                    data.token.token != "$locate/" && (
                      <span className="base">
                        {data.target?.wwwDomain ?? "www.myURL.com"}
                      </span>
                    )}
                  <span className="params">
                    {data.token.key}/{data.token?.extendKey}
                  </span>
                </div>
                {/* <button className="token-copy">Copy Token</button> */}
              </div>
              <div>Select options below and build your token</div>
              <div className="token-input">
                <Input
                  name="tokenGen"
                  type="input"
                  placeholder={`Make a selection from below`}
                  maxLength="200"
                  value={data.token.varTokenValue ?? ""}
                  onChange={handleTokenGenChange}
                />
                <CopyButton
                  className="select copy-string"
                  textToCopy={data.newValue}
                />
              </div>
              {/* <div className="token-build">
                <span className="base">
                  {data.target?.wwwDomain ?? "www.myURL.com"}
                </span>
                <span className="options">my/token/build/here</span>
              </div> */}
              <div className="url-paths">
                <div className="label">
                  <div>Token</div>
                  <div>Value</div>
                </div>
                <ul className="token-result">
                  {Object.entries(data.target.urlPaths).map(
                    ([key, value], i) => {
                      if (
                        key === "developer" ||
                        key === "itunes" ||
                        key === "previewDomain" ||
                        key === "previewNamespace"
                      ) {
                        return;
                      }
                      return (
                        <li key={i}>
                          <button
                            className={
                              data.token.token === `$` + key + `/`
                                ? "token-select active"
                                : "token-select"
                            }
                            name={key}
                            onClick={handleTokenSelect}
                          >
                            ${key}
                          </button>
                          <span>{value}</span>
                        </li>
                      );
                    },
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
