/**
 * Created by fangxianzheng on 2016/7/6.
 */

/*

;(function(win){
    var FDatetime = function(opts){
        this.startTime = opts.startTime
        this.endTime = opts.endTime

    }

    FDatetime.prototype = {

    }

    /!********工具函数************************************!/

    function getTime(dateStr){
        return new Date(dateStr).getTime();
    }

    win.FDatetime = FDatetime;
})(window,undefined)


var o = new FDatetime({
    startTime:'2016-8-8',
    endTime:'2017-9-3',
    defaultTime:'2016-9-10 10:00:00'
})
*/





var now = new Date();
var endDate = new Date('2017-07-16 10:20:59');
var nowTime = now.getTime();
var endTime = endDate.getTime();
var millisecondSpan = endTime - nowTime;

var daySpan = Math.ceil(millisecondSpan /1000/3600/24);

var html = '';
var dayMillisecond = 3600 * 24 * 1000;
var dayTime = nowTime - dayMillisecond;
for(var i=0; i<daySpan;i++){
    dayTime += dayMillisecond;
    html += '<li>' + calculate(dayTime) + '</li>\n'
}
$('#fd-year ul').html(html)


function calculate(dayTime){
    var dayDate = new Date(dayTime);

    var month = dayDate.getMonth();
    var date = dayDate.getDate();
    var day = dayDate.getDay();
    month = month + 1;
    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;
    switch (day){
        case 0:
            day = '周日'
            break
        case 1:
            day = '周一'
            break
        case 2:
            day = '周二'
            break
        case 3:
            day = '周三'
            break
        case 4:
            day = '周四'
            break
        case 5:
            day = '周五'
            break
        case 6:
            day = '周六'
            break
    }

    return month + '月' + date + '日 ' + day;
}




var yearScroll = new IScroll('#fd-year',{
    snap: 'li'

})


