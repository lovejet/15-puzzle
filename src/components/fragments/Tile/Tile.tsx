import styled from "styled-components";
import classnames from "classnames";
import { TileInterface } from "@helpers/types";
import { color } from "@helpers/styles";

interface Props {
  className?: string;
  number: number;
  column: number;
  row: number;
  left: number;
  top: number;
  tileId: number;
  correct: boolean;
  width: number;
  height: number;
  onClickItem: (tile: TileInterface) => void;
  visible: boolean;
}

const Tile = ({
  className,
  number,
  column,
  row,
  left,
  top,
  tileId,
  onClickItem,
  visible,
  width,
  height,
}: Props) => {
  const classes = classnames({
    [className ?? ""]: true,
    "tile-invisible": !visible,
  });

  const onClick = () => {
    onClickItem({
      number,
      column,
      row,
      left,
      top,
      tileId,
      width,
      height,
    });
  };

  return (
    <div className={classes} onClick={onClick}>
      <span className="tile-number">{number}</span>
    </div>
  );
};

export default styled(Tile)`
  border: 1px solid ${color.bg.light};
  position: absolute;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) =>
    props.correct ? color.bg.secondary : color.text.primary};
  transition-property: top, left, background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in;

  .tile-number {
    color: ${color.bg.light};
    font-weight: 400;
    font-size: 1.8em;
    user-select: none;
  }

  &.tile-invisible {
    display: none;
  }
`;
