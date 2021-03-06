/**
 * Created by fangxianzheng on 2016/7/6.
 */


;(function(win, IScroll){

    var yearScroll, hourScroll ,minuteScroll;

    var FDatetime = function(opts){
        this.options = opts;
        this.startDate = new Date(opts.startTime);
        this.startHour = this.startDate.getHours();
        this.startMinutes = this.startDate.getMinutes();
        this.endDate = new Date(opts.endTime);
        if(opts.defaultTime){
            this.defaultDate = new Date(opts.defaultTime);
            if(this.defaultDate.getTime() < this.startDate.getTime()){
                console.error('默认时间不能比开始时间小')
            }else if(this.defaultDate.getTime() > this.endDate.getTime()){
                console.error('默认时间不能比结束时间大')
            }
        }


        this.inseritLi()
    }

    FDatetime.prototype = {
        createYearLi:function(){
            var self = this;
            var startTime = self.startDate.getTime();
            var endTime =  self.endDate.getTime();
            var millisecondSpan = endTime - startTime;
            var endTimeDays =  Math.ceil(endTime/1000/3600/24);
            var startTimeDays = Math.floor(startTime/1000/3600/24);
            var daySpan = endTimeDays - startTimeDays + 1;
            var dayMillisecond = 3600 * 24 * 1000;
            var dayTime = startTime - dayMillisecond;
            var html = '<li></li>\n<li></li>\n<li></li>';
            for(var i=0; i < daySpan; i++){
                dayTime += dayMillisecond;
                html += '<li data-date="'+ calculate(dayTime).normal +'">' + calculate(dayTime).zh + '</li>\n'
            }
            html = html +'<li></li>\n<li></li>\n<li></li>';
            return html
        },
        createHourLi:function(){
            var self = this;
            var html = '<li></li>\n<li></li>\n<li></li>';
            for(var i = 0; i< 24; i++){
                i = i<10 ? '0' + i : i;
                html += '<li data-date=' + i + '>' + i + '时</li>'
            }
            html = html +'<li></li>\n<li></li>\n<li></li>';
            return html;
        },
        createMinute:function(){
            var self = this;
            var html = '<li></li>\n<li></li>\n<li></li>';
            for(var j = 0; j< 60; j++){
                j = j<10 ? '0' + j : j;
                html += '<li data-date='+ j + '>' + j + '分</li>'
            }
            html = html +'<li></li>\n<li></li>\n<li></li>';
            return html;
        },
        inseritLi:function(){
            var self = this;
            $('#fd-year ul').html(self.createYearLi())
            yearScroll = new IScroll('#fd-year',{
                snap: 'li'
            });
            $('#fd-hour ul').html(self.createHourLi());
            hourScroll = new IScroll('#fd-hour',{
                snap: 'li'
            });
            $('#fd-minute ul').html(self.createMinute());
            minuteScroll = new IScroll('#fd-minute',{
                snap: 'li'
            });

            //选中默认小时和分钟

            if(self.defaultDate){

                var startDayTime = getMilliseconds(self.startDate);
                var defaultDayTime = getMilliseconds(self.defaultDate);
                var daysSapn = parseInt((defaultDayTime - startDayTime) / (1000 * 60 * 60 * 24));

                yearScroll.goToPage(0,daysSapn)
                console.log(yearValueFn())


                hourScroll.goToPage(0, self.defaultDate.getHours())
                minuteScroll.goToPage(0, self.defaultDate.getMinutes())
            }else{
                hourScroll.goToPage(0, self.startHour)
                minuteScroll.goToPage(0, this.startMinutes)
            }


            document.getElementById('fd-contain').addEventListener('touchmove',function (e) { e.preventDefault(); }, false);

           self.onScrollEnd();

            if(self.options.onSelected){
                document.getElementById('fd-ok').addEventListener('click',function(e){
                    self.options.onSelected(self.onScrollEnd().dateValue, self.onScrollEnd().dateValueZh)
                },false)
            }
            if(self.options.onCancel){
                document.getElementById('fd-cancel').addEventListener('click',function(e){
                    self.options.onCancel(self.onScrollEnd().dateValue, self.onScrollEnd().dateValueZh)
                },false)
            }
        },
        onScrollEnd: function(){
            var self = this;


            var dateValueFn = function(){
                var dateValue = yearValueFn() +' ' +  hourValueFn() + ':' + minuteValueFn();
                var yearValueZh = new Date(yearValueFn());
                var dateValueZh =(yearValueZh.getMonth()+ 1) + '月' + yearValueZh.getDate() + '日 ' +  hourValueFn() + ':' + minuteValueFn();


                //执行设置中的scrollEnd方法
                if(self.options.scrollEnd){
                    self.options.scrollEnd(dateValue , dateValueZh)
                }
                return {dateValue:dateValue, dateValueZh:dateValueZh};
            };
            yearScroll.on('scrollEnd',function(e){
                dateValueFn()

            });
            hourScroll.on('scrollEnd',function(e){
                dateValueFn()
            });
            minuteScroll.on('scrollEnd',function(e){
                dateValueFn()
            });

            return dateValueFn()
        }

    };

    /********私有方法************************************/
    function calculate(dayTime, type){
        var dayDate = new Date(dayTime);
        //var toLocaleDateString = dayDate.toLocaleDateString();     //safari和IOS下不兼容，显示为中文（好过头了）
        var toLocaleDateString = dayDate.getFullYear() + '/' + (dayDate.getMonth() +1 ) + '/' + dayDate.getDate();
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
        return dateType = {
            zh:month + '月' + date + '日 ' + day ,
            normal: toLocaleDateString
        }
    }
    function index($itemEle, scrollHeight){
        var itemHeight = $itemEle.height();
        var index = Math.round(-scrollHeight/itemHeight) + 3;
        return index;
    }
    function yearValueFn() {
        var scrollHeight = yearScroll.y;
        var yearIndex = index($('#fd-year li'), scrollHeight);
        var yearValue = $('#fd-year li').eq(yearIndex).data('date');
        return yearValue;
    }
    function hourValueFn(){
        var scrollHeight = hourScroll.y;
        var hourIndex = index($('#fd-hour li'),scrollHeight);
        var hourValue = $('#fd-hour li').eq(hourIndex).data('date');
        return hourValue
    }
    function minuteValueFn(){
        var scrollHeight = minuteScroll.y;
        var minuteIndex = index($('#fd-minute li'),scrollHeight);
        var minuteValue = $('#fd-minute li').eq(minuteIndex).data('date');
        return minuteValue
    }

    //纯粹日期毫秒数
    function getMilliseconds(dateObj){
        var getFullYear = dateObj.getFullYear();
        var getMonth = dateObj.getMonth();
        var getDate = dateObj.getDate();
        return new Date(getFullYear, getMonth, getDate).getTime();
    }


    win.FDatetime = FDatetime;
})(window,IScroll,undefined);
