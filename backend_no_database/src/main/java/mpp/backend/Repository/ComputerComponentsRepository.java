package mpp.backend.Repository;

import mpp.backend.Model.ComputerComponent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComputerComponentsRepository extends JpaRepository<ComputerComponent, Long> {
}
