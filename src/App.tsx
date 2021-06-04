import styled from "styled-components";

import { color, spaceDt, spaceMb, screenMax } from "@helpers/styles";
import { toVW } from "@helpers/methods";

import { StylesGlobal } from "@components";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { useState } from "react";
import levelFactory from "@helpers/methods/levels-factory";
import Game from "@components/Game";

const AppContainer = styled.div`
  height: 100vh;
  background-color: ${color.bg.primary};
`;

const Body = styled.div`
  height: calc(100% - ${toVW(100, "desktop")});
  color: ${color.text.light};
  background-color: ${color.bg.black};
  padding: ${spaceDt(2)} ${spaceDt(3)};

  ${screenMax("lg")} {
    height: calc(100% - ${toVW(70, "mobile")});
    padding: ${spaceMb(2)} ${spaceMb(1)};
  }
`;

function App() {
  const [level, setLevel] = useState(levelFactory(4 ** 2));

  const onNewClick = () => {
    const newLevel = levelFactory(4 ** 2);
    setLevel(newLevel);
  };
  return (
    <AppContainer>
      <StylesGlobal />
      <Header />
      <Body>
        <Game
          gridSize={4}
          tileSize={90}
          numbers={level.tileSet}
          onNewClick={onNewClick}
        />
      </Body>
      <Footer />
    </AppContainer>
  );
}

export default App;
