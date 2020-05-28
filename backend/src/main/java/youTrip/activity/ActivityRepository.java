package youTrip.activity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

	List<Activity> findByCityId(Long cityId);

	List<Activity> findByCityIdAndAverageRatingScoreBetween(Long cityId, Double averageScoreMin, Double averageScoreMax);

	List<Activity> findByAverageRatingScoreBetween(Double averageScoreMin, Double averageScoreMax);

	List<Activity> findByActivityCategory(ActivityCategory category);

	List<Activity> findByCityIdAndActivityCategory(Long cityId, ActivityCategory category);

}
