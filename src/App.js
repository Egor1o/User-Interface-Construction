import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import DryingCabinet from "./DryingCabinet";
import Tv from './devices/Tv'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Layout/>}/>
          <Route path="/drying-cabinet" element={<DryingCabinet/>}/>
          <Route path="/tv" element={<Tv />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
