import { ComputerComponent } from "../components/ComputerComponent.tsx";
import ValidateData from "./DataValidationService.tsx";

function DeleteElement(DataList: ComputerComponent[], identifier: number) {
	let newData = DataList.filter((part) => {
		return part.productID === identifier ? false : true;
	});
	
	return newData;
}

export function InsertOrUpdateElement(DataList: ComputerComponent[], pc_part: ComputerComponent) {
	const dataValidation = ValidateData(pc_part);
	let newData: ComputerComponent[] = [];
	let status: string = "";

	if (dataValidation === "") {
		const index = DataList.findIndex((part) => {
			return part.productID === pc_part.productID;
		});

		if (index === -1) {
			newData = [...DataList, pc_part];
			status = "added";
		} else {
			newData = DataList.map((x) => {
				return x;
			});
			newData[index] = pc_part;
			status = "updated";
		}
	} else {
    	status = dataValidation;
  	}

	return {newData, status};
}


let sort_ascending: Boolean[] = [true, true, true, true, true, true];

export function SortDataByProperty(DataList: ComputerComponent[], propertyIndex: number) {
  let sortedData = DataList.map((x) => {
    return x;
  });

  sortedData = sortedData.sort((x, y) => {
    const x_value: any = Object.values(x)[propertyIndex];
    const y_value: any = Object.values(y)[propertyIndex];

    if (sort_ascending[propertyIndex - 1])
      return x_value < y_value ? -1 : x_value > y_value ? 1 : 0;
    else return x_value < y_value ? 1 : x_value > y_value ? -1 : 0;
  });

  let sortOrder = "";
  if (sort_ascending[propertyIndex - 1])
    sortOrder = "ascending";
  else sortOrder = "descending"

  sort_ascending = sort_ascending.map((x, index) => {
	if(index !== (propertyIndex - 1))
		return true;
	return sort_ascending[propertyIndex - 1];
  });

  sort_ascending[propertyIndex - 1] = !sort_ascending[propertyIndex - 1];
  
  return {sortedData, sortOrder};
}

export default DeleteElement;
