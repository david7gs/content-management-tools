import { createContext, useState } from "react";

export const MasterContext = createContext({
  view: "",
});

export default function MasterContextProvider({ children }) {
  const [masterTools, setMasterTools] = useState({
    view: "MYVIEW",
  });

  const ctxValue = {
    view: masterTools.view,
  };

  return (
    <MasterContext.Provider value={ctxValue}>{children}</MasterContext.Provider>
  );
}
