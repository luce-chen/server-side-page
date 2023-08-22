# server-side-page
Bootstrap 4 Server-Side Pagination Tool
It is a utility that helps you generate server-side pagination with Bootstrap 4 styles. 
It's designed to work seamlessly with your custom data fetching function, enabling users to navigate through paginated data easily.


## Usage


## Example
Here's how to use the Page tool example:
```javascript
let infoPage = new Page({
    varName: "infoPage",
    getDatafunc: "GetData('page', 'api')",
    totalCount: 0,
    dataCountPerPage: 20,
    dataStart: 0,
    bottonPageName: "mainPageApiDiv",
    topPagName: "miniPageApiDiv"
});
infoPage.InitialSetting();
```
## Customization
PageInfo provides options for customizing the appearance and behavior of the pagination. You can adjust the number of pages displayed, hide certain elements, and more. Explore the code comments and experiment with the settings to tailor the tool to your needs.
