// Constants

const M_PI = 3.1415926;
const p_speed = 1;
const p_delta_vel = 0.05;
const p_delta_ang = 0.02;
const p_max_hp = 100;
const GRAV = 0.05;
const SCR_W = 800;
const SCR_H = 600;
const BACKS = 1;

const tick_int = 20;

// Objects
var game = {
    players: [],
    bullets: [],
    free_bullets: [],
    tick: 0
}

var weapons = [];
var wepMap = {};
var wait = {};

// Canvases
var g;
var canvas;
var r_canvas;
var r_g;
var b_canvas;
var b_g;

// Images
var backs = [];
var tank_img;
var bullet_img;
var bullet_s_img;

window.onload = init;

function init(){

    game.prev = Math.random() * 10000;

    canvas = document.getElementById("main");
    g = canvas.getContext("2d");

    r_canvas = document.createElement("canvas");
    r_canvas.style.display = "none";
    r_canvas.width = 800;
    r_canvas.height = 800;
    r_g = r_canvas.getContext("2d"); 

    b_canvas = document.createElement("canvas");
    b_canvas.style.display = "none";
    b_canvas.width = 800;
    b_canvas.height = 600;
    b_g = b_canvas.getContext("2d");

    wait.load_img = BACKS;
    for (var i = 0; i < BACKS; i++) {

        backs[i] = new Image();
        backs[i].src = "back" + i + ".png";
        backs[i].style.display = "none";
        backs[i].onload = () => { 
            wait.load_img --; 
        }

    }

    waitUntil("load_img", (k)=>{ return k == 0; }, ()=>{

        b_g.drawImage(backs[Math.floor(Math.random() * BACKS)], 0, 0); 

        tank_img = getImage("tank.png");
        bullet_img = getImage("bullet.png");
        bullet_s_img = getImage("bullet_s.png");

        defWeapons();

        game.players.push(newPlayer(255, 255, 0));
        game.players.push(newPlayer(0, 255, 0));
        initAI(game.players[1], "normal");
        
        window.onkeydown = keyDown;
        window.onkeyup = keyUp;
        window.onkeypress = keyPress;

        addLog("Welcome to ASD_js! Use A/D to move, W/S to adjust power, Q/E to adjust angle, Z/X to change weapon.");

        setInterval(mainLoop, tick_int);

    });

}

function mainLoop(){

    game.tick ++;

    if (game.tick % 5000 == 0) refreshBack();

    updatePlayers();
    
    for (p of game.players) ai(p);

    updateBullets();

    render();

}