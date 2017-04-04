import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MainGrids.module.scss';
import * as strings from 'mainGridsStrings';
import { IMainGridsWebPartProps } from './IMainGridsWebPartProps';

import { IGrid,IGrids} from "./Models/IContracts";
import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';

export default class MainGridsWebPart extends BaseClientSideWebPart<IMainGridsWebPartProps> {

  public constructor() {
    super();   
    //SPComponentLoader.loadCss('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=qR8uYzpZeCVF83K5A0jxnRBFGqLDZY%2bysNGI0JmEBGY%3d&docid=2_16f799b1c5c30411381cb7bfebbcc99bc&rev=1'); 
    //SPComponentLoader.loadCss('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=49sNjwRcRM7WFYaR4e0j26r9bPlzGA6Di9CBemzje%2bU%3d&docid=2_11cb5505e35c241fa976a1fef0f0ea068&rev=1');
  }

  public render(): void {
   this.domElement.innerHTML = `<div class="grids"></div>`;
      this._renderListItemAsync(); 
  }

private _renderListItemAsync(): void {

      this._getListData()
        .then((response) => {
          this._renderListItem(response.value);

        });
    
  }

  private _renderListItem(items: IGrid[]): void {
    let html: string = '';
    items.forEach((item: IGrid) => {
      html += `<div class="grid1">
                <a href="${item.Link}" style="text-decoration:none">
                  <div class="grid_img">
                    <img src="${item.ImageUrl}" alt="icon1">
                  </div>
                  <div class="grid_para">
                    <h3 class="grid_header">${item.Title}</h3>
                    <p>${item.Description}</p>
                  </div>
                  <div class="grid_border"></div>
                </a>
              </div>`;
    });

    const listContainer: Element = this.domElement.querySelector('.grids');
    listContainer.innerHTML = html;
  }

  private _getListData(): Promise<IGrids> {
  return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('Grids')/items`, SPHttpClient.configurations.v1)
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
