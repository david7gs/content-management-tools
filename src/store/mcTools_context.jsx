import { useState, createContext } from "react";

export const McToolsContext = createContext({
  compareLocales: {},
  localList: {},
  countryCode: {},
  urlGen: {},
  toolTip: "",
  isToolTip: false,
  handleToolTipClick: () => {},
  handleToolTipClose: () => {},
  handleSetCompareLocales: () => {},
  handleSetLocaleList: () => {},
  handleSetCountryCode: () => {},
  handleSetUrlGen: () => {},
});

export default function McToolsContextProvider({ children }) {
  const [masterTools, setMasterTools] = useState({
    compareLocales: {
      test: "compareLocales",
      firstInputArr: undefined,
      secondInputArr: undefined,
    },
    localeList: {
      test: "localeList",
      firstInputArr: [],
      secondInputArr: [],
      noContentIndexArr: [],
      localesWithContentArr: [],
    },
    countryCode: {
      test: "countryCode",
      inputStr: "",
    },
    urlGen: {
      test: "urlGen",
      urlStr: "",
      localeArr: [],
      urlArr: [],
      isVisitedArr: [],
    },
    isToolTip: false,
    toolTip: "",
  });

  function handleToolTipClick(type) {
    setMasterTools((prevState) => {
      return {
        ...prevState,
        toolTip: type,
        isToolTip: true,
      };
    });
  }

  function handleToolTipClose(type) {
    setMasterTools((prevState) => {
      return {
        ...prevState,
        toolTip: "",
        isToolTip: false,
      };
    });
  }

  function handleSetCompareLocales(obj) {
    const data = obj ?? undefined;
    console.log(`In Context handleSetCompareLocales & data =`, data);
    setMasterTools((prevState) => {
      return {
        ...prevState,
        compareLocales: {
          firstInputArr: [...data.firstArr],
          secondInputArr: [...data.secondArr],
        },
      };
    });
  }

  function handleSetLocaleList(obj) {
    const data = obj ?? undefined;
    console.log(`In Context handleSetLocaleList & data =`, data);
    setMasterTools((prevState) => {
      return {
        ...prevState,
      };
    });
  }

  function handleSetCountryCode(obj) {
    const data = obj ?? undefined;
    console.log(`In Context handleSetCountryCode & data =`, data);
    setMasterTools((prevState) => {
      return {
        ...prevState,
      };
    });
  }

  function handleSetUrlGen(obj) {
    const data = obj ?? undefined;
    console.log(`In Context handleSetUrlGen & data =`, data);
    setMasterTools((prevState) => {
      return {
        ...prevState,
      };
    });
  }

  const ctxValue = {
    compareLocales: masterTools.compareLocales,
    localList: masterTools.localList,
    countryCode: masterTools.countryCode,
    urlGen: masterTools.urlGen,
    toolTip: masterTools.toolTip,
    isToolTip: masterTools.isToolTip,
    handleToolTipClick: handleToolTipClick,
    handleToolTipClose: handleToolTipClose,
    handleSetCompareLocales: handleSetCompareLocales,
    handleSetLocaleList: handleSetLocaleList,
    handleSetCountryCode: handleSetCountryCode,
    handleSetUrlGen: handleSetUrlGen,
  };

  return (
    <McToolsContext.Provider value={ctxValue}>
      {children}
    </McToolsContext.Provider>
  );
}
