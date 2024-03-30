export interface elementFromServer{
    realid: string,
    productID: number,
    manufacturer: string,
    category: string,
    productName: string,
    price: number,
    releaseDate: string,
    quantity: number
}

export interface pageMetaDataType{
    pageCount: number;
    elementPerPage: number;
    currentPage: number;
    loadedPages: number;
    sortField: "productID" | "category" | "price" | "manufacturer" | "releaseDate" | "productName" | "quantity";
    sortDirection: "ASC" | "DESC";
}

export interface ChartDataType{
    id: number, label: string, value: number
}

export interface dataPageResponse{
    content: elementFromServer[],
    pageable: {
        pageNumber: number,
        pageSize: number,
        sort: {
            empty: boolean,
            sorted: boolean,
            unsorted: boolean
        },
        offset: number,
        paged: boolean,
        unpaged: boolean
    },
    last: boolean,
    totalElements: number,
    totalPages: number,
    size: number,
    number: number,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    numberOfElements: number,
    fisrt: boolean,
    empty: boolean
  }
  