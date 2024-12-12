import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Layout";
import DryingCabinet from "./DryingCabinet";
import Tv from "./devices/Tv";
import MainTest from "./MainTest";
import Refrigerator from "./devices/Refrigerator";
import Sauna from "./devices/Sauna";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/maintest" />} />
        <Route
          path="/drying-cabinet"
          element={
            <Layout>
              <DryingCabinet />
            </Layout>
          }
        />
        <Route
          path="/tv"
          element={
            <Layout>
              <Tv />
            </Layout>
          }
        />
        <Route
          path="/refrigerator"
          element={
            <Layout>
              <Refrigerator />
            </Layout>
          }
        />
        <Route
          path="/sauna"
          element={
            <Layout>
              <Sauna />
            </Layout>
          }
        />
        <Route
          path="/maintest"
          element={
            <Layout>
              <MainTest />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
