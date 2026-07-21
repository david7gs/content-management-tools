import { useState, useContext } from "react";
import { McToolsContext } from "./store/mcTools_context.jsx";
import Modal from "./components/Modal";
import Navigation from "./components/navigation/Navigation.jsx";
import Viewer from "./components/viewer/Viewer.jsx";
// import LocaleGenerator from "./components/LocaleGenerator";
// import LocaleList from "./components/LocaleList";
// import UrlGenerator from "./components/UrlGenerator";
// import CountryCode from "./components/CountryCode";
// import TokenGenerator from "./components/TokenGenerator.jsx";

export default function App() {
  const { isToolTip, toolTip, handleToolTipClose } = useContext(McToolsContext);

  const [view, setView] = useState("localeList");

  function handleSelectClick(selection) {
    setView(selection);
  }

  return (
    <>
      {isToolTip && <Modal />}
      <div className="app-wrap">
        <div className="content">
          <Navigation />
          <Viewer />
        </div>
      </div>

      {/* <div className="App">
        <div className="page-wrap">
          <h1>Content Management Resources</h1>
          <h4>
            <strong>CM Resources</strong> is a collection of tools that help
            content managers set up and manage content quickly and accurately
            across many locales and countries.
          </h4>
          <ol>
            <li>
              <strong>Compare Locale Lists</strong> - Spot the differences
              between two locale lists
            </li>
            <li>
              <strong>Locale List Generator</strong> - Find which locales apply
              to a specific section of a content matrix
            </li>
            <li>
              <strong>Get a Country Code</strong> - Look up a country code from
              a locale, or a locale from a country code
            </li>
            <li>
              <strong>URL Generator</strong> - Create a list of localized links
              using a URL and a locale list
            </li>
            <li>
              <strong>Token Generator</strong> - Generate a URL token that can
              be copied and pasted into a URL CF
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
            <button
              onClick={() => handleSelectClick("tokenGenerator")}
              className={view === "tokenGenerator" ? `active` : undefined}
            >
              Token Generator
            </button>
          </div>
          {view === "localeList" && <LocaleList />}
          {view === "localeListGenerator" && <LocaleGenerator />}
          {view === "countryCode" && <CountryCode />}
          {view === "urlGenerator" && <UrlGenerator />}
          {view === "tokenGenerator" && <TokenGenerator />}
        </div>
      </div> */}
    </>
  );
}
