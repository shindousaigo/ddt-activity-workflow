declare interface Window {
	cdnPath: string,
	urlPath: string,
	callJsFun: Function
}

function assign(w, k, v) {
	w[k] = v
}
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
!document.title && assign(document, 'title', "黑暗幻境_新版本9.9_新活动强势来袭_弹弹堂官网_第七大道弹弹堂官方网站_无需下载的Q版对战网页游戏");
window.callJsFun = (param) => {
	switch (param) {
		case '5':
			enterServer()
			break;
		default:
			pop.show()
			cover.show()
			pic.eq(param - 1).show().siblings().hide()
			break;
	}
}
var cover = $('.cover')
var enter = $('#enter').prop('href')
var pop = $('#popup')
var pic = $('.pic')
var cls = $('.close')

cls.click(function () {
	pop.hide()
	cover.hide()
})















