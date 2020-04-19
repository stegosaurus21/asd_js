function initAI(p, mode, diff = 0.5) {

    p.mode = mode;
    p.isAI = true;
    p.target = null;
    p.dest = 0;
    p.state = -1;
    p.ticks = 0;
    p.diff = diff;
    p.wep = 5;

}

function turret(p, ax = null, ay = null) {

    if (ax == null && (p.target == null || p.target == p || p.target.inv > 0)) {
 
        p.target = game.players[Math.floor(Math.random() * game.players.length)];
        return;

    }

    var tx = ((ax == null) ? p.target.x : ax);
    var ty = ((ay == null) ? p.target.y : ay);
        
    var t_ang;

    if (p.x >= tx) t_ang = -M_PI * 3 / 4;
    else t_ang = -M_PI / 4;
    
    var x = tx - p.x;
    var h = ty - p.y;

    var t_vel = Math.abs((GRAV * x) / Math.sqrt(2 * GRAV * h * Math.pow(Math.cos(t_ang),2) - 2 * GRAV * x * Math.sin(t_ang) * Math.cos(t_ang)));

    if (isNaN(t_vel) || t_vel > 5) {

        if (ax == null) { 

            turret(p, p.target.x + ((p.x > p.target.x) ? SCR_W : -SCR_W), p.target.y);

        }

        return;

    }

    var d_vel = Math.abs((GRAV * x) / Math.sqrt(2 * GRAV * h * Math.pow(Math.cos(p.ang),2) - 2 * GRAV * x * Math.sin(p.ang) * Math.cos(p.ang)));

    if (p.vel - d_vel > p_delta_vel) p.vel -= p_delta_vel;
    if (d_vel - p.vel > p_delta_vel) p.vel += p_delta_vel;

    if (p.ang - t_ang > p_delta_ang) p.ang -= p_delta_ang;
    else if (t_ang - p.ang > p_delta_ang) p.ang += p_delta_ang;
    
    p.vel += Math.random() * 0.05 - 0.025;
    if (p.vel > 0.1) playerFire(p);

}

function normal(p){

    if (p.state == -1) {

        p.state = Math.floor(Math.random() * 4);
        if (p.state <= 2) p.ticks = 20 + Math.floor(Math.random() * 30);
        else p.ticks = 100 + Math.floor(Math.random() * 100);

        if (p.state == 3) {

            do {
                p.wep = Math.floor(Math.random() * weapons.length)
            } while (weapons[p.wep].noAI)

            p.rld = p.store = 0;
            p.ticks = Math.max(weapons[p.wep].rld + 10, p.ticks);

        } 

    }

    p.ticks --;
    if (p.ticks <= 0){ p.state = -1; return; }

    if (p.state == 0) { p.ticks --; return; }

    if (p.state == 1) p.x += p_speed;
    if (p.state == 2) p.x -= p_speed;

    if (p.state == 3) turret(p);

}

function ai(p){

    if (!p.mode) return;

    if (p.mode == "turret") { turret(p); return; }

    if (p.mode == "normal") { normal(p); return; }

}