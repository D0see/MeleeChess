import React, { useState, createContext } from "react";
import Box from "../components/Box.js";

import { stageColorEnum } from "../../utils/StageList";
import { hasCoordinatesInArray } from "../../utils/Utils.js";
import determineMatchWinner from "../../utils/DetermineMatchWinner.js";

import styles from "./PlaygroundGrid.module.css";

export const promotionLogic = createContext();

export default function PlaygroundGrid({playground, setPlayground, isWhitesTurn, setIsWhitesTurn, board, stageColorVisible}) {
  const [selectedPieceId, setSelectedPieceId] = useState(null);
  const [possibleDestinations, setPossibleDestinations] = useState(null);
  const [promotionLocation, setPromotionLocation] = useState(null);

  //Logic for clicking & moving pieces
  function handlePieceClick(i, j) {
    //Handle re-clicking on the selected piece
    if (selectedPieceId && playground[i][j]?.id === selectedPieceId) {
      setSelectedPieceId(null);
      setPossibleDestinations(null);

    //Handle clicking on a piece on your team 
    } else if (
      ((playground[i][j]?.team === "white" && isWhitesTurn) || (playground[i][j]?.team === "black" && !isWhitesTurn))
    ) {
      setSelectedPieceId(playground[i][j].id);
      setPossibleDestinations(playground[i][j].determinePossibleMoves(playground));

    //Handle clicking possible destination when a piece is clicked
    } else if (selectedPieceId && hasCoordinatesInArray(possibleDestinations, [i, j])) {
      //determine selectedPiece
      let selectedPiece;
      for (const pieceData of playground.flat()) {
        if (pieceData?.id === selectedPieceId) {
          selectedPiece = pieceData;
          break;
        }
      }
      //intializes newPlayground
      const newPlayground = playground.map((arr, rowIndex) =>
        arr.map((pieceData, columnIndex) => {
          if (pieceData?.id === selectedPieceId) {
            return null;
          }
          //handle logic when destination has enemy piece
          if ((rowIndex === i && columnIndex === j) && playground[i][j]) {
            return determineMatchWinner(selectedPiece, playground[i][j], board);
          //handle logic when destination is empty
          } else if ((rowIndex === i && columnIndex === j) && !playground[i][j]) {
            return selectedPiece;
          }
          return pieceData;
        }),
      );
      //Updates states
      setPlayground(newPlayground);
      selectedPiece.y = i;
      selectedPiece.x = j;
      setPossibleDestinations(null);

      //Checks if selected Piece is eligible for promotion;
      if ((selectedPiece.type === "pawn") && ((selectedPiece.team === "white" && selectedPiece.y === 0) || (selectedPiece.team === "black" && selectedPiece.y === 7))){
        console.log(selectedPiece.char, "available for promotion");
        setPromotionLocation({y: selectedPiece.y, x: selectedPiece.x})
        //Here the board should be disabled until player clicks his promotion choice
      } else {
        setSelectedPieceId(null);
        setIsWhitesTurn((prev) => !prev);
      }
    }
  }

  return (
    <promotionLogic.Provider value={{setSelectedPieceId, setIsWhitesTurn, setPlayground, playground, setPromotionLocation, promotionLocation}}>
    <div className= {styles.PlaygroundGrid}>
      {playground.map((arr, i) =>
        arr.map((pieceData, j) => {
          //Promotion window Logic 
          const promotionMode = promotionLocation ? true : false;
          const hasPromotionWindow = promotionLocation?.y === i && promotionLocation?.x === j;
          //isPossibleMove coloring Logic
          const isPossibleMove = hasCoordinatesInArray(possibleDestinations, [i, j]);
          //Selection coloring Logic
          const isSelected = selectedPieceId && pieceData?.id === selectedPieceId;
          //BackgroundColor Logic
          const checkerboardColor = (i + j) % 2 ? "#4e9f36" : "#f6f6f6";
          const backgroundColor = stageColorVisible ? stageColorEnum[`${board[i][j]}`] : checkerboardColor;
          return (           
              <Box
                key={`${i}-${j}`}
                backgroundColor={backgroundColor}
                pieceData={pieceData}
                onClick={() => handlePieceClick(i, j)}
                isSelected={isSelected}
                isPossibleMove={isPossibleMove}
                isSelectable={
                  (isWhitesTurn && playground[i][j]?.team === "white") ||
                  (!isWhitesTurn && playground[i][j]?.team === "black") ||
                  isPossibleMove
                }
                hasPromotionWindow={hasPromotionWindow}
                promotionMode={promotionMode}
              />
          );
        }),
      )}
    </div>
    </promotionLogic.Provider>
  );
}
