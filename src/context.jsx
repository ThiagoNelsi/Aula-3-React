import PropTypes from "prop-types";
import { createContext, useState } from 'react';

const Context = createContext();

function ContextProvider({ children }) {
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);

  const context = {
    filmeSelecionado,
    setFilmeSelecionado,
  }

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  )
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { ContextProvider, Context };
