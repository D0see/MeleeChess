import React, { useState, useEffect } from "react";
import Box from "../components/Box.js";
import { stageColorEnum } from "../../utils/StageList";
import "./PlaygroundGrid.css";

export default function PlaygroundGrid({ playground, board }) {
  const [stageColorVisible, setStageColorVisible] = useState(false);

  function handleChangeColorClick() {
    setStageColorVisible((prev) => !prev);
  }

  return (
    <>
      <div className="PlaygroundGrid">
        {playground.map((arr, i) =>
          arr.map((pieceData, j) => {
            const checkerboardColor = (i + j) % 2 ? "brown" : "white";
            const backgroundColor = stageColorVisible ? stageColorEnum[`${board[i][j]}`] : checkerboardColor;
            return <Box defaultBackground={backgroundColor} pieceData={pieceData} />;
          })
        )}
      </div>
      <button onClick={handleChangeColorClick} />
    </>
  );
}
