import React from "react";
import { stageColorEnum } from "../../utils/StageList";
import Square from "../components/Square";

import { stageEnum } from "../../utils/StageList";

import styles from "./ColorPicker.module.css";

export default function ColorPicker({ pickedColor, setPickedColor }) {
  function handleClick(event) {
    //Handles re-clicking on active color-picker
    if (pickedColor === +event.target.id) {
      setPickedColor(null);
    } else {
      const clickedKey = +event.target.id;
      setPickedColor(clickedKey);
    }
  }

  return (
    <div className={styles.SelectorContainer}>
      {Object.keys(stageColorEnum).map((key) => (
        <div className={styles.PickerContainer} key={`${key}div`}>
          <Square
            className={`${styles.Square} ${styles.Pickers} ${pickedColor === +key ? styles.Selected : ""}`}
            key={key}
            color={stageColorEnum[key]}
            id={key}
            onClick={handleClick}
          />
          <p>{stageEnum[key]}</p>
        </div>
      ))}
    </div>
  );
}
