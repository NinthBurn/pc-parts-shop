import axios from 'axios';
import { stringToDate } from './DateOperations.tsx';
import * as serverInterfaces from './interfaces.tsx';
import { ComputerComponent } from '../components/ComputerComponent.tsx';

function convertDataResponseToArray(response: serverInterfaces.elementFromServer[]) {
    const appData: ComputerComponent[] = response.map((entity: serverInterfaces.elementFromServer) => {
        return {
            productID: entity.productID,
            manufacturer: entity.manufacturer,
            productName: entity.productName,
            category: entity.category,
            price: entity.price,
            releaseDate: stringToDate(entity.releaseDate, "yyyy-mm-dd", "-"),
            quantity: entity.quantity,
        }
    });

    return appData;
}

export async function getBackendData(DataList: ComputerComponent[],
    changeData: React.Dispatch<React.SetStateAction<ComputerComponent[]>>,
    pageMetaData: serverInterfaces.pageMetaDataType,
    changePageMetaData: React.Dispatch<React.SetStateAction<serverInterfaces.pageMetaDataType>>) {

    let data: serverInterfaces.dataPageResponse;
    data = (await axios.get(`/api/v1/computer_components/get_page?page=0&sortDirection=${pageMetaData.sortDirection}&sortField=${pageMetaData.sortField}`)).data;

    const appData = convertDataResponseToArray(data.content);

    changeData(appData);
    console.log(data)

    const newPageMetaData = {
        pageCount: data.totalPages,
        elementPerPage: data.pageable.pageSize,
        currentPage: 0,
        loadedPages: 1,
        sortField: pageMetaData.sortField,
        sortDirection: pageMetaData.sortDirection
    }
    changePageMetaData(newPageMetaData);

    console.log("Fetched " + appData.length + " items from page " + data.pageable.pageNumber + ".")
    console.log("Total number of pages: " + newPageMetaData.pageCount);
}

export async function getNextPages(DataList: ComputerComponent[],
    pageNumber: number,
    changeData: React.Dispatch<React.SetStateAction<ComputerComponent[]>>,
    pageMetaData: serverInterfaces.pageMetaDataType,
    changePageMetaData: React.Dispatch<React.SetStateAction<serverInterfaces.pageMetaDataType>>) {

    let data: serverInterfaces.dataPageResponse;
    let appData: ComputerComponent[];
    let currentPage = pageMetaData.currentPage;
    let newData: ComputerComponent[] = []
    let pageSize = 9;
    let pageCount = 0;

    while(currentPage < pageNumber){
        currentPage++;
        data = (await axios.get("/api/v1/computer_components/get_page?page=" + currentPage + `&sortDirection=${pageMetaData.sortDirection}&sortField=${pageMetaData.sortField}`)).data;
        appData = convertDataResponseToArray(data.content);

        console.log(data);
        console.log("Fetched " + appData.length + " items from page " + data.pageable.pageNumber + ".")

        newData = newData.concat(appData);
        pageSize = data.pageable.pageSize;
        pageCount = data.totalPages;        
    }

    const newPageMetaData = {
        pageCount: pageCount,
        elementPerPage: pageSize,
        currentPage: pageNumber,
        loadedPages: currentPage + 1,
        sortField: pageMetaData.sortField,
        sortDirection: pageMetaData.sortDirection
    }
    changePageMetaData(newPageMetaData);

    newData = DataList.concat(newData);
    changeData(newData);
}

export async function modifyElementInBackend(insertedComponent: ComputerComponent,
    changeData: React.Dispatch<React.SetStateAction<ComputerComponent[]>>,
    newData: ComputerComponent[]) {

    const newDate = new Date(insertedComponent.releaseDate);
    newDate.setDate(newDate.getDate() + 1);

    await axios.post("/api/v1/computer_components/save",
        {
            productID: insertedComponent.productID,
            manufacturer: insertedComponent.manufacturer,
            productName: insertedComponent.productName,
            category: insertedComponent.category,
            price: insertedComponent.price,
            releaseDate: newDate,
            quantity: insertedComponent.quantity,
        });

    changeData(newData);
}