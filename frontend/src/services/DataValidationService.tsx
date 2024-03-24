import { ComputerComponent } from '../components/ComputerComponent';

function ValidateData(entry: ComputerComponent){
    let result = "";
  
    if(entry.manufacturer.length === 0 || entry.category.length === 0 || entry.productName.length === 0)
      result += "Empty field was detected. Please insert data. ";
    if(!Number.isInteger(entry.productID) || entry.productID < 1)
      result += "ID must be a positive integer. ";
    if(!Number.isInteger(entry.quantity) || entry.quantity < 0) 
      result += "Quantity must be a positive integer. ";
    if(entry.releaseDate.toDateString() === "Invalid Date")
      result += "Invalid date. ";
    if(isNaN(entry.price) || entry.price <= 0)
      result += "Price must be a positive number. ";
    return result;
}

export default ValidateData;