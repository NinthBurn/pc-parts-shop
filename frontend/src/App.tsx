import './styles/App.css';
import React, { useEffect } from 'react';
import { useState, createContext, Context } from 'react';
import { ComputerComponent } from './components/ComputerComponent.tsx';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Home from './pages/Home.tsx';
import AdminPanel from './pages/AdminPage.tsx';
import ProductPage from './pages/ProductPage.tsx';
import StatisticsPage from './pages/StatisticsPage.tsx';
import { checkForDataChange, getPage } from './services/backend.tsx';
import { pageMetaDataType } from './services/interfaces.tsx';
import NetworkStatusIndicator from './components/NetworkStatusIndicator.tsx';
import ServerStatusIndicator from './components/ServerStatusIndicator.tsx';


export let DataContext: Context<{ DataList: ComputerComponent[]; changeData: React.Dispatch<React.SetStateAction<ComputerComponent[]>> }>;
export let PageContext: Context<{ pageMetaData: pageMetaDataType; changePageMetaData: React.Dispatch<React.SetStateAction<pageMetaDataType>> }>;

function App() {
  const [DataList, changeData] = useState<ComputerComponent[]>([]);
  const [pageMetaData, changePageMetaData] = useState<pageMetaDataType>({
    pageCount: 0,
    elementPerPage: 9,
    currentPage: 0,
    loadedPages: 0,
    sortField: "productID",
    sortDirection: "ASC",
  });
  const [DataChanged, setDataChanged] = useState(false);

  DataContext = createContext({ DataList, changeData });
  PageContext = createContext({ pageMetaData, changePageMetaData });
    
  useEffect(() => {
    checkForDataChange(setDataChanged);
  }, [])

  useEffect(() => {
    getPage(pageMetaData.currentPage, changeData, pageMetaData, changePageMetaData);
    setDataChanged(false);
  }, [DataChanged])

  return (
    <Router>
      <NetworkStatusIndicator />
      <ServerStatusIndicator />
      <Routes>
        <Route path="/" element={
          <Home />
        } />

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
        
        <Route path="*" element={
          <Home />
        } />
      </Routes>
    </Router>
  );
}

export default App;
