package mpp.backend.Service;

import lombok.AllArgsConstructor;
import mpp.backend.Model.ChartData;
import mpp.backend.Model.ComputerComponent;
import mpp.backend.Repository.ComputerComponentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@AllArgsConstructor
@Service
public class ComputerComponentsService {
    @Autowired
    private final ComputerComponentsRepository repository;


    // --- Pagination --- //


    public Page<ComputerComponent> findAllByPage(Pageable pageable) {
        return repository.findAll(pageable);
    }


    // --- Generate Chart Data --- //


    public List<ChartData> generateDiversityCategoryChartData(){
        List<ChartData> result = new ArrayList<>();

        List<ComputerComponent> elements = this.repository.findAll();

        HashMap<String, Long> chartDataEntries = new HashMap<>();
        elements.forEach((element) -> {
            String category = element.getCategory();

            if(chartDataEntries.containsKey(category)){
                chartDataEntries.put(category, chartDataEntries.get(category) + 1);

            }else{
                chartDataEntries.put(category, 1L);
            }
        });

        chartDataEntries.forEach((key, value) -> {
                result.add(new ChartData((long) result.size(), value, key));
        });

        return result;
    }

    public List<ChartData> generateStockByCategoryChartData(){
        List<ChartData> result = new ArrayList<>();

        List<ComputerComponent> elements = this.repository.findAll();
//        sortedByCategory.sort(Comparator.comparing(ComputerComponent::getCategory));

        HashMap<String, Long> chartDataEntries = new HashMap<>();
        elements.forEach((element) -> {
            String category = element.getCategory();

            if(chartDataEntries.containsKey(category)){
                chartDataEntries.put(category, chartDataEntries.get(category) + element.getQuantity());

            }else{
                chartDataEntries.put(category, (long) element.getQuantity());
            }
        });

        chartDataEntries.forEach((key, value) -> {
            result.add(new ChartData((long) result.size(), value, key));
        });

        return result;
    }

    public List<ChartData> generateProductsByPriceClassChartData(){
        List<ChartData> result = new ArrayList<>();

        List<ComputerComponent> elements = this.repository.findAll();

        HashMap<String, Long> chartDataEntries = new HashMap<>(Map.of("Low End < 250$", 0L, "Middle Range < 600$", 0L, "High End > 600$", 0L));

        elements.forEach((element) -> {
            int roundedPrice = (int) Math.round(element.getPrice());
            String priceClass;

            if(roundedPrice < 251)
                priceClass = "Low End < 250$";
            else if(roundedPrice < 601)
                priceClass = "Middle Range < 600$";
            else priceClass = "High End > 600$";

            chartDataEntries.put(priceClass, chartDataEntries.get(priceClass) + 1);
        });

        chartDataEntries.forEach((key, value) -> {
            result.add(new ChartData((long) result.size(), value, key));
        });

        return result;
    }

    public List<ChartData> generateProductsByBrandChartData(){
        List<ChartData> result = new ArrayList<>();

        List<ComputerComponent> elements = this.repository.findAll();

        HashMap<String, Long> chartDataEntries = new HashMap<>();
        elements.forEach((element) -> {
            String manufacturer = element.getManufacturer();

            if(chartDataEntries.containsKey(manufacturer)){
                chartDataEntries.put(manufacturer, chartDataEntries.get(manufacturer) + 1);

            }else{
                chartDataEntries.put(manufacturer, 1L);
            }
        });

        chartDataEntries.forEach((key, value) -> {
            result.add(new ChartData((long) result.size(), value, key));
        });

        return result;
    }


    // --- Getters --- //


    public Optional<ComputerComponent> getComponentByID(String id){
        return repository.findById(id);
    }

    public Optional<ComputerComponent> getComponentByProductID(Long id){
        return repository.findComputerComponentByProductID(id);
    }

    public List<ComputerComponent> getAllComponents(){
        return repository.findAll();
    }


    // --- Insert & Update --- //


    public String validateComponent(ComputerComponent component){
        String result = "";

        if(component.getQuantity() < 0)
            result += "Quantity must be a positive integer.\n";

        if(component.getPrice() < 0)
            result += "Price must be a positive number.\n";

        if(component.getCategory().isEmpty() || component.getManufacturer().isEmpty() || component.getProductName().isEmpty())
            result += "Empty field detected.\n";

        if(component.getReleaseDate().after(new Date()))
            result += "Invalid date.\n";

        return result;
    }

    public void insertComponent(ComputerComponent component) throws Exception{
        String validation = validateComponent(component);

        if(!validation.isEmpty())
            throw new Exception(validation);

        repository.save(component);
    }

    public void saveComponent(ComputerComponent component) throws Exception{
        Optional<ComputerComponent> originalComponent = repository.findComputerComponentByProductID(component.getProductID());
        if (originalComponent.isPresent()){
            component.setProductID(originalComponent.get().getProductID());
        }

        String validation = validateComponent(component);

        if(!validation.isEmpty())
            throw new Exception(validation);

        repository.save(component);
    }

    public void saveComponents(List<ComputerComponent> components) {
        components.forEach((component -> {
                    Optional<ComputerComponent> originalComponent = repository.findComputerComponentByProductID(component.getProductID());
                    if (originalComponent.isPresent()) {
                        component.setProductID(originalComponent.get().getProductID());
                    }

                    String validation = validateComponent(component);

                    if (!validation.isEmpty())
                        throw new RuntimeException("Element with ID " + component.getProductID() + " could not be validated. The whole list has been discarded. Reason:\n" + validation);
        }));
        repository.saveAll(components);
    }

    public void updateComponent(ComputerComponent component) throws Exception{
        Optional<ComputerComponent> originalComponent = repository.findComputerComponentByProductID(component.getProductID());
        component.setProductID(originalComponent.get().getProductID());

        String validation = validateComponent(component);

        if(!validation.isEmpty())
            throw new Exception(validation);

        if(repository.findComputerComponentByProductID(component.getProductID()).isEmpty())
            throw new Exception("Cannot update element that does not exist.");

        repository.save(component);
    }


    // --- Delete --- //


    public void deleteComponentByProductID(int id){
        if(!repository.findComputerComponentByProductID(id).isPresent())
            throw new RuntimeException("Component with specified ID does not exist.");

        repository.deleteComputerComponentByProductID(id);
    }

}
