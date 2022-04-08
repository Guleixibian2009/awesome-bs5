//Code Loader
"use strict";
$(document).ready(function(){
    const CodeBlocks = Array(document.getElementsByClassName("code-load"));
    if (CodeBlocks != null){
        CodeBlocks.forEach(codeBlock => {
            var codeLink = $(codeBlock).attr("data-code-link");
            var codeReq = new XMLHttpRequest();
            codeReq.onload = function(){
                var code = this.responseText;
                $(codeBlock).html(code);
            };
            codeReq.open("GET",`codeExamples/${codeLink}.xml`);
            codeReq.send();
        });
    }
});

//iframe height helper
$(document).ready(function(){
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
});