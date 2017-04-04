import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ServiceWebpart.module.scss';
import * as strings from 'serviceWebpartStrings';
import { IServiceWebpartWebPartProps } from './IServiceWebpartWebPartProps';

//import * as $ from 'jquery'
//import 'jqueryui';

import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import { IService, IServices } from "../../Contract/IContracts";
import { SPComponentLoader } from '@microsoft/sp-loader';


export default class ServiceWebpartWebPart extends BaseClientSideWebPart<IServiceWebpartWebPartProps> {


  public constructor() {
    super();
    
    //jquery-ui.js dev
    //SPComponentLoader.loadScript('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=bB%2br4XHRPUyfegbZyY%2bw7rVFSOyfuj4INZ0KnKxjez4%3d&docid=2_1d38bf63004bd452fa7ef86f43e197cc0&rev=1');
    //SPComponentLoader.loadScript('https://globalsupplies.sharepoint.com/sites/developer/_layouts/15/guestaccess.aspx?guestaccesstoken=VqjifC63ClCh%2bDmSaVwsgvFyJhhlSclgYxDNjNMFn%2f0%3d&docid=2_1aaee16821c42419489367c3c1f8d42c5&rev=1');
    
    //script.js dev
    //SPComponentLoader.loadScript('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=emYrKYtzVLyOdqQ8di%2fSHIeERmiZgDAZwXjsTuO%2fti0%3d&docid=2_1195d6e14e826424a97b9438f5b3ff3f0&rev=1');
    //SPComponentLoader.loadScript('/sites/developer/siteassets/files/Js/script.js');
    
    //style.css dev
    //SPComponentLoader.loadCss('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=qR8uYzpZeCVF83K5A0jxnRBFGqLDZY%2bysNGI0JmEBGY%3d&docid=2_16f799b1c5c30411381cb7bfebbcc99bc&rev=1');
    //SPComponentLoader.loadCss('https://globalsupplies.sharepoint.com/sites/developer/_layouts/15/guestaccess.aspx?guestaccesstoken=FF79WXUN99s5IhhMihAEr6D08ENAQZ6HVy6GRcjzJH4%3d&docid=2_1d4187b20d27f4768bde8a735fcf2baa6&rev=1');

    //style2.css dev
    //SPComponentLoader.loadCss('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=lIKWxY6KYZFXWL6qZJkQitdkPclS2%2fWhspAXCLheWsE%3d&docid=2_01cb5505e35c241fa976a1fef0f0ea068&rev=1');
    //SPComponentLoader.loadCss('https://globalsupplies.sharepoint.com/sites/developer/_layouts/15/guestaccess.aspx?guestaccesstoken=ZMZ0uYENtlKHfAxP79F4Y%2bSXcQy2KaUPtC8VOyUyY40%3d&docid=2_160e1322067194acbb24e6928fd33a3f5&rev=1');
    
    //jquery-ui.css dev
    //SPComponentLoader.loadCss('https://conteq.sharepoint.com/sites/Developer-03/_layouts/15/guestaccess.aspx?guestaccesstoken=Nezhm5kRsolXZw%2bgPXWTk3%2bJCQs25cF1H%2bSwmQY2RgM%3d&docid=2_1fcb7b62e5ae44899a99e02a12819a72f&rev=1');  
    //SPComponentLoader.loadCss('https://globalsupplies.sharepoint.com/sites/developer/_layouts/15/guestaccess.aspx?guestaccesstoken=K3MZFwu%2fb5msp%2bPSpIuJNydL3azo3s71gD0FM1PU0DM%3d&docid=2_1fa8bae41904b414488f5cc3ddedd1488&rev=1');
}

  public render(): void {
    this.domElement.innerHTML = `<div class="webwrapper_right_main">
							<div class="download_btn">Download Playbook</div>
							<div class="webwrapper_right">
								<div class="webwrapper_right_text">
									<h2>${escape(this.properties.title)}</h2>
									<p>${escape(this.properties.description)}</span></p>
								</div>
								<div class="scroll_container">
									<div class="prev">
										<img src= "${this.context.pageContext.web.absoluteUrl}/SiteAssets/files/Images/back.png">
									</div>
									<div class="web_wrapper_scroll_main">
										<div class="web_wrapper_scroll">
                    
                    </div>
                    </div>
									<div class="next">
										<img src="${this.context.pageContext.web.absoluteUrl}/SiteAssets/files/Images/back1.png">
									</div>
								</div>
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

  private _renderListItem(items: IService[]): void {
    let html: string = '';
    const bodyContainer: Element = this.domElement.querySelector('.webwrapper_right_main');
    items.forEach((item: IService) => {
      html += `
                  
            
            <div class="${item.CssClass}" id="${item.ServiceID}">
												<img src="${item.ImageUrl}" class="${item.ImageCssClass}">
												<p class="p_clr1">${item.Title}</p>
											</div>`;
    bodyContainer.innerHTML += `${item.Body}`;
    });

    const listContainer: Element = this.domElement.querySelector('.web_wrapper_scroll');
        
    listContainer.innerHTML = html;

    SPComponentLoader.loadScript(this.context.pageContext.web.absoluteUrl +'/siteassets/files/Js/script.js');
    
  }

private _getListData(): Promise<IServices> {
  return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('${escape(this.properties.listName)}')/items`, SPHttpClient.configurations.v1)
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
                PropertyPaneTextField('title', {
                label: 'Title'
            }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listName', {
                label: 'List Name'
            }),
              ]
            }
          ]
        }
      ]
    };
  }
}
