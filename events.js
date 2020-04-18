var keys = {};

function keyDown(event){

    keys[event.code] = true;

}

function keyUp(event){

    keys[event.code] = false;

}

function keyPress(event){

    if (event.code == "KeyZ") subWep(0);
    if (event.code == "KeyX") addWep(0);

}