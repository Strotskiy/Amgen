import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MainRightPanel.module.scss';
import * as strings from 'mainRightPanelStrings';
import { IMainRightPanelWebPartProps } from './IMainRightPanelWebPartProps';

import { IRightPanelItem,IRightPanelItems} from "./Models/IContracts";
import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';
export default class MainRightPanelWebPart extends BaseClientSideWebPart<IMainRightPanelWebPartProps> {

public constructor() {
    super();   
    //SPComponentLoader.loadCss('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=qR8uYzpZeCVF83K5A0jxnRBFGqLDZY%2bysNGI0JmEBGY%3d&docid=2_16f799b1c5c30411381cb7bfebbcc99bc&rev=1'); 
  }
  
  public render(): void {
    this.domElement.innerHTML = `<div class="content-right"></div>`;
      this._renderListItemAsync(); 
  }

private _renderListItemAsync(): void {

      this._getListData()
        .then((response) => {
          this._renderListItem(response.value);

        });
    
  }

  private _renderListItem(items: IRightPanelItem[]): void {
    let html: string = '';
    items.forEach((item: IRightPanelItem,index:number) => {
      let className : string;
      className = "content-right-box"+(index+1);
      html += `
              <div class="`+className+`">
              <div class="content-right-box-text">
                <h4>${item.Title}</h4>
                <p>${item.Description}</p>
              </div>
              <div class="box_button"><a href="${item.Link}">Start</a></div>
            </div>`;
    });

    const listContainer: Element = this.domElement.querySelector('.content-right');
    listContainer.innerHTML = html;
  }

  private _getListData(): Promise<IRightPanelItems> {
  return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('RightPanel')/items`, SPHttpClient.configurations.v1)
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
