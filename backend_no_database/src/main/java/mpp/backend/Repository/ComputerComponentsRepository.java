package mpp.backend.Repository;

import mpp.backend.Model.ComputerComponent;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ComputerComponentsRepository extends PagingAndSortingRepository<ComputerComponent, Long>, CrudRepository<ComputerComponent, Long> {
}
