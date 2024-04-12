package mpp.backend;

import mpp.backend.Controller.ComputerComponentController;
import mpp.backend.Model.ComputerComponent;
import mpp.backend.model.RestPageImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.DEFINED_PORT)
class BackendApplicationTests {
	@Autowired
	private ComputerComponentController controller;

	private final TestRestTemplate restTemplate = new TestRestTemplate();

	@Test
	void contextLoads(){
		assertThat(controller).isNotNull();
	}

	@Test
	void runTests(){
		loadDefaultLoading();
		fetchFirstPage();
		getElement();
		updateElement();
		insertElement();
		deleteElement();
	}
	void loadDefaultLoading(){
		assertThat(this.restTemplate.getForObject("http://localhost:8080/api/v1/computer_components", List.class))
				.size().isEqualTo(2);
	}

	void fetchFirstPage() {
		ParameterizedTypeReference<RestPageImpl<ComputerComponent>> responseType = new ParameterizedTypeReference<RestPageImpl<ComputerComponent>>() { };

		ResponseEntity<RestPageImpl<ComputerComponent>> result = restTemplate.exchange(
				"http://localhost:8080/api/v1/computer_components/get_page?page=0", HttpMethod.GET,
				null/*httpEntity*/, responseType);

		assertThat(result.getBody().getContent().size()).isLessThanOrEqualTo(9);
		assertThat(result.getBody().getContent().size()).isEqualTo(2);
	}

	void getElement(){
		// get element with ID 1
		assertThat(this.restTemplate.getForObject("http://localhost:8080/api/v1/computer_components/id/1", ComputerComponent.class))
				.isNotNull();

		// check that we received the correct element
		ParameterizedTypeReference<ComputerComponent> responseType = new ParameterizedTypeReference<ComputerComponent>() { };
		ResponseEntity<ComputerComponent> result = restTemplate.exchange(
				"http://localhost:8080/api/v1/computer_components/id/1", HttpMethod.GET,
				null/*httpEntity*/, responseType);

		ComputerComponent c1 = result.getBody();
		assertThat(c1.getProductID()).isEqualTo(1);
		assertThat(c1.getCategory()).isEqualTo("Graphics Card");
		assertThat(c1.getQuantity()).isEqualTo(15);
		assertThat(c1.getProductName()).isEqualTo("RX 5700 XT");
		assertThat(c1.getManufacturer()).isEqualTo("AMD");
		assertThat(c1.getPrice()).isEqualTo(299.99);
		assertThat(c1.getReleaseDate()).isEqualTo(new Date("12/12/2018"));

		// get element that does not exist
		assertThat(this.restTemplate.getForObject("http://localhost:8080/api/v1/computer_components/id/10000", ComputerComponent.class))
				.isNull();

	}

	void updateElement(){
		ComputerComponent c1_new = new ComputerComponent(1L, "AMD", "RX 5700 XT", "Graphics Card", 299.99, 15, new Date("12/12/2018"));
		ParameterizedTypeReference<ComputerComponent> responseType = new ParameterizedTypeReference<ComputerComponent>() { };
		ParameterizedTypeReference<String> updateResponseType = new ParameterizedTypeReference<String>() { };

		ResponseEntity<ComputerComponent> result = restTemplate.exchange(
				"http://localhost:8080/api/v1/computer_components/id/1", HttpMethod.GET,
				null/*httpEntity*/, responseType);

		ComputerComponent c1_old = result.getBody();
		assertThat(c1_old).isEqualTo(c1_new);
		assertThat(c1_old.getProductID()).isEqualTo(1);
		assertThat(c1_old.getQuantity()).isEqualTo(15);

		// Update element
		c1_new.setQuantity(25);
		ResponseEntity<String> updateResult = restTemplate.exchange(
				"http://localhost:8080/api/v1/computer_components/edit/1", HttpMethod.PUT,
				new HttpEntity<>(c1_new),
				updateResponseType);
		assertThat(updateResult.getBody()).isEqualTo("Updated component.");

		// Check that the changes have been saved
		assertThat((restTemplate.getForObject("http://localhost:8080/api/v1/computer_components/id/1", ComputerComponent.class))
				.getQuantity()).isEqualTo(25);

		// Trying to update an existing element that has a different ID
		updateResult = restTemplate.exchange(
				"http://localhost:8080/api/v1/computer_components/edit/2", HttpMethod.PUT,
				new HttpEntity<>(c1_new),
				updateResponseType);
		assertThat(updateResult.getBody()).isEqualTo("Indicated ID and entity ID are different. Request denied.");

		// Trying to update an element that does not exist
		ComputerComponent c5 = new ComputerComponent(5L, "AMD", "RX 5700 XT", "Graphics Card", 299.99, 15, new Date("12/12/2018"));

		updateResult = restTemplate.exchange(
				"http://localhost:8080/api/v1/computer_components/edit/5", HttpMethod.PUT,
				new HttpEntity<>(c5), updateResponseType);
		assertThat(updateResult.getBody()).isEqualTo("Cannot update element that does not exist.");
	}

	void insertElement(){
		ComputerComponent c3 = new ComputerComponent(3L, "AMD", "RX 5700 XT", "Graphics Card", 299.99, 15, new Date("12/12/2018"));
		ParameterizedTypeReference<String> responseType = new ParameterizedTypeReference<String>() { };

		// check that element does not exist
		assertThat(this.restTemplate.getForObject("http://localhost:8080/api/v1/computer_components/id/3", ComputerComponent.class))
				.isNull();

		// check that element was inserted
		ResponseEntity<String> result = restTemplate.exchange(
				"http://localhost:8080/api/v1/computer_components/insert", HttpMethod.POST,
				new HttpEntity<>(c3), responseType);
		assertThat(result.getBody()).isEqualTo("Product ID: 3");

		// check that the element was inserted correctly
		ParameterizedTypeReference<ComputerComponent> compResponseType = new ParameterizedTypeReference<ComputerComponent>() { };
		ResponseEntity<ComputerComponent> compResult = restTemplate.exchange(
				"http://localhost:8080/api/v1/computer_components/id/3", HttpMethod.GET,
				null/*httpEntity*/, compResponseType);

		ComputerComponent c1 = compResult.getBody();
		assertThat(c1.getProductID()).isEqualTo(3);
		assertThat(c1.getCategory()).isEqualTo("Graphics Card");
		assertThat(c1.getQuantity()).isEqualTo(15);
		assertThat(c1.getProductName()).isEqualTo("RX 5700 XT");
		assertThat(c1.getManufacturer()).isEqualTo("AMD");
		assertThat(c1.getPrice()).isEqualTo(299.99);
		assertThat(c1.getReleaseDate()).isEqualTo(new Date("12/12/2018"));

		// adding an invalid element
		ComputerComponent broken = new ComputerComponent(4L, "", "RX 5700 XT", "Graphics Card", -299.99, -15, new Date("12/12/2099"));

		result = restTemplate.exchange(
				"http://localhost:8080/api/v1/computer_components/insert", HttpMethod.POST,
				new HttpEntity<>(broken), responseType);

		assertThat(result.getBody()).isEqualTo("An error occurred; the element was not added.\nQuantity must be a positive integer.\nPrice must be a positive number.\nEmpty field detected.\nInvalid date.\n");

		broken.setPrice(199.99);
		broken.setReleaseDate(new Date(11/11/2017));

		result = restTemplate.exchange(
				"http://localhost:8080/api/v1/computer_components/insert", HttpMethod.POST,
				new HttpEntity<>(broken), responseType);

		assertThat(result.getBody()).isEqualTo("An error occurred; the element was not added.\nQuantity must be a positive integer.\nEmpty field detected.\n");
	}

	void deleteElement(){
		ComputerComponent c3 = new ComputerComponent(4L, "AMD", "RX 5700 XT", "Graphics Card", 299.99, 15, new Date("12/12/2018"));
		ParameterizedTypeReference<String> responseType = new ParameterizedTypeReference<String>() { };

		// check that element does not exist
		assertThat(this.restTemplate.getForObject("http://localhost:8080/api/v1/computer_components/id/4", ComputerComponent.class))
				.isNull();

		// insert element
		ResponseEntity<String> result = restTemplate.exchange(
				"http://localhost:8080/api/v1/computer_components/insert", HttpMethod.POST,
				new HttpEntity<>(c3), responseType);
		assertThat(result.getBody()).isEqualTo("Product ID: 4");

		// delete newly inserted element
		result = restTemplate.exchange(
				"http://localhost:8080/api/v1/computer_components/delete/4", HttpMethod.DELETE,
				null, responseType);
		assertThat(result.getBody()).isEqualTo("Component with id " + 4 + " successfully deleted.");


		// try to delete an element that does not exist
		result = restTemplate.exchange(
				"http://localhost:8080/api/v1/computer_components/delete/352125", HttpMethod.DELETE,
				null, responseType);
		assertThat(result.getBody()).isEqualTo("Cannot delete element that does not exist.");

	}
}
