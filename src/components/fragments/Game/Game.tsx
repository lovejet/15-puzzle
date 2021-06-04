import { useEffect, useState } from "react";
import Grid from "@components/Grid";
import NavBar from "@components/NavBar";
import { GAME_IDLE, GAME_OVER, GAME_PAUSED, GAME_STARTED } from "@constants";
import { distanceBetween, getTileCoords, invert } from "@helpers/methods";
import { TileInterface } from "@helpers/types";
import styled from "styled-components";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

interface Props {
  gridSize: number;
  tileSize: number;
  numbers: number[];
  onNewClick: () => void;
}

const Game = ({ gridSize, tileSize, numbers, onNewClick }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const actions = [<FlatButton label="Close" onClick={handleDialogClose} />];

  const generateTiles = (nos: number[]) => {
    const tiles: TileInterface[] = [];

    nos.forEach((number, index) => {
      tiles[index] = {
        ...getTileCoords(index, gridSize, tileSize),
        width: tileSize,
        height: tileSize,
        number,
      };
    });

    return tiles;
  };

  const [gameState, setGameState] = useState<Symbol>(GAME_IDLE);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [tiles, setTiles] = useState<TileInterface[]>([]);
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();

  const addTimer = () => {
    setSeconds((prevSec) => prevSec + 1);
  };

  const setTimer = () => {
    setTimerId(
      setInterval(() => {
        addTimer();
      }, 1000)
    );
  };

  useEffect(() => {
    setTiles(generateTiles(numbers));
    clearInterval((timerId ?? 0) as number);
    setGameState(GAME_IDLE);
    setSeconds(0);
    setMoves(0);
    setDialogOpen(false);
  }, [numbers]);

  const isGameOver = (tiles: TileInterface[]) => {
    const correctedTiles = tiles.filter((tile) => {
      return tile.tileId + 1 === tile.number;
    });

    if (correctedTiles.length === gridSize ** 2) {
      clearInterval((timerId ?? 0) as number);
      return true;
    } else {
      return false;
    }
  };

  const onPauseClick = () => {
    if (gameState === GAME_STARTED) {
      setGameState(GAME_PAUSED);
      clearInterval((timerId ?? 0) as number);
    } else if (gameState === GAME_PAUSED) {
      setGameState(GAME_STARTED);
      setTimer();
    }
  };

  const onResetClick = () => {
    setTiles(generateTiles(numbers));
    setMoves(0);
    clearInterval((timerId ?? 0) as number);
    setSeconds(0);
    setGameState(GAME_IDLE);
  };

  const onTileClick = (tile: TileInterface) => {
    if (gameState === GAME_OVER || gameState === GAME_PAUSED) {
      return;
    }

    // Set Timer in case of first click
    if (moves === 0) {
      setTimer();
    }

    // Find empty tile
    const emptyTileIndex = tiles.findIndex((t) => t.number === gridSize ** 2);
    const emptyTile = tiles[emptyTileIndex];

    // Find index of tile
    const tileIndex = tiles.findIndex((t) => t.number === tile.number);

    // Is this tale neighbouring the zero tile? If so, switch them.
    const d = distanceBetween(tile, emptyTile);
    if (d.neighbours) {
      let t = Array.from(tiles).map((t) => ({ ...t }));

      invert(t, emptyTileIndex, tileIndex, [
        "top",
        "left",
        "row",
        "column",
        "tileId",
      ]);

      const checkGameOver = isGameOver(t);

      setGameState(checkGameOver ? GAME_OVER : GAME_STARTED);
      setTiles(t);
      setMoves(moves + 1);
      setDialogOpen(checkGameOver);
    }
  };

  // End game by pressing CTRL + ALT + F
  const keyDownListener = (key: KeyboardEvent) => {
    if (key.ctrlKey && key.altKey && key.code === "KeyF") {
      const solvedTiles = generateTiles(numbers).map((tile, index) => {
        tile.number = index + 1;
        return Object.assign({}, tile);
      });

      clearInterval((timerId ?? 0) as number);

      setGameState(GAME_OVER);
      setTiles(solvedTiles);
      setDialogOpen(true);
    }
  };

  document.addEventListener("keydown", keyDownListener);

  return (
    <>
      <NavBar
        gameState={gameState}
        moves={moves}
        seconds={seconds}
        onNewClick={onNewClick}
        onPauseClick={onPauseClick}
        onResetClick={onResetClick}
      />
      <Grid
        gridSize={gridSize}
        tileSize={tileSize}
        tiles={tiles}
        onTileClick={onTileClick}
      />
      <Dialog
        title="Congrats!"
        actions={actions}
        modal={false}
        open={dialogOpen}
        onRequestClose={handleDialogClose}
      >
        You've solved the puzzle in {moves} moves in {seconds} seconds!
      </Dialog>
    </>
  );
};

export default styled(Game)`
  flex: 1;
`;
