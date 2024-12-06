import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import DryingCabinet from "./DryingCabinet";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Layout/>}/>
          <Route path="/drying-cabinet" element={<DryingCabinet/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
