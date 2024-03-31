import React from "react";
import '../styles/ProductPage.css';
import { useNavigate } from "react-router-dom";
import '../styles/button_styles.css';
import { Button } from "@mui/material";
import { ComputerComponent } from "../components/ComputerComponent";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ButtonTheme from "../styles/InputElementsThemes";
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { dateToString } from "../services/DateOperations";

function ProductPage(props: {product: ComputerComponent}){
    const navigate = useNavigate(); 
    const product = props.product;
    return (
        <div className="ProductPageBody">
            <div className="ProductPanel">
                <h2>{product.productName}</h2>
                <div className="ProductInfoPanel">
                    <div style={{textAlign: "center"}}>
                        <h4>ID: {product.productID}</h4>
                        <h4>Manufacturer: {product.manufacturer}</h4>
                        <h4>Category: {product.category}</h4>
                    </div>

                    <div style={{textAlign: "center"}}>
                        <h4>Price: {product.price}$</h4>
                        <h4>Release Date: {dateToString(product.releaseDate)}</h4>
                        <h4>Quantity: {product.quantity}</h4>
                    </div>
                </div>

                <ThemeProvider theme={ButtonTheme}>
                    <Button color="buttonBlue" variant="contained" className="NavigationButton" onClick={() => navigate("/admin")}><ArrowBackIosIcon></ArrowBackIosIcon>Back</Button>
                </ThemeProvider>
            </div>
        </div>
    );
};
 
export default ProductPage;