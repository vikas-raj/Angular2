import { IJobDetails } from "./IJobDetails";

export interface ILike {
    likeId: number,
    userName: string,
    likedDate: Date,
    JobDetailFK: number
}