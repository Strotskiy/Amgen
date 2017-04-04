
import { IServiceList,IService } from "../Contract/IContracts";

class ServiceList implements IServiceList {
    Title: string;
    Description: string;
    ImageUrl: string;
    LinkButton: string;
    CssClass:string;
}

class Service implements IService {
    Title: string;
    ImageUrl: string;
    ServiceID:string;
    CssClass:string;
    Body:string;
    ImageCssClass:string;
}