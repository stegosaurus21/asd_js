function updatePlayers(){
    
    for (let p of game.players) {

        if (checkPixel(p.x, p.y, b_g)) p.y += 3;
        else if (!checkPixel(p.x, p.y - 1, b_g) && p.y < canvas.height - tank_img.height) p.y --;

        if (p.id == 0) {
            if (keys["KeyA"]) p.x -= p_speed;
            if (keys["KeyD"]) p.x += p_speed;
            if (keys["KeyW"]) p.vel += p_delta_vel;
            if (keys["KeyS"]) p.vel -= p_delta_vel;
            if (keys["KeyQ"]) p.ang -= p_delta_ang;
            if (keys["KeyE"]) p.ang += p_delta_ang;
            if (keys["Space"]) playerFire(p);
        }

        p.ang = Math.max(p.ang, -M_PI);
        p.ang = Math.min(p.ang, 0);
        p.vel = Math.max(p.vel, 0);
        p.vel = Math.min(p.vel, 5);

        if (p.x < 1) p.x = SCR_W - 1;
        if (p.x >= SCR_W) p.x = 1;

        var wep = weapons[p.wep];

        if (!checkPixel(p.x, p.y, b_g)) p.rld ++;
        p.rld = Math.min(p.rld, wep.rld);

        if (wep.store) {

            if (!checkPixel(p.x, p.y, b_g)) p.store_rld ++;

            if (p.store < wep.store && p.store_rld >= wep.store_rld) {

                p.store ++;
                p.store_rld = 0;

            }
            p.store = Math.min(p.store, wep.store);
            if (p.store == wep.store) p.store_rld = 0;

        } 

        p.inv --;
        p.inv = Math.max(p.inv, 0);

    }

}

function damagePlayer(p, amt) {

    if (p.inv > 0) return;

    p.hp -= amt;

    if (p.hp <= 0) {

        killPlayer(p);

    }

}

function killPlayer(p){

    p.hp = p_max_hp;
    p.y = 0;
    p.x = Math.random() * SCR_W;
    p.inv = 60;

}

function playerFire(p){

    var wep = weapons[p.wep];

    if (p.rld >= wep.rld && (!wep.store || p.store > 0)) {

        createBullet(p.wep, p.x, p.y - 2, p.ang, p.vel, p.id, true);

        if (p.store > 0) p.store --;
        p.rld = 0;

    }

}

function newPlayer(r, g, b){

    var p = {};

    p.y = 0;
    p.x = Math.random() * SCR_W;
    p.rld = 0;
    p.hp = p_max_hp;
    p.ang = 0;
    p.vel = 0;
    p.wep = 0;
    p.id = game.players.length;
    p.inv = 60;
    p.store = 0;
    p.store_rld = 0;
    p.kills = 0;
    p.deaths = 0;

    p.img = document.createElement("canvas");
    p.img.style.display = "none";
    p.img.width = 10;
    p.img.height = 6;
    var tr = p.img.getContext("2d");
    tr.imageSmoothingEnabled = false;
    tr.mozImageSmoothingEnabled = false;
    tr.webkitImageSmoothingEnabled = false;
    tr.msImageSmoothingEnabled = false;
    tr.drawImage(tank_img, 0, 0);
    
    var dat = tr.getImageData(0, 0, 10, 6);
    for (var i = 0;i < dat.height;i++){

        for (var j = 0;j < dat.width;j++){

            if (dat.data[(i * dat.width + j) * 4] == 1 && dat.data[(i * dat.width + j) * 4 + 1] == 0 && dat.data[(i * dat.width + j) * 4 + 2] == 0){

                dat.data[(i * dat.width + j) * 4] = r;
                dat.data[(i * dat.width + j) * 4 + 1] = g;
                dat.data[(i * dat.width + j) * 4 + 2] = b;

            }

        }

    }

    tr.putImageData(dat, 0, 0);

    return p;

}

function subWep(id){

    if (game.players[id].wep == 0) game.players[id].wep = weapons.length;
    game.players[id].wep --;

    game.players[id].rld = 0;
    game.players[id].store = 0;

}

function addWep(id){

    game.players[id].wep ++;
    if (game.players[id].wep == weapons.length) game.players[id].wep = 0;

    game.players[id].rld = 0;
    game.players[id].store = 0;

}