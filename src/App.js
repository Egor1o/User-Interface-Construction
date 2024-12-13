import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Layout";
import DryingCabinet from "./devices/DryingCabinet";
import Tv from "./devices/Tv";
import MainTest from "./MainTest";
import Refrigerator from "./devices/Refrigerator";

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
