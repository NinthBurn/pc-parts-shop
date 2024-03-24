package mpp.backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "computer_components")
@AllArgsConstructor
@NoArgsConstructor
public class ComputerComponent {
    @Id
    private String realid;

    @Indexed(unique = true)
    private int productID;
    private String manufacturer;
    private String category;
    private String productName;
    private double price;
    private Date releaseDate;
    private Integer quantity;

    public ComputerComponent(int productID, String manufacturer, String productName, String category, double price, Integer quantity, Date releaseDate) {
        this.productID = productID;
        this.manufacturer = manufacturer;
        this.productName = productName;
        this.category = category;
        this.releaseDate = releaseDate;
        this.price = price;
        this.quantity = quantity;
    }
}
