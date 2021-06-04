import Tile from "@components/Tile";
import { TileInterface } from "@helpers/types";
import styled from "styled-components";

interface Props {
  className?: string;
  gridSize: number;
  tileSize: number;
  tiles: TileInterface[];
  onTileClick: (tile: TileInterface) => void;
}

const Grid = ({ className, gridSize, tiles, onTileClick }: Props) => {
  return (
    <div className={className}>
      <div className="tiles">
        {tiles.map((tile, tileId) => {
          return (
            <Tile
              {...tile}
              key={`tile-${tileId}`}
              correct={tile.tileId + 1 === tile.number}
              onClickItem={onTileClick}
              visible={tile.number < gridSize ** 2}
            />
          );
        })}
      </div>
    </div>
  );
};

export default styled(Grid)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;

  & .tiles {
    width: ${(props) => props.tileSize * props.gridSize}px;
    height: ${(props) => props.tileSize * props.gridSize}px;
    position: relative;
    text-align: center;
  }
`;
