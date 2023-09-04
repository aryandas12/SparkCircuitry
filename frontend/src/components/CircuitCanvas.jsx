import React, { useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";

const Circle = styled.circle`
  transition: all 100ms;
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

    if(selectedComponent === 'wire')
    {
      svg
      .append("line")
      .attr("id", lineId) // Set the line's ID
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x2)
      .attr("y2", y2)
      .attr("stroke", "grey")
      .attr("stroke-width", "3")
      .on("click", () => setSelectedLine(lineId));
       // Add click event handler to remove the line
    }
    else if(selectedComponent === 'resistance')
    {
      svg.append("path")
      .attr("id", lineId)
                    
                    .attr("d", "M " + x1 +" "+y1 + "l"+ Math.sign((x2-x1)?(x2-x1):(y2-y1))*40+ " 0 l "+Math.sign((x2-x1)?(x2-x1):(y2-y1))*2.5 +"-5 l "+Math.sign((x2-x1)?(x2-x1):(y2-y1))*5+" 10 l "+Math.sign((x2-x1)?(x2-x1):(y2-y1))*5+" -10 l "+Math.sign((x2-x1)?(x2-x1):(y2-y1))*5+" 10 l "+Math.sign((x2-x1)?(x2-x1):(y2-y1))*5 +" -10 l "+Math.sign((x2-x1)?(x2-x1):(y2-y1))*5+" 10 l "+Math.sign((x2-x1)?(x2-x1):(y2-y1))*2.5+ " -5 l "+Math.sign((x2-x1)?(x2-x1):(y2-y1))*40+ " 0")
                    .attr("stroke", "black")
                    .attr("stroke-width", "3")
                    .attr("stroke-linejoin", "bevel")
                    .attr("fill", "none")
                    .attr("transform", "rotate("+(y2==y1?0:Math.sign(y2<y1?y1-y2:y2-y1))*90+" "+x1+" "+y1+")")
      
      .on("click", () => setSelectedLine(lineId));
    }
    else if(selectedComponent === 'capacitance')
    {
      svg.append("path")
      .attr("id", lineId)
                    
                    .attr("d", "M " + x1 +" "+y1 + "l"+ Math.sign((x2-x1)?(x2-x1):(y2-y1))*50+ " 0 l "+Math.sign((x2-x1)?(x2-x1):(y2-y1))*0 +"-10 l "+Math.sign((x2-x1)?(x2-x1):(y2-y1))*0+" 20 m "+Math.sign((x2-x1)?(x2-x1):(y2-y1))*10 +"-10 l 0 -10 l 0 20 l 0 -10 l"+Math.sign((x2-x1)?(x2-x1):(y2-y1))*50+ " 0")
                    .attr("stroke", "black")
                    .attr("stroke-width", "3")
                    .attr("stroke-linejoin", "bevel")
                    .attr("fill", "none")
                    .attr("transform", "rotate("+(y2==y1?0:Math.sign(y2<y1?y1-y2:y2-y1))*90+" "+x1+" "+y1+")")
      
  
    .on("click", () => setSelectedLine(lineId));
  }

  else if (selectedComponent === 'inductance') {
  svg.append("path")
    .attr("id", lineId)
    .attr("d", "M -35,0 L 5.5,0 C 5.5,0 5.5,-4 9.5,-4 C 13.5,-4 13.5,0 13.5,0 C 13.5,0 13.5,-4 17.5,-4 C 21.5,-4 21.5,0 21.5,0 C 21.5,0 21.5,-4 25.5,-4 C 29.5,-4 29.5,0 29.5,0 C 29.5,0 29.5,-4 33.5,-4 C 37.5,-4 37.5,0 37.5,0 L 75,0")
    .attr("stroke", "black")
    .attr("stroke-width", "3")
    .attr("stroke-linejoin", "bevel")
    .attr("fill", "none")
    .attr("transform", " rotate("+(x1==x2?Math.sign(y2-y1):(x2>x1?0:-2))*90+" "+x1+" "+y1+") "+`translate(${x1+35},${y1})`)
    .on("click", () => setSelectedLine(lineId));
}
else if(selectedComponent === 'DCsource')
    {
      svg.append("path")
      .attr("id", lineId)
                    
                    .attr("d", "M " + x1 +" "+y1 + "l"+ Math.sign((x2-x1)?(x2-x1):(y2-y1))*50+ " 0 l "+Math.sign((x2-x1)?(x2-x1):(y2-y1))*0 +"-10 l "+Math.sign((x2-x1)?(x2-x1):(y2-y1))*0+" 20 m "+Math.sign((x2-x1)?(x2-x1):(y2-y1))*10 +"-10 l 0 -25 l 0 50 l 0 -25 l"+Math.sign((x2-x1)?(x2-x1):(y2-y1))*50+ " 0")
                    .attr("stroke", "black")
                    .attr("stroke-width", "3")
                    .attr("stroke-linejoin", "bevel")
                    .attr("fill", "none")
                    .attr("transform", "rotate("+(y2==y1?0:Math.sign(y2<y1?y1-y2:y2-y1))*90+" "+x1+" "+y1+")")
      
  
    .on("click", () => setSelectedLine(lineId));
  }


  

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
        <button onClick={() =>setSelectedComponent('wire')}>Select Wire</button>
        <button onClick={() => setSelectedComponent('resistance')}>Select Resistor</button>
        <button onClick={() => setSelectedComponent('capacitance')}>Select Capacitor</button>
        <button onClick={() => setSelectedComponent('inductance')}>Select Inductor</button>
        <button onClick={() => setSelectedComponent('DCsource')}>Select DC Source</button>
      </div>
    </div>
  );
  

  
};



export default CircuitCanvas;
