import { useState, useContext } from "react";
import { McToolsContext } from "../../store/mcTools_context.jsx";
import Home from "../../components/Home";
import LocaleGenerator from "../../components/LocaleGenerator";
import LocaleList from "../../components/LocaleList";
import UrlGenerator from "../../components/UrlGenerator";
import CountryCode from "../../components/CountryCode";
import TokenGenerator from "../../components/TokenGenerator.jsx";

export default function Viewer() {
  const { view } = useContext(McToolsContext);
  return (
    <main>
      {/* <div className="content-wrap"> */}
      {view === "home" && <Home />}
      {view === "localeList" && <LocaleList />}
      {view === "localeListGenerator" && <LocaleGenerator />}
      {view === "countryCode" && <CountryCode />}
      {view === "urlGenerator" && <UrlGenerator />}
      {view === "tokenGenerator" && <TokenGenerator />}
      {/* </div> */}
    </main>
  );
}
