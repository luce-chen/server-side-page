/**
 * PageInfo
 getDatafunc: call data function  (this function need to cal data total count, data is displayed in HTML )
 totalCount: data total count
 dataCountPerPage: data count per page
 dataStart: this page start data
 bottonPageName: create main page divId
 topPagName: create mini page divId
 --------------------------------------------------------
ex:
1. construct new page:
     let ApiPage = new Page({
        varName: "ApiPage",
        getDatafunc: "GetData('page', 'api')",
        totalCount: 0,
        dataCountPerPage: 20,
        dataStart: 0,
        bottonPageName: "mainPageApiDiv",
        topPagName: "miniPageApiDiv"
    })
    ApiPage.InitialSetting();

 2. fist or reconstruct page: generally, put in getDatafunc
    ApiPage.SaveDataStart(0);
    ApiPage.ConstructPagination();
    ApiPage.SaveTotalCount(totalCount);

 3. how to write getDatafunc?
    you can call ApiPage.dataStart and ApiPage.dataCountPerPage
    backend code: mysql/mariadb: limit {dataStart} {dataCountPerPage}
    notice: pay attention order of sql data
 **/


class Page {
    constructor({
                    varName,
                    getDatafunc,
                    totalCount,
                    dataCountPerPage = 20,
                    dataStart = 0,
                    bottonPageName,
                    topPagName = null
                } = {}) {
        this.varName = varName;
        this.getDatafunc = getDatafunc;
        this.totalCount = totalCount;
        this.dataCountPerPage = dataCountPerPage;
        this.dataStart = dataStart;
        this.bottonPageName = bottonPageName;
        this.topPagName = topPagName;
        this.randomId = `${parseInt(Math.random() * 10000)}`;
    }

    InitialSetting() {
        document.getElementById(this.bottonPageName).innerHTML = `<nav class="mb-0">\
            <ul id="Pagination_b_${this.randomId}" class="pagination justify-content-center"></ul>\
        </nav>`;
        if (this.topPagName) {
            document.getElementById(this.topPagName).innerHTML = `\
        <label class="col-form-label col-auto">每頁顯示</label>\
        <div class="col-auto px-0">\
        <input type="number" value="${this.dataCountPerPage}" min="1" onchange="${this.varName}.SaveDataCountPerPage(this.value);${this.varName}.ConstructPagination();${this.getDatafunc};" class="form-control" style="width: 100px">\
        </div>\
        <label class="col-form-label col-auto">筆</label>\
        <div class="col-auto ml-auto pr-0">\
            <span id="pageCount_t_${this.randomId}" class="float-right mt-1 text-muted"></span>\
        </div>\
        <div class="col-auto"><nav class="mb-0" aria-label="Page navigation">\
                <ul id="Pagination_t_${this.randomId}" class="pagination pagination-sm d-none">\
                    <li class="page-item"><a class="page-link" href="javascript:void(0)" onClick="changePage=${this.varName}.PrePage(); if(changePage)${this.getDatafunc};">Previous</a></li>\
                    <li class="page-item"><a class="page-link" href="javascript:void(0)" onClick="changePage=${this.varName}.NextPage(); if(changePage)${this.getDatafunc}">Next</a></li>\
                </ul>\
            </nav></div>`;
        } else {
        }
    }


    ConstructPagination() {
        if (this.totalCount > 0) {
            document.getElementById(`Pagination_t_${this.randomId}`).classList.remove("d-none");
            let totalPage = Math.ceil(parseInt(this.totalCount) / this.dataCountPerPage);
            let finalPage = (totalPage > 10) ? 5 : totalPage;
            let Pagination_b = $(`#Pagination_b_${this.randomId}`);
            document.getElementById(`Pagination_b_${this.randomId}`).innerHTML = "";
            document.getElementById(`pageCount_t_${this.randomId}`).innerHTML = `Page 1/${totalPage}`;
            if (this.totalCount !== 0) {
                Pagination_b.append(`<li id="Previous_b_${this.randomId}" class="page-item"><a class="page-link" href="javascript:void(0)" onClick="changePage=${this.varName}.PrePage(); if(changePage) ${this.getDatafunc}">Previous</a></li>`);
                Pagination_b.append(`<li id="FirstPage_b_${this.randomId}" class="page-item"><a class="page-link d-none" href="javascript:void(0)" onclick="${this.varName}.LogChangePage(this.innerHTML), ${this.getDatafunc}">1</a></li>`);
                Pagination_b.append(`<li id="PreMore_b_${this.randomId}" class="page-item"><div class="pagination-link d-none">...</div></li>`);
            }

            for (let i = 1; i <= finalPage; i++) {
                if (i == 1) {
                    Pagination_b.append(`<li id="Page1_b_${this.randomId}" class="page-item"><span class="page-link">${i}</span></li>`);
                } else {
                    Pagination_b.append(`<li id="Page${i}_b_${this.randomId}" class="page-item"><a class="page-link" href="javascript:void(0)" onclick="${this.varName}.LogChangePage(this.innerHTML), ${this.getDatafunc}">${i}</a></li>`);
                }
            }

            // ...、LastPage、NextPage
            if (totalPage > 10) {
                Pagination_b.append(`<li id="NextMore_b_${this.randomId}" class="page-item"><div class="pagination-link">...</div></li>`);
                Pagination_b.append(`<li id="LastPage_b_${this.randomId}" class="page-item"><a class="page-link" href="javascript:void(0)" onclick="${this.varName}.LogChangePage(this.innerHTML), ${this.getDatafunc}">${totalPage}</a></li>`);
            }
            Pagination_b.append(`<li id="Next_b_${this.randomId}" class="page-item"><a class="page-link" href="javascript:void(0)" onClick="changePage=${this.varName}.NextPage(); if(changePage)${this.getDatafunc}">Next</a></li>`);

            $(`#Page1_b_${this.randomId}`).addClass("active");
        } else {
            document.getElementById(`Pagination_b_${this.randomId}`).innerHTML = "";
            document.getElementById(`pageCount_t_${this.randomId}`).innerHTML = "";
            document.getElementById(`Pagination_t_${this.randomId}`).classList.add("d-none");
        }
    }

