import React from "react";
import { SvgXml } from "react-native-svg";

export default function Folder({ width = "70px" }) {
  const svgMarkup = `<svg width="80" height="64" viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M72 8H36L28 0H8C3.6 0 0 3.6 0 8V24H80V16C80 11.6 76.4 8 72 8Z" fill="#EFAC2E"/>
  <path d="M72 8H8C3.6 8 0 11.6 0 16V56C0 60.4 3.6 64 8 64H72C76.4 64 80 60.4 80 56V16C80 11.6 76.4 8 72 8Z" fill="#FFC04B"/>
  </svg>      
  `;
  const SvgImage = () => <SvgXml xml={svgMarkup} width={width} />;

  return <SvgImage />;
}
