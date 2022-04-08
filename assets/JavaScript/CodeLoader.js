"use strict";
$(document).ready(function(){
    const CodeBlocks = Array(document.getElementsByClassName("code-load"));
    if (CodeBlocks != null){
        CodeBlocks.forEach(codeBlock => {
            var codeLink = $(codeBlock).attr("data-code-link");
            var codeReq = new XMLHttpRequest();
            codeReq.onload = function(){
                var code = this.responseText;
                console.log(code);
                $(codeBlock).html(code);
            };
            codeReq.open("GET",`codeExamples/${codeLink}.xml`);
            codeReq.send();
        });
    }
});