import ".././styles/table_styles.css";
import { DataContext } from "../App.tsx";
import { NotificationBoxContext } from "../pages/AdminPage.tsx";
import DeleteButton from "./buttons/DeleteButton.tsx";
import EditButton from "./buttons/EditButton.tsx";
import { ViewButton } from "./buttons/ViewButton.tsx";
import { displayNotification } from "./DisplayNotification.tsx";
import ComputerComponentElement from "./ComputerComponent.tsx";
import React from "react";
import { SortDataByProperty } from "../services/DataOperations.tsx";
import { InputTextChanged } from "./InputPanel.tsx";
import { ComputerComponent } from "./ComputerComponent.tsx";
import { ComputerComponentToStringArray } from "./ComputerComponent.tsx";
import { Height } from "@mui/icons-material";

interface TableProps {
	headers: string[];
	data: ComputerComponent[];
}

function Table(props: TableProps) {
	const { DataList, changeData } = React.useContext(DataContext);
    const { changeNotification } = React.useContext(NotificationBoxContext);
	
	const onColumnHeadClick = (index: number) => {
		if (index < 1 || index > 6) return 0;

        const {sortedData, sortOrder} = SortDataByProperty(DataList, index)
        changeData(sortedData)

        let sort_notification = "Sorted elements in " + sortOrder + " order by ";
		sort_notification += props.headers[index - 1] + ".";
		displayNotification(changeNotification, sort_notification, "info");
	};

    const rowClicked = (identifier: number) => {
        const pcPart: ComputerComponent = DataList.filter((p) => {return p.productID === identifier;})[0];
        const selectedComputerComponent: string[] = ComputerComponentToStringArray(pcPart);

        displayNotification(changeNotification, "Entry with ID " + identifier + " has been selected.", "info"); 
        InputTextChanged(selectedComputerComponent, selectedComputerComponent[0], 0);
    }

	return (
		<div className="TablePanel">
			<table className="PartTable">

                <thead className="TableHeader">
                    <tr key={-1}>
                        {props.headers.map((column_name: string, key: number) => {
                            if (key < props.headers.length - 1)
                                return (
                                    <th className="TableHeaderColumn" onClick={() => {onColumnHeadClick(key + 1);}} key={key}>
                                        {column_name}
                                    </th>);
                            else return <th key={key}>{column_name}</th>;
                        })}
                    </tr>
                </thead>

				<tbody key={100}>
					{props.data.map((pc_part, key) => {
						return (
							<tr className="TableRow" onClick={() => rowClicked(pc_part.productID)} key={key}>
								<ComputerComponentElement pc_part={pc_part} />
								<td className="TableCell" style={{ minWidth: "15%" }}>
									<div
										style={{
											display: "flex",
											justifyContent: "space-evenly",
											minWidth: "230px",
										}}>

										<EditButton element_id={pc_part.productID}/>
										<DeleteButton element_id={pc_part.productID}/>
										<ViewButton link={"/product-" + pc_part.productID}/>

									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default Table;
