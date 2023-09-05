import React, { useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { components } from "../assets/componentsLibrary";

const Circle = styled.circle`
  transition: all 100ms;
  &:hover{
    cursor: pointer;
  }
`;

const CircuitCanvas = () => {
  const [connectedDots, setConnectedDots] = useState([]);
  const [lines, setLines] = useState([]); // State variable to track lines 
  const [selectedLine, setSelectedLine] = useState() 
  const svgRef = React.createRef();
  const numRows = 5;  
  const numCols = 5;
  const dotRadius = 5;
  const gap = 100; // Gap between dots

  const [selectedComponent, setSelectedComponent] = useState('wire')
  

  const handleDotClick = (dotId) => {
    if (connectedDots.length === 0) {
      // First dot clicked, store its ID
      setConnectedDots([dotId]);
    } else if (connectedDots.length === 1 && connectedDots[0] !== dotId) {
      const [row1, col1] = connectedDots[0].split("-");
      const [row2, col2] = dotId.split("-");

      if (row1 === row2 || col1 === col2) {
        // Second dot clicked in the same row or column, connect the dots
        const lineId = connectDots(connectedDots[0], dotId); // Get the unique line ID
        setLines([...lines, lineId]); // Add line ID to state
        setConnectedDots([]);
      }
    } else if (connectedDots.length === 1 && connectedDots[0] === dotId) {
      // Clicked on the same dot, disconnect it
      setConnectedDots([]);
      // Remove the line (not shown in this example, you'll need to manage lines separately)
    }
  };

  const handleLineClick =(lineId)=>{
    setSelectedLine(lineId);
  }

  const connectDots = (dotId1, dotId2) => {
    // Use D3.js to draw a line between the two dots
    const svg = d3.select(svgRef.current);
    const dot1 = svg.select(`#dot-${dotId1}`);
    const dot2 = svg.select(`#dot-${dotId2}`);

    const x1 = +dot1.attr("cx");
    const y1 = +dot1.attr("cy");
    const x2 = +dot2.attr("cx");
    const y2 = +dot2.attr("cy");

    const lineId = `line-${dotId1}-${dotId2}`; // Generate a unique line ID

    components[selectedComponent].component(svg, lineId, handleLineClick, x1, x2, y1, y2);
   

    return lineId; // Return the line's unique ID
  };

  // Function to remove a line by its ID
  const removeLine = (lineId) => {
    const svg = d3.select(svgRef.current);
    svg.select(`#${lineId}`).remove(); // Remove the line from the SVG
    setLines(lines.filter((id) => id !== lineId)); // Remove the line's ID from state
  };
  

  // Calculate the total width and height of the grid
  const totalWidth = numCols * (2 * dotRadius + gap);
  const totalHeight = numRows * (2 * dotRadius + gap);

  return (
    <div>
      <svg ref={svgRef} width={totalWidth} height={totalHeight}>
        {/* Render dots in a grid */}
        {Array.from({ length: numRows }).map((_, row) =>
          Array.from({ length: numCols }).map((_, col) => (
            
            <Circle
              key={`dot-${row}-${col}`}
              id={`dot-${row}-${col}`}
              cx={col * (2 * dotRadius + gap) + dotRadius}
              cy={row * (2 * dotRadius + gap) + dotRadius}
              r={dotRadius}
              fill={connectedDots?.includes(`${row}-${col}`) ? "red" : "lightblue"}
              onClick={() => handleDotClick(`${row}-${col}`)}
              onMouseOver={(e)=> e.target.setAttribute("r", dotRadius + 2)}
              onMouseOut={(e)=> e.target.setAttribute("r", dotRadius)}
            />
          ))
        )}
       
      </svg>

      {/* Button to remove lines */}

      <div>
        <p>{selectedLine || 'no line selected'}</p>
      <button
        onClick={() => {
          if (lines.length > 0) {
            // Remove the last drawn line when the button is clicked
            // const lastLineId = lines[lines.length - 1];
            removeLine(selectedLine);
            setSelectedLine();
          }
        }}
      >
        Remove Line
      </button>
      </div>
      <div>
      <select
          value={selectedComponent}
          onChange={(e) => setSelectedComponent(e.target.value)}
        >

          {Object.keys(components).map(item => (
            <option value={item} key={item}>{item.toUpperCase()}</option>
          ))}
            
        
      </select>
      </div>
    </div>
  );
  

  
};



export default CircuitCanvas;
