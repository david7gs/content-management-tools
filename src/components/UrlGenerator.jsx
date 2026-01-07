import { useState } from "react";
import Input_test from "./input_test";
import Input from "./Input";
import { LocaleList, CountryList } from "../helpers/localeMaping.js";

export default function UrlGenerator() {
  const [data, setData] = useState({
    url: "",
    input: "",
    trimmedArr: [],
    trimmedArrCount: 0,
    localesCount: undefined,
    urlArr: [],
    showUrlList: false,
    isVisited: [],
  });

  function handleUrl(e) {
    setData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value.replace(/\s+/g, ""),
      };
    });
  }

  function handleLocaleChange(e) {
    console.log(`handleLocalList firing`);
    const value = e.target.value;
    const newArr = value
      .replace(/\n+/g, ",")
      .replace(/\t/g, ",")
      .replace(/,\s*$/, "")
      .split(",");
    const trimmedArr = newArr.map((item) => item.trim());
    setData((prevState) => {
      return {
        ...prevState,
        input: value,
        trimmedArr: [...trimmedArr],
        trimmedArrCount: trimmedArr.length,
      };
    });
  }

  function handleShowListClick() {
    const localesArr = [...data.trimmedArr];
    const urlParams = [...CountryList];
    const url = new URL(data.url);
    const protocol = url.protocol;
    const hostname = url.hostname;
    const pathname = url.pathname;
    const param = url.search;
    const testingUrls = [];
    localesArr.map((locale, i) => {
      const index = LocaleList.indexOf(locale);
      const urlParam = urlParams[index];
      const previewUrl =
        locale === "zh_CN"
          ? protocol + "//" + hostname + ".cn" + pathname + param
          : protocol + "//" + hostname + urlParam + pathname + param;
      testingUrls.push(previewUrl);
    });
    setData((prevState) => {
      setShow = prevState.showUrlList;
      return {
        ...prevState,
        urlArr: [...testingUrls],
        showUrlList: !setShow,
        isVisited: [],
      };
    });
  }

  function setVisited(i) {
    console.log(`setVisited firing with i = ${i} `);
    setData((prevState) => {
      const visitedArr = [...prevState.isVisited];
      visitedArr.push(i);
      return {
        ...prevState,
        isVisited: [...visitedArr],
      };
    });
  }

  return (
    <>
      <h3>Generate a list of URLs</h3>
      <h4>
        Enter your preview URL and a list of locales to generate a list of
        clickable URLs to test content authoring
      </h4>
      <div className="input-wrap slide-in">
        <div className="input-col">
          <label htmlFor="url">Preview URL</label>
          <Input_test
            type="textarea"
            name="url"
            id="url"
            rows="3"
            cols="50"
            handleOnChange={handleUrl}
          />
        </div>
        <div className="input-col">
          <label htmlFor="locales">
            Locales&nbsp;
            {data.localesCount != undefined && (
              <span className="locale-count">({data.locales.length})</span>
            )}
          </label>
          <Input_test
            type="textarea"
            name="locales"
            id="locales"
            handleOnChange={handleLocaleChange}
            // disable={disable}
            rows="4"
            cols="50"
          />
        </div>
        <button className={`full-width`} onClick={handleShowListClick}>
          Generate URL list
        </button>
      </div>
      {data.showUrlList && (
        <div className="preview-list">
          <h4>List of generated preview URLs</h4>
          <div className="list-wrap">
            <ul>
              {data.urlArr.map((url, i) => {
                const c = data;
                const classes = data.isVisited.includes(i)
                  ? "url-link visited"
                  : "url-link";
                return (
                  <li className="button" key={i} onClick={() => setVisited(i)}>
                    <a className={classes} href={url} target="_blank">
                      {url}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
