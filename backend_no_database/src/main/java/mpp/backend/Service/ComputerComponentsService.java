package mpp.backend.Service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import mpp.backend.Model.ChartData;
import mpp.backend.Model.ComputerComponent;
import mpp.backend.Repository.ComputerComponentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;

@AllArgsConstructor
@Service
public class ComputerComponentsService {
    @Autowired
    private final ComputerComponentsRepository repository;

    public ComputerComponentsService(){
        repository = new ComputerComponentsRepository() {
            @Override
            public void flush() {

            }

            @Override
            public <S extends ComputerComponent> S saveAndFlush(S entity) {
                return null;
            }

            @Override
            public <S extends ComputerComponent> List<S> saveAllAndFlush(Iterable<S> entities) {
                return null;
            }

            @Override
            public void deleteAllInBatch(Iterable<ComputerComponent> entities) {

            }

            @Override
            public void deleteAllByIdInBatch(Iterable<Long> longs) {

            }

            @Override
            public void deleteAllInBatch() {

            }

            @Override
            public ComputerComponent getOne(Long aLong) {
                return null;
            }

            @Override
            public ComputerComponent getById(Long aLong) {
                return null;
            }

            @Override
            public ComputerComponent getReferenceById(Long aLong) {
                return null;
            }

            @Override
            public <S extends ComputerComponent> List<S> findAll(Example<S> example) {
                return null;
            }

            @Override
            public <S extends ComputerComponent> List<S> findAll(Example<S> example, Sort sort) {
                return null;
            }

            @Override
            public <S extends ComputerComponent> List<S> saveAll(Iterable<S> entities) {
                return null;
            }

            @Override
            public List<ComputerComponent> findAll() {
                return null;
            }

            @Override
            public List<ComputerComponent> findAllById(Iterable<Long> longs) {
                return null;
            }

            @Override
            public <S extends ComputerComponent> S save(S entity) {
                return null;
            }

            @Override
            public Optional<ComputerComponent> findById(Long aLong) {
                return Optional.empty();
            }

            @Override
            public boolean existsById(Long aLong) {
                return false;
            }

            @Override
            public long count() {
                return 0;
            }

            @Override
            public void deleteById(Long aLong) {

            }

            @Override
            public void delete(ComputerComponent entity) {

            }

            @Override
            public void deleteAllById(Iterable<? extends Long> longs) {

            }

            @Override
            public void deleteAll(Iterable<? extends ComputerComponent> entities) {

            }

            @Override
            public void deleteAll() {

            }

            @Override
            public List<ComputerComponent> findAll(Sort sort) {
                return null;
            }

            @Override
            public Page<ComputerComponent> findAll(Pageable pageable) {
                return null;
            }

            @Override
            public <S extends ComputerComponent> Optional<S> findOne(Example<S> example) {
                return Optional.empty();
            }

            @Override
            public <S extends ComputerComponent> Page<S> findAll(Example<S> example, Pageable pageable) {
                return null;
            }

            @Override
            public <S extends ComputerComponent> long count(Example<S> example) {
                return 0;
            }

            @Override
            public <S extends ComputerComponent> boolean exists(Example<S> example) {
                return false;
            }

            @Override
            public <S extends ComputerComponent, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
                return null;
            }
        };
    }


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

    public void insertComponent(ComputerComponent component) throws Exception{
        String validation = validateComponent(component);

        if(!validation.isEmpty())
            throw new Exception(validation);

        repository.save(component);
    }

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

    public void saveComponent(ComputerComponent component) throws Exception{
        String validation = validateComponent(component);

        if(!validation.isEmpty())
            throw new Exception(validation);

        repository.save(component);
    }

    public void saveComponents(List<ComputerComponent> components) throws Exception{
        components.forEach((component) -> {
            String validation = validateComponent(component);

            if(!validation.isEmpty())
                throw new RuntimeException("Element with ID " + component.getProductID() + " could not be validated. The whole list has been discarded. Reason:\n" + validation);
            });

        repository.saveAll(components);
    }

    public void updateComponent(ComputerComponent component) throws Exception{
        String validation = validateComponent(component);

        if(!validation.isEmpty())
            throw new Exception(validation);

        if(repository.findById(component.getProductID()).isEmpty())
            throw new Exception("Cannot update element that does not exist.");

        repository.save(component);
    }


    // --- Delete --- //


    public void deleteComponentByID(Long id) throws Exception{
        if(repository.findById(id).isEmpty())
            throw new Exception("Cannot delete element that does not exist.");

        repository.deleteById(id);
    }
}
