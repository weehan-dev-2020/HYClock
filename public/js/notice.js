const notice_pages = {};

const setPage = (page) => {
    const pageToShow = notice_pages[page];
    for(notice of pageToShow){
        const index  = pageToShow.indexOf(notice);
        const notice_div = document.querySelector( `#notice${index}`);
        const notice_date = notice_div.querySelector(".notice-date");
        const notice_link = notice_div.querySelector(".notice-link");
        notice_date.innerText = notice.date;
        notice_link.innerText = notice.title;
        notice_link.setAttribute("href", notice.href_url);
    }
}

const setNoticeList = (data) => {
    notice_pages.page1 = data.noticeList.slice(0,5);
    notice_pages.page2 = data.noticeList.slice(5, 10);
    notice_pages.page3 = data.noticeList.slice(10);
}

const getNoticeInfo = (url) => {
    fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8",
        }
    })
    .then(async (response) => {
        const data = await response.json();
        setNoticeList(data);
        setPage("page1");
    })
    .catch((error) => {
        console.error(error)
    })
};

const changeBtnColor = function(other_page1, other_page2) {
    this.classList.add("active-btn");
    other_page1.classList.remove("active-btn");
    other_page2.classList.remove("active-btn");
}

const loadNotice = () => {
    const url = 'https://hyclock.hanyang.life/notice/';
    getNoticeInfo(url);
    const page1  = document.querySelector("#notice-page1");
    const page2  = document.querySelector("#notice-page2");
    const page3  = document.querySelector("#notice-page3");
    page1.classList.add("active-btn");

    page1.addEventListener("click", setPage.bind(null, "page1"));
    page2.addEventListener("click", setPage.bind(null, "page2"));
    page3.addEventListener("click", setPage.bind(null, "page3"));
    page1.addEventListener("click", changeBtnColor.bind(page1, page2, page3));
    page2.addEventListener("click", changeBtnColor.bind(page2, page1, page3));
    page3.addEventListener("click", changeBtnColor.bind(page3, page1, page2));
}

window.addEventListener("load", loadNotice);