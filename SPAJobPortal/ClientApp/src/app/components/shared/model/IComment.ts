import { IJobDetails } from "./IJobDetails";

export interface IComment {
    commentId: number,
    userName: string,
    comentedDate: Date,
    commentDiscription: string,
    JobDetailFK: number,
    //isActive: boolean
}
