import React from 'react';
import { dateToString, stringToDate } from "../services/DateOperations";

export interface ComputerComponent{
    productID: number;
    manufacturer: string;
    productName: string;
    category: string;
    price: number;
    releaseDate: Date; 
    quantity: number;
}

interface Props{
    pc_part: ComputerComponent;
}

export function ComputerComponentElement(props: Props) {
    return(
        Object.entries(props.pc_part).map((column_data, key) => {
            if(column_data[0] === "manufacturer"){
                return (
                    <td style={{width: '10%'}} key={key} className="TableCell">
                        {column_data[1].toString()}
                    </td>)
            }

            if(column_data[0] === "price"){
                return (
                    <td key={key} className="TableCell">
                        {column_data[1].toString() + '$'}
                    </td>)
            }

            else if(column_data[0] === "releaseDate"){
                return (
                    <td key={key} className="TableCell">
                        {dateToString(column_data[1])}
                    </td>)
            }

            else if(column_data[0] === "productID"){
                return null;
            }

            else return (
                <td key={key} className="TableCell">
                    {column_data[1].toString()}
                </td>)
        }));
}

export function ComputerComponentToStringArray(element: ComputerComponent){
    const result: string[] = [];
    Object.entries(element).map((column_data, key) => {
        if(column_data[0] === "releaseDate"){
            result.push(dateToString(column_data[1]));
        }else{
            result.push(column_data[1].toString());
        }
        return 1;
      });  

    return result;
}

export function ComputerComponentFromStringArray(InputData: string[]){
    const ComputerComponent:ComputerComponent = {
        productID: Number(InputData[0]),
        manufacturer: InputData[1],
        productName: InputData[2],
        category: InputData[3],
        price: Number(InputData[4]),
        releaseDate: stringToDate(InputData[5], "dd/MM/yyyy", "/"),
        quantity: Number(InputData[6])
    };

    return ComputerComponent;
}

export default ComputerComponentElement;