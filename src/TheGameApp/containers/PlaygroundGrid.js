import React, { useState, useEffect } from "react";
import Box from "../components/Box.js";
import { stageColorEnum } from "../../utils/StageList";
import "./PlaygroundGrid.css";

//util function
function hasCoordinatesInArray(twoDArr, coordinates) {
  for (const value of twoDArr){
    if(value[0] === coordinates[0] && value[1] === coordinates[1]){
      return true;
    }
  }
  return false;
}

export default function PlaygroundGrid({ playground, setPlayground, board }) {
  const [stageColorVisible, setStageColorVisible] = useState(false);

  const [pieceIsSelected, setPieceIsSelected] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(null);
  //only for testing purposes
  useEffect(() => {
      console.log("selectedPiece is", selectedPiece);
  }, [selectedPiece])

  const [possibleDestinations, setPossibleDestinations] = useState(null)
  //only for testing purposes
  useEffect(() => {
      console.log("possible destinations are", possibleDestinations);
  }, [possibleDestinations])

  function handleChangeColorClick() {
    setStageColorVisible((prev) => !prev);
  }

  function handlePieceClick(i, j){
    console.log("click");
    //Handle re-clicking on the selected piece
    if (playground[i][j] === selectedPiece){
      setPieceIsSelected(false);
      setSelectedPiece(null);
      setPossibleDestinations(null);
    //Handle clicking a piece when no pieces are clicked
    } else if(!pieceIsSelected) {
      setPieceIsSelected(true);
      setSelectedPiece(playground[i][j])
      setPossibleDestinations(playground[i][j].determinePossibleMoves(playground));
    //Handle clicking possible destination when a piece is clicked
    } else if (pieceIsSelected && hasCoordinatesInArray(possibleDestinations, [i, j])){
      console.log("i can go there");
      if (playground[i][j] === null) {
        console.log("box is empty");
        setPlayground((prev) => {
          let newPlayground = prev;
          newPlayground[selectedPiece.y][selectedPiece.x] = null;
          newPlayground[i][j] = selectedPiece;
          selectedPiece.y = i;
          selectedPiece.x = j;
          return newPlayground;
        })
      setPieceIsSelected(prev => !prev);
      setSelectedPiece(null)
      }
    }
      
    
  }

  return (
    <>
      <div className="PlaygroundGrid">
        {playground.map((arr, i) =>
          arr.map((pieceData, j) => {
            //SelectionColoring Logic
            const isSelected = (pieceData !== null) && (pieceData === selectedPiece);
            const selectedColor = "yellow";
            //Background Logic
            const checkerboardColor = (i + j) % 2 ? "brown" : "white";
            const backgroundColor = stageColorVisible ? stageColorEnum[`${board[i][j]}`] : checkerboardColor;
            return <Box key={`${i}${j}`} defaultBackground={ isSelected ? selectedColor : backgroundColor } pieceData={pieceData} onClick={() => handlePieceClick(i, j)} />;
          })
        )}
      </div>
      <button onClick={handleChangeColorClick} />
    </>
  );
}
