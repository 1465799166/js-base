// 获取输入日期一个月后的时间
function getNextMonth(time) {
    var arr = time.split(/-|\//),
        year = arr[0],
        month = arr[1],
        other = arr[2];
    //增加一个月的范围
    if (month == 12) {
        year++;
        month = 1;
    } else {
        month++;
    }
    //增加之后小于两位用0补
    if (month < 10) {
        month = "0" + month;
    }
    return arr[0] + "/" + arr[1] + "/" + arr[2] + " - " + year + "/" + month + "/" + other;
}

// 鼠标滚轮实现图片缩放
function zoomImg(obj) {
    var zoom = parseInt(obj.style.zoom, 10) || 100;
    zoom += event.wheelDelta / 12;
    if (zoom > 0)
        obj.style.zoom = zoom + '%';
    return false;
}

// 解决JQuery多次点击执行多次的问题
$('#btn').unbind('click');

$('#btn').bind('click', function () {

    alert('仅提示一次！');

});

// 判断变量是否为字符串、数组
Object.prototype.toString.call(String) === "[object String]" || "[object Array]"

// 获取url中携带的参数
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

// 格式化时间
function dateFtt(fmt, date) {
    var o = {
        "M+": date.getMonth() + 1, //月份   
        "d+": date.getDate(), //日   
        "h+": date.getHours(), //小时   
        "m+": date.getMinutes(), //分   
        "s+": date.getSeconds(), //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//创建时间格式化显示
function crtTimeFtt(value) {
    var crtTime = new Date(value);
    return dateFtt("yyyy-MM-dd hh:mm:ss", crtTime); //直接调用公共JS里面的时间类处理的办法     
}
// value为一下值
var date = new Date() //date参数可以是一个时间戳

// cookie设置
const cookieUtils = {
    set: function(name, value, days) {
        var d = new Date;
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    },
    get: function(name) {
        var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    },
    delete: function(name) {
        this.set(name, '', -1);
    }
}

// dom class操作
function doClass() {
    var e = document.getElementsByClassName('test-class')
    // 添加类
    e[0].classList.add('test-add')
    // 删除类
    e[0].classList.remove('test-add')
    // 有则删除，无则添加
    e[0].classList.toggle('test-add')
    // 判断是否有
    e[0].classList.contains('test-add')
}

// 判断是否为PC端
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ['Android', 'iPhone',
        'SymbianOS', 'Windows Phone',
        'iPad', 'iPod'
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

// 获取数组最大值、最小值
function getMaxAndMin(numbers) {
    var maxInNumbers = Math.max.apply(Math, numbers); 
    var minInNumbers = Math.min.apply(Math, numbers);
}
