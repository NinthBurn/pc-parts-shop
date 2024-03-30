package mpp.backend.Service;

import lombok.AllArgsConstructor;
import mpp.backend.Model.ComputerComponent;
import mpp.backend.Repository.ComputerComponentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;

@AllArgsConstructor
@Service
public class ComputerComponentsService {
    @Autowired
    private final ComputerComponentsRepository repository;

    private final int elementsPerPage = 9;


    // --- Pagination --- //


    public Page<ComputerComponent> findAllByPage(Pageable pageable) {
        return repository.findAll(pageable);
    }


    // --- Generate Chart Data --- //





    // --- Getters --- //


    public Optional<ComputerComponent> getComponentByID(String id){
        return repository.findById(id);
    }

    public Optional<ComputerComponent> getComponentByProductID(int id){
        return repository.findComputerComponentByProductID(id);
    }

    public List<ComputerComponent> getAllComponents(){
        return repository.findAll();
    }


    // --- Insert & Update --- //

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


    // --- Delete --- //


    public void deleteComponentByRealID(String id){
        repository.deleteById(id);
    }

    public void deleteComponentByProductID(int id){
        if(!repository.findComputerComponentByProductID(id).isPresent())
            throw new RuntimeException("Component with specified ID does not exist.");

        repository.deleteComputerComponentByProductID(id);
    }

}
