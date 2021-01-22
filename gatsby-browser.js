import React from "react"
import AppEnhancer from "./src/AppEnhancer"
import "./src/Styles/global.css"
export const wrapRootElement = ({ element }) => (
  <AppEnhancer>{element}</AppEnhancer>
)
