import React, { createContext, useContext, useState} from "react";
import * as d3 from 'd3'

const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [connectedDots, setConnectedDots] = useState([]);
  const [lines, setLines] = useState([]); // State variable to track lines
  const [selectedLine, setSelectedLine] = useState();
  const [selectedComponent, setSelectedComponent] = useState('wire')

  return (
    <MyContext.Provider
      value={{
        connectedDots,
        setConnectedDots,
        lines,
        setLines,
        selectedLine,
        setSelectedLine,
        selectedComponent,
        setSelectedComponent
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = ()=>{
    return useContext(MyContext);
}