package mpp.backend.Controller;

import lombok.RequiredArgsConstructor;
import mpp.backend.Model.ChartData;
import mpp.backend.Model.ComputerComponent;
import mpp.backend.Model.WebSocketMessage;
import mpp.backend.Service.ComputerComponentsService;
import mpp.backend.Service.FakeDataThread;
import mpp.backend.Service.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "*")
//@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("api/v1/computer_components")
@RequiredArgsConstructor
public class ComputerComponentController {
    private FakeDataThread generateFakeEntriesThread;

    @Autowired
    private final ComputerComponentsService service;

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    @Autowired
    SequenceGeneratorService sequenceGeneratorService;

    @GetMapping
    public ResponseEntity<List<ComputerComponent>> getAllComponents(){
       return new ResponseEntity<>(service.getAllComponents(), HttpStatus.OK);
    }


    // --- Methods for inserting data --- //


    @PostMapping(value = "/insert")
    public ResponseEntity<String> insertComponent(@RequestBody ComputerComponent component){
        try{
            component.setProductID(sequenceGeneratorService.generateSequence(ComputerComponent.SEQUENCE_NAME));
            service.insertComponent(component);
            broadcastDataChange();

        }catch(Exception e){
            return new ResponseEntity<>("An error occurred; the element was not added.\n" + e.getMessage(), HttpStatus.CONFLICT);

        }
        return new ResponseEntity<>("Product ID: " + component.getProductID(), HttpStatus.OK);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<String> saveComponent(@RequestBody ComputerComponent component){
        try{
            component.setProductID(sequenceGeneratorService.generateSequence(ComputerComponent.SEQUENCE_NAME));
            service.insertComponent(component);
            broadcastDataChange();

        }catch(Exception e){
            return new ResponseEntity<>("An error occurred; the element was not added.\n" + e.getMessage(), HttpStatus.CONFLICT);

        }
        return new ResponseEntity<>("Product ID: " + component.getProductID(), HttpStatus.OK);
    }

    @PostMapping(value = "/savelist")
    public ResponseEntity<String> saveComponentList(@RequestBody List<ComputerComponent> components){
        try{
            components.forEach((component -> {
                component.setProductID(sequenceGeneratorService.generateSequence(ComputerComponent.SEQUENCE_NAME));
                try{
                    service.insertComponent(component);

                }catch(Exception e){
                    throw new RuntimeException(e.getMessage());
                }
            }));
            broadcastDataChange();

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
    public ResponseEntity<Optional<ComputerComponent>> getComponentByProductID(@PathVariable(name="id")long componentID){
        return new ResponseEntity<>(service.getComponentByProductID(componentID), HttpStatus.OK);
    }

    @PutMapping(value="/edit/{id}")
    public ResponseEntity<String> updateComponent(@RequestBody ComputerComponent component, @PathVariable(name="id")long _id){
        if(_id != component.getProductID()){
            return new ResponseEntity<>("Indicated ID and entity ID are different. Request denied.", HttpStatus.CONFLICT);
        }

        try{
            component.setProductID(_id);
            service.updateComponent(component);
            broadcastDataChange();

            return new ResponseEntity<>("Updated component.\n" + component, HttpStatus.OK);

        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping(value="/delete/{id}")
    public ResponseEntity<String> deleteComponent(@PathVariable(name="id")int _id){
        try{
            service.deleteComponentByProductID(_id);
            broadcastDataChange();

            return new ResponseEntity<>("Component with id " + _id + " successfully deleted.", HttpStatus.OK);

        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }


    // --- Web sockets, state changes --- //


    @MessageMapping("/stomp_endpoint")
    @SendTo("/topic/status")
    public WebSocketMessage outputDataChange(@Payload String status){
        return new WebSocketMessage(status);
    }

    public void broadcastDataChange(){
        this.messagingTemplate.convertAndSend("/topic/status", new WebSocketMessage("true"));
    }

    // --- Miscellaneous --- //


    @RequestMapping("/generate_fake_data")
    public ResponseEntity<String> startFakeDataGenerator(@RequestParam(defaultValue = "1000") int sleepTimeMS){
        if(generateFakeEntriesThread == null){
            generateFakeEntriesThread = new FakeDataThread(sleepTimeMS);
            generateFakeEntriesThread.setController(this);
            generateFakeEntriesThread.start();
            return new ResponseEntity<>("Data generator started.", HttpStatus.OK);
        }

        return new ResponseEntity<>("Data generator is already running.", HttpStatus.FORBIDDEN);
    }

    @RequestMapping("/stop_generator")
    public ResponseEntity<String> stopFakeDataGenerator(){
        if(generateFakeEntriesThread != null){
            generateFakeEntriesThread.stopGenerator();
            generateFakeEntriesThread = null;
            return new ResponseEntity<>("Data generator has been stopped. ", HttpStatus.OK);
        }

        return new ResponseEntity<>("Data generator is not currently running.", HttpStatus.FORBIDDEN);
    }
}
