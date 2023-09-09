import React, { createContext, useContext, useEffect, useState} from "react";
import * as d3 from 'd3'

const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [connectedDots, setConnectedDots] = useState([]);
  const [lines, setLines] = useState([]); // State variable to track lines
  const [selectedLine, setSelectedLine] = useState();
  const [selectedComponent, setSelectedComponent] = useState('wire')

  const [selectedNodes, setSelectedNodes] = useState([]); // to select nodes that are part of the schematics

  const [updatedNodes, setUpdatedNodes] = useState({})
 

  const [runSim, setRunSim] = useState(false);

  useEffect(()=>{

    const unique = [...new Set(selectedNodes)]
    const map = {}
    if(runSim)
    {
      unique.forEach((value, index)=>{
        map[value] = index
      })

      setUpdatedNodes(map);
      console.log(updatedNodes);
    }

  }, [runSim])


  const [circuit, setCircuit] = useState([
    {
      id: 0,
      component: '',
      label: '',
      value: '',
      st_node: '',
      end_node: ''
    }
  ])

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
        setSelectedComponent,
        circuit,
        setCircuit,
        selectedNodes, 
        setSelectedNodes,
        runSim, 
        setRunSim,
        updatedNodes, 
        setUpdatedNodes
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = ()=>{
    return useContext(MyContext);
}