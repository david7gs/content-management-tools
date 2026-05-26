import { useState, useContext } from "react";
import { McToolsContext } from "../store/mcTools_context.jsx";
import Input_test from "./Input_test";

export default function LocaleGenerator() {
  const { localeList, handleSetLocaleList, handleToolTipClick } =
    useContext(McToolsContext);
  const [data, setData] = useState({
    firstInput: "",
    firstInputArr: [],
    firstInputValue: "",
    firstInputArrCount: 0,
    secondInput: "",
    secondInputArr: [],
    secondInputArrCount: 0,
    noContentIndex: [],
    localesWithContent: [],
    isCompare: false,
    isEqual: false,
    isEmpty: true,
    isDisable: false,
  });

  console.log(`localeList = ${localeList?.test}`);

  function handleInput(e) {
    const value = e.target.value;
    const name = e.target.name;
    const newArr =
      name === "firstInput"
        ? value
            .replace(/^\n/, "")
            .replace(/\n*$/, "")
            .replace(/,\s*$/, "")
            .replace(/\t/g, ",")
            .replace(/\n+/g, ",")
            .split(",")
        : value
            .replace(/\n$/, "")
            .replace(/(\r\n|\n|\r)/g, ",")
            .split(",");
    const newValue = newArr.join(", ");

    setData((prevState) => {
      return {
        ...prevState,
        isCompare: false,
        [name]: value,
        [name + `Arr`]: [...newArr],
        [name + `Value`]: newValue,
        [name + `ArrCount`]: newArr.length,
      };
    });
  }

  function getLocaleList() {
    if (data.firstInputArrCount === 0 || data.secondInputArrCount === 0) {
      setData((prevState) => {
        return {
          ...prevState,
          isCompare: true,
          isEmpty: true,
          isEqual: true,
        };
      });
    } else if (data.firstInputArrCount === data.secondInputArrCount) {
      const indexArr = [];
      data.secondInputArr.map((ind, i) => {
        if (ind === "") {
          indexArr.push(i);
        }
      });
      const localeArray = data.firstInputArr.filter((value, index) => {
        return !indexArr.includes(index);
      });
      setData((prevState) => {
        return {
          ...prevState,
          isCompare: true,
          isEmpty: false,
          isEqual: true,
          localesWithContent: [...localeArray],
          isDisable: true,
        };
      });
    } else {
      setData((prevState) => {
        return {
          ...prevState,
          isCompare: true,
          isEmpty: true,
          isEqual: false,
        };
      });
    }
  }

  function handleReset() {
    setData((prevState) => {
      return {
        ...prevState,
        firstInput: "",
        firstInputArr: [],
        firstInputValue: "",
        firstInputArrCount: 0,
        secondInput: "",
        secondInputArr: [],
        secondInputArrCount: 0,
        noContentIndex: [],
        localesWithContent: [],
        isCompare: false,
        isEqual: false,
        isEmpty: true,
        isDisable: false,
      };
    });
  }

  function handleClick(e) {
    const target = e.target.name;
    setData((prevState) => {
      return {
        ...prevState,
        //[target + `InputValue`]: 0,
      };
    });
  }

  const results = data.isEmpty ? (
    <div className="compare-wrap slide-in error">
      Input is needed in both fields
    </div>
  ) : !data.isEmpty && !data.isEqual ? (
    <div className="compare-wrap slide-in error">
      Number of locales do not match number of indicators from matrix
    </div>
  ) : (
    // <div className="compare-wrap slide-in">here</div>
    <div className="compare-wrap slide-in">
      <h4>Locales in scope ({data.localesWithContent.length})</h4>
      {data.localesWithContent.join(", ")}
      <ul>
        Input table
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
              Number of locales&nbsp;
              {data.hasOwnProperty("firstInputArrCount") &&
                data.firstInputArrCount != 0 && (
                  <span className="locale-count">
                    ({data.firstInputArrCount})
                  </span>
                )}
            </label>
            <Input_test
              type="textarea"
              name="firstInput"
              id="firstInput"
              disable={data.isDisable && "disabled"}
              handleOnChange={handleInput}
              handleClick={handleClick}
              value={data.firstInputValue}
              placeholder="ex: en_AU, en_CA, fr_CA, es_CL, de_DE"
              rows="4"
              cols="50"
            />
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
              Number of cells&nbsp;
              {data.hasOwnProperty("secondInputArrCount") &&
                data.secondInputArrCount != 0 && (
                  <span className="locale-count">
                    ({data.secondInputArrCount})
                  </span>
                )}
              &nbsp;(should match number of locales)
            </label>
            <Input_test
              type="textarea"
              id="secondInput"
              name="secondInput"
              handleOnChange={handleInput}
              handleClick={handleClick}
              disable={data.isDisable && "disabled"}
              value={data.secondInput}
              placeholder="ex: usually cells copied from a spreadsheet with something indicating yes/no"
              rows="4"
              cols="50"
            />
            <div className="seperator-button">
              <button onClick={handleReset}>Reset input fileds</button>
            </div>
          </div>
        </div>
        <button className="compare-button" onClick={getLocaleList}>
          Generate list of locales in scope
        </button>
        {data.isCompare && data.isEmpty && !data.isEqual && (
          <div className="error">
            Number of locales does not match number of cells. Unable to generate
            locale list. This may be due to hidden new line characters copied
            from Quip of a missed match of cells copied in either input field.
            <br />
            <br />
            Click the reset button before re-entering data
          </div>
        )}
        {data.isCompare && data.isEmpty && data.isEqual && (
          <div className="error">
            Please enter required data into fields. Unable to generate locale
            list
          </div>
        )}
        {data.isCompare && !data.isEmpty && data.isEqual && (
          <div>{results}</div>
        )}
      </div>
    </>
  );
}
