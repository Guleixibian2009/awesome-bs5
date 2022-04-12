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
    var OutputList = `<div class="sticky-top pt-2"><div class="heading d-grid" style="place-content: center !important;"><p class="h3 lead">Table Of Contents</p></div><ul id="TOC" class="list-unstyled">`
    var heading=0, subheading=0, subsubheading=0;
    HeadingList.forEach(el => {
        if (el.nodeName == "H2"){
            heading+=1
            var outputNum = `${heading}. `
            var outputClass = "ps-2";
            el.id = $(el).text();
        }
        else if (el.nodeName == "H3"){
            subheading+=1
            var outputNum = `${heading}.${subheading} `
            var outputClass = "ps-3";
            el.id = $(el).text();
        } else if (el.nodeName == "H4"){
            subsubheading+=1
            var outputNum = `${heading}.${subheading}.${subsubheading} `
            var outputClass = "ps-4";
            el.id = $(el).text();
        }
        var output = `<li class="${outputClass}"><button class="text-secondary btn btn-sm btn-outline-light p-1 border-0 rounded">${outputNum}${el.innerHTML}</button></li>`
        OutputList = OutputList + output;
    });
    OutputList = OutputList + `</ul></div>`;
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
        var raw = $(this).text().replace(/\d.\d.\d\s/,"").replace(/\d.\d\s/,"").replace(/\d.\s/,"");
        console.log(raw);
        var heading = document.getElementById(raw);
        var headingY = heading.offsetTop;
        //Use jQuery.scrollTo to create a linear animation
        $.scrollTo(headingY-40,200);
    });

    $("nav#TOC h3").click(function(){
        $.scrollTo(0,200);
    });
});