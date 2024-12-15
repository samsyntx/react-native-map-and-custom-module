import { Dimensions } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export const scaleSize = (
  baseSize: number, 
  baseScreenWidth: number = 375
) => {
  return (windowWidth / baseScreenWidth) * baseSize;
};

export const vw = (percentage: number) => {
  return (windowWidth * percentage) / 100;
};

export const vh = (percentage: number) => {
  return (windowHeight * percentage) / 100;
};