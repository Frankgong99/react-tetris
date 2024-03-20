import React from "react";
import { StyleStage } from "./styles/StyledStage";

import Cell from "./Cell";

const Stage = ({ stage }) => (
    <StyleStage width={stage[0].length} height={stage.length} >
    {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />) )}
    
    </StyleStage>
)

export default Stage;