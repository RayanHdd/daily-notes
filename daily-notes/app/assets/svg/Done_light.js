import React from "react";
import { SvgXml } from "react-native-svg";

export default function Done_light() {
  const svgMarkup = `<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="35" height="35" rx="8" fill="#F0EBF9"/>
  <path d="M15.8378 24.5C15.4141 24.5 15.0128 24.2897 14.7556 23.9272L11.2752 19.0371C11.1676 18.8861 11.089 18.714 11.044 18.5307C10.999 18.3474 10.9884 18.1564 11.0128 17.9687C11.0372 17.7811 11.0962 17.6003 11.1863 17.4369C11.2765 17.2735 11.3961 17.1305 11.5382 17.0163C11.6803 16.9015 11.8422 16.8177 12.0148 16.7697C12.1874 16.7216 12.3672 16.7103 12.544 16.7362C12.7207 16.7622 12.8909 16.825 13.0447 16.9211C13.1986 17.0171 13.3331 17.1445 13.4406 17.2959L15.7307 20.5111L21.4885 10.6792C21.6794 10.3546 21.9837 10.1237 22.3345 10.0373C22.6853 9.9509 23.054 10.016 23.3597 10.2182C23.9958 10.6388 24.1916 11.5296 23.7942 12.207L16.9911 23.8184C16.875 24.0175 16.7149 24.1835 16.5248 24.3019C16.3347 24.4203 16.1203 24.4876 15.9001 24.4979C15.8787 24.5 15.8592 24.5 15.8378 24.5V24.5Z" fill="#1F1D2B"/>
  </svg>  
  `;
  const SvgImage = () => <SvgXml xml={svgMarkup} width="35px" />;

  return <SvgImage />;
}
