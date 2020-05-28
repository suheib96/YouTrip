import { Activity } from 'src/app/Activity/activity';

export interface Rating {

    id?: number;
    score: number;
    comment: string;
    activity?: Activity;
}