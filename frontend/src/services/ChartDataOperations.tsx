import { ComputerComponent } from "../components/ComputerComponent";

export function generateCategoryChartData(DataList: ComputerComponent[]){
    const quantityData: { [key: string]: number} = {};

    DataList.forEach((element) => {
        if(element.category in quantityData)
            quantityData[element.category] += 1;
        else quantityData[element.category] = 1;
    });

    const chartData = Object.entries(quantityData).map((value, index) => {
        return {
            id: index,
            value: value[1],
            label: value[0]
        };
    });
    
    return chartData;
}

export function generateCategoryQuantityChartData(DataList: ComputerComponent[]){
    const quantityData: { [key: string]: number} = {};

    DataList.forEach((element) => {
        if(element.category in quantityData)
            quantityData[element.category] += element.quantity;
        else quantityData[element.category] = element.quantity;
    });

    const chartData = Object.entries(quantityData).map((value, index) => {
        return {
            id: index,
            value: value[1],
            label: value[0]
        };
    });
    
    return chartData;
}

export function generateBrandDiversityChartData(DataList: ComputerComponent[]){
    const quantityData: { [key: string]: number} = {};

    DataList.forEach((element) => {
        if(element.manufacturer in quantityData)
            quantityData[element.manufacturer] += 1;
        else quantityData[element.manufacturer] = 1;
    });

    const chartData = Object.entries(quantityData).map((value, index) => {
        return {
            id: index,
            value: value[1],
            label: value[0]
        };
    });
    
    return chartData;
}

export function generatePriceClassChartData(DataList: ComputerComponent[]){
    const priceClassData: { [key: string]: number} = {
        "Low End < 250": 0,
        "Mid Range < 600": 0,
        "High End > 600": 0
    };

    DataList.forEach((element) => {
        if(element.price < 250)
            priceClassData["Low End < 250"] += 1;
        else if(element.price < 600)
            priceClassData["Mid Range < 600"] += 1;
        else priceClassData["High End > 600"] += 1;    
    });

    const chartData = Object.entries(priceClassData).map((value, index) => {
        return {
            id: index,
            value: value[1],
            label: value[0] + "$",
        };
    });
    
    return chartData;
}