import axios from 'axios';
import { ComputerComponent } from "../components/ComputerComponent";
import { ChartDataType } from './interfaces';


async function fetchChartData(chartType: string, changeChartData: React.Dispatch<React.SetStateAction<ChartDataType[]>>){
    const data: {id: number, label: string, value: number}[] = (await (axios.get("/api/v1/computer_components/charts/" + chartType))).data;
    changeChartData(data);
}

export function generateCategoryChartData(changeChartData: React.Dispatch<React.SetStateAction<ChartDataType[]>>){        
    return fetchChartData("category_diversity", changeChartData)
}

export function generateCategoryQuantityChartData(changeChartData: React.Dispatch<React.SetStateAction<ChartDataType[]>>){
    return fetchChartData("number_by_category", changeChartData)
}

export function generateBrandDiversityChartData(changeChartData: React.Dispatch<React.SetStateAction<ChartDataType[]>>){
    return fetchChartData("products_by_brand", changeChartData)
}

export function generatePriceClassChartData(changeChartData: React.Dispatch<React.SetStateAction<ChartDataType[]>>){
    return fetchChartData("products_by_price_class", changeChartData)
}