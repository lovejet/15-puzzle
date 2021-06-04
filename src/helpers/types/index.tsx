import PropTypes from "prop-types";

export const TYPE_COMPONENT = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
  PropTypes.elementType,
]);

export interface TileInterface {
  [key: string]: number;
  number: number;
  column: number;
  row: number;
  left: number;
  top: number;
  tileId: number;
  width: number;
  height: number;
}
