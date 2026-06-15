import { useRef, useEffect, useContext } from "react";
import { McToolsContext } from "../store/mcTools_context.jsx";
import { OnEnterHook } from "../helpers/OnEnterHook.jsx";
import Input from "./Input";

export default function UrlGenerator() {
  const {
    urlGen,
    handleUrlGeneratorOnChange,
    handleGetUrlGenerator,
    setUrlGeneratorVisited,
    handleGetUrlGeneratorOnFocus,
    handleToolTipClick,
  } = useContext(McToolsContext);

  const data = { ...urlGen };

  const scrollTo = useRef(null);

  OnEnterHook(handleGetUrlGenerator);

  useEffect(() => {
    if (scrollTo.current) {
      scrollTo.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const localesCount = data.trimmedArrCount > 0 ? true : false;

  // TODO - refine logic
  const errorURLField =
    data.isError &&
    (data.errorLocation === "BOTH" || data.errorLocation === "URL")
      ? true
      : false;
  const errorLocaleField =
    data.isError &&
    (data.errorLocation === "BOTH" || data.errorLocation === "LOCALE")
      ? true
      : false;

  return (
    <>
      <div className="input-wrap slide-in">
        <div className="slide-in__description">
          <h3>Generate a list of URLs</h3>
          <p>
            Enter a URL and a list of locales to generate clickable links for
            testing your content.
          </p>
        </div>
        <div className="input-col">
          <label htmlFor="url">Preview URL</label>
          <Input
            type="textarea"
            name="url"
            id="url"
            value={data.url}
            rows="2"
            cols="50"
            dataType="URL"
            isError={errorURLField}
            placeholder="ex: https://myurl.com"
            onChange={handleUrlGeneratorOnChange}
            onFocus={handleGetUrlGeneratorOnFocus}
          />
          <div className="error-container">
            {errorURLField && `Please enter a valid URL`}
          </div>
        </div>
        <div className="input-col">
          <label htmlFor="locales">
            Locales&nbsp;
            {localesCount && (
              <span className="locale-count">({data.trimmedArrCount})</span>
            )}
          </label>
          <Input
            type="textarea"
            name="locales"
            id="locales"
            dataType="LOCALE"
            isError={errorLocaleField}
            value={data.input}
            placeholder="ex: en_AU, en_CA, fr_CA, es_CL, de_DE"
            onChange={handleUrlGeneratorOnChange}
            onFocus={handleGetUrlGeneratorOnFocus}
            rows="4"
            cols="50"
          />
          <div className="error-container">
            {errorLocaleField && `Please enter a valid list of locales`}
          </div>
        </div>
        <button className="select full-width" onClick={handleGetUrlGenerator}>
          Generate URL list
        </button>
      </div>
      {data.showUrlList && (
        <div className="preview-list">
          <h4>List of generated preview URLs</h4>
          <div className="list-wrap">
            <ul className="list-wrap__urlLinks" ref={scrollTo}>
              {data.urlArr.map((url, i) => {
                const c = data;
                const classes = data.isVisited.includes(i)
                  ? "url-link visited"
                  : "url-link";
                return (
                  <li
                    className="button"
                    key={i}
                    onClick={() => setUrlGeneratorVisited(i)}
                  >
                    <a
                      className={classes}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
