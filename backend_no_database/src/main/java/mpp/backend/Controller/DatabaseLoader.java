package mpp.backend.Controller;

import mpp.backend.Model.ComputerComponent;
import mpp.backend.Repository.ComputerComponentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DatabaseLoader implements CommandLineRunner {
    private final ComputerComponentsRepository repository;

    @Autowired
    public DatabaseLoader(ComputerComponentsRepository repository){
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception{
        this.repository.save(new ComputerComponent(100L, "AMD", "RX 5700 XT", "Graphics Card", 299.99, 15, new Date("12/12/2018")));
        this.repository.save(new ComputerComponent(101L, "AMD", "RX 5600 XT", "Graphics Card", 239.99, 7, new Date("12/12/2018")));
    }
}
