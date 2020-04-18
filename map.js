function refreshBack(){
    
    b_g.clearRect(0, 0, SCR_W, SCR_H);
    b_g.drawImage(backs[Math.floor(Math.random() * BACKS)], 0, 0);

    for (p of game.players) {

        p.y = 0;
        p.x = Math.floor(Math.random() * SCR_W);
        p.inv = 60;

    }

}