package mpp.backend.Controller;

import lombok.RequiredArgsConstructor;
import mpp.backend.Model.ChartData;
import mpp.backend.Model.ComputerComponent;
import mpp.backend.Service.ComputerComponentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.util.List;
import java.util.Optional;

@Component
@Scope
class FakeDataThread extends Thread{
    ComputerComponentsService service;

    public void setService(ComputerComponentsService service){
        this.service = service;
    }

    @Override
    public void run(){
        try{
            while(true){
                ComputerComponent faked = DomainFaker.generateFakeComputerComponent();
                service.saveComponent(faked);
                ComputerComponentController.dataChanged = true;
                sleep(1000);
            }
        }catch(Exception error){
            throw new RuntimeException(error.getMessage());
        }
    }
}

//@CrossOrigin(origins = "*")
//@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("api/v1/computer_components")
@RequiredArgsConstructor
public class ComputerComponentController {
    public static boolean dataChanged = false;
    private FakeDataThread generateFakeEntriesThread;

    @Autowired
    private final ComputerComponentsService service;


    @GetMapping
    public ResponseEntity<List<ComputerComponent>> getAllComponents(){
       return new ResponseEntity<>(service.getAllComponents(), HttpStatus.OK);
    }


    // --- Methods for inserting data --- //


    @PostMapping(value = "/insert")
    public ResponseEntity<String> insertComponent(@RequestBody ComputerComponent component){
        try{
            service.insertComponent(component);
        }catch(Exception e){
            return new ResponseEntity<>("An error occurred; the element was not added.\n" + e.getMessage(), HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>("Real ID: " + component.getRealid() + "\nProduct ID: " + component.getProductID(), HttpStatus.OK);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<String> saveComponent(@RequestBody ComputerComponent component){
        try{
            service.saveComponent(component);
        }catch(Exception e){
            return new ResponseEntity<>("An error occurred; the element was not added.\n" + e.getMessage(), HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>("Real ID: " + component.getRealid() + "\nProduct ID: " + component.getProductID(), HttpStatus.OK);
    }

    @PostMapping(value = "/savelist")
    public ResponseEntity<String> saveComponentList(@RequestBody List<ComputerComponent> components){
        try{
            service.saveComponents(components);
        }catch(Exception e){
            return new ResponseEntity<>("An error occurred; the elements could not be added.\n" + e.getMessage(), HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>("Items registered.", HttpStatus.OK);
    }


    // --- Filtering --- //


    @GetMapping("/charts/category_diversity")
    public ResponseEntity<List<ChartData>> getCategoryDiversityChartData(){
        return new ResponseEntity<>(service.generateDiversityCategoryChartData(), HttpStatus.OK);
    }


    @GetMapping("/charts/number_by_category")
    public ResponseEntity<List<ChartData>> getStockByCategoryChartData(){
        return new ResponseEntity<>(service.generateStockByCategoryChartData(), HttpStatus.OK);
    }

    @GetMapping("/charts/products_by_price_class")
    public ResponseEntity<List<ChartData>> getProductsByPriceClassChartData(){
        return new ResponseEntity<>(service.generateProductsByPriceClassChartData(), HttpStatus.OK);
    }

    @GetMapping("/charts/products_by_brand")
    public ResponseEntity<List<ChartData>> getProductsByBrandChartData(){
        return new ResponseEntity<>(service.generateProductsByBrandChartData(), HttpStatus.OK);
    }


    // --- Sorting --- //


    @GetMapping("/get_page")
    public Page<ComputerComponent> findAllByPage(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "9") int size,
                                                 @RequestParam(defaultValue = "productID") String sortField,
                                                 @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection)
    {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortField).and(Sort.by("productID")));
        return service.findAllByPage(pageable);
    }


    // --- Methods using the product ID (assigned ID) --- //


    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<ComputerComponent>> getComponentByProductID(@PathVariable(name="id")int componentID){
        return new ResponseEntity<>(service.getComponentByProductID(componentID), HttpStatus.OK);
    }

    @PutMapping(value="/edit/{id}")
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

    @DeleteMapping(value="/delete/{id}")
    public ResponseEntity<String> deleteComponent(@PathVariable(name="id")int _id){
        try{
            service.deleteComponentByProductID(_id);
            return new ResponseEntity<>("Component with id " + _id + " successfully deleted.", HttpStatus.OK);

        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }


    // --- Methods using the real ID (database ID) --- //


    @GetMapping("/realid/{realid}")
    public ResponseEntity<Optional<ComputerComponent>> getComponentByID(@PathVariable(name="realid")String componentID){
        return new ResponseEntity<>(service.getComponentByID(componentID), HttpStatus.OK);
    }

    @DeleteMapping(value="/delete_realid/{id}")
    public ResponseEntity<String> deleteComponent(@PathVariable(name="id")String _id){
        try{
            service.deleteComponentByRealID(_id);
            return new ResponseEntity<>("Component with id " + _id + " successfully deleted.", HttpStatus.OK);

        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @PutMapping(value="/edit_realid/{id}")
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


    // --- Miscellaneous --- //


    @GetMapping(value="/status")
    public ResponseEntity<Boolean> getServerStatus(){
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @GetMapping(value="/data_changed")
    public ResponseEntity<Boolean> getDataChangedStatus(){
        boolean status = dataChanged;

        if(dataChanged)
            dataChanged = false;

        return new ResponseEntity<>(status, HttpStatus.OK);
    }
}
