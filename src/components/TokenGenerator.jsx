import { useContext, useState, useEffect, use } from "react";
import { McToolsContext } from "../store/mcTools_context.jsx";
import { OnEnterHook } from "../helpers/OnEnterHook.jsx";
import { GEO_API } from "../.env/.env_api.js";
import { API_SWAP } from "../.env/.env_geo_api.js";
//import { geoIApps } from "../helpers/geoIApps";
import Input from "./Input";

export default function TokenGenerator() {
  const { tokenGen, handleSelectTokenQueryType } = useContext(McToolsContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GEO_API);
        // Handle HTTP errors (404, 500...)
        if (!response.ok) {
          throw new Error("Server responded with an error");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        // Handle network errors OR thrown HTTP errors
        console.error("Fetch failed, using default:", error.message);
        setData(API_SWAP); // Set your fallback here
      }
      // finally {
      //   setIsLoading(false);
      // }
    };

    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  const targetCode = "fr_CA";
  const result = Object.values(data).find((item) => item.id === targetCode);
  console.log(`fetch data`, data);
  console.log(`target locale object`, result.urlPaths);

  return (
    <div className="locale-list slide-in">
      <div className="description">
        <h4>Token Generator</h4>
        <h1>WIP</h1>
      </div>
      <div className="input-wrap">
        <div className="dialog-col">
          <p>How would you like to start</p>
          <button
            className=""
            name="locale"
            onClick={handleSelectTokenQueryType}
          >
            I would like to enter a locale
          </button>
          <button className="" name="url" onClick={handleSelectTokenQueryType}>
            I woukd like to enter a url
          </button>
        </div>
        {data.type === "locale" && (
          <div className="input-col slide-in">
            <label htmlFor="countryLocale">
              Enter a Country Code or Locale
            </label>
            <Input
              type="input"
              name="countryLocale"
              id="countryLocale"
              className={`input-sm`}
              dataType="countryLocale"
              placeholder={`ex: de_DE or DE`}
            />
            <div className="error-container">
              {/* {TokenURLError
              ? data.errorType === "noValidLocales"
                ? `Valid locales are required to retrieve data. Please enter valid locales. ex: en_CA, es_MX`
                : `Unable to generate locale list, Please enter required data.`
              : null} */}
            </div>
          </div>
        )}
        {data.type === "url" && (
          <div className="input-col slide-in">
            <label htmlFor="countryLocale">Enter a URL</label>
            <Input
              type="input"
              name="countryLocale"
              id="countryLocale"
              className={`input-md`}
              dataType="countryLocale"
              placeholder={`ex: de_DE or DE`}
            />
            <div className="error-container">
              {/* {TokenURLError
              ? data.errorType === "noValidLocales"
                ? `Valid locales are required to retrieve data. Please enter valid locales. ex: en_CA, es_MX`
                : `Unable to generate locale list, Please enter required data.`
              : null} */}
            </div>
          </div>
        )}
      </div>
      <div className="compare-wrap g1 slide-in">
        <div>https://www.apple.com/us-edu/shop/goto/buy_watch</div>
        <div>Available Tokens:</div>
        <div>marcom:&nbsp;{result.urlPaths.marcom}</div>
        <div>goto:&nbsp;{result.urlPaths.goto}</div>
        <div>store:&nbsp;{result.urlPaths.store}</div>
      </div>
    </div>
  );
}
