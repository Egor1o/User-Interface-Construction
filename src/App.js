import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import DryingCabinet from "./DryingCabinet";
import Tv from "./devices/Tv";
import MainTest from "./MainTest";
import Refrigerator from "./devices/Refrigerator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layout />} />
        <Route path="/drying-cabinet" element={<DryingCabinet />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/refrigerator" element={<Refrigerator />} />
        <Route path="/maintest" element={<MainTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
