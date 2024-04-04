package mpp.backend.Controller;

import com.github.javafaker.Faker;
import mpp.backend.Model.ComputerComponent;

import java.util.Date;

public class DomainFaker {
    private static Long lastUsedId = 999999L;
    public static ComputerComponent generateFakeComputerComponent(){
        Faker faker = new Faker();

        String manufacturer = faker.regexify("[A-Z][a-z]{4,9}");
        String productName = faker.regexify("[A-Z][a-z]{6,19}");
        String category = faker.regexify("[A-Z][a-z]{4,9}");
        Date releaseDate =  faker.date().birthday();

        double price = faker.number().randomDouble(2, 69, 999);
        Integer quantity = faker.number().numberBetween(1, 100);
        Long productID = lastUsedId++;
        return new ComputerComponent(productID, manufacturer, productName, category, price, quantity, releaseDate);
    }
}
