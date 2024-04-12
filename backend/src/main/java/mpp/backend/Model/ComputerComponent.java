package mpp.backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "computer_components")
@AllArgsConstructor
@NoArgsConstructor
public class ComputerComponent {

    @Transient
    public static final String SEQUENCE_NAME = "users_sequence";

    @Id
    private long productID;

    private String manufacturer;
    private String category;
    private String productName;
    private double price;
    private Date releaseDate;
    private Integer quantity;

    public ComputerComponent(long productID, String manufacturer, String productName, String category, double price, Integer quantity, Date releaseDate) {
        this.productID = productID;
        this.manufacturer = manufacturer;
        this.productName = productName;
        this.category = category;
        this.releaseDate = releaseDate;
        this.price = price;
        this.quantity = quantity;
    }

    public ComputerComponent(String manufacturer, String productName, String category, double price, Integer quantity, Date releaseDate) {
        this.manufacturer = manufacturer;
        this.productName = productName;
        this.category = category;
        this.releaseDate = releaseDate;
        this.price = price;
        this.quantity = quantity;
    }
}
