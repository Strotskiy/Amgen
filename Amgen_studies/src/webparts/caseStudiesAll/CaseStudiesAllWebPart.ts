import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './CaseStudiesAll.module.scss';
import * as strings from 'caseStudiesAllStrings';
import { ICaseStudiesAllWebPartProps } from './ICaseStudiesAllWebPartProps';
import { IStudiesList, IStudies } from "../../Contracts/IContracts";

import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';

export default class CaseStudiesAllWebPart extends BaseClientSideWebPart<ICaseStudiesAllWebPartProps> {


public constructor() {
    super();
    

    //SPComponentLoader.loadCss('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=Nezhm5kRsolXZw%2bgPXWTk3%2bJCQs25cF1H%2bSwmQY2RgM%3d&docid=2_1fcb7b62e5ae44899a99e02a12819a72f&rev=1');
    //SPComponentLoader.loadCss('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=qR8uYzpZeCVF83K5A0jxnRBFGqLDZY%2bysNGI0JmEBGY%3d&docid=2_16f799b1c5c30411381cb7bfebbcc99bc&rev=1');
    //SPComponentLoader.loadCss('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=49sNjwRcRM7WFYaR4e0j26r9bPlzGA6Di9CBemzje%2bU%3d&docid=2_11cb5505e35c241fa976a1fef0f0ea068&rev=1');
  }

  public render(): void {
    this.domElement.innerHTML = `<div class="casestudies_content">
 						

      </div>`;
      this._renderListItemAsync("");
      
  }


private _renderListItemAsync(order:string): void {

      this._getListData(order)
        .then((response) => {
          this._renderListItem(response.value);

        });
    
  }

  private _renderListItem(items: IStudies[]): void {
    let html: string = `
    <div class="case_video_galery_head_sort">
                        <div class="case_video_galery_head">
                            <h3><a href="${this.context.pageContext.web.absoluteUrl}/Pages/video_casestudies_video.aspx">Videos</a> / <span>Case Studies</span></h3><div class="case_studies_grids">
                        </div>
                        <div class="case_video_galery_sort">
                            <div class="dropdown sort">
                                <button class="dropbtn">Sort by <span><img src="${this.context.pageContext.web.absoluteUrl}/SiteAssets/files/Images/arrowb.png"></span></button>
                                <div class="dropdown-content">
                                    <a id="byName" href="#">Name</a>
                                    <a id="byLatest" href="#">Latest</a>

                                </div>
                            </div>
                        </div>
                    </div>
    
    `;
    console.log(items.length);
    let flag:number=0;
    items.forEach((item: IStudies) => {
      flag++;
      if(flag%6){
      html += `<a href="case_studies_client.aspx?ID=${item.ID}">
							<div class="case_studies_grid">
 								<img src="${item.ImageUrl}">
 								<h4>${item.Title}</h4>
 								<p>${item.Descriptions}</p>
 							</div>
							</a>`;

      
      }
      else{
        html+='</div>'
      html+='<div class="case_studies_grids">'
      html += `<a href="case_studies_client.aspx?ID=${item.ID}">
							<div class="case_studies_grid">
 								<img src="${item.ImageUrl}">
 								<h4>${item.Title}</h4>
 								<p>${item.Descriptions}</p>
 							</div>
							</a>`;
      
      }
      
      
    });

    const listContainer: Element = this.domElement.querySelector('.casestudies_content');
    html+='</div>'    
    listContainer.innerHTML = html;

     jQuery("#byName").click((e) => { this._renderListItemAsync("Title");; })
     jQuery("#byLatest").click((e) => { this._renderListItemAsync("");; })
    
  }

private _getListData(order:string): Promise<IStudiesList> {
  if(order=="")order="Created desc";
  return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('Studies')/items?$top=100&$orderby="+order, SPHttpClient.configurations.v1)
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
