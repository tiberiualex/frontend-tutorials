import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header/Header";

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const App = () => {
  return (
    <AppContainer className="App">
      <Header />
    </AppContainer>
  );
};

export default App;
