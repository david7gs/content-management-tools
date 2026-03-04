import { useState, createContext } from "react";

export const McToolsContext = createContext({
  toolTip: "",
  isToolTip: false,
  handleToolTipClick: () => {},
  handleToolTipClose: () => {},
});

export default function McToolsContextProvider({ children }) {
  const [masterTools, setMasterTools] = useState({
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

  const ctxValue = {
    toolTip: masterTools.toolTip,
    isToolTip: masterTools.isToolTip,
    handleToolTipClick: handleToolTipClick,
    handleToolTipClose: handleToolTipClose,
  };

  return (
    <McToolsContext.Provider value={ctxValue}>
      {children}
    </McToolsContext.Provider>
  );
}
