import { createContext, useContext, useState } from "react";

const ViewContext = createContext();

function ViewProvider({ children }) {
  const isLocalCard = JSON.parse(localStorage.getItem("view")) || false;
  const [isCard, setIsCard] = useState(isLocalCard);

  function toggleView() {
    setIsCard((isCard) => !isCard);
    JSON.stringify(localStorage.setItem("view", !isCard));
  }

  return (
    <ViewContext.Provider value={{ isCard, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
}

function useView() {
  const context = useContext(ViewContext);
  if (context === undefined)
    throw new Error("ViewContext was used outside of the provider");
  return context;
}

export { ViewProvider, useView };
