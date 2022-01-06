import React from "react";

export function countHotProperty(yValue, xValue) {
  let zValue = yValue / xValue;

  if (zValue < 1) {
    return true;
  } else {
    return false;
  }
}
