import { useState, useEffect, useCallback } from "react";

export const useGameStatus = rowsCleared => {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);

    const linePointes = [ 40, 100, 300, 1200];

    const calcScore = useCallback(() => {
        // we have score
        if( rowsCleared > 0) {
            // This is how origial tetris score is calculated
            setScore(prev => prev + linePointes[rowsCleared - 1] * (level + 1));
            setRows(prev => rowsCleared);
        }
    }, [level, linePointes, rowsCleared]);

    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared,score])

    return [score, setScore, rows, setRows, level, setLevel];
}