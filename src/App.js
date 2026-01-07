import { useState } from "react";
import "./styles.css";
import LocaleGenerator from "./components/LocaleGenerator";
import LocaleList from "./components/LocaleList";
import UrlGenerator from "./components/UrlGenerator";

export default function App() {
  const [view, setView] = useState("urlGenerator");
  function handleSelectClick(selection) {
    setView(selection);
  }
  return (
    <div className="App">
      <div className="page-wrap">
        <h1>Content Management Resources</h1>
        <h2>
          Currently running 3 tools to help content managers speed up authoring,
          configuration and QA
        </h2>

        <ol>
          <li>Testing URL Generator - Generate a list of preview links</li>
          <li>
            Compare Locale list strings - compare strings of locales to
            determine similarities
          </li>
          <li>
            Locale List Generator - For a given content matrix, quickly
            determine what locales are in scope for the given locale
          </li>
        </ol>
        <div className="function-selector">
          <button
            onClick={() => handleSelectClick("urlGenerator")}
            className={view === "urlGenerator" && `active`}
          >
            Testing URL Generator
          </button>
          <button
            onClick={() => handleSelectClick("localeList")}
            className={view === "localeList" && `active`}
          >
            Compare Locale Strings
          </button>
          <button
            onClick={() => handleSelectClick("localeListGenerator")}
            className={view === "localeListGenerator" && `active`}
          >
            Locale List Generator
          </button>
        </div>
        {view === "localeList" && <LocaleList />}
        {view === "localeListGenerator" && <LocaleGenerator />}
        {view === "urlGenerator" && <UrlGenerator />}
      </div>
      {/* / page-wrap */}
    </div>
    // / app
  );
}
