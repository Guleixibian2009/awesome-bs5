"use strict";
$(document).ready(function(){
    //First get the main article div
    const Article = document.getElementById("Main");
    const AritcleChildren = Article.getElementsByTagName("*");
    var HeadingList = [];
    //Then get all h3/h4 elements and put them into an array
    for (let i = 0; i < AritcleChildren.length; i++) {
        const el = AritcleChildren.item(i);
        if (el.nodeName == "H2" || el.nodeName == "H3" || el.nodeName == "H4") {
            HeadingList[HeadingList.length] = el;
        }
    }
    //Next turn them into <li> and give them correct classes
    var OutputList = `<h3 class="lead mx-auto">Table Of Contents</h3><ul id="TOC" class="list-unstyled">`
    HeadingList.forEach(el => {
        if (el.nodeName == "H2"){
            var outputClass = "ps-2";
            el.id = $(el).text();
        }
        else if (el.nodeName == "H3"){
            var outputClass = "ps-3";
            el.id = $(el).text();
        } else if (el.nodeName == "H4"){
            var outputClass = "ps-4";
            el.id = $(el).text();
        }
        var output = `<li class="${outputClass}"><button class="text-secondary btn btn-sm btn-outline-light p-1 border-0 rounded">${el.innerHTML}</button></li>`
        OutputList = OutputList + output;
    });
    OutputList = OutputList + `</ul>`;
    //Finally output!
    $("nav#TOC").html(OutputList);


    //First highlight the first <li> by giving it an extra class
    $("nav#TOC ul li button:first").removeClass("text-secondary");
    $("nav#TOC ul li button:first").addClass("text-primary");
    //On Scroll, go through the array
    $(window).scroll(function(){
        for (let index = 0; index < HeadingList.length; index++) {
            //Get the element's distance to the top
            var heading = HeadingList[index];
            var OffsetY = heading.getBoundingClientRect().top;
            //If it's smaller than 50 and bigger than -50
            if (OffsetY < 50 && OffsetY > -50){
                $("li button.text-primary").addClass("text-secondary");
                $("li button.text-primary").removeClass("text-primary");
                $($(`nav#TOC ul li`).eq(index)).children("button").addClass("text-primary");
                $($(`nav#TOC ul li`).eq(index)).children("button").removeClass("text-secondary");
            }
            //Highlight it and remove the older one
        }
    });

    //When clicked, get the id and it's YOffSet
    $("nav#TOC li").click(function(){
        var raw = $(this).text();
        var heading = document.getElementById(raw);
        var headingY = heading.offsetTop;
        //Use jQuery.scrollTo to create a linear animation
        $.scrollTo(headingY-40,800);
    });

    $("nav#TOC h3").click(function(){
        $.scrollTo(0,800);
    });
});