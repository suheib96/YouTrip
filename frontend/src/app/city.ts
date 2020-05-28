import { Activity } from './Activity/activity';

export interface City {
    id?:number;
    name?:string;
    listOfActivity?: Activity[];
    
}