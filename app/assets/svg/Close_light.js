import React from "react";
import { SvgXml } from "react-native-svg";

export default function Close_light() {
  const svgMarkup = `<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="35" height="35" rx="8" fill="#F0EBF9"/>
  <path d="M12 12L23 23M23 12L12 23L23 12Z" stroke="#1F1D2B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>      
  `;
  const SvgImage = () => <SvgXml xml={svgMarkup} width="35px" />;

  return <SvgImage />;
}
