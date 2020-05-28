import { City } from '../city'
import { Rating } from '../main/Rating/rating';
import { Contact } from './contact';


export interface Activity {
    
    id?: number;
    name?: string;
    city?: City;
    activityCategory?: string;
    street?: string;
    houseNumber?: string;
    zipCode?: string;
    contactDetails?: Contact;
    description?: String
    listOfRatings?: Rating[];
    readonly averageRatingScore?: number;
}