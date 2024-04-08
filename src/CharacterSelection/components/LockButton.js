import React, { useContext } from "react";
import { lockButtonContext } from "../CharacterSelectApp";

export default function LockButton({ className, onClick }) {
  
  function handleOnClick() {
    onClick((prev) => !prev);
  }

  return <button disabled={useContext(lockButtonContext)} className={className} onClick={handleOnClick}></button>;
}
