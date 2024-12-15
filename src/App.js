import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Layout";
import DryingCabinet from "./devices/DryingCabinet";
import Tv from "./devices/Tv";
import Dashboard from "./Dashboard";
import Refrigerator from "./devices/Refrigerator";
import Sauna from "./devices/Sauna";
import Dishwasher from "./devices/Dishwasher";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dishwasher"
          element={
            <Layout>
              <Dishwasher />
            </Layout>
          }
        />
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
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
