import { createContext, useContext, useState } from 'react';

const ViewContext = createContext();

export function ViewProvider({ children }) {
  const isLocalCard = (localStorage.getItem('view') ?? 'false') === 'true';
  const [isCard, setIsCard] = useState(isLocalCard);

  function toggleView() {
    setIsCard((prev) => {
      const next = !prev;
      localStorage.setItem('view', String(next));
      return next;
    });
  }

  return <ViewContext.Provider value={{ isCard, toggleView }}>{children}</ViewContext.Provider>;
}

export function useView() {
  const context = useContext(ViewContext);
  if (context === undefined) throw new Error('ViewContext was used outside of the provider');
  return context;
}
