import React from "react";
import { SvgXml } from "react-native-svg";

export default function RightArrow_dark() {
  const svgMarkup = `<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 8.57143L3.57143 5L0 1.42857L0.714286 0L5.71429 5L0.714286 10L0 8.57143Z" fill="white"/>
  </svg>     
  `;
  const SvgImage = () => <SvgXml xml={svgMarkup} width="22px" />;

  return <SvgImage />;
}
