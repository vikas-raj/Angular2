import { ILike } from "./ILike";
import { IComment } from "./IComment";

export interface IJobDetails {
    jobDetailId: number;
    aboutTheCompany: string;
    companyName: string;
    companyWebsite: string;
    jobLocation: string;
    position: string;
    salary: string;
    interviewVenue: string;
    eligibilityCriteria: string;
    howToApply: string;
    registrationLink: string;
    importantNote: string;
    eventDate: Date;
    lastDateToApply: Date;
    experienceRequired: string,
    likes: ILike[],
    comments: IComment[]
}

