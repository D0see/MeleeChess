import React, { useState } from "react";
import styles from "./LockStageSelectionButton.module.css";

export default function LockStageSelectionButton({ className, setIsLocked }) {
  const [Toggle, setToggle] = useState(false);

  function handleClick() {
    setToggle(true);
    setIsLocked(true);
  }

  return (
    <button
      className={
        Toggle
          ? `${styles.LockStageSelectionButton} ${styles.LockedSelectionStageButton}`
          : styles.LockStageSelectionButton
      }
      onClick={handleClick}
    />
  );
}
