package mpp.backend.Service;

import lombok.AllArgsConstructor;
import mpp.backend.Model.ComputerComponent;
import mpp.backend.Repository.ComputerComponentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ComputerComponentsService {
    @Autowired
    private final ComputerComponentsRepository repository;

    public void insertComponent(ComputerComponent component){
        repository.save(component);
    }

    public void saveComponent(ComputerComponent component) {
        Optional<ComputerComponent> originalComponent = repository.findComputerComponentByProductID(component.getProductID());
        if (originalComponent.isPresent()){
            component.setRealid(originalComponent.get().getRealid());
        }

        repository.save(component);
    }

    public void saveComponents(List<ComputerComponent> components) {
        components.forEach((component -> {
            Optional<ComputerComponent> originalComponent = repository.findComputerComponentByProductID(component.getProductID());
            if (originalComponent.isPresent()){
                component.setRealid(originalComponent.get().getRealid());
            }

            repository.save(component);
        }));
    }

    public void updateComponent(ComputerComponent component){
        Optional<ComputerComponent> originalComponent = repository.findComputerComponentByProductID(component.getProductID());
        component.setRealid(originalComponent.get().getRealid());
        repository.save(component);
    }

    public void deleteComponentByRealID(String id){
        repository.deleteById(id);
    }

    public void deleteComponentByProductID(int id){
        if(!repository.findComputerComponentByProductID(id).isPresent())
            throw new RuntimeException("Component with specified ID does not exist.");

        repository.deleteComputerComponentByProductID(id);
    }

    public Optional<ComputerComponent> getComponentByID(String id){
        return repository.findById(id);
    }

    public Optional<ComputerComponent> getComponentByProductID(int id){
        return repository.findComputerComponentByProductID(id);
    }

    @GetMapping
    public List<ComputerComponent> getAllComponents(){
        return repository.findAll();
    }
}
