import { useState, useEffect } from 'react';
import { createStage } from '../gameHelper';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);
  const [flashRow, setFlashRow] = useState(null);

  useEffect(() => {
    setRowsCleared(0);

     const sweepRows = newStage =>
        newStage.reduce((ack, row) => {
          if (row.findIndex(cell => cell[0] === 0) === -1) {
            setRowsCleared(prev => prev + 1);
            // setFlashRow(ack.length);
            ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
            return ack;
          }
          ack.push(row);
          return ack;
        }, [])
    
    const sweepRows1 = newStage =>
        newStage.reduce((ack, row) => {
          if (row.findIndex(cell => cell[0] === 0) === -1) {
            // setRowsCleared(prev => prev + 1);
            setFlashRow(ack.length);
            // ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
            return ack;
          }
          ack.push(row);
          return ack;
      }, [])
    

    const updateStage = (prevStage, isDelete = false) => {
      // First flush the stage
      const newStage = prevStage.map(row =>
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
      );
      

      // Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });
      // Then check if we collided
      if (player.collided) {
        resetPlayer();
        // console.log("You have clean one row!", sweepRows(newStage));
        if (!isDelete) { 
          sweepRows1(newStage)
        }
        return isDelete ? sweepRows(newStage) : newStage;
      }

      return newStage;
    };

    setStage(prev => { 
      return updateStage(prev)
    });

    if (flashRow !== null) {
      setTimeout(() => {
          setStage(prev => { 
            return sweepRows(prev)
          });
          setFlashRow(null);
        }, 1000);
      }

  }, [flashRow, player, resetPlayer]);


  return [stage, setStage, rowsCleared, flashRow];
};
