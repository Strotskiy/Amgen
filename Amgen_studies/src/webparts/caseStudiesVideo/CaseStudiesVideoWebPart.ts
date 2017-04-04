import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './CaseStudiesVideo.module.scss';
import * as strings from 'caseStudiesVideoStrings';
import { ICaseStudiesVideoWebPartProps } from './ICaseStudiesVideoWebPartProps';

import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { IVideo, IVideoList } from "../../Contracts/IContracts";
//import * as jQuery from 'jquery';
import * as Swiper from 'swiper';

export default class CaseStudiesVideoWebPart extends BaseClientSideWebPart<ICaseStudiesVideoWebPartProps> {

public constructor() {
    super();
    

    //SPComponentLoader.loadCss('/sites/Developer-03/SiteAssets/css/style.css');
    //SPComponentLoader.loadCss('/sites/Developer-03/SiteAssets/css/style2.css');
    //SPComponentLoader.loadCss('/sites/Developer-03/SiteAssets/css/jquery-ui.css');
    //SPComponentLoader.loadCss('//cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.2/css/swiper.min.css');

    //SPComponentLoader.loadScript('/sites/Developer-03/SiteAssets/Js/jquery-1.10.2.min.js');
    //SPComponentLoader.loadScript('/sites/Developer-03/SiteAssets/Js/jquery-ui.js');
    //SPComponentLoader.loadScript('/sites/Developer-03/SiteAssets/Js/script.j');
    //SPComponentLoader.loadScript('/sites/Developer-03/SiteAssets/Js/slider_vd.js');


  }
  public render(): void {
    this.domElement.innerHTML = `        <section class="content">
            <div class="casestudies_content_vid">
                <h3 style="border:none;"><span>Videos /</span> <a href="${this.context.pageContext.web.absoluteUrl}/Pages/video_casestudies.aspx">Case Studies</a></h3>
                <div class="case_video">
                    <div class="case_video_play_left">
						<div class="swiper-container vd_swipper_container">
							<div class="swiper-wrapper">
								
							</div>
							<div class="swiper-pagination" id="vd_CS_pagination"></div>

						</div>
                    </div>

                    <div class="case_video_play_right">
                        <div class="latest_video">
                            

                        </div>
                    </div>
                    <!-- case_video -->
                </div>
                <div class="case_video_galery">
                    <div class="case_video_galery_head_sort">
                        <div class="case_video_galery_head">
                            <h3>Video Gallery</h3>
                        </div>
                        <div class="case_video_galery_sort">
                            <div class="dropdown sort">
                                <button class="dropbtn">Sort by <span><img src="${this.context.pageContext.web.absoluteUrl}/SiteAssets/files/Images/arrowb.png"></span></button>
                                <div class="dropdown-content">
                                    <a id="byName" href="#">Name</a>
                                    <a  id="byLatest" href="#">Latest</a>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid video_grid1">
                    </div>

                    <div class="grid video_grid2">
                    </div>

                    <div class="grid video_grid3">
                   </div>

                </div>
            </div>
        </section>
       
        `;
        this._renderLatestVideosListItemAsync();
        this._renderBannerListItemAsync();
        this._renderAllVideoListItemAsync("");
        jQuery("#byName").click((e) => { this._renderAllVideoListItemAsync("Title");; })
        jQuery("#byLatest").click((e) => { this._renderAllVideoListItemAsync("");; })
  }


//Right content
  private _renderLatestVideosListItemAsync(): void {

      this._getLatestVideosListData()
        .then((response) => {
          this._renderLatestVideosListItem(response.value);

        });
    
  }

