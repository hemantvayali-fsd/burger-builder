import React from "react";
import classes from "./DrawerToggle.module.css";
export default (props) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
