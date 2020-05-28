package youTrip.activity;

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
@RequestMapping("/activities")
@RequiredArgsConstructor
public class ActivityController {

	private final ActivityRepository activityRepository;

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Activity> showActivities(
			@RequestParam(required = false) Long cityId, 
			@RequestParam(required = false) Double score, 
			@RequestParam(required = false) ActivityCategory category) {

		if (cityId != null && score != null) {
			return activityRepository.findByCityIdAndAverageRatingScoreBetween(cityId, score, (score + 0.9));
		} else if (cityId != null && category != null) {
			return activityRepository.findByCityIdAndActivityCategory(cityId, category);
		} else if (cityId != null) {
			return activityRepository.findByCityId(cityId);
		} else if (score != null) {
			return activityRepository.findByAverageRatingScoreBetween(score, (score + 0.9));
		} else if (category != null) {
			return activityRepository.findByActivityCategory(category);
		}
		return activityRepository.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> showOneActivity(@PathVariable Long id) {
		
		return ResponseEntity.of(activityRepository.findById(id));
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Activity create(@RequestBody @Valid Activity activity) {

		activity.setId(null);
		return activityRepository.save(activity);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody @Valid Activity activity) {
		
		activity.setId(id);
		var currentAverageRatingScore = activityRepository.findById(id).get().getAverageRatingScore();
		activity.setAverageRatingScore(currentAverageRatingScore);
		
		if (!activityRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		activityRepository.save(activity);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		
		if (!activityRepository.existsById(id)) {
			return new ResponseEntity<>("Die Aktivität existiert nicht", HttpStatus.NOT_FOUND);
		}
		activityRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
