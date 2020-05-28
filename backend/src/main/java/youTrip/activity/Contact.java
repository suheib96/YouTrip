package youTrip.activity;

import java.io.Serializable;

import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;

@SuppressWarnings("serial")
@Embeddable
@Getter
@Setter
public class Contact implements Serializable {

	private String website;
	private String emailAddress;
	private String phoneNumber;
	
}
 