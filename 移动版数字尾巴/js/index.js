Zepto(function($){
			var banner = $('.banner');
            var imgbox = $('.imgbox');
            var buttons = $('#buttons span');
            var pre=$(".pre");
            var next=$(".next");
            var index = 0;
            var len = 5;
            var interval = 3000;
            var timer;
            var  deviceWidth= parseInt(document.documentElement.clientWidth); 
            if(deviceWidth > 750) deviceWidth = 750; 
            document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
            

            function animate (offset) {

                var newleft = parseInt(imgbox.css('left')) + offset;

                imgbox.animate({'left': newleft+"px"},600,"ease-out",function(){
                    if(newleft >-200){
                        imgbox.css('left', -deviceWidth*len+"px");
                    }
                    if(newleft <-deviceWidth * len) {
                        imgbox.css('left', -deviceWidth+"px");
                    }  
                });
                 
            }

            function showButton() {
                buttons.eq(index).addClass('on').siblings().removeClass('on');
            }

            function play() {
                timer = setTimeout(function () {
                    banner.trigger("swipeLeft");
                    play();
                }, interval);
            }

            buttons.each(function () {
                 $(this).tap(function () {
                     if ( $(this).attr('class')=='on') {
                         return false;
                     }
                     var myIndex = parseInt($(this).attr('index'));
                     var offset = -deviceWidth * (myIndex - index);
                     animate(offset);
                     index = myIndex;
                     showButton();
                 })
            })

            banner.swipeLeft(function(){
                    if($(this).attr("class")=="on"){
                        return false;
                    }
                    if (index == 4) {
                    index = 0;
                }
                else {
                    index += 1;
                }
                    animate(-deviceWidth);
                    showButton();
                })
            

             banner.swipeRight(function(){
                    if($(this).attr("class")=="on"){
                        return false;
                    }
                    if (index == 0) {
                    index = 4;
                }
                else {
                    index -= 1;
                }
                    animate(deviceWidth);
                    showButton();
                })
            play();

            //banner部分代码结束
           $(".nav_open").tap(
            function(){
               $(".nav").addClass("show");
                $(".main").addClass("push");
           })
          
          
})