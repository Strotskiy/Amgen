export interface IServiceList {
    Title: string;
    Description: string;
    ImageUrl: string;
    LinkButton: string;
    CssClass:string;
}

export interface IServicesList{
  value: IServiceList[];
}

export interface IService{
  Title: string;
  ImageUrl: string;
  ServiceID:string;
  CssClass:string;
  Body:string;
  ImageCssClass:string;
}

export interface IServices{
  value: IService[];
}