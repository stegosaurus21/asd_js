function checkPixel(x, y, graphics){

    var pixelData = graphics.getImageData(x, y, 1, 1).data;
    return (pixelData[0] == pixelData[1] == pixelData[2] == 0);

}

function getImage(src){
    return document.querySelector(`[src='${src}']`);
}

function waitUntil(w, c, f){
    if(c(wait[w])){
        f();
    } else {
        setTimeout(()=>{waitUntil(w, c, f)}, 20);
    }
}

function distSquared(x1, y1, x2, y2){

    return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);

}

function distLessThan(x1, y1, x2, y2, d) {

    return distSquared(x1, y1, x2, y2) <= Math.pow(d, 2);

}

function fadeElement(el, ticks = 10) {

    var fade_amt = (1.0 / ticks);
    el.style.opacity = 1;
    var fader = setInterval(()=>{

        el.style.opacity -= fade_amt;
        if (el.style.opacity <= 0) {
            el.remove();
            clearInterval(fader);
        }

    }, tick_int);

}