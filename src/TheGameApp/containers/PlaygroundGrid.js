import React, { useState, useEffect } from "react";
import Box from "../components/Box.js";
import { stageColorEnum } from "../../utils/StageList";
import "./PlaygroundGrid.css";

//util function
function hasCoordinatesInArray(twoDArr, coordinates) {
  for (const value of twoDArr) {
    if (value[0] === coordinates[0] && value[1] === coordinates[1]) {
      return true;
    }
  }
  return false;
}
function matchWinner(attackingPiece, defendingPiece) {
  const randomNum = Math.floor(Math.random*2);
  const winner = randomNum < 1 ? attackingPiece : defendingPiece;
  return winner;
}

export default function PlaygroundGrid({ playground, setPlayground, isWhitesTurn, setIsWhitesTurn, board }) {
  const [stageColorVisible, setStageColorVisible] = useState(false);

  const [pieceIsSelected, setPieceIsSelected] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(null);
  //only for testing purposes
  useEffect(() => {
    console.log("selectedPiece is", selectedPiece);
  }, [selectedPiece]);

  const [possibleDestinations, setPossibleDestinations] = useState(null);
  //only for testing purposes
  useEffect(() => {
    console.log("possible destinations are", possibleDestinations);
  }, [possibleDestinations]);

  function handleChangeColorClick() {
    setStageColorVisible((prev) => !prev);
  }

  function handlePieceClick(i, j) {
    console.log("click");
      //Handle re-clicking on the selected piece
    if (playground[i][j] === selectedPiece) {
      setPieceIsSelected(false);
      setSelectedPiece(null);
      setPossibleDestinations(null);

      //Handle clicking on a piece on your team when you have another selected
    } else if (playground[i][j] !== null && pieceIsSelected && ((playground[i][j].team === "white" && isWhitesTurn) || (playground[i][j].team === "black" && !isWhitesTurn))) {
      setSelectedPiece(playground[i][j]);
      setPossibleDestinations(playground[i][j].determinePossibleMoves(playground));

      //Handle clicking a piece when no pieces are clicked
    } else if (!pieceIsSelected && ((playground[i][j].team === "white" && isWhitesTurn) || (playground[i][j].team === "black" && !isWhitesTurn))) {
      setPieceIsSelected(true);
      setSelectedPiece(playground[i][j]);
      setPossibleDestinations(playground[i][j].determinePossibleMoves(playground));

      //Handle clicking possible destination when a piece is clicked
    } else if (pieceIsSelected && hasCoordinatesInArray(possibleDestinations, [i, j])) {
      console.log("i can go there");
      //handle logic when destination is empty
      if (playground[i][j] === null) {
        console.log("box is empty");
        setPlayground((prev) => {
          const newPlayground = prev.map((arr, rowIndex) =>
            arr.map((box, columnIndex) => {
              if (box === selectedPiece) {
                return null;
              }
              if (rowIndex === i && columnIndex === j) {
                return selectedPiece;
              }
              return box;
            }),
          );
          selectedPiece.y = i;
          selectedPiece.x = j;
          return newPlayground;
        });
        setPieceIsSelected((prev) => !prev);
        setSelectedPiece(null);
        setIsWhitesTurn((prev) => !prev);
      //handle logic when destination has an enemy piece
      } else { 
        setPlayground((prev) => {
          const newPlayground = prev.map((arr, rowIndex) =>
            arr.map((box, columnIndex) => {
              if (box === selectedPiece) {
                return null;
              }
              if (rowIndex === i && columnIndex === j) {
                return matchWinner(selectedPiece, playground[i][j]);
              }
              return box;
            }),
          );
          selectedPiece.y = i;
          selectedPiece.x = j;
          return newPlayground;
        });
        setPieceIsSelected((prev) => !prev);
        setSelectedPiece(null);
        setIsWhitesTurn((prev) => !prev);
      }
    } 
  }

  return (
    <>
      <div className="PlaygroundGrid">
        {playground.map((arr, i) =>
          arr.map((pieceData, j) => {
            //SelectionColoring Logic
            const isSelected = pieceData !== null && pieceData === selectedPiece;
            const selectedColor = "yellow";
            //Background Logic
            const checkerboardColor = (i + j) % 2 ? "brown" : "white";
            const backgroundColor = stageColorVisible ? stageColorEnum[`${board[i][j]}`] : checkerboardColor;
            return (
              <Box
                key={`${i}${j}`}
                defaultBackground={isSelected ? selectedColor : backgroundColor}
                pieceData={pieceData}
                onClick={() => handlePieceClick(i, j)}
              />
            );
          }),
        )}
      </div>
      <button onClick={handleChangeColorClick} />
    </>
  );
}
