(function(){
    
const d = document;
const html = d.documentElement;
const body = d.body;

const getByClass = function(selector,parent){
    parent == undefined ? parent = d : "";
    return parent.getElementsByClassName(selector)[0];
};
const getAllByClass = function(selector,parent){
    parent == undefined ? parent = d : "";
    return parent.getElementsByClassName(selector);
};
const find = function(selector){
    return d.querySelectorAll(selector);
};
const addWow = function(selector,className){
    const length = selector.length;
    for (let i = 0; i < length; i++){
        selector[i].classList.add("wow");
        selector[i].classList.add(className);
    }
};
    
const wowAnimHandler = function(selector = "fx"){
        
    const $fx = d.getElementsByClassName(selector);
    
    for(let i = 0; i < $fx.length; i++){
        $fx[i].addEventListener("mouseover",function(){
            animateWow($fx[i]);
        });
    }
    
    function animateWow(elem){
        const effect = elem.getAttribute("data-effect");
        elem.classList.add("animated");
        elem.classList.add(effect);

        elem.addEventListener("animationend",animEnd);

        function animEnd(){
            elem.classList.remove("animated");
            elem.classList.remove(effect);
            elem.removeEventListener("animationend",animEnd);
        }
    }    
};
    
const turnlist = function(selector){
    let open = false;
    const wrap = getByClass(selector);
    const parent = getAllByClass("parent",wrap);
    const parentLength = parent.length;
    
    for(let i = 0; i < parentLength; i++){
        
        parent[i].setAttribute("open","false");
        
        parent[i].addEventListener("click",function(e){
            
            if(parent[i].getAttribute("open") == "false"){
                
                parent[i].classList.add("-active");
                parent[i].setAttribute("open","true");
                parent[i].children[1].classList.add("-open");                
            }
            else{
                parent[i].classList.remove("-active");
                parent[i].setAttribute("open","false");
                parent[i].children[1].classList.remove("-open");  
            }
            
        },false);
        
        const nodeCount = parent[i].childNodes.length;
        for(let e = 0; e < nodeCount; e++){
            
            if(parent[i].childNodes[e].tagName == "A"){
                const link = parent[i].childNodes[e];
                link.addEventListener("click",function(e){
                    e.preventDefault();
                },false);
            }
             
            
        }
    }
    
};
     
let panelHeight = 0;

window.addEventListener('DOMContentLoaded',function(){
    body.classList.contains("ipHasAdminNavbar") ? panelHeight += 40 : "";
    body.classList.contains("ipHasAdminPanel") ? panelHeight += 108 : "";
});

const getBodyScrollTop = function(){
    return window.pageYOffset || html && html.scrollTop || body && body.scrollTop;
};
const getDistanceTop = function(elem, directions = "top"){

    return elem ? elem.getBoundingClientRect()[directions] + getBodyScrollTop() : false;
};
//Прилипание блоков при скроле
const stick = function(elem, offset = 0, _class = "-fixed", event1, event2){
    
    let prevElem,offsetTop,offsetParent,sideOfSquare;
    
    if(elem.previousElementSibling != null){
        
        prevElem = elem.previousElementSibling;
        sideOfSquare = "bottom";        
        offsetTop = panelHeight;
        
    } else {
        prevElem = elem.parentElement;
        sideOfSquare = "top";
        offsetParent = parseInt(window.getComputedStyle(prevElem).paddingTop);
        offsetTop = panelHeight - offsetParent;
    }
    
    function update(){
        
        if(elem){            
            if (getBodyScrollTop() > getDistanceTop(prevElem, sideOfSquare) - offsetTop){                
                elem.classList.add(_class);
                elem.style.position = "fixed";
                elem.style.top = panelHeight + offset + "px";
                typeof event1 === "function" ? event1(elem) : "";
            } else {
                elem.classList.remove(_class);
                elem.style.position = "";
                elem.style.top = "";
                typeof event2 === "function" ? event2(elem) : "";
            }
        }
    }
    window.addEventListener('resize',update);
    window.addEventListener('scroll',update);
    
};
//placeholder
const labelToPlaceholder = function(inputs){
    const length = inputs.length;
    for(let i = 0; i < length; i++){
        const obj = inputs[i].previousElementSibling;
        inputs[i].setAttribute("placeholder", obj.textContent.trim());
        obj.style.display = "none";
    }
};

const getPageHeight = function(){
    return Math.max(
        body.scrollHeight, html.scrollHeight,
        body.offsetHeight, html.offsetHeight,
        body.clientHeight, html.clientHeight
    );
};
const imgPreload = function(imgSrcArray){
    let imgs = [];
    for(let i = 0; i < imgSrcArray.length; i++){
        imgs[i] = new Image();
        imgs[i].src = imgSrcArray[i];  
    }
};
