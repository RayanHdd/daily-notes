import React from "react";
import { SvgXml } from "react-native-svg";

export default function Search_light() {
  const svgMarkup = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.3828 21.1755C5.54551 21.1755 0.796509 16.4265 0.796509 10.5877C0.796509 4.749 5.54551 0 11.3828 0C17.2215 0 21.9705 4.749 21.9705 10.5877C21.9705 16.4265 17.2215 21.1755 11.3828 21.1755ZM11.3828 1.16475C6.18826 1.16475 1.96126 5.39325 1.96126 10.5877C1.96126 15.7822 6.18826 20.0107 11.3828 20.0107C16.5773 20.0107 20.8058 15.7822 20.8058 10.5877C20.8058 5.39325 16.5773 1.16475 11.3828 1.16475Z" fill="#1F1D2B"/>
  <path d="M22.3807 24L17.4847 19.1025L18.4657 18.438L23.2035 23.1765L22.3807 24Z" fill="#1F1D2B"/>
  </svg>     
  `;
  const SvgImage = () => <SvgXml xml={svgMarkup} width="24px" />;

  return <SvgImage />;
}
