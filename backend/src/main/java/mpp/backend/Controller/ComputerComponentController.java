package mpp.backend.Controller;

import lombok.AllArgsConstructor;
import mpp.backend.Model.ComputerComponent;
import mpp.backend.Service.ComputerComponentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "*")
//@CrossOrigin("http://localhost:3000")

@RestController
@RequestMapping("api/v1/computer_components")
@AllArgsConstructor
public class ComputerComponentController {
    @Autowired
    private final ComputerComponentsService service;

    @GetMapping
    public ResponseEntity<List<ComputerComponent>> getAllComponents(){
        return new ResponseEntity<>(service.getAllComponents(), HttpStatus.OK);
    }

    @GetMapping("/realid/{realid}")
    public ResponseEntity<Optional<ComputerComponent>> getComponentByID(@PathVariable(name="realid")String componentID){
        return new ResponseEntity<>(service.getComponentByID(componentID), HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<ComputerComponent>> getComponentByProductID(@PathVariable(name="id")int componentID){
        return new ResponseEntity<>(service.getComponentByProductID(componentID), HttpStatus.OK);
    }

    @RequestMapping(value = "/insert")
    public ResponseEntity<String> insertComponent(@RequestBody ComputerComponent component){
        try{
            service.insertComponent(component);
        }catch(Exception e){
            return new ResponseEntity<>("An error occurred; the element was not added.\n" + e.getMessage(), HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>("Real ID: " + component.getRealid() + "\nProduct ID: " + component.getProductID(), HttpStatus.OK);
    }

    @RequestMapping(value = "/save")
    public ResponseEntity<String> saveComponent(@RequestBody ComputerComponent component){
        try{
            service.saveComponent(component);
        }catch(Exception e){
            return new ResponseEntity<>("An error occurred; the element was not added.\n" + e.getMessage(), HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>("Real ID: " + component.getRealid() + "\nProduct ID: " + component.getProductID(), HttpStatus.OK);
    }

    @RequestMapping(value = "/savelist")
    public ResponseEntity<String> saveComponentList(@RequestBody List<ComputerComponent> components){
        try{
            service.saveComponents(components);
        }catch(Exception e){
            return new ResponseEntity<>("An error occurred; the elements could not be added.\n" + e.getMessage(), HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>("Items registered.", HttpStatus.OK);
    }

    @RequestMapping(value="/edit/{id}")
    public ResponseEntity<String> updateComponent(@RequestBody ComputerComponent component, @PathVariable(name="id")int _id){
        Optional<ComputerComponent> originalComponent = service.getComponentByProductID(_id);

        if(_id != component.getProductID()){
            return new ResponseEntity<>("Indicated ID and entity ID are different. Request denied.", HttpStatus.CONFLICT);
        }

        if(originalComponent.isPresent()){
            try{
                component.setRealid(originalComponent.get().getRealid());
                service.updateComponent(component);
                return new ResponseEntity<>("Updated component.\n" + component, HttpStatus.OK);

            }catch(Exception e){
                return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
            }

        }else{
            return new ResponseEntity<>("Update failed. Component with specified ID does not exist.", HttpStatus.CONFLICT);
        }
    }

    @RequestMapping(value="/delete/{id}")
    public ResponseEntity<String> deleteComponent(@PathVariable(name="id")int _id){
        try{
            service.deleteComponentByProductID(_id);
            return new ResponseEntity<>("Component with id " + _id + " successfully deleted.", HttpStatus.OK);

        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @RequestMapping(value="/edit_realid/{id}")
    public ResponseEntity<String> updateComponent(@RequestBody ComputerComponent component, @PathVariable(name="id")String _id){
        component.setRealid(_id);
        service.updateComponent(component);

        Optional<ComputerComponent> originalComponent = service.getComponentByID(_id);

        if(!_id.equals(component.getRealid())){
            return new ResponseEntity<>("Indicated ID and entity ID are different. Request denied.", HttpStatus.CONFLICT);
        }

        if(originalComponent.isPresent()){
            try{
                service.updateComponent(component);
                return new ResponseEntity<>("Updated component.\n" + component, HttpStatus.OK);

            }catch(Exception e){
                return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
            }

        }else{
            return new ResponseEntity<>("Update failed. Component with specified ID does not exist.", HttpStatus.CONFLICT);
        }
    }

    @RequestMapping(value="/delete_realid/{id}")
    public ResponseEntity<String> deleteComponent(@PathVariable(name="id")String _id){
        try{
            service.deleteComponentByRealID(_id);
            return new ResponseEntity<>("Component with id " + _id + " successfully deleted.", HttpStatus.OK);

        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }
}