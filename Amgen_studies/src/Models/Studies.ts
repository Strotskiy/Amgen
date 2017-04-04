import { IStudies, IStudiesList } from "../Contracts/IContracts";


class Studies implements IStudies {
    ID:number;
    Title: string;
    Descriptions: string;
    ImageUrl: string;
    ClientContent:string;
}