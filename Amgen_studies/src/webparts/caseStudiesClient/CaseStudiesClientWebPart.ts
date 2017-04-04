import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './CaseStudiesClient.module.scss';
import * as strings from 'caseStudiesClientStrings';
import { ICaseStudiesClientWebPartProps } from './ICaseStudiesClientWebPartProps';


import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { IStudiesList, IStudies } from "../../Contracts/IContracts";

export default class CaseStudiesClientWebPart extends BaseClientSideWebPart<ICaseStudiesClientWebPartProps> {

public constructor() {
    super();
    

    //SPComponentLoader.loadCss('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=Nezhm5kRsolXZw%2bgPXWTk3%2bJCQs25cF1H%2bSwmQY2RgM%3d&docid=2_1fcb7b62e5ae44899a99e02a12819a72f&rev=1');
    //SPComponentLoader.loadCss('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=qR8uYzpZeCVF83K5A0jxnRBFGqLDZY%2bysNGI0JmEBGY%3d&docid=2_16f799b1c5c30411381cb7bfebbcc99bc&rev=1');
    //SPComponentLoader.loadCss('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=49sNjwRcRM7WFYaR4e0j26r9bPlzGA6Di9CBemzje%2bU%3d&docid=2_11cb5505e35c241fa976a1fef0f0ea068&rev=1');
  }
  public render(): void {
    this.domElement.innerHTML = `<section class="CS_client_content"></section>
    
    <section class="prev_next_button">
					<div class="case_studies_prev">
											
					</div>
					<div class="case_studies_next">
						
					</div>
				</section>`;
    this._renderListItemAsync();
    this._renderNextListItemAsync();
    this._renderPrevListItemAsync();
  }

private getQueryStringValue(key:string){
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

//Main 
private _renderListItemAsync(): void {

      this._getListData()
        .then((response) => {
          this._renderListItem(response);
        });    
  }

  private _getListData(): Promise<IStudies> {
  let id:string = this.getQueryStringValue("ID");
  return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('Studies')/items(`+id+')', SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {
      return response.json();
    });
}
private _renderListItem(item: IStudies): void {
    let html: string = '';
    console.log(item.ID);
      html += `
					<!--this is only for left content-->
					<div class="CS_client_left">
						<div class="CS_client_main_head">
							<h2>${item.Title}</h2>
							<img src="${item.ImageUrl}" width="436" height="248" alt=""/>
						</div>
					</div>
					
					<!--this is only for right content-->
					<div class="CS_client_right">
          ${item.ClientContent}						
					</div>`;

    const listContainer: Element = this.domElement.querySelector('.CS_client_content');        
    listContainer.innerHTML = html;
    
  }

//End main

//Next
  private _renderNextListItemAsync(): void {

      this._getNextItemData()
        .then((response) => {
          this._renderNextListItem(response.value);
        });    
  }  

   private _renderNextListItem(items: IStudies[]): void {
    let html: string = '';
    console.log(items.length);
    items.forEach((item: IStudies) => {
      html += `<p>At vero eos et accusamus </p>
						<div class="next_btn"><a href="${this.context.pageContext.web.absoluteUrl}/Pages/case_studies_client.aspx?ID=${item.ID}">Next</a> </div><!--next button-->
                `;
    });
    const listContainer: Element = this.domElement.querySelector('.case_studies_next');        
    listContainer.innerHTML = html;    
  }

private _getNextItemData(): Promise<IStudiesList> {
  let id:string = this.getQueryStringValue("ID");
  return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('Studies')/items?$filter=ID gt "+id+"&$top=1&$orderby=ID asc", SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {
      return response.json();
    });
}
//End Next


//Prev
  private _renderPrevListItemAsync(): void {

      this._getPrevItemData()
        .then((response) => {
          this._renderPrevListItem(response.value);
        });    
  }  

   private _renderPrevListItem(items: IStudies[]): void {
    let html: string = '';
    console.log(items.length);
    items.forEach((item: IStudies) => {
      html += `
      <p>At vero eos et accusamus </p>
						<div class="prev_btn"><a href="${this.context.pageContext.web.absoluteUrl}/Pages/case_studies_client.aspx?ID=${item.ID}">Prev</a> </div><!--next button-->

                `;
    });
    const listContainer: Element = this.domElement.querySelector('.case_studies_prev');        
    listContainer.innerHTML = html;    
  }

private _getPrevItemData(): Promise<IStudiesList> {
  let id:string = this.getQueryStringValue("ID");
  return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('Studies')/items?$filter=ID lt "+id+"&$top=1&$orderby=ID desc", SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {
      return response.json();
    });
}
//End Prev

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
