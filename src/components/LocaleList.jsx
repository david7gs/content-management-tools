import { useState } from "react";
import Input from "./Input";

export default function LocaleList() {
  const [data, setData] = useState({
    firstString: [],
    firstStringCount: 0,
    secondString: [],
    secondStringCount: 0,
  });
  const [hasL, setHasL] = useState([]);
  const [hasNotL, setHasNotL] = useState([]);
  const [hasS, setHasS] = useState([]);
  const [hasNotS, setHasNotS] = useState([]);
  const [isCompare, setCompare] = useState(false);

  function updateValues(value, name) {
    console.log(`in LocalGenerator with value =`, value);
    const cleanValue = value.replace(/\s+/g, "").split(",");
    // const cleanValue = value.replace(/,\s*$/, "").split(",");
    if (value != "") {
      setData((prevState) => {
        return {
          ...prevState,
          [name]: cleanValue,
          [name + `Count`]: value.split(",").length,
        };
      });
    } else {
      setData((prevState) => {
        return {
          ...prevState,
          [name]: [],
          [name + `Count`]: 0,
        };
      });
    }
  }
  function getCompare() {
    const fieldOne = [...data.firstString];
    const fieldTwo = [...data.secondString];
    const longArr = fieldOne.length > fieldTwo.length ? fieldOne : fieldTwo;
    const shortArr = fieldOne.length < fieldTwo.length ? fieldOne : fieldTwo;
    const includesL = [];
    const notIncludesL = [];
    const includesS = [];
    const notIncludesS = [];
    fieldOne.map((locale, i) => {
      if (fieldTwo.includes(locale)) {
        includesL.push(locale);
      } else {
        notIncludesL.push(locale);
      }
    });
    fieldTwo.map((locale, i) => {
      if (fieldOne.includes(locale)) {
        includesS.push(locale);
      } else {
        notIncludesS.push(locale);
      }
    });
    setHasL((prevState) => {
      return [...includesL];
    });
    setHasNotL((prevState) => {
      return [...notIncludesL];
    });
    setHasS((prevState) => {
      return [...includesS];
    });
    setHasNotS((prevState) => {
      return [...notIncludesS];
    });
    const noMatch = setCompare(!isCompare);
  }

  function handleReset(e) {
    console.log(`handleReset with e =`, e.target);
    setData((prevState) => {
      return {
        ...prevState,
        firstString: [],
        firstStringCount: 0,
        secondString: [],
        secondStringCount: 0,
      };
    });
  }
  return (
    <>
      <div className="locale-list slide-in">
        {/* <div className="seperator">
          <button>Type of Selector</button>
        </div> */}
        <div className="input-wrap">
          <div className="input-col">
            <label htmlFor="firstString">
              Field 1 Locales&nbsp;
              {data.hasOwnProperty("firstStringCount") &&
                data.firstStringCount != 0 && (
                  <span className="locale-count">
                    ({data.firstStringCount})
                  </span>
                )}
            </label>
            <Input
              type="textarea"
              name="firstString"
              id="firstString"
              updateValues={updateValues}
              rows="4"
              cols="50"
            />
          </div>

          <div className="input-col">
            <label htmlFor="secondString">
              Field 2 Locales&nbsp;
              {data.hasOwnProperty("secondStringCount") &&
                data.secondStringCount != 0 && (
                  <span className="locale-count">
                    ({data.secondStringCount})
                  </span>
                )}
            </label>
            <Input
              type="textarea"
              name="secondString"
              updateValues={updateValues}
              onClick={handleReset}
              rows="4"
              cols="50"
            />
          </div>
        </div>

        <div className="seperator-button">
          <button className="compare-button" onClick={getCompare}>
            Compare
          </button>
          {/* <button className="compare-button" onClick={handleReset}>
            Reset input fileds
          </button> */}
        </div>
        {isCompare && (
          <div className="compare-wrap slide-in">
            <div className="compare-wrap__label">
              Locales in both strings ({hasL.length})
            </div>
            <div>{hasL.join(", ")}</div>
            <div className="compare-wrap__label">
              Locales in field 1 not in field 2 ({hasNotL.length})
            </div>
            <div>{hasNotL.join(", ")}</div>
            <div className="compare-wrap__label">
              Locales in field 2 not in field 1 ({hasNotS.length})
            </div>
            <div>{hasNotS.join(", ")}</div>
          </div>
        )}
      </div>
    </>
  );
}
