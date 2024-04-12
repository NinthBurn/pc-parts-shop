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
        ComputerComponent c1 = new ComputerComponent(1L, "AMD", "RX 5700 XT", "Graphics Card", 299.99, 15, new Date("12/12/2018"));
        ComputerComponent c2 = new ComputerComponent(2L,"AMD", "RX 5600 XT", "Graphics Card", 239.99, 7, new Date("12/12/2018"));
        this.repository.save(c1);
        this.repository.save(c2);
    }
}
