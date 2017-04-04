import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './CaseStudiesLatestVideo.module.scss';
import * as strings from 'caseStudiesLatestVideoStrings';
import { ICaseStudiesLatestVideoWebPartProps } from './ICaseStudiesLatestVideoWebPartProps';
import { IVideo, IVideoList } from "../../Contracts/IContracts";
import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as Lity from 'lity';

export default class CaseStudiesLatestVideoWebPart extends BaseClientSideWebPart<ICaseStudiesLatestVideoWebPartProps> {

public constructor() {
    super();
    
//SPComponentLoader.loadScript('https://code.jquery.com/jquery-3.1.1.js');
    //SPComponentLoader.loadCss('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=460A3SCTgD%2fez5RMnrBN99ZCsltZvhLe2qsES2wWdpA%3d&docid=2_11b587b58fc0b47c4a1f0e5d61569097b&rev=1');
    //SPComponentLoader.loadCss('//cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.2/css/swiper.min.css');
    //SPComponentLoader.loadCss('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=lIKWxY6KYZFXWL6qZJkQitdkPclS2%2fWhspAXCLheWsE%3d&docid=2_01cb5505e35c241fa976a1fef0f0ea068&rev=1');
  }
  public render(): void {
    this.domElement.innerHTML = `<div class="CS_right_content">
						<div class="latest_vd">Latest Video<span><a href="${this.context.pageContext.web.absoluteUrl}/Pages/video_casestudies.aspx">View All</a></span></div>
						<div class="lv_contents">
            
            </div>
					</div>`;
          this._renderListItemAsync();
  }


private _renderListItemAsync(): void {

      this._getListData()
        .then((response) => {
          this._renderListItem(response.value);

        });
    
  }

  private _renderListItem(items: IVideo[]): void {
    let html: string = '';
    console.log(items.length);
    items.forEach((item: IVideo) => {
      html += `          
                <div class="lv_contents1">
								<div class="lv_contents1_left" src="${item.VideoUrl}">
									<img src="${item.ImageUrl}" width="138" height="95" alt=""/>
								</div>
								<div  class="lv_contents1_right">
									<h5>${item.Title}</h5>
									<p>${item.Descriptions}</p>
								</div>
							</div>
                `;
    });

    const listContainer: Element = this.domElement.querySelector('.lv_contents');
        
    listContainer.innerHTML = html;
    
  }

private _getListData(): Promise<IVideoList> {
  return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('Video')/items?$top=5&$orderby=Created desc`, SPHttpClient.configurations.v1)
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
