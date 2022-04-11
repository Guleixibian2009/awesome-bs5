//Code Loader
"use strict";

jQuery(function(){
    const CodeBlocks = document.getElementsByClassName("code-load");
    if (CodeBlocks != null){
        for (let i = 0; i < CodeBlocks.length; i++) {
            const element = CodeBlocks[i];
            var codeLink = $(element).attr("data-code-link");
            const Example = document.getElementsByName(codeLink)[0]
            var codeReq = new XMLHttpRequest();
            codeReq.onloadend = function(){
                var response = this.response;
                var parser = new DOMParser();
                var codeExample = parser.parseFromString(response,"text/xml");
                var code = codeExample.getElementsByTagName("codeExample")[0].innerHTML;
                $(element).find("code").text(code);
                Example.innerHTML = code;
                setTimeout(Prism.highlightAll(), 100)
            };
            codeReq.open("GET",`codeExamples/${codeLink}.xml`);
            codeReq.send();
        }
    }
});