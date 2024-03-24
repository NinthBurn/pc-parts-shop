import React from 'react'
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { BarChart } from '@mui/x-charts/BarChart';

export function StatsBarChart(chartInputData: { id: number, label: string, value: number }[], chartColors: string[], chartTitle: string) {
    const { windowWidth, windowHeight } = useWindowDimensions();

    const chartBoxHeight = windowHeight * 0.35;
    const chartBoxWidth = windowWidth * 0.45;

    const chartParams = { height: chartBoxHeight, width: chartBoxWidth };

    let dataset: {
        [key: string]: string | number
    } = {}

    const valueFormatter = (value: number | null) => `${value} products`;

    const chartSeries: {dataKey: string, label: string, valueFormatter: (value: number | null) => string}[] = []
    
    chartInputData.forEach((dataPoint) => {
        const labelKey = dataPoint.label;
        dataset[labelKey] = dataPoint.value;
    
        chartSeries.push(
            {
                dataKey: labelKey,
                label: labelKey,
                valueFormatter
            }
        )
    })

    let hideLegend: boolean = true;
    if(chartSeries.length < 10)
        hideLegend = false;

    const marginWidth = 20 * chartBoxWidth / 100;

    return (
        <div className="chartBox">
            <h4>{chartTitle}</h4>
            <BarChart {...chartParams}
                series={chartSeries}
                dataset={[dataset]}
                xAxis={[{ data: [""], scaleType: 'band' }]}
                margin={{ top: 10, bottom: 50, left: marginWidth, right: marginWidth}}
                sx={{

                    //change left yAxis label styles
                    "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                        fill: "white",
                        color: "white",
                    },
                    // change all labels fontFamily shown on both xAxis and yAxis
                    "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
                        fontFamily: "Franklin Gothic Medium",
                        color: "white",

                    },
                    // change bottom label styles
                    "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                        fill: "white",
                        color: "white",

                    },
                    // bottomAxis Line Styles
                    "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                        fill: "white",
                        borderColor: "white",

                    },
                    // leftAxis Line Styles
                    "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                        fill: "white",
                        borderColor: "white",
                    }
                }}
                slotProps={{
                    legend: {
                        hidden: hideLegend,
                        direction: "row",
                        position: { vertical: 'bottom', horizontal: "middle" },
                        labelStyle: {
                            fontSize: "1.5vmin",
                            fontFamily: "Franklin Gothic Medium",
                            fill: "white",
                            color: "white",
                        },
                }}}
                colors={chartColors}

            />
        </div>);
}

export default StatsBarChart;