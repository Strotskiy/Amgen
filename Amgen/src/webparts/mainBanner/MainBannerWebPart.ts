import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MainBanner.module.scss';
import * as strings from 'mainBannerStrings';
import { IMainBannerWebPartProps } from './IMainBannerWebPartProps';
import * as jQuery from 'jquery';

import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';


import * as Swiper from 'swiper';

import { IBanner,IBanners} from "./Models/IContracts";

import * as Lity from 'lity';

export default class MainBannerWebPart extends BaseClientSideWebPart<IMainBannerWebPartProps> {

  public constructor() {
    super();
    
    //SPComponentLoader.loadScript('https://code.jquery.com/jquery-3.1.1.js');

    

    //lity.min.css dev
    //SPComponentLoader.loadCss('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=460A3SCTgD%2fez5RMnrBN99ZCsltZvhLe2qsES2wWdpA%3d&docid=2_11b587b58fc0b47c4a1f0e5d61569097b&rev=1');
    //SPComponentLoader.loadCss('/sites/developer/SiteAssets/files/Plagins/Lity/lity.min.css');

    //SPComponentLoader.loadCss('//cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.2/css/swiper.min.css');

    //style2.css dev
    //SPComponentLoader.loadCss('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=lIKWxY6KYZFXWL6qZJkQitdkPclS2%2fWhspAXCLheWsE%3d&docid=2_01cb5505e35c241fa976a1fef0f0ea068&rev=1');
    //SPComponentLoader.loadCss('/sites/developer/SiteAssets/files/css/style2.css');

    //lity dev
    //SPComponentLoader.loadScript('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=Ta4VIVejKYKYaXjZFOwNkQy0yMo6sqrKm%2bj9GC6Imzc%3d&docid=2_1c91008964e11472f8c7ce8761c0da152&rev=1');
    //SPComponentLoader.loadScript('/sites/developer/SiteAssets/files/Plagins/Lity/lity.min.js');

}

  public render(): void {
    this.domElement.innerHTML = `<div class="swiper-container">
        <div class="swiper-wrapper">
            
        </div>
        <div class="swiper-pagination" id="index_button"></div>
    </div>`;
    this._renderListItemAsync(); 
  }

  //private metodts
  private _renderListItemAsync(): void {

      this._getListData()
        .then((response) => {
          this._renderListItem(response.value);
          
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
        });
    
  }

  private _renderListItem(items: IBanner[]): void {
    let html: string = '';
    items.forEach((item: IBanner) => {
      html += `<div class="swiper-slide slider_text" style="background:url(${item.ImageUrl}) no-repeat;background-size: cover;background-position: center;">
						      <h4>${item.Title}</h4>
                  <p>${item.Description}</p>
                  <div class="slider_button"><a href="${item.VideoUrl}" data-lity >Watch Video</a></div>
					</div>`;
    });

    const listContainer: Element = this.domElement.querySelector('.swiper-wrapper');
    listContainer.innerHTML = html;
  }

private _getListData(): Promise<IBanners> {
  return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('${escape(this.properties.listTitle)}')/items`, SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {
      return response.json();
    });
}




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
                }),
                PropertyPaneTextField('listTitle', {
                label: 'List title'
            }),
              ]
            }
          ]
        }
      ]
    };
  }
}
