package mpp.backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComputerComponent {
    private @Id Long productID;
    private String manufacturer;
    private String category;
    private String productName;
    private double price;
    private Date releaseDate;
    private Integer quantity;

    public ComputerComponent(Long productID, String manufacturer, String productName, String category, double price, Integer quantity, Date releaseDate) {
        this.productID = productID;
        this.manufacturer = manufacturer;
        this.productName = productName;
        this.category = category;
        this.releaseDate = releaseDate;
        this.price = price;
        this.quantity = quantity;
    }
}
