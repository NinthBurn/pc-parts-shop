import './styles/App.css';
import React, { useEffect } from 'react';
import { useState, createContext, Context } from 'react';
import { ComputerComponent } from './components/ComputerComponent.tsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home.tsx';
import AdminPanel from './pages/AdminPage.tsx';
import ProductPage from './pages/ProductPage.tsx';
import StatisticsPage from './pages/StatisticsPage.tsx';
import axios from 'axios';
import InsertData from './AppData.tsx';
import { stringToDate } from './services/DateOperations.tsx';

export let DataContext: Context<{ DataList: ComputerComponent[]; changeData: React.Dispatch<React.SetStateAction<ComputerComponent[]>> }>;
function App() {
  const [DataList, changeData] = useState<ComputerComponent[]>([]);
  DataContext = createContext<{ DataList: ComputerComponent[]; changeData: React.Dispatch<React.SetStateAction<ComputerComponent[]>> }>({ DataList: DataList, changeData });

  const getBackendData = async () => {
    const { data } = await axios.get("/api/v1/computer_components");

    const appData: ComputerComponent[] = data.map((entity: any) => {
      return {
        productID: entity.productID,
        manufacturer: entity.manufacturer,
        productName: entity.productName,
        category: entity.category,
        price: entity.price,
        releaseDate: stringToDate(entity.releaseDate, "yyyy-mm-dd", "-"),
        quantity: entity.quantity,
      }
    });

    changeData(appData)
    console.log("Fetched " + appData.length + " items from server.")
  }

  useEffect(() => {
    getBackendData();
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin" element={
          <AdminPanel />
        } />

        <Route path="/about" element={
          <h1>some text</h1>
        } />
        {DataList.map((part, key) => {
          return <Route key={key}
            path={"/product-" + part.productID}
            element={
              <ProductPage product={part} />} />
        })}

        <Route path="/admin/statistics" element={
          <StatisticsPage />
        } />

      </Routes>
    </Router>
  );
}

export default App;