    SaveDataCountPerPage(dataCountPerPage) {
        this.dataCountPerPage = parseInt(dataCountPerPage);
    }

    SaveDataStart(dataStart) {
        this.dataStart = parseInt(dataStart);
    }

    SaveTotalCount(totalCount) {
        this.totalCount = parseInt(totalCount);
    }

    PrePage() {
        let activePage = parseInt($(`#${this.bottonPageName} li.active span`)[0].innerHTML) - 1;
        if (activePage !== 0) {
            this.LogChangePage(activePage);
            return true
        } else {
            return false
        }
    }

    NextPage() {
        let totalPage = Math.ceil(parseInt(this.totalCount) / parseInt(this.dataCountPerPage));
        let activePage = parseInt($(`#${this.bottonPageName} li.active span`)[0].innerHTML) + 1;
        console.log(activePage, totalPage)
        if (activePage <= totalPage) {
            this.LogChangePage(activePage);
            return true
        } else {
            return false
        }
    }

    LogChangePage(page) {
        let countStart = (parseInt(page) * this.dataCountPerPage) - this.dataCountPerPage;
        this.SaveDataStart(countStart);
        let activePage = $(`#Pagination_b_${this.randomId} li.active span`)[0];
        let pageValue = parseInt(page);
        let totalPage = Math.ceil(parseInt(this.totalCount) / this.dataCountPerPage);
        let j = 0;
        let i = 0;
        document.getElementById(`pageCount_t_${this.randomId}`).innerHTML = `Page ${page}/${totalPage}`;
        //取消被標藍底的頁數
        $(`#Pagination_b_${this.randomId} li.active`)[0].innerHTML = `<a class="page-link" href="javascript:void(0)" onclick="${this.varName}.LogChangePage(this.innerHTML), ${this.getDatafunc}">${activePage.innerHTML}</a>`;
        $(`#Pagination_b_${this.randomId} li.active`)[0].className = "page-item";

        if (totalPage > 10) {
            //頁數接近1，隱藏...符號
            if (pageValue < 4) {
                $(`#PreMore_b_${this.randomId} :first-child`).addClass("d-none");
                $(`#FirstPage_b_${this.randomId} :first-child`).addClass("d-none");
            } else if (pageValue == 4) {
                $(`#PreMore_b_${this.randomId} :first-child`).addClass("d-none");
                $(`#FirstPage_b_${this.randomId} :first-child`).removeClass("d-none");
            } else {
                $(`#PreMore_b_${this.randomId} :first-child`).removeClass("d-none");
                $(`#FirstPage_b_${this.randomId} :first-child`).removeClass("d-none");
            }
            //頁數接近max，隱藏...符號
            if (pageValue > (totalPage - 3)) {
                $(`#NextMore_b_${this.randomId} :first-child`).addClass("d-none");
                $(`#LastPage_b_${this.randomId} :first-child`).addClass("d-none");

            } else if (pageValue == (totalPage - 3)) {
                $(`#NextMore_b_${this.randomId} :first-child`).addClass("d-none");
                $(`#LastPage_b_${this.randomId} :first-child`).removeClass("d-none");
            } else {
                $(`#NextMore_b_${this.randomId} :first-child`).removeClass("d-none");
                $(`#LastPage_b_${this.randomId} :first-child`).removeClass("d-none");
            }
            let newPageMax = 0

            if ((pageValue - 2) < 1) {
                i = 1;
                newPageMax = 5;
            } else if ((pageValue + 2) >= totalPage) {
                i = totalPage - 4;
                newPageMax = totalPage;
            } else {
                i = pageValue - 2;
                newPageMax = pageValue + 2;
            }

            //動態重新增加頁數
            for (i; i <= newPageMax; i++) {
                j++;
                document.getElementById(`Page${j}_b_${this.randomId}`).getElementsByClassName("page-link")[0].innerHTML = i;

            }
            //找出使用者點選的頁數並標成藍底
            for (let k = 1; k <= 5; k++) {
                if (document.getElementById(`Page${k}_b_${this.randomId}`).getElementsByClassName("page-link")[0].innerHTML == pageValue) {
                    document.getElementById(`Page${k}_b_${this.randomId}`).innerHTML = `<span class="page-link">${pageValue}</span>`;
                    document.getElementById(`Page${k}_b_${this.randomId}`).className = "page-item active";
                }
            }


        } else {
            activePage.innerHTML = `<a class="page-link" href="javascript:void(0)" onclick="${this.varName}.LogChangePage(this.innerHTML), ${this.getDatafunc}">${activePage.innerHTML}</a>`;
            activePage.className = "page-item";
            $(`#Page${pageValue}_b_${this.randomId}`).addClass("active");
            document.getElementById(`Page${pageValue}_b_${this.randomId}`).innerHTML = `<span class="page-link">${pageValue}</span>`;
        }
    }


}
