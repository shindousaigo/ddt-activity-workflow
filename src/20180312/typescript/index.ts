declare interface Window {
    cdnPath: string,
    urlPath: string,
    callJsFun: Function
} 

function assign(w, k, v) {
    w[k] = v
}
var enter = $('#enter').prop('href')
function enterServer() {
    open(enter)
}
!window.cdnPath && assign(window, 'cdnPath', '.');
!window.urlPath && assign(window, 'urlPath', (function () {
    var arr = location.href.split('/')
    var str = arr[0] + '//'
    var len = arr.length - 1
    for (var i = 2; i < len; i++) {
        str += arr[i] + '/'
    }
    return str
})());
!document.title && assign(document, 'title', "春天来啦_踏青好时光_新活动强势来袭_弹弹堂官网_第七大道弹弹堂官方网站_无需下载的Q版对战网页游戏");
window.callJsFun = (param) => {
    switch (param) {
        case '1':
            location.href = window.urlPath + 'page.html#0'
            break;
        case '2':
            location.href = window.urlPath + 'page.html#1'
            break;
        case '3':
            location.href = window.urlPath + 'page.html#2'
            break;
        case '4':
            location.href = window.urlPath + 'page.html#3'
            break;
        case '5':
            enterServer()
            break;
        case '6':
            break;
    }
}














