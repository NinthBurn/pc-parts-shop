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
import { DataContext } from "../App.tsx";

export let NotificationBoxContext: Context<{ NotificationBox: ReactElement, changeNotification: React.Dispatch<React.SetStateAction<ReactElement>> }>;

function AdminPanel() {
  const itemsPerPage = 9;
  const { DataList } = useContext(DataContext);
  const [NotificationBox, changeNotification] = useState(<></>);
  
  const [ TableData, changeTableData ] = React.useState(DataList.slice(0, itemsPerPage - 1));
  const [ page, setPage ] = useState(1);

  NotificationBoxContext = createContext<{ NotificationBox: ReactElement, changeNotification: React.Dispatch<React.SetStateAction<ReactElement>> }>({ NotificationBox: NotificationBox, changeNotification: changeNotification });

  useEffect( () => {
    const previousPage = page - 1;
    if(previousPage > 0 && page > Math.ceil(DataList.length / itemsPerPage)){
      setPage(previousPage);
      changeTableData(DataList.slice((previousPage - 1) * itemsPerPage, previousPage * itemsPerPage));

    }else changeTableData(DataList.slice((page - 1) * itemsPerPage, page * itemsPerPage));
  }, [DataList, page])

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    changeTableData(DataList.slice((value - 1) * itemsPerPage, value * itemsPerPage));
  };

  return (
    <div>
      <div className="AdminPage">
        <div className="App">
          <div className="PanelTitle">Computer Store Administrator Panel</div>
          <div className="PagePanel">
            <Table headers={ColumnHeaders} data={TableData}/>
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
          }} className="TablePageSelect" page={page} onChange={handlePageChange} siblingCount={0} count={Math.ceil(DataList.length / 9)} />
          {NotificationBox}
        </div>
      </div>
      <HomeButton />
      <StatisticsButton />
    </div>
  );
}

export default AdminPanel;