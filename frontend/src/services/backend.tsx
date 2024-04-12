import axios from 'axios';
import { stringToDate } from './DateOperations.tsx';
import * as serverInterfaces from './interfaces.tsx';
import { ComputerComponent } from '../components/ComputerComponent.tsx';
import { Client } from 'stompjs';

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

export async function getPage(pageNumber: number,
    changeData: React.Dispatch<React.SetStateAction<ComputerComponent[]>>,
    pageMetaData: serverInterfaces.pageMetaDataType,
    changePageMetaData: React.Dispatch<React.SetStateAction<serverInterfaces.pageMetaDataType>>) {

    let data: serverInterfaces.dataPageResponse;
    let newData: ComputerComponent[] = []
    let reloadPage = false;

    await axios.get("/api/v1/computer_components/get_page?page=" + pageNumber + `&sortDirection=${pageMetaData.sortDirection}&sortField=${pageMetaData.sortField}`)
        .then((res) => {
            data = res.data

            if (pageNumber < data.totalPages) {
                newData = convertDataResponseToArray(data.content)
                console.log("Fetched " + newData.length + " items from page " + data.pageable.pageNumber + ".")

                const newPageMetaData = {
                    pageCount: data.totalPages,
                    elementPerPage: data.pageable.pageSize,
                    currentPage: pageNumber,
                    loadedPages: 1,
                    sortField: pageMetaData.sortField,
                    sortDirection: pageMetaData.sortDirection
                }
                changePageMetaData(newPageMetaData);

                changeData(newData);
            }else reloadPage = true;

        })
        .catch((err) => {
            setTimeout(() => { getPage(pageNumber, changeData, pageMetaData, changePageMetaData) }, 2000)
            console.log("Could not fetch page from server")
        });

    if (reloadPage) {
        pageNumber = 0;
        await axios.get("/api/v1/computer_components/get_page?page=" + 0 + `&sortDirection=${pageMetaData.sortDirection}&sortField=${pageMetaData.sortField}`)
            .then((res2) => {
                data = res2.data
                newData = convertDataResponseToArray(data.content)
                console.log("Fetched " + newData.length + " items from page " + data.pageable.pageNumber + ".")

                const newPageMetaData = {
                    pageCount: data.totalPages,
                    elementPerPage: data.pageable.pageSize,
                    currentPage: pageNumber,
                    loadedPages: 1,
                    sortField: pageMetaData.sortField,
                    sortDirection: pageMetaData.sortDirection
                }
                changePageMetaData(newPageMetaData);

                changeData(newData);
            });
    }
}


