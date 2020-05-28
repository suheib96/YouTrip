package youTrip.city;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/cities")
@RequiredArgsConstructor
public class CityController {

	private final CityRepository cityRepository;

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<City> showCities(@RequestParam(required = false) String name) {
		
		if (name != null) {
			return cityRepository.findByNameContains(name);
		}
		return cityRepository.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> showOneCity(@PathVariable Long id) {
		
		return ResponseEntity.of(cityRepository.findById(id));
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public City create(@RequestBody @Valid City city) {

		city.setId(null);
		return cityRepository.save(city);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody @Valid City city) {
		
		if (!cityRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		city.setId(id);
		cityRepository.save(city);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		
		if (!cityRepository.existsById(id)) {
			return new ResponseEntity<>("Die Stadt existiert nicht", HttpStatus.NOT_FOUND);
		}
		cityRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
