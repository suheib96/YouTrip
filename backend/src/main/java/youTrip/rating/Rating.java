package youTrip.rating;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.Setter;
import youTrip.activity.Activity;

@Entity
@Getter
@Setter
public class Rating {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	@Column(nullable = false)
	private double score;
	
	@NotBlank
	private String comment;	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "activity_id")
	@JsonBackReference
	private Activity activity;
}
