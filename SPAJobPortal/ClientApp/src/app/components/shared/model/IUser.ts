import { IFileUpload } from "./IFileUpload";

export interface User {
    UserName: string;
    Password: string;
    Email: string;
    FirstName: string;
    LastName: string;
    ProfilePicture: IFileUpload
}