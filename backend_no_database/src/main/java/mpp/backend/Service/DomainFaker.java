package mpp.backend.Service;

import com.github.javafaker.Faker;
import mpp.backend.Model.ComputerComponent;

import java.util.Date;
import java.util.List;
import java.util.Random;

public class DomainFaker {
    private static final Faker faker = new Faker();
    private static final Random rand = new Random();
    private static final List<String> manufacturers = List.of("AMD", "NVIDIA", "Intel", "Seasonic", "Crucial", "MSI", "G.Skill", "Gigabyte", "ASUS", "ASRock", "EVGA", "Corsair", "Kingston");
    private static final List<String> categories = List.of("Processor", "Motherboard", "RAM", "Graphics Card", "Power Supply", "Storage");

    public static ComputerComponent generateFakeComputerComponent(){
        String manufacturer = faker.regexify("[A-Z][a-z]{4,9}");
        String productName = faker.regexify("[A-Z][a-z]{6,19}");
        String category = faker.regexify("[A-Z][a-z]{4,9}");
        Date releaseDate =  faker.date().birthday();

        double price = faker.number().randomDouble(2, 69, 999);
        Integer quantity = faker.number().numberBetween(1, 100);
        return new ComputerComponent(manufacturer, productName, category, price, quantity, releaseDate);
    }

    public static ComputerComponent generateConvincingComputerComponent(){
        String manufacturer = manufacturers.get(rand.nextInt(manufacturers.size()));
        String category = categories.get(rand.nextInt(categories.size()));

        String productName = faker.regexify("[A-Z][A-Z]{1,2} [1-9]{2}[05]0 [XTRZE]{0,3}");
        Date releaseDate =  faker.date().birthday();

        double price = faker.number().randomDouble(2, 69, 999);
        Integer quantity = faker.number().numberBetween(1, 100);
        return new ComputerComponent(manufacturer, productName, category, price, quantity, releaseDate);
    }
}
