import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelper';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hook/useInterval';
import { usePlayer } from '../hook/usePlayer';
import { useStage } from '../hook/useStage';
import { useGameStatus } from '../hook/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import gameOverSound from "../sounds/GameOverSound.mp3";
import { Howl } from 'howler';

const sound = new Howl({ src: [gameOverSound] }); // Initialize sound

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [playedGameOverSound, setPlayedGameOverSound] = useState(false); // New state to track whether game over sound has been played
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  console.log('re-render');

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir / 2 , y: 0 });
      console.log(player.pos.y);
      console.log(player.pos.x);
    }
  }

  const startGame = () => {
    console.log("test")
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
    setPlayedGameOverSound(false); // Reset the state for game over sound
  }

  const drop = () => {
    // Increase level when player has clear 10 rows

    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // and increase the speed
      setDropTime( 1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 0.5, collided: false });
      console.log(player.pos.y);
      console.log(player.pos.x);
    } else {
      // Game Over
      if (player.pos.y < 1) {
        console.log("GAME OVER!!!");
        setGameOver(true);
        if (!playedGameOverSound) {
          sound.play(); // Play sound when game over if it hasn't been played before
          setPlayedGameOverSound(true); // Update state to indicate that the sound has been played
        }
        // setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  }

  const keyUp = ({keyCode}) => {
    if (!gameOver) {
      if (keyCode === 40) {
        console.log("interval on");
        setDropTime( 1000 / (level + 1) + 200);
      }
    }
  }

  const dropPlayer = () => {
    console.log("interval off");
    setDropTime(null);
    drop();
  }

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  }

  useInterval(() => {
    drop();
  }, dropTime) 

  return (
    <StyledTetrisWrapper 
    role="button" 
    tabIndex="0" 
    onKeyDown={e => move(e)} 
    onKeyUp={keyUp}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
