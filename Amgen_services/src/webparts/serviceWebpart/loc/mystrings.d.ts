declare interface IServiceWebpartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'serviceWebpartStrings' {
  const strings: IServiceWebpartStrings;
  export = strings;
}
