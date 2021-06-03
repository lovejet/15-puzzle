import styled from "styled-components";

import { color } from "@helpers/styles";

import { StylesGlobal } from "@components";

const AppContainer = styled.div`
  height: 100vh;
  background-color: ${color.bg.primary};
`;

function App() {
  return (
    <AppContainer>
      <StylesGlobal />
    </AppContainer>
  );
}

export default App;
