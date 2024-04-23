import { useState, useEffect, useCallback, useMemo } from "react";

export const useGameStatus = rowsCleared => {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);
    const [highestScore, setHighestScore] = useState(0);

    useEffect(() => {
        const storedHighestScore = localStorage.getItem('tetrisHighestScore');
        if (storedHighestScore) {
            setHighestScore(parseInt(storedHighestScore));
        }
    }, []);

    const updateHighestScore = useCallback((newScore) => {
        if (newScore > highestScore) {
            localStorage.setItem('tetrisHighestScore', newScore);
            setHighestScore(newScore);
        }
    },[highestScore]);

    const linePointes = useMemo(() => [ 40, 100, 300, 1200], []);

    const calcScore = useCallback(() => {
        // we have score
        if( rowsCleared > 0) {
            const newScore = score + linePointes[(rowsCleared) / 2 - 1] * (level + 1);
            setScore(newScore);
            // This is how origial tetris score is calculated
            setRows(prev => prev + (rowsCleared) / 2);
            updateHighestScore(newScore);
        }
    }, [level, linePointes, rowsCleared, score, updateHighestScore]);

    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score])

    return [score, setScore, rows, setRows, level, setLevel, highestScore];
}