import { useContext, useRef, useEffect } from "react";
import { McToolsContext } from "../store/mcTools_context.jsx";
import Input from "./Input";
import DownArrow from "../assets/svg/DownArrow.svg";

export default function LocaleList() {
  const {
    compareLocales,
    handleCompareLocaleChange,
    handleGetCompareLocales,
    handleClearLocaleListInput,
    handleResetCompareLocales,
    handleOnFocusLocaleList,
    handleToolTipClick,
  } = useContext(McToolsContext);

  const scrollTo = useRef(null);

  useEffect(() => {
    if (scrollTo.current) {
      setTimeout(() => {
        scrollTo.current?.scrollIntoView({ behavior: "smooth" });
      }, 1000);
      // scrollTo.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const data = compareLocales;
  const errorFieldOne =
    data.isError &&
    (data.errorLocation === "both" || data.errorLocation === "firstInput")
      ? true
      : false;
  const errorFieldTwo =
    data.isError &&
    (data.errorLocation === "both" || data.errorLocation === "secondInput")
      ? true
      : false;

  return (
    <>
      <div className="locale-list slide-in">
        <div className="slide-in__description">
          <h4>Compare Locale Lists</h4>
          <p>
            This tool is useful for comparing locale lists from different
            sources, such as a list of locales supported by a product and a list
            of locales used in a project.
          </p>
          <p>
            Your lists should be in the format of a comma deliminated list of
            locales in the format of language code + underscore + country code -
            ex: en_CA, es_ES, pt_BR
          </p>
          <p>
            Enter your locale lists below.{" "}
            <button
              className="tool-tip"
              title="See examples of content that can be entered in this tool"
              onClick={() => handleToolTipClick("COMPARE_LOCALE")}
            >
              ?
            </button>
          </p>
        </div>
        <div className="input-wrap">
          <div className="input-col">
            <label htmlFor="firstInput">
              Field 1 Locales&nbsp;
              {data.firstInputArr.length > 0 && (
                <span className="locale-count">
                  ({compareLocales.firstInputArr.length})
                </span>
              )}
            </label>
            <Input
              className="myTester"
              type="textarea"
              name="firstInput"
              id="firstInput"
              dataType="locale-list"
              value={data.firstInput}
              isError={errorFieldOne}
              errorType={data.errorType}
              errorLocation={data.errorLocation}
              onChange={handleCompareLocaleChange}
              onFocus={handleOnFocusLocaleList}
              rows="4"
              cols="50"
              placeholder="ex: en_AU, en_CA, fr_CA, es_CL, de_DE"
            />
            <button
              className="locale-list__clear"
              onClick={handleClearLocaleListInput}
              data-input="firstInput"
            >
              Clear input
            </button>
            <div className="error-container">
              {errorFieldOne && `Please enter list of locales to compare`}
            </div>
          </div>

          <div className="input-col">
            <label htmlFor="secondInput">
              Field 2 Locales&nbsp;
              {data.secondInputArr?.length > 0 && (
                <span className="locale-count">
                  ({compareLocales.secondInputArr.length})
                </span>
              )}
            </label>
            <Input
              type="textarea"
              name="secondInput"
              id="secondInput"
              dataType="locale-list"
              value={data.secondInput}
              isError={errorFieldTwo}
              errorType={data.errorType}
              errorLocation={data.errorLocation}
              onChange={handleCompareLocaleChange}
              onFocus={handleOnFocusLocaleList}
              // onClick={handleReset}
              rows="4"
              cols="50"
              placeholder="ex: en_AU, en_CA, fr_CA, es_CL, de_DE"
            />
            <button
              className="locale-list__clear"
              onClick={handleClearLocaleListInput}
              data-input="secondInput"
            >
              Clear Input
            </button>
            <div className="error-container">
              {errorFieldTwo && `Please enter list of locales to compare`}
            </div>
          </div>
        </div>

        <div className="seperator-button">
          <button className="compare-button" onClick={handleGetCompareLocales}>
            Compare
          </button>
          <button className="reset-button" onClick={handleResetCompareLocales}>
            Reset Inputs
          </button>
          {data?.isComparisonGood && (
            <span className="down-arrow bounce">
              <DownArrow />
            </span>
          )}
        </div>
        {data?.isComparisonGood && (
          <div className="compare-wrap slide-in">
            <div className="compare-wrap__label">
              Locales in both strings ({data.matchingLocales.length})
            </div>
            <div>{data.matchingLocales.join(", ")}</div>
            <div className="compare-wrap__label">
              Locales in field 1 not in field 2 ({data.fieldOneNotTwo?.length})
            </div>
            <div>{data.fieldOneNotTwo.join(", ")}</div>
            <div className="compare-wrap__label">
              Locales in field 2 not in field 1 ({data.fieldTwoNotOne?.length})
            </div>
            <div>{data.fieldTwoNotOne.join(", ")}</div>
          </div>
        )}
      </div>
    </>
  );
}
