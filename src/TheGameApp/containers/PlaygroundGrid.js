import React, { useState } from "react";
import Box from "../components/Box.js";

import { stageColorEnum } from "../../utils/StageList";
import { hasCoordinatesInArray } from "../../utils/Utils.js";

import "./PlaygroundGrid.css";

function matchWinner(attackingPiece, defendingPiece) {
  const randomNum = Math.floor(Math.random() * 2);
  const winner = randomNum < 1 ? attackingPiece : defendingPiece;
  return winner;
}

export default function PlaygroundGrid({ playground, setPlayground, isWhitesTurn, setIsWhitesTurn, board }) {
  const [stageColorVisible, setStageColorVisible] = useState(false);
  function handleChangeColorClick() {
    setStageColorVisible((prev) => !prev);
  }
  const [selectedPiece, setSelectedPiece] = useState(null);
  function anyPieceIsSelected() {
    return selectedPiece !== null;
  }
  const [possibleDestinations, setPossibleDestinations] = useState(null);

  function handlePieceClick(i, j) {
    //Handle re-clicking on the selected piece
    if (selectedPiece && playground[i][j] && playground[i][j].id === selectedPiece.id) {
      setSelectedPiece(null);
      setPossibleDestinations(null);

    //Handle clicking on a piece on your team when you have another selected
    } else if (
      playground[i][j] && anyPieceIsSelected() &&
      ((playground[i][j].team === "white" && isWhitesTurn) || (playground[i][j].team === "black" && !isWhitesTurn))
    ) {
      setSelectedPiece(playground[i][j]);
      setPossibleDestinations(playground[i][j].determinePossibleMoves(playground));

    //Handle clicking a piece when no pieces are clicked
    } else if (
      playground[i][j] && !anyPieceIsSelected() && 
      ((playground[i][j].team === "white" && isWhitesTurn) || (playground[i][j].team === "black" && !isWhitesTurn))
    ) {
      setSelectedPiece(playground[i][j]);
      setPossibleDestinations(playground[i][j].determinePossibleMoves(playground));

    //Handle clicking possible destination when a piece is clicked
    } else if (anyPieceIsSelected() && hasCoordinatesInArray(possibleDestinations, [i, j])) {
      //handle logic when destination is empty
      let newPlayground;
      if (!playground[i][j]) {
        newPlayground = playground.map((arr, rowIndex) =>
          arr.map((pieceData, columnIndex) => {
            if (pieceData && pieceData.id === selectedPiece.id) {
              return null;
            }
            if (rowIndex === i && columnIndex === j) {
              return selectedPiece;
            }
            return pieceData;
          }),
        );
      //handle logic when destination has enemy piece
      } else {
        newPlayground = playground.map((arr, rowIndex) =>
          arr.map((pieceData, columnIndex) => {
            if (JSON.stringify(pieceData) === JSON.stringify(selectedPiece)) {
              return null;
            }
            if (rowIndex === i && columnIndex === j) {
              return matchWinner(selectedPiece, playground[i][j]);
            }
            return pieceData;
          }),
        );
      }
      //Updates states
      setPlayground(newPlayground);
      selectedPiece.y = i;
      selectedPiece.x = j;
      setSelectedPiece(null);
      setIsWhitesTurn((prev) => !prev);
      setPossibleDestinations(null);
    }
  }

  return (
    <>
      <div className="PlaygroundGrid">
        {playground.map((arr, i) =>
          arr.map((pieceData, j) => {
            //isPossibleMove coloring Logic
            const isPossibleMove = hasCoordinatesInArray(possibleDestinations, [i, j]);
            //Selection coloring Logic
            const isSelected = pieceData && JSON.stringify(pieceData) === JSON.stringify(selectedPiece);
            //Background Logic
            const checkerboardColor = (i + j) % 2 ? "#4e9f36" : "#f6f6f6";
            const backgroundColor = stageColorVisible ? stageColorEnum[`${board[i][j]}`] : checkerboardColor;
            return (
              <Box key={`${i}-${j}`}
                   backgroundColor={backgroundColor}
                   pieceData={pieceData}
                   onClick={() => handlePieceClick(i, j)}
                   isSelected={isSelected}
                   isPossibleMove={isPossibleMove}
              />
            );
          })
        )}
      </div>
      <button onClick={handleChangeColorClick} />
    </>
  );
}
