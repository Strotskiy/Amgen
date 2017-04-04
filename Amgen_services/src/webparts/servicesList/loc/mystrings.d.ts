declare interface IServicesListStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'servicesListStrings' {
  const strings: IServicesListStrings;
  export = strings;
}
