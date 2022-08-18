import React from "react";
import { SvgXml } from "react-native-svg";

export default function GoBack_dark() {
  const svgMarkup = `<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="35" height="35" rx="8" fill="#272636"/>
  <path d="M20.7279 11.271C20.6422 11.1851 20.5404 11.1169 20.4283 11.0704C20.3163 11.0239 20.1961 11 20.0748 11C19.9535 11 19.8334 11.0239 19.7213 11.0704C19.6092 11.1169 19.5074 11.1851 19.4218 11.271L13.2158 17.4769C13.1474 17.5452 13.0931 17.6263 13.0561 17.7156C13.0191 17.8048 13 17.9005 13 17.9972C13 18.0938 13.0191 18.1895 13.0561 18.2788C13.0931 18.3681 13.1474 18.4492 13.2158 18.5174L19.4218 24.7234C19.7833 25.085 20.3663 25.085 20.7279 24.7234C21.0895 24.3618 21.0895 23.7788 20.7279 23.4172L15.3115 18.0009L20.7353 12.5771C21.0895 12.2155 21.0895 11.6326 20.7279 11.271V11.271Z" fill="white"/>
  </svg>  
  `;
  const SvgImage = () => <SvgXml xml={svgMarkup} width="35px" />;

  return <SvgImage />;
}