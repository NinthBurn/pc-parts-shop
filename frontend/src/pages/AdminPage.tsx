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
import { getNextPages } from "../services/backend.tsx";

export let NotificationBoxContext: Context<{ NotificationBox: ReactElement, changeNotification: React.Dispatch<React.SetStateAction<ReactElement>> }>;

function AdminPanel() {
  const { DataList, changeData } = useContext(DataContext);
  const { pageMetaData, changePageMetaData} = useContext(PageContext);
  const [ NotificationBox, changeNotification ] = useState(<></>);

  const pageCount = pageMetaData.pageCount;
  const itemsPerPage = pageMetaData.elementPerPage;
  const currentPage = pageMetaData.currentPage;

  const [TableData, changeTableData] = React.useState(DataList.slice(0, itemsPerPage - 1));

  NotificationBoxContext = createContext({ NotificationBox: NotificationBox, changeNotification: changeNotification });

  useEffect(() => {
    const previousPage = pageMetaData.currentPage - 1;
    const currentPage = pageMetaData.currentPage;
    const pageCount = pageMetaData.pageCount;
    const itemsPerPage = pageMetaData.elementPerPage;

    const newPageMetaData = {...pageMetaData};

    if (previousPage > 0 && currentPage + 1 > pageCount) {
      newPageMetaData.currentPage = previousPage;
      changePageMetaData(newPageMetaData)

      changeTableData(DataList.slice((previousPage) * itemsPerPage, (previousPage + 1) * itemsPerPage ));

    } else
      changeTableData(DataList.slice((currentPage) * itemsPerPage, (currentPage + 1) * itemsPerPage ));

  }, [DataList, pageMetaData, changePageMetaData])

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const newPageMetaData = {...pageMetaData};
    newPageMetaData.currentPage = value - 1;
    let selectedPage = value - 1;

    if (selectedPage > pageMetaData.loadedPages - 1){
      getNextPages(DataList, selectedPage, changeData, pageMetaData, changePageMetaData);
    }else{
      changePageMetaData(newPageMetaData);
    }

  };

  return (
    <div className="AdminBody">
      <div className="AdminPage">
        <div className="App">
          <div className="PanelTitle">Computer Store Administrator Panel</div>
          <div className="PagePanel">
            <Table headers={ColumnHeaders} data={TableData} />
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
            className="TablePageSelect" page={currentPage + 1} onChange={handlePageChange} siblingCount={0} count={Math.ceil(pageCount)} />
        </div>
      </div>
      {NotificationBox}
      <HomeButton />
      <StatisticsButton />
    </div>
  );
}

export default AdminPanel;