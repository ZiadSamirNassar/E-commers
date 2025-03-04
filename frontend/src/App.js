import Header from "./shared/header"
import Foter from "./shared/foter"
import {Outlet} from "react-router-dom"

function App() {
  return (
      <>
        <Header />

        <Outlet />

        <Foter />
      </>
  );
}

export default App;
