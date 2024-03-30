package mpp.backend.Repository;

import mpp.backend.Model.ComputerComponent;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ComputerComponentsRepository extends MongoRepository<ComputerComponent, String> {
    Optional<ComputerComponent> findComputerComponentByProductID(int productID);
    void deleteComputerComponentByProductID(int productID);

}
