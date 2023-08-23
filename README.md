# server-side-page
Bootstrap 4 Server-Side Pagination Tool
It is a utility that helps you generate server-side pagination with Bootstrap 4 styles. 
It's designed to work seamlessly with your custom data fetching function, enabling users to navigate through paginated data easily.


## Usage
### 1. construct new page:
```javascript
let variablePage = new Page({
                varName: "variablePage", //class variable
                getDatafunc: "GetData()", //get backend data function
                totalCount: 0, //data total count
                dataCountPerPage: 20, //per page data count
                dataStart: 0, //data start number
                bottonPageName: "mainPageDiv", //main page div id
                topPagName: "miniPageDiv" // mini page div id
        });
variablePage.InitialSetting();
```
### 2. fist or reconstruct page: generally, put in getDatafunc
```javascript
variablePage.SaveDataStart(0);
variablePage.ConstructPagination();
variablePage.SaveTotalCount(totalCount);
```
###  3. how to write getDatafunc?
    you can call variablePage.dataStart and variablePage.dataCountPerPage
    backend code: mysql/mariadb: limit {dataStart} {dataCountPerPage}
    notice: pay attention order of sql data
    

## Customization
PageInfo provides options for customizing the appearance and behavior of the pagination. You can adjust the number of pages displayed, hide certain elements, and more. Explore the code comments and experiment with the settings to tailor the tool to your needs.