  private _renderLatestVideosListItem(items: IVideo[]): void {
    let html: string = '<h3>Latest Videos </h3>';
    console.log(items.length);
    items.forEach((item: IVideo) => {
      html += `<div class="case_video_thumb_main">
                                <div class="case_video_thumb_left" src="${item.VideoUrl}">
                                    <img src="${item.ImageUrl}">
                                </div>
                                <div class="case_video_thumb_right">
                                    <p class="blue">${item.Title}</p>
                                    <p class="gray">${item.Descriptions}</p>
                                </div>
                            </div>
                            <hr>`;
    });

    const listContainer: Element = this.domElement.querySelector('.latest_video');
        
    listContainer.innerHTML = html;
 
  }

private _getLatestVideosListData(): Promise<IVideoList> {
  return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('Video')/items?$top=2&$orderby=Created desc`, SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {
      return response.json();
    });
}
//Right content end

//Right content
  private _renderBannerListItemAsync(): void {

      this._getBannerListData()
        .then((response) => {
          this._renderBannerListItem(response.value);

        });
        const mySwiper = new Swiper(".swiper-container", {
			pagination: '.swiper-pagination',
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			paginationClickable: true,
			spaceBetween: 30,
			centeredSlides: true,
			autoplay: 2500,
			autoplayDisableOnInteraction: false
		});
    
  }

  private _renderBannerListItem(items: IVideo[]): void {
    let html: string = '';
    console.log(items.length);
    items.forEach((item: IVideo) => {
      html += `<div class="swiper-slide slider_vd_img1 slider_vd_text" src="${item.VideoUrl}">
                                    <div class="slide_content"> 
                                        <h4>${item.Title}</h4>
                                        <div class="play_icon"></div>
                                        <p>${item.Descriptions}</p>
                                    </div>
								</div>`;
    });

    const listContainer: Element = this.domElement.querySelector('.swiper-wrapper');
        
    listContainer.innerHTML = html;
    
  }

private _getBannerListData(): Promise<IVideoList> {
  return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('Video')/items?$top=2&$orderby=Created desc&$filter=IsBanner eq 1`, SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {
      return response.json();
    });
}
//Right content end


//All video content
  private _renderAllVideoListItemAsync(order:string): void {

      this._getAllVideoListData(order)
        .then((response) => {
          this._renderAllVideoListItem(response.value);

        });
    
  }

  private _renderAllVideoListItem(items: IVideo[]): void {
    let html1: string = "";
    let html2: string = "";
    let html3: string = "";
    let flag : number = 1;
    let row : number = 1;
    let grid:number = 0;
    console.log(items.length);
    items.forEach((item: IVideo) => {
      flag++;
      grid=flag-row;
      if(grid==3 ){
        row=row+3;
        html3+=`<div class="video_grid">
                            <div class="case_video_galery_left" src="${item.VideoUrl}">
                                <img src="${item.ImageUrl}">
                            </div>
                            <div class="case_video_galery_right">
                                <p class="blue">${item.Title}</p>
                                <p class="gray">${item.Descriptions}</p>
                            </div>
                        </div>`;
                        return;
      }
      if(grid == 2){
        html2+=`<div class="video_grid">
                            <div class="case_video_galery_left" src="${item.VideoUrl}">
                                <img src="${item.ImageUrl}">
                            </div>
                            <div class="case_video_galery_right">
                                <p class="blue">${item.Title}</p>
                                <p class="gray">${item.Descriptions}</p>
                            </div>
                        </div>`;
                        return;
      }
      if(grid ==1){
        html1+=`<div class="video_grid">
                            <div class="case_video_galery_left" src="${item.VideoUrl}">
                                <img src="${item.ImageUrl}">
                            </div>
                            <div class="case_video_galery_right">
                                <p class="blue">${item.Title}</p>
                                <p class="gray">${item.Descriptions}</p>
                            </div>
                        </div>`;
                        return;
      }
      
    });

    const listContainer1: Element = this.domElement.querySelector('.video_grid1');
    const listContainer2: Element = this.domElement.querySelector('.video_grid2');
    const listContainer3: Element = this.domElement.querySelector('.video_grid3');
        
    listContainer1.innerHTML = html1;
    listContainer2.innerHTML = html2;
    listContainer3.innerHTML = html3;
    debugger;
      /*jQuery(".case_video_thumb_left").click((e) => { 
        jQuery('.modal4').fadeIn();
        var src = jQuery(this).attr("src");
        jQuery('#videoSrc').attr("src",src);
        
      })


	jQuery(".modal4_close").click((e) => {
		  jQuery('.modal4').fadeOut();
	});*/
    
  }

private _getAllVideoListData(order:string): Promise<IVideoList> {
  if(order=="")order="Created desc";
  //if(order=="")order="Title";
  return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('Video')/items?$top=100&$orderby="+order, SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {
      return response.json();
    });
}
//All video end



  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
