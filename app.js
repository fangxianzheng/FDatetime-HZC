/**
 * Created by fangxianzheng on 2016/7/6.
 */


;(function(win, IScroll){
    var FDatetime = function(opts){
        this.startDate = new Date(opts.startTime);
        this.endDate = new Date(opts.endTime);
        this.defaultDate = new Date(opts.defaultTime);
        this.inseritLi()
    }

    FDatetime.prototype = {
        createYearLi:function(){
            var self = this;
            var startTime = self.startDate.getTime();
            var endTime =  self.endDate.getTime();
            var millisecondSpan = endTime - startTime;
            var daySpan = Math.ceil(millisecondSpan /1000/3600/24);
            var dayMillisecond = 3600 * 24 * 1000;
            var dayTime = startTime - dayMillisecond;
            var html = '<li></li>\n<li></li>\n<li></li>';
            for(var i=0; i<daySpan;i++){
                dayTime += dayMillisecond;
                html += '<li data-date="'+ calculate(dayTime, 'normal') +'">' + calculate(dayTime, 'zh') + '</li>\n'
            }
            html = html +'<li></li>\n<li></li>\n<li></li>';
            return html
        },
        createHourLi:function(){
            var self = this;
            var j = 1;
            var html = '<li></li>\n<li></li>\n<li></li>';
            for(var i = 0; i< 24; i++){
                j++
                i = i<10 ? '0' + i : i;
                html += '<li>' + i + '</li>'
            }
            console.log(html)
        },
        inseritLi:function(){
            var self = this;
            $('#fd-year ul').html(self.createLi())
            var yearScroll = new IScroll('#fd-year',{
                snap: 'li'

            })
        }
    }

    /********私有方法************************************/
    function calculate(dayTime, type){
        var dayDate = new Date(dayTime);
        var toLocaleDateString = dayDate.toLocaleDateString();
        var getHours = dayDate.getHours();
        var getMinutes = dayDate.getMinutes();
        var getSeconds = dayDate.getSeconds();

        var month = dayDate.getMonth();
        var date = dayDate.getDate();
        var day = dayDate.getDay();
        month = month + 1;
        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;
        switch (day){
            case 0:
                day = '周日';
                break;
            case 1:
                day = '周一';
                break;
            case 2:
                day = '周二';
                break;
            case 3:
                day = '周三';
                break;
            case 4:
                day = '周四';
                break;
            case 5:
                day = '周五';
                break;
            case 6:
                day = '周六';
                break
        }
        if(/zh/.test(type)){
            return month + '月' + date + '日 ' + day;
        }else if(/normal/.test(type)){
            return toLocaleDateString + ' ' + getHours + ':' + getMinutes + ':' +  getSeconds;
        }

    }



    win.FDatetime = FDatetime;
})(window,IScroll,undefined)


var o = new FDatetime({
    startTime:'2017-8-8',
    endTime:'2017-9-3',
    defaultTime:'2016-9-10 10:00:00'
})








