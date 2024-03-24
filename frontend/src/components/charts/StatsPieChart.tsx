import React from 'react'
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

function StatsPieChart(chartData: { id: number, label: string, value: number }[], chartColors: string[], chartTitle: string) {
    const { windowWidth, windowHeight } = useWindowDimensions();

    const chartBoxHeight = windowHeight * 0.35;
    const chartBoxWidth = windowWidth * 0.45;

    const pieParams = { height: chartBoxHeight, width: chartBoxWidth, margin: { top: 0, bottom: 80, left: 50, right: 50 } };

    return (
        <div className="chartBox">
            <h4>{chartTitle}</h4>
            <PieChart {...pieParams}
                series={[{
                    arcLabel: (item) => `${item.value}`,
                    arcLabelMinAngle: 15,
                    data: chartData
                }]}
                slotProps={{
                    legend: {
                        direction: "row",
                        position: { vertical: 'bottom', horizontal: "middle" },
                        labelStyle: {
                            fontFamily: "Franklin Gothic Medium",
                            fill: "white",
                            color: "white",
                        },
                    }
                }}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white',
                        fontSize: chartBoxHeight / 18,
                        fontWeight: 'bold',
                    },
                }}
                colors={chartColors}
            />
        </div>);
}

export default StatsPieChart;