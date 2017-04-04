import { IBanner, IBannerList } from "../Contracts/IContracts";


class Banner implements IBanner {
    Title: string;
    Descriptions: string;
    VideoUrl: string;
    ImageUrl: string;
}