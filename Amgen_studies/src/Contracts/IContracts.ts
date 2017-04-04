export interface IBanner {
    Title: string;
    Descriptions: string;
    VideoUrl: string;
    ImageUrl: string;
    

}

export interface IBannerList{
  value: IBanner[];
}


export interface IStudies {
    ID:number;
    Title: string;
    Descriptions: string;
    ImageUrl: string;
    ClientContent:string;
    

}

export interface IStudiesList{
  value: IStudies[];
}

export interface IVideo {
    Title: string;
    Descriptions: string;
    ImageUrl: string;
    VideoUrl: string;
    

}

export interface IVideoList{
  value: IVideo[];
}