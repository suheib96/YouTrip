package youTrip.activity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import youTrip.city.City;
import youTrip.rating.Rating;

@Entity
@Getter
@Setter
public class Activity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Enumerated(EnumType.STRING)
	private ActivityCategory activityCategory;

	@NotNull
	@NotBlank
	@Column(nullable = false)
	private String name;
	
	@Embedded
	private Contact contactDetails;
	
	private String description;
	private String street;
	private String houseNumber;
	private String zipCode;

	@OneToMany(mappedBy = "activity", fetch=FetchType.EAGER, cascade = CascadeType.REMOVE)
	private List<Rating> listOfRatings;

	@ManyToOne
	@JoinColumn(name = "city_id", nullable = false)
	private City city;

	private double averageRatingScore = 0.0;
	
}
