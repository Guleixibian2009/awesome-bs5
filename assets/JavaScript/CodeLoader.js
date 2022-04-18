//Code Loader
"use strict";

$(function(){
    const CodeBlocks = document.getElementsByClassName("code-load");
    if (CodeBlocks != null){
        for (let i = 0; i < CodeBlocks.length; i++) {
            const element = CodeBlocks[i];
            var codeLink = $(element).attr("data-code-link");
            const Example = document.getElementsByName(codeLink)[0];
            var codeReq = new XMLHttpRequest();
            codeReq.onloadend = function(){
                var response = this.response;
                var parser = new DOMParser();
                var codeExample = parser.parseFromString(response,"text/html");
                var code = codeExample.getElementsByTagName("main")[0].innerHTML;
                $(element).find("code").text(code);
                Example.innerHTML = code.replace(/Lorem ipsum.../,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
                Prism.highlightAll();
                var LoadedJS = codeExample.getElementsByClassName("code-load-js");
                if (LoadedJS.length == 1){
                    const JScode = $(LoadedJS[0]).text();
                    eval(JScode);
                }
            };
            codeReq.open("GET",`examples/${codeLink}.xhtml`);
            codeReq.send();
        }
    }
});