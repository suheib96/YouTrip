package youTrip.rating;

import java.util.List;
import java.util.Optional;

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

import youTrip.activity.Activity;
import youTrip.activity.ActivityRepository;

@RestController
@RequestMapping("/ratings")
@RequiredArgsConstructor
public class RatingController {

	private final RatingRepository ratingRepository;
	private final ActivityRepository activityRepository;

	@GetMapping
	public List<Rating> showRatings(@RequestParam(required = false) Long activityId) {

		if (activityId != null) {
			return ratingRepository.findByActivityId(activityId);
		}
		return ratingRepository.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> showOneRating(@PathVariable Long id) {
		
		return ResponseEntity.of(ratingRepository.findById(id));
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Rating create(@RequestBody @Valid Rating rating) {

		rating.setId(null);
		ratingRepository.save(rating);
		
		calculateNewAverageRatingScore(rating.getActivity().getId());
		return rating;
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody @Valid Rating rating) {
		
		rating.setId(id);

		if (!ratingRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		ratingRepository.save(rating);
		
		calculateNewAverageRatingScore(rating.getActivity().getId());

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {

		if (!ratingRepository.existsById(id)) {
			return new ResponseEntity<>("Das Rating existiert nicht", HttpStatus.NOT_FOUND);
		}
		Optional<Rating> rating = ratingRepository.findById(id);

		Activity activity = rating.get().getActivity();
		activity.getListOfRatings().remove(rating.get());

		ratingRepository.deleteById(id);
		activityRepository.save(activity);

		calculateNewAverageRatingScore(activity.getId());

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	public void calculateNewAverageRatingScore(Long activityId) {

		List<Rating> listOfRatingsOfActivity = ratingRepository.findByActivityId(activityId);
		
		double averageScore = listOfRatingsOfActivity.stream()
				.mapToDouble(r -> r.getScore()).average().orElse(0.0);
		
		Optional<Activity> someActivity = activityRepository.findById(activityId);

		if (someActivity.isPresent()) {
			someActivity.get().setAverageRatingScore((double) (Math.round(averageScore * 10) / 10.0));
			activityRepository.save(someActivity.get());
		}
	}
}
