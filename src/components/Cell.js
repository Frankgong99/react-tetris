import React from "react";
import { StyledCell } from "./styles/StyledCell";
import { TETROMINOS } from "../tetrominos";

const Cell = ({ type, flash }) => {
    return (
        <StyledCell type={type} $flash={flash} color={TETROMINOS[type].color}></StyledCell>
    )
}

export default React.memo(Cell);