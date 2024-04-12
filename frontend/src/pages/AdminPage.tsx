import "../styles/App.css"
import React, { useContext, useEffect } from 'react'
import InputPanel from '../components/InputPanel.tsx';
import Table from '../components/Table.tsx';
import { InputLabels, ColumnHeaders } from "../AppData.tsx";
import { ReactElement } from 'react';
import { useState, createContext, Context } from 'react';
import HomeButton from "../components/buttons/HomeButton.tsx";
import StatisticsButton from "../components/buttons/StatisticsButton.tsx";
import { Pagination } from "@mui/material";
import { DataContext, PageContext } from "../App.tsx";
import { getPage } from "../services/backend.tsx";

export let NotificationBoxContext: Context<{ NotificationBox: ReactElement, changeNotification: React.Dispatch<React.SetStateAction<ReactElement>> }>;

function AdminPanel() {
  const { DataList, changeData } = useContext(DataContext);
  const { pageMetaData, changePageMetaData} = useContext(PageContext);
  const [ NotificationBox, changeNotification ] = useState(<></>);

  const pageCount = pageMetaData.pageCount;

  NotificationBoxContext = createContext({ NotificationBox: NotificationBox, changeNotification: changeNotification });

  useEffect(() => {
    const previousPage = pageMetaData.currentPage - 1;

    if (previousPage > 0 && DataList.length === 0) {
      getPage(previousPage, changeData, pageMetaData, changePageMetaData);
      
    }

  }, [DataList.length])

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const newPageMetaData = {...pageMetaData};
    newPageMetaData.currentPage = value - 1;
    let selectedPage = value - 1;

    getPage(selectedPage, changeData, pageMetaData, changePageMetaData);
    changePageMetaData(newPageMetaData);
  };

  return (
    <div className="AdminBody">
      <div className="AdminPage">
        <div className="App">
          <div className="PanelTitle">Computer Store Administrator Panel</div>
          <div className="PagePanel">
            <Table headers={ColumnHeaders} data={DataList} />
            <InputPanel labels={InputLabels} />
          </div>
          <Pagination sx={{
            ul: {
              "& .MuiPaginationItem-root": {
                color: "rgb(240, 248, 255)",
                fontSize: "16px",
                fontWeight: "600"
              }
            }
          }}
            className="TablePageSelect" page={pageMetaData.currentPage + 1} onChange={handlePageChange} siblingCount={1} count={Math.ceil(pageCount)} />
        </div>
      </div>
      {NotificationBox}
      <HomeButton />
      <StatisticsButton />
    </div>
  );
}

export default AdminPanel;