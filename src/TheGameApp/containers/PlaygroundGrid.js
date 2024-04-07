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

export default function PlaygroundGrid({ playground, setPlayground, isWhitesTurn, setIsWhitesTurn, board, stageColorVisible }) {
  const [selectedPieceId, setSelectedPieceId] = useState(null);
  const [possibleDestinations, setPossibleDestinations] = useState(null);

  //Logic for clicking & moving pieces 
  function handlePieceClick(i, j) {
    //Handle re-clicking on the selected piece
    if (selectedPieceId && playground[i][j]?.id === selectedPieceId) {
      setSelectedPieceId(null);
      setPossibleDestinations(null);

    //Handle clicking on a piece on your team when you have another selected
    } else if (
      selectedPieceId && ((playground[i][j]?.team === "white" && isWhitesTurn) || (playground[i][j]?.team === "black" && !isWhitesTurn))) {
      setSelectedPieceId(playground[i][j].id);
      setPossibleDestinations(playground[i][j].determinePossibleMoves(playground));

    //Handle clicking a piece when no pieces are clicked
    } else if (
      !selectedPieceId && ((playground[i][j]?.team === "white" && isWhitesTurn) || (playground[i][j]?.team === "black" && !isWhitesTurn))) {
      setSelectedPieceId(playground[i][j].id);
      setPossibleDestinations(playground[i][j].determinePossibleMoves(playground));

    //Handle clicking possible destination when a piece is clicked
    } else if (selectedPieceId && hasCoordinatesInArray(possibleDestinations, [i, j])) {
      //intializes newPlayground
      let newPlayground;
      //determine selectedPiece
      let selectedPiece;
      for (const pieceData of playground.flat()) {
        if(pieceData?.id === selectedPieceId){
          selectedPiece = pieceData;
          break;
        }
      }
      // handle logic when destination is empty
      if (!playground[i][j]) {
        newPlayground = playground.map((arr, rowIndex) =>
          arr.map((pieceData, columnIndex) => {
            if (pieceData?.id === selectedPieceId) {
              return null;
            }
            if (rowIndex === i && columnIndex === j) {
              return selectedPiece;
            }
            return pieceData;
          }),
        );
      } else {
      //handle logic when destination has enemy piece
        newPlayground = playground.map((arr, rowIndex) =>
          arr.map((pieceData, columnIndex) => {
            if (pieceData?.id === selectedPieceId) {
              return null;
            }
            if (rowIndex === i && columnIndex === j) {
              return matchWinner(selectedPiece, playground[i][j]);
            }
            return pieceData;
          })
        );
      }
      //Updates states
      setPlayground(newPlayground);
      selectedPiece.y = i;
      selectedPiece.x = j;
      setSelectedPieceId(null);
      setPossibleDestinations(null);
      setIsWhitesTurn((prev) => !prev);
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
            const isSelected = selectedPieceId && pieceData?.id === selectedPieceId;
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
                   isSelectable={(isWhitesTurn && playground[i][j]?.team === "white") || (!isWhitesTurn && playground[i][j]?.team === "black") || isPossibleMove}
              />
            );
          })
        )}
      </div>
    </>
  );
}
