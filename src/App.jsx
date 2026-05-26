import { useState, useContext } from "react";
import { McToolsContext } from "./store/mcTools_context.jsx";
import LocaleGenerator from "./components/LocaleGenerator";
import LocaleList from "./components/LocaleList";
import UrlGenerator from "./components/UrlGenerator";
import CountryCode from "./components/CountryCode";
import Modal from "./components/Modal";

export default function App() {
  const { isToolTip, toolTip, handleToolTipClose } = useContext(McToolsContext);

  const [view, setView] = useState("localeList");

  function handleSelectClick(selection) {
    setView(selection);
  }

  return (
    <>
      {isToolTip && <Modal />}
      <div className="App">
        <div className="page-wrap">
          <h1>Content Management Resources</h1>
          <h4>
            CM Resources is a set of calculation tools to help content managers
            configure and manage content quickly and with precision across a
            large number of locales and countries
          </h4>
          <ol>
            <li>
              Compare Locale lists - find the differences between two locale
              lists
            </li>
            <li>
              Locale List Generator - For a given content matrix, quickly
              determine what locales are in scope for the given section
            </li>
            <li>
              Get a Country Code - enter a locale and get the corresponding
              country code and vice versa
            </li>
            <li>
              URL Generator - Generate a list of localized links from a URL and
              a list of locales
            </li>
          </ol>
          <div className="function-selector">
            <button
              onClick={() => handleSelectClick("localeList")}
              className={view === "localeList" ? `active` : undefined}
            >
              Compare Locale Lists
            </button>
            <button
              onClick={() => handleSelectClick("localeListGenerator")}
              className={view === "localeListGenerator" ? `active` : undefined}
            >
              Locale List Generator
            </button>
            <button
              onClick={() => handleSelectClick("countryCode")}
              className={view === "countryCode" ? `active` : undefined}
            >
              Get a Country Code
            </button>
            <button
              onClick={() => handleSelectClick("urlGenerator")}
              className={view === "urlGenerator" ? `active` : undefined}
            >
              Testing URL Generator
            </button>
          </div>
          {view === "localeList" && <LocaleList />}
          {view === "localeListGenerator" && <LocaleGenerator />}
          {view === "countryCode" && <CountryCode />}
          {view === "urlGenerator" && <UrlGenerator />}
        </div>
      </div>
    </>
  );
}
