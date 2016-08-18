# FDatetime-HZC 时间选择器，时间控件

## 简介

因公司需求，顺手做的时间控件，感觉还不错，放出来供大家使用。

## 外观

![截图](https://fangxianzheng.github.io/demo/FDatetime-HZC/demo1-screenshot.png)

## 示例

![扫一扫](https://fangxianzheng.github.io/demo/FDatetime-HZC/demo1.png)
[日期空间效果](https://fangxianzheng.github.io/demo/FDatetime-HZC/demo1)

## 依赖

IScroll <https://github.com/cubiq/iscroll>
zepto <https://github.com/madrobby/zepto>


## 使用方法

在页面中引入所需的样式和JS文件

`<link rel="stylesheet" type="text/css" href="FDatetime.css" />`
`<script src="FDatetime.js"></script>`

````
 var o = new FDatetime({
            startTime:'2016/1/19 8:20:00',
            endTime:'2017/01/3',
            scrollEnd:function(date, dateZh){

            },
            onSelected:function(date, dateZh){
                console.log( date)
                console.log( dateZh)
            },
            onCancel: function(date, dateZh){

            }
        })
````

## 参数列表

|       参数        |   说明   |  默认值 |      可填值     |
|------------------|----------|--------|----------------|
| startTime              | 开始时间   | 无 （必填）    | 时间对象，如:new Date(); 时间字符串，如: '2016/8/12 19:26:00' |
| endTime               | 结束时间    | 无（必填）     | 时间对象，如:new Date(); 时间字符串，如: '2016/8/12 19:26:00'     |
| scrollEnd            | 滚动结束时的function |  function(date, dateZh)   |    随便写，date为英文时间按字符串，dateZh为中文时间字符串   |
| onSelected      | 选择时间按后执行的function   | function(date, dateZh)） | 随便写，date为英文时间按字符串，dateZh为中文时间字符串|
| onCancel        | 选择时间按后执行的function   | function(date, dateZh)） | 随便写，date为英文时间按字符串，dateZh为中文时间字符串|

注意：时间字符串不要写
`
'2016-8-12 19:26:00'
`
safari浏览器不支持（苹果真是开发中的IE，各种特例独行），没有其他大的兼容性，控件简单，有问题自己改改。

## 注意事项

IScroll不能需要计算容器的长宽，所以初始化时不能把控件设置成`display:none`；如果必须隐藏，请将控件移除界面或者用
`
position: "absolute";visibility: "hidden"; display: "block"
`
代替`display:none`

## 优点

就是简单，没什么优点，顺手写的；

## 缺点

* 因为赶时间，用了zepto
* 每行都要new两次Date对象，所以时间跨度最好不要超过一年（视觉设计决定的，我也没办法），超过三年，将会明显感觉到卡顿。


