import React, { useState, useEffect, createContext } from "react";
import Box from "../components/Box.js";

import { stageColorEnum } from "../../utils/StageList";
import { hasCoordinatesInArray, returnThirdValueOrFalse } from "../../utils/Utils.js";
import determineMatchWinner from "../../utils/DetermineMatchWinner.js";

import styles from "./PlaygroundGrid.module.css";

export const promotionLogic = createContext();

export default function PlaygroundGrid({playground, setPlayground, isWhitesTurn, setIsWhitesTurn, board, stageColorVisible}) {
  const [selectedPieceId, setSelectedPieceId] = useState(null);
  const [possibleDestinations, setPossibleDestinations] = useState(null);
  const [promotionLocation, setPromotionLocation] = useState(null);
  const [checkWinner, setCheckWinner] = useState(null);

  useEffect(() => {
      if (!checkWinner) {
          return
      }
      const {i, j, callback} = checkWinner;
      callback.then((winner) => {
          let newPlayground = playground.map((arr, rowIndex) =>
              arr.map((pieceData, columnIndex) => {
                  if ((rowIndex === i && columnIndex === j) && playground[i][j]) {
                      return winner;
                  }
                  return pieceData;
              }),
          );
          setPlayground(newPlayground);

      })
  }, [checkWinner]);  

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
      //intializes newPlayGround
      let newPlayground;
      //handles if selected move castles 
      const castling = returnThirdValueOrFalse(possibleDestinations, [i, j]);
      if (castling){
        switch(castling) {
          case "shortCastle" : 
            const shortRook = playground[i][j + 1];
            //updates shortRook internal position
            shortRook.x = j - 1;
            newPlayground = playground.map((arr, rowIndex) =>
              arr.map((pieceData, columnIndex) => {
                //places rook
                if (rowIndex === i && columnIndex === j - 1){
                  return shortRook;
                //places king
                } else if ((rowIndex === i && columnIndex === j) && !playground[i][j]) {
                  return selectedPiece;
                //removes king & rook
                } else if ((rowIndex === i && columnIndex === j - 2) || (rowIndex === i && columnIndex === j + 1)) {
                  return null;
                } 
                return pieceData;
                }),
            );
            break;
          case "longCastle" :
            const longRook = playground[i][j - 2];
            //updates longRook internal position
            longRook.x = j + 1;
            newPlayground = playground.map((arr, rowIndex) =>
              arr.map((pieceData, columnIndex) => {
                //places rook
                if (rowIndex === i && columnIndex === j + 1){
                  return longRook;
                // places king
                } else if ((rowIndex === i && columnIndex === j) && !playground[i][j]) {
                  return selectedPiece;
                // removes king & rook
                } else if ((rowIndex === i && columnIndex === j + 2) || (rowIndex === i && columnIndex === j - 2)) {
                  return null;
                } 
                return pieceData;
                })
            );
            break;
        }
      } else {
      // handles if its a normal move
        newPlayground = playground.map((arr, rowIndex) =>
          arr.map((pieceData, columnIndex) => {
            //handles when its the starting square
            if (pieceData?.id === selectedPieceId) {
              return null;
            //handles when destination has enemy piece
            } else if ((rowIndex === i && columnIndex === j) && playground[i][j]) {
              setCheckWinner({callback: determineMatchWinner(selectedPiece, playground[i][j], board), i:i, j:j});
            //handles when destination is empty
            } else if ((rowIndex === i && columnIndex === j) && !playground[i][j]) {
              return selectedPiece;
            }
            return pieceData;
          }),
        );
      }    
      //Updates states
      setPlayground(newPlayground);
      selectedPiece.y = i;
      selectedPiece.x = j;
      setPossibleDestinations(null);
      //Checks if selected Piece is eligible for promotion;
      if ((selectedPiece.type === "pawn") && ((selectedPiece.team === "white" && selectedPiece.y === 0) || (selectedPiece.team === "black" && selectedPiece.y === 7))){
        setPromotionLocation({y: selectedPiece.y, x: selectedPiece.x});
      } else {
        setSelectedPieceId(null);
        setIsWhitesTurn((prev) => !prev);
      }
      //Checks for pat (next player has at least one possible move)
      const isInPat = (playground, isWhitesTurn) => {
        const whosTurnNext = isWhitesTurn ? "black" : "white";
        for(const arr of playground) {
          for (const emplacement of arr) {
            if (emplacement === null) {
              continue;
            }
            if (emplacement?.team !== whosTurnNext) {
              continue;
            } else {
              const possibleMoves = emplacement.determinePossibleMoves(playground);
              if (possibleMoves.length > 0) {
                return true;
              } else {
                continue
              }
            }
          }
        }
        return false;
      }
      isInPat(playground, isWhitesTurn);
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
