import React from "react";
import { StyleStage } from "./styles/StyledStage";

import Cell from "./Cell";

const Stage = ({ stage, flashRow }) => (
    <StyleStage width={stage[0].length} height={stage.length} >
        {stage.map((row, y) => row.map((cell, x) => 
            <Cell key={x} type={cell[0]} flash={flashRow ? (y === flashRow ? 'true' : undefined) : undefined} />
        ))}
    </StyleStage>
)

export default Stage;