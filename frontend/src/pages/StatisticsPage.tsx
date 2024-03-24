import React, { useContext, useState } from 'react'
import { DataContext } from '../App'
import "../styles/StatisticsPage.css"
import { generateBrandDiversityChartData, generateCategoryChartData, generateCategoryQuantityChartData, generatePriceClassChartData } from '../services/ChartDataOperations';
import StatsPieChart from '../components/charts/StatsPieChart';
import { NavigationButton } from '../components/buttons/NavigationButton';
import StatsBarChart from '../components/charts/StatsBarChart';
import { Button } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';

function StatisticsPage(){
    const [displayBarCharts, setBarCharts] = useState(false);
    const {DataList} = useContext(DataContext);

    const chart1Data = generateCategoryChartData(DataList);
    const chart2Data = generatePriceClassChartData(DataList);
    const chart3Data = generateBrandDiversityChartData(DataList);
    const chart4Data = generateCategoryQuantityChartData(DataList);

    const chart1Colors = ["#3bcf27", "#00d160", "#00d28c", "#00d0b1", "#00cdcf", "#00c9e3", "#00c3ee", "#1abcff", "#00c3ee", "#00c9e3", "#00cdcf", "#00d0b1", "#00d28c", "#00d160"];
    const chart2Colors = ["#138dcf", "#00b4e5", "#00c7ed", "#16d1ff", "#00c7ed", "#00b4e5",];
    const chart3Colors = ["#72ad42", "#85af35", "#98b027", "#abb017", "#c0af03", "#d4ad00", "#eaaa00", "#ffa60f", "#eaaa00", "#d4ad00", "#c0af03", "#abb017", "#98b027","#85af35"];

    let charts;
    let chartButton;
    if(displayBarCharts === false){
        charts = 
        <div style={{display: "flex", flexWrap: "wrap"}}>
            {StatsPieChart(chart1Data, chart1Colors, "Category Diversity")}
            {StatsPieChart(chart2Data, chart2Colors, "Products by Price Class")}
            {StatsPieChart(chart3Data, chart3Colors, "Products by Brand")}
            {StatsPieChart(chart4Data, chart1Colors, "Products by Category")}
        </div>
        chartButton = <Button style={{position:"absolute", left:"0vw", top:"1vh"}}
        onClick={() => {const newVal = !displayBarCharts; setBarCharts(newVal)}}><BarChartIcon style={{color: "aliceblue", fontSize: "50px"}}/></Button>
}else{
        charts = 
        <div style={{display: "flex", flexWrap: "wrap"}}>
            {StatsBarChart(chart1Data, chart1Colors, "Category Diversity")}
            {StatsBarChart(chart2Data, chart2Colors, "Products by Price Class")}
            {StatsBarChart(chart3Data, chart3Colors, "Products by Brand")}
            {StatsBarChart(chart4Data, chart1Colors, "Products by Category")}
        </div>
        chartButton = <Button style={{position:"absolute", left:"0vw", top:"1vh"}}
        onClick={() => {const newVal = !displayBarCharts; setBarCharts(newVal)}}><PieChartIcon style={{color: "aliceblue", fontSize: "50px"}}/></Button>
    }

    return (<div className="statsPage">
        {charts}
        <NavigationButton link="/admin" label="Back" direction="back" style={{position: "absolute", top: "48.5vh", left: "1vw"}}/>
        {chartButton}
    </div>);
}

export default StatisticsPage;