/**
 * Created by fangxianzheng on 2016/7/6.
 */


;(function(win){
    var FDatetime = function(opts){
        this.startY = opts.startY
        this.endY = opts.enderY

    }

    FDatetime.prototype = {
        totleDays:function(){
            var self = this;
            var startTime, endTime, startDay, endDay;
            startTime = getTime(self.startY)
            endTime = getTime(self.endY)
            startDay = startTime / 1000 / 60 / 60 / 24;
        }
    }

    /********工具函数************************************/

    function getTime(dateStr){
        return new Date(dateStr).getTime();
    }

    win.FDatetime = FDatetime;
})(window,undefined)


var o = new FDatetime({
    startY:'2016-8-8',
    enderY:'2017-9-3'
})


















var yearScroll = new IScroll('#fd-year',{
    snap: true
})

/*
yearScroll.on('scrollEnd',function(){
    console.log(yearScroll.currentPage)
})
*/

