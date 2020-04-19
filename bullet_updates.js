function updateBullets(){

    for (b of game.bullets){

        if (b.state == 0) continue;

        if (b.state < 0) {

            b.state ++;
            if (b.state == 0) freeBullet(b);

            continue;

        }

        if (b.life > 0) b.life --;
        if (b.life == 0) detonateBullet(b);

        var wep = weapons[b.wep];

        for (var f = 0; f < ((wep.upt) ? wep.upt : 1); f++){

            if (wep.up) wep.up(b);

            b.x += b.vx;
            b.y += b.vy;

            if (wep.trace_vx && b.dvx != -1 && b.vx - wep.trace_vx >= b.dvx) b.vx -= wep.trace_vx;
            if (wep.trace_vx && b.dvx != -1 && b.dvx - wep.trace_vx >= b.vx) b.vx += wep.trace_vx;
            if (wep.trace_vy && b.dvy != -1 && b.vy - wep.trace_vy >= b.dvy) b.vy -= wep.trace_vy;
            if (wep.trace_vy && b.dvy != -1 && b.dvy - wep.trace_vy >= b.vy) b.vy += wep.trace_vy;

            if (b.x > SCR_W) b.x = 0;
            if (b.x < 0) b.x = SCR_W;

            if (b.grav) b.vy += GRAV * ((wep.grav) ? wep.grav : 1.0);

            if (!b.arced && Math.abs(0 - b.vy) < GRAV && wep.arc) {

                b.arced = true;
                wep.arc(b);

            }

            if (!checkPixel(b.x, b.y, b_g)) {

                detonateBullet(b);
                break;

            }

        }

    }

}

function createBullet(w, x, y, ang, vel, owner, parent, first){

    var r_ang = 0;
    var wep = weapons[w];
    if (wep.scatter) r_ang = (Math.random() * wep.scatter * 2) - wep.scatter;
    if (first && wep.spawn) wep.spawn(x, y, ang + r_ang, vel, owner); 

    if (game.free_bullets.length == 0) {

        var new_b = {};
        
        new_b.owner = owner;
        new_b.state = 1;
        new_b.wep = w;
        new_b.parent = parent;
        new_b.x = x;
        new_b.y = y;
        new_b.dvx = -1;
        new_b.dvy = -1;
        new_b.tmp = -1;
        new_b.hit = false;
        new_b.life = ((wep.life) ? wep.life : -1);
        new_b.arced = false;
        new_b.grav = true;

        new_b.vx = Math.cos(ang + r_ang) * vel;
        new_b.vy = Math.sin(ang + r_ang) * vel;
        new_b.id = game.bullets.length;

        game.bullets.push(new_b);
        return new_b.id;

    } else {

        try {

            game.bullets[game.free_bullets[0]].owner = owner;
            game.bullets[game.free_bullets[0]].state = 1;
            game.bullets[game.free_bullets[0]].wep = w;
            game.bullets[game.free_bullets[0]].parent = parent;
            game.bullets[game.free_bullets[0]].x = x;
            game.bullets[game.free_bullets[0]].y = y;
            game.bullets[game.free_bullets[0]].dvx = -1;
            game.bullets[game.free_bullets[0]].dvy = -1;
            game.bullets[game.free_bullets[0]].tmp = -1;
            game.bullets[game.free_bullets[0]].hit = false;
            game.bullets[game.free_bullets[0]].arced = false;
            game.bullets[game.free_bullets[0]].grav = true;
            game.bullets[game.free_bullets[0]].life = ((wep.life) ? wep.life : -1);
            game.bullets[game.free_bullets[0]].vx = Math.cos(ang + r_ang) * vel;
            game.bullets[game.free_bullets[0]].vy = Math.sin(ang + r_ang) * vel;

            var id = game.free_bullets[0];
            game.free_bullets.shift();
            return id;

        } catch {

            game.free_bullets.shift();
            createBullet(w, x, y, ang, vel, owner, parent, first);

        }

    }

}

function detonateBullet(b) {

    var wep = weapons[b.wep];
    b.state = -wep.dmg_rad;

    b_g.fillStyle = '#000000'

    b_g.beginPath();
    b_g.arc(b.x, b.y, wep.rad, 0, 2 * M_PI);
    b_g.closePath();
    b_g.fill();

    for (p of game.players) {

        if (distLessThan(b.x, b.y, p.x, p.y + tank_img.height / 2, wep.dmg_rad)) {

            damagePlayer(p, b);
            b.hit = true;

        }

    }

    if (wep.detonate) wep.detonate(b);

}

function freeBullet(b) {

    game.free_bullets.push(b.id);
    b.state = 0;

}

function multiBullet(mode, n, wep, x, y, ang, vel, d_ang, d_vel, owner, parent) {

    if (mode == "flak" || mode == "flak_arc") {

        for (var i = 0; i < n; i++) { 

            var b = createBullet(wep, x, y, ang + Math.random() * d_ang - d_ang / 2.0, vel + Math.random() * d_vel - d_vel / 2.0, owner, parent, false); 
            if (mode == "flak_arc") weapons[wep].arc(game.bullets[b]);
        
        }

    }

}

function frag(mode, n, wep, vel, b) {

    if (mode == "basic") {

        for (var i = 0; i < n; i++) { createBullet(wep, b.x, b.y, Math.random() * 2 * M_PI, Math.random() * vel, b.owner, ((b.parent == -1) ? b.wep : b.parent), false); }

    }

    if (mode == "updown") {

        var k = (b.vy > 0) ? -M_PI / 2 : M_PI / 2;
        
        for (var i = 0;i < n; i++) { createBullet(wep, b.x, b.y, k + (Math.random() * M_PI) - M_PI / 2.0, Math.random() * vel, b.owner, ((b.parent == -1) ? b.wep : b.parent), false); }

    }

    if (mode == "updown30") {

        var k = (b.vy > 0) ? -M_PI / 2 : M_PI / 2;
        
        for (var i = 0;i < n; i++) { createBullet(wep, b.x, b.y, k + (Math.random() * M_PI / 6.0) - M_PI / 12.0, Math.random() * vel, b.owner, ((b.parent == -1) ? b.wep : b.parent), false); }

    }

}

function target(b){

    var d = -1;
    for (let p of game.players) {

        if (d == -1 || distSquared(b.x, b.y, p.x, p.y) <= d || distSquared(b.x, b.y, p.x + SCR_W, p.y) <= d || distSquared(b.x, b.y, p.x - SCR_W, p.y) <= d) {

            b.tmp = p.id;
            d = Math.min(distSquared(b.x, b.y, p.x, p.y), distSquared(b.x, b.y, p.x - SCR_W, p.y), distSquared(b.x, b.y, p.x + SCR_W, p.y));

        }

    }

}

function trace(b, v, x, y, c = -1){

    if (c == -1 || b.life % c == 0) {
        
        b.dvx = Math.cos(Math.atan2(y - b.y, x - b.x)) * v;
        b.dvy = Math.sin(Math.atan2(y - b.y, x - b.x)) * v;

    }

}

function trace_player(b, p, v, d, c = -1) {

    if (p == -1) return;

    var tx = game.players[p].x;
    if (Math.abs(game.players[p].x + SCR_W - b.x) < Math.abs(tx - b.x)) tx = game.players[p].x + SCR_W;
    if (Math.abs(game.players[p].x - SCR_W - b.x) < Math.abs(tx - b.x)) tx = game.players[p].x - SCR_W;
    tx += Math.random() * d - d / 2;

    trace(b, v, tx, game.players[p].y, c);

}