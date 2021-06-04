import { memo } from "react";
import RaisedButton from "material-ui/RaisedButton";
import New from "material-ui/svg-icons/action/power-settings-new";
import Replay from "material-ui/svg-icons/av/replay";
import Pause from "material-ui/svg-icons/av/pause";
import Play from "material-ui/svg-icons/av/play-arrow";
import Chip from "material-ui/Chip";
import Avatar from "material-ui/Avatar";
import Alarm from "material-ui/svg-icons/action/alarm";
import Moves from "material-ui/svg-icons/action/compare-arrows";
import MediaQuery from "react-responsive";

import { color } from "@helpers/styles";
import { GAME_STARTED, GAME_PAUSED } from "@constants";

import { NavBarContainer } from "./NavBar.styled";

interface Props {
  gameState: Symbol;
  seconds: number;
  moves: number;
  onNewClick: () => void;
  onPauseClick: () => void;
  onResetClick: () => void;
}

const NavBar = ({
  gameState,
  seconds,
  moves,
  onNewClick,
  onPauseClick,
  onResetClick,
}: Props) => {
  return (
    <NavBarContainer>
      <RaisedButton
        backgroundColor={color.bg.secondary}
        labelColor={color.text.light}
        label="New game"
        onClick={onNewClick}
        icon={<New />}
      />
      <RaisedButton
        backgroundColor={color.bg.secondary}
        labelColor={color.text.light}
        label={gameState === GAME_PAUSED ? "Continue" : "Pause"}
        onClick={onPauseClick}
        icon={gameState === GAME_PAUSED ? <Play /> : <Pause />}
        disabled={gameState !== GAME_STARTED && gameState !== GAME_PAUSED}
      />
      <RaisedButton
        backgroundColor={color.bg.secondary}
        labelColor={color.text.light}
        label="Reset game"
        onClick={onResetClick}
        icon={<Replay />}
      />
      <Chip backgroundColor={color.bg.secondary} labelColor={color.text.light}>
        <Avatar backgroundColor={color.bg.secondary} icon={<Alarm />} />
        <MediaQuery query="(min-width: 772px)" component="span">
          Time Elapsed:{" "}
        </MediaQuery>
        {seconds}s
      </Chip>
      <Chip backgroundColor={color.bg.secondary} labelColor={color.text.light}>
        <Avatar backgroundColor={color.bg.secondary} icon={<Moves />} />
        <MediaQuery query="(min-width: 772px)" component="span">
          Moves Counter:{" "}
        </MediaQuery>
        {moves}
      </Chip>
    </NavBarContainer>
  );
};

export default memo(NavBar);
