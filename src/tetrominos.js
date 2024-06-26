export const TETROMINOS = {
    0: {shape: [[0]], color: '0,0,0'},
    I:{
        shape: [[0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0]],
        color: '204, 204, 204',
    },
    J:{
        shape: [[0, 'J', 0], [0, 'J', 0], ['J', 'J', 0]],
        color: '204, 204, 204',
    },
    L:{
        shape: [[0, 'L', 0], [0, 'L', 0], [0, 'L', 'L']],
        color: '204, 204, 204',
    },
    O:{
        shape: [['O', 'O'], ['O', 'O']],
        color: '204, 204, 204',
    },
    S:{
        shape: [[0, 'S', 'S'], ['S', 'S', 0], [0, 0, 0]],
        color: '204, 204, 204',
    },
    T:{
        shape: [[0, 0, 0], ['T', 'T', 'T'], [0, 'T', 0]],
        color: '204, 204, 204',
    },
    Z:{
        shape: [['Z', 'Z', 0], [0, 'Z', 'Z'], [0, 0, 0]],
        color: '204, 204, 204',
    },
}

export const  randomTetromino = () => {
    const tetrominos = 'IJLOSTZ';
    const randomTetromino =
    tetrominos[Math.floor(Math.random() * tetrominos.length)];

    return TETROMINOS[randomTetromino];
};
