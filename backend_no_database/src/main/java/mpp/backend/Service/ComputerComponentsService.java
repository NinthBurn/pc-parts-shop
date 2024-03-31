package mpp.backend.Service;

import lombok.AllArgsConstructor;
import mpp.backend.Model.ChartData;
import mpp.backend.Model.ComputerComponent;
import mpp.backend.Repository.ComputerComponentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

        List<ComputerComponent> elements = new ArrayList<>();
        repository.findAll().forEach(elements::add);

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

        List<ComputerComponent> elements = new ArrayList<>();
        repository.findAll().forEach(elements::add);
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

        List<ComputerComponent> elements = new ArrayList<>();
        repository.findAll().forEach(elements::add);

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

        List<ComputerComponent> elements = new ArrayList<>();
        repository.findAll().forEach(elements::add);

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


    public Optional<ComputerComponent> getComponentByID(Long id){
        return repository.findById(id);
    }

    public List<ComputerComponent> getAllComponents(){
        List<ComputerComponent> target = new ArrayList<>();
        repository.findAll().forEach(target::add);
        return target;
    }


    // --- Insert & Update --- //

    public void insertComponent(ComputerComponent component){
        repository.save(component);
    }

    public void saveComponent(ComputerComponent component) {
        repository.save(component);
    }

    public void saveComponents(List<ComputerComponent> components) {
        repository.saveAll(components);
    }

    public void updateComponent(ComputerComponent component){
        repository.save(component);
    }


    // --- Delete --- //


    public void deleteComponentByID(Long id){
        repository.deleteById(id);
    }
}
