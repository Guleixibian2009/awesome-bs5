//Code Loader
"use strict";
$(document).ready(function(){
    const CodeBlocks = document.getElementsByClassName("code-load");
    if (CodeBlocks != null){
        for (let i = 0; i < CodeBlocks.length; i++) {
            const element = CodeBlocks[i];
            var codeLink = $(element).attr("data-code-link");
            var codeReq = new XMLHttpRequest();
            codeReq.onloadend = function(){
                var responseText = this.responseText;
                var parser = new DOMParser();
                var codeExample = parser.parseFromString(responseText,"text/xml");
                var code = codeExample.getElementsByTagName("codeExample")[0].innerHTML;
                $(element).find("code").html(code);
                setTimeout(Prism.highlightAll(), 100)
            };
            codeReq.open("GET",`codeExamples/${codeLink}.xml`);
            codeReq.send();
        }
    }
});

//iframe height helper
$(document).ready(function(){
    function SetHeight(){
        const iframe = document.getElementsByTagName("iframe");
        if (iframe != null){
            for (let i = 0; i < iframe.length; i++) {
                const el = iframe[i];
                $(el).ready(function(){
                    var height = el.contentDocument.documentElement.offsetHeight;
                    el.height = `${height}`;
                }); 
            }
        }
    }
    SetHeight();

    $(window).resize(function(){
        SetHeight();
    });
});