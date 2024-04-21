import React, { useState } from "react";
import Square from "../components/Square.js";
import ColorPicker from "./ColorPicker.js";
import { stageColorEnum, stages } from "../../utils/StageList";

import styles from "./BoardDisplay.module.css";

export default function BoardDisplay({ selectedStage, setSelectedStage }) {
  const [mouseDown, setMouseDown] = useState(false);
  const [pickedColor, setPickedColor] = useState(null);
  const [isCustomBoard, setIsCustomBoard] = useState(false);

  //creates a custom board when a picker is selected and the grid is entered
  function handleGridMouseEnter() {
    if (pickedColor && !isCustomBoard) {
      const customBoard = { name: "custom board", layout: JSON.parse(JSON.stringify(selectedStage.layout)) };
      stages.push(customBoard);
      setSelectedStage(stages[stages.indexOf(customBoard)]);
      setIsCustomBoard(true);
    }
  }

  //Painting Logic
  const paintSquare = (y, x) => {
    if (pickedColor && selectedStage.name === "custom board") {
      const updatedLayout = [...selectedStage.layout];
      updatedLayout[y][x] = pickedColor;
      const updatedStage = { ...selectedStage, layout: updatedLayout };
      stages[stages.indexOf(selectedStage)] = updatedStage;
      setSelectedStage(updatedStage);
    }
  };

  function handleMouseDown(y, x) {
    setMouseDown(true);
    paintSquare(y, x);
  }

  function handleMouseOver(y, x) {
    if (mouseDown) {
      paintSquare(y, x);
    }
  }

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  const handleGridMouseLeave = () => {
    setMouseDown(false);
  };

  return (
    <div style={{"display": "flex"}}>
      <div className={styles.Grid} onMouseEnter={handleGridMouseEnter} onMouseLeave={handleGridMouseLeave}>
        {selectedStage.layout.map((arr, y) =>
          arr.map((num, x) => (
            <Square
              className={styles.Square}
              key={`${y}-${x}`}
              color={stageColorEnum[num]}
              onMouseOver={() => handleMouseOver(y, x)}
              onMouseDown={() => handleMouseDown(y, x)}
              onMouseUp={handleMouseUp}
            />
          )),
        )}
      </div>
      <ColorPicker pickedColor={pickedColor} setPickedColor={setPickedColor} />
    </div>
  );
}
