package youTrip.rating;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository extends JpaRepository<Rating, Long>{

	List<Rating> findByActivityId(Long activityId);
	
}
