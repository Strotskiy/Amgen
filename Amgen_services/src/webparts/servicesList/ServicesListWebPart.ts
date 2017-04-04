import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ServicesList.module.scss';
import * as strings from 'servicesListStrings';
import { IServicesListWebPartProps } from './IServicesListWebPartProps';
import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import { IServiceList, IServicesList } from "../../Contract/IContracts";
import { SPComponentLoader } from '@microsoft/sp-loader';



export default class ServicesListWebPart extends BaseClientSideWebPart<IServicesListWebPartProps> {


public constructor() {
    super();
    
    //SPComponentLoader.loadScript('https://code.jquery.com/jquery-3.1.1.js');

    //lity dev
    //SPComponentLoader.loadScript('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=Ta4VIVejKYKYaXjZFOwNkQy0yMo6sqrKm%2bj9GC6Imzc%3d&docid=2_1c91008964e11472f8c7ce8761c0da152&rev=1');
    //SPComponentLoader.loadScript('https://globalsupplies.sharepoint.com/sites/developer/_layouts/15/guestaccess.aspx?guestaccesstoken=yvElfcrdpcYF%2fH35jouIgs%2b2kFWkPdW04d4ozprSCIY%3d&docid=2_1ace853335897435782688625c72f80aa&rev=1');
    
    //lity.min.css dev
    //SPComponentLoader.loadCss('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=460A3SCTgD%2fez5RMnrBN99ZCsltZvhLe2qsES2wWdpA%3d&docid=2_11b587b58fc0b47c4a1f0e5d61569097b&rev=1');
    //SPComponentLoader.loadCss('https://globalsupplies.sharepoint.com/sites/developer/_layouts/15/guestaccess.aspx?guestaccesstoken=HvzJiF1Km9xOjUpreNUgcY%2fNylFyB%2fRQ5gIl2o1oh00%3d&docid=2_16ec93d9813f24bb5865036e6b203dc28&rev=1');
    
    //style2.css dev
    //SPComponentLoader.loadCss('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=lIKWxY6KYZFXWL6qZJkQitdkPclS2%2fWhspAXCLheWsE%3d&docid=2_01cb5505e35c241fa976a1fef0f0ea068&rev=1');
    //SPComponentLoader.loadCss('https://globalsupplies.sharepoint.com/sites/developer/_layouts/15/guestaccess.aspx?guestaccesstoken=ZMZ0uYENtlKHfAxP79F4Y%2bSXcQy2KaUPtC8VOyUyY40%3d&docid=2_160e1322067194acbb24e6928fd33a3f5&rev=1');

 }

  public render(): void {
    this.domElement.innerHTML = `<div class="inner_mid_LOS"></div>`;
    this._renderListItemAsync(); 
  }



 private _renderListItemAsync(): void {

      this._getListData()
        .then((response) => {
          this._renderListItem(response.value);
        });
    
  }

  private _renderListItem(items: IServiceList[]): void {
    let html: string = '';
    items.forEach((item: IServiceList) => {
      html += `
          <div class="${item.CssClass}">
							<img src="${item.ImageUrl}" alt=""/>
							<h3>${item.Title}</h3>
							<p>${item.Description}</p>
							<a href="${item.LinkButton}"><div class="LOS_btn">Select</div></a>
						</div>`;
    });

    const listContainer: Element = this.domElement.querySelector('.inner_mid_LOS');
    listContainer.innerHTML = html;
  }

private _getListData(): Promise<IServicesList> {
  return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('ListServices')/items`, SPHttpClient.configurations.v1)
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
