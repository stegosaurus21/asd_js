function render(){

    r_g.clearRect(0, 0, canvas.width, canvas.height)
    r_g.drawImage(b_canvas, 0, 0);

    for (let p of game.players){

        if (p.inv > 0) {

            r_g.fillStyle = '#FF0000'
            r_g.beginPath();
            r_g.arc(p.x, p.y, Math.floor(p.inv / 3), 0, 2 * M_PI);
            r_g.closePath();
            r_g.fill();

        }
        r_g.drawImage(p.img, p.x - tank_img.width / 2, p.y - tank_img.height / 2);

        r_g.fillStyle = '#FF0000'
        r_g.fillRect(p.x - tank_img.height / 2 - 1, (p.y > SCR_H - 20) ? p.y - tank_img.height / 2 - 4 : p.y + tank_img.width / 2, Math.floor(p.hp / p_max_hp * tank_img.width), 2);

        var wep = weapons[p.wep];
        r_g.strokeStyle = wep.col;

        r_g.beginPath();
        r_g.moveTo(p.x, p.y);
        r_g.lineTo(Math.floor(p.x + Math.cos(p.ang) * 6), Math.floor(p.y + Math.sin(p.ang) * 6));
        r_g.closePath();
        r_g.stroke();

        if (p.id == 0) {

            r_g.font = "12px sans-serif";
            r_g.fillStyle = '#000000';
            r_g.fillText(wep.name, 5, 615);
            r_g.font = "10px sans-serif";
            r_g.fillText("HP: ", 5, 628);
            r_g.fillText("Power: ", 5, 638)

            r_g.fillStyle = '#FF0000';
            r_g.fillRect(50, 618, Math.floor(p.hp / 2), 10);

            r_g.fillStyle = wep.col;
            r_g.fillRect(50, 628, Math.floor(p.vel * 10), 10);

            if (wep.store) {

                for (var i = 0;i < p.store;i++) r_g.drawImage(bullet_s_img, 5 + 5 * i, 641);
                if (p.store < wep.store) {
                    var f_amt = p.store_rld / wep.store_rld * 20
                    r_g.drawImage(bullet_s_img, 0, 20 - f_amt, 5, f_amt, 5 + 5 * p.store, 661 - f_amt, 5, f_amt);
                } 

            } else r_g.drawImage(bullet_img, 0, 0, p.rld / wep.rld * 100, 20, 5, 641, p.rld / wep.rld * 100, 20);

        }

    }
    
    for (let b of game.bullets){

        if (b.state == 0) continue;

        if (b.state < 0) {

            if (b.hit) r_g.fillStyle = '#FF0000';
            else r_g.fillStyle = '#990000';
            
            r_g.beginPath();
            r_g.arc(b.x, b.y, - b.state, 0, 2 * M_PI);
            r_g.closePath();
            r_g.fill();

            continue;

        }

        r_g.fillStyle = weapons[b.wep].col;
        r_g.fillRect(b.x, b.y, 2, 2);

    }

    g.clearRect(0, 0, canvas.width, canvas.height)
    g.drawImage(r_canvas, 0, 0);
    

}