package youTrip;

import java.util.HashMap;
import java.util.Map;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import io.restassured.RestAssured;
import io.restassured.response.Response;

@ActiveProfiles("dev")
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = "classpath:application-dev.properties")
public class YouTripApplicationTests {

	@LocalServerPort
	private int port;

	@Before
	public void setUp() throws Exception {
		RestAssured.port = port;
	}

	@Test
	public void getCities_returns200() {
		Response response = RestAssured.get("http://localhost:" + port + "/cities").andReturn();
		Assert.assertEquals(200, response.getStatusCode());
	}

	@Test
	public void addCity_validCity_returns201() {
		Map<String, String> city = new HashMap<>();
		city.put("name", "Frankfurt");

		Response response = RestAssured.given().contentType("application/json").body(city)
				.post("http://localhost:" + port + "/cities");
		Assert.assertEquals(201, response.getStatusCode());
	}

	@Test
	public void addCity_blankName_returns404() {
		Map<String, String> city = new HashMap<>();
		city.put("name", "");

		Response response = RestAssured.given().contentType("application/json").body(city)
				.post("http://localhost:" + port + "/cities");
		Assert.assertEquals(400, response.getStatusCode());
	}

	@Test
	public void findCityById_returnsCity() {
		Map<String, String> city = new HashMap<>();
		city.put("name", "Frankfurt");

		RestAssured.given().contentType("application/json").body(city).post("http://localhost:" + port + "/cities");
		Response allCities = RestAssured.get("http://localhost:" + port + "/cities").andReturn();
		Response response = RestAssured.get("http://localhost:" + port + "/cities/{id}",
				allCities.jsonPath().getString("id[0]"));
		Assert.assertEquals(200, response.getStatusCode());
		Assert.assertEquals(allCities.jsonPath().getString("name[0]"), response.jsonPath().getString("name"));
	}

	@Test
	public void deleteCityById() {
		Map<String, String> city = new HashMap<>();
		city.put("name", "Köln");

		RestAssured.given().contentType("application/json").body(city).post("http://localhost:" + port + "/cities");

		Response allCities = RestAssured.get("http://localhost:" + port + "/cities").andReturn();
		Response response = RestAssured.delete("/cities/{id}", allCities.jsonPath().getString("id[0]"));

		Assert.assertEquals(204, response.getStatusCode());
	}

	@Test
	public void getActivities_returns200() {
		Response response = RestAssured.get("http://localhost:" + port + "/activities").andReturn();
		Assert.assertEquals(200, response.getStatusCode());
	}

	@Test
	public void addActivity_unvalidActivity_returns400() {

		Map<String, String> activity = new HashMap<>();
		activity.put("activityCategory", "HOTEL");
		activity.put("name", "Testhotel");
		activity.put("description", "Das ist ein Hotel");
		activity.put("listOfRatings", "[]");

		Response response = RestAssured.given().contentType("application/json").body(activity)
				.post("http://localhost:" + port + "/activities");
		Assert.assertEquals(400, response.getStatusCode());
	}

	@Test
	public void addActivity_blankName_returns400() {
		Map<String, String> activity = new HashMap<>();
		activity.put("activityCategory", "");
		activity.put("name", "");
		activity.put("description", "Das ist ein Hotel");
		activity.put("listOfRatings", "");

		Response response = RestAssured.given().contentType("application/json").body(activity)
				.post("http://localhost:" + port + "/activities");
		Assert.assertEquals(400, response.getStatusCode());
	}

	@Test
	public void getRatings_returns200() {
		Response response = RestAssured.get("http://localhost:" + port + "/ratings").andReturn();
		Assert.assertEquals(200, response.getStatusCode());
	}

	@Test
	public void addRating_unvalidRating_returns400() {

		Map<String, String> rating = new HashMap<>();
		rating.put("score", "3.0");

		Response response = RestAssured.given().contentType("application/json").body(rating)
				.post("http://localhost:" + port + "/ratings");
		Assert.assertEquals(400, response.getStatusCode());
	}

}
