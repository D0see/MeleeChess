import React, { useState, useEffect } from "react";
import Box from "../components/Box.js";
import { stageColorEnum } from "../../utils/StageList";
import "./PlaygroundGrid.css";

//util function
function hasCoordinatesInArray(twoDArr, coordinates) {
  if (twoDArr) {
    for (const value of twoDArr) {
      if (value[0] === coordinates[0] && value[1] === coordinates[1]) {
        return true;
      }
    }
    return false;
  }
  return false;
}
function matchWinner(attackingPiece, defendingPiece) {
  const randomNum = Math.floor(Math.random() * 2);
  const winner = randomNum < 1 ? attackingPiece : defendingPiece;
  return winner;
}

export default function PlaygroundGrid({
  playground,
  setPlayground,
  isWhitesTurn,
  setIsWhitesTurn,
  board,
  setHoveredPieceCoordinates,
}) {
  const [stageColorVisible, setStageColorVisible] = useState(false);
  function handleChangeColorClick() {
    setStageColorVisible((prev) => !prev);
  }
  const [selectedPiece, setSelectedPiece] = useState(null);
  function anyPieceIsSelected() {
    return selectedPiece !== null;
  }

  // //only for testing purposes
  // useEffect(() => {
  //   console.log("selectedPiece is", selectedPiece);
  // }, [selectedPiece]);

  const [possibleDestinations, setPossibleDestinations] = useState(null);
  // //only for testing purposes
  // useEffect(() => {
  //   console.log("possible destinations are", possibleDestinations);
  // }, [possibleDestinations]);

  function handlePieceClick(i, j) {
    console.log("click");
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
      console.log("i can go there");
      //handle logic when destination is empty
      if (playground[i][j] === null) {
        console.log("box is empty");
        console.log("SelectedPiece", selectedPiece);
        const newPlayground = playground.map((arr, rowIndex) =>
          arr.map((pieceData, columnIndex) => {
            if (pieceData && pieceData.id === selectedPiece.id) {
              return null;
            }
            if (rowIndex === i && columnIndex === j) {
              return selectedPiece;
            }
            // else if pieceData === null :
            return pieceData;
          }),
        );
        setPlayground(newPlayground);
        /*
          const newPlayground = JSON.parse(JSON.stringify(prev));
          const origin = newPlayground[selectedPiece.y][selectedPiece.x];

          newPlayground[i][j] = origin;
          newPlayground[selectedPiece.y][selectedPiece.x] = null;
          origin.y = i;
          origin.x = j;
          console.log(newPlayground);
          return newPlayground;
          */ // Fait pas gaffe à ça.

        selectedPiece.y = i;
        selectedPiece.x = j;
        setSelectedPiece(null);
        setIsWhitesTurn((prev) => !prev);
        setPossibleDestinations(null);
        //handle logic when destination has an enemy piece
      } else {
        const newPlayground = playground.map((arr, rowIndex) =>
          arr.map((pieceData, columnIndex) => {
            if (JSON.stringify(pieceData) === JSON.stringify(selectedPiece)) {
              return null;
            }
            if (rowIndex === i && columnIndex === j) {
              return matchWinner(selectedPiece, playground[i][j]);
            }
            // else if pieceData === null :
            return pieceData;
          }),
        );
        setPlayground(newPlayground);
        selectedPiece.y = i;
        selectedPiece.x = j;
        setSelectedPiece(null);
        setIsWhitesTurn((prev) => !prev);
        setPossibleDestinations(null);
      }
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
            const isSelected = pieceData !== null && JSON.stringify(pieceData) === JSON.stringify(selectedPiece);
            //Background Logic
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
              />
            );
          }),
        )}
      </div>
      <button onClick={handleChangeColorClick} />
    </>
  );
}
