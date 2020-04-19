function defWeapons(){
    
    weapons = [{
        name: "Cannon",
        rld: 50,
        col: '#A3A3A3',
        rad: 4,
        dmg_rad: 12,
        dmg: 30,
        scatter: 0.05
    },
    {
        name: "Autocannon",
        rld: 10,
        col: '#A3A3A3',
        rad: 2,
        dmg_rad: 7,
        dmg: 15,
        store: 10,
        store_rld: 20,
        scatter: 0.1
    },
    {
        name: "Flak",
        rld: 80,
        col: '#999999',
        rad: 2,
        dmg_rad: 6,
        dmg: 15,
        scatter: 0.1,

        spawn: function (x, y, ang, vel, owner){ multiBullet("flak", 7, 2, x, y, ang, vel, 0.05, 0.3, owner); }

    },
    {
        name: "Frag",
        rld: 90,
        col: '#999999',
        rad: 2,
        dmg_rad: 12,
        dmg: 15,
        scatter: 0.05,

        detonate: function (b){ frag("updown", 5, 2, 1.5, b); frag("updown", 8, 1, 2.0, b); }

    },
    {
        name: "Minigun",
        rld: 1,
        col: '#A3A3A3',
        rad: 2,
        dmg_rad: 6,
        dmg: 7,
        scatter: 0.15,
        store: 20,
        store_rld: 5,
        upt: 2,
        life: 50,
        grav: 0.5,
        noAI: true
    },
    {

        name: "Volcano",
        rld: 100,
        col: '#ed9a34',
        rad: 3,
        dmg_rad: 10,
        dmg: 10,
        scatter: 0.1,

        detonate: function (b){ frag("updown30", 20, 4, 2.0, b); }

    },
    {

        name: "Rocket",
        rld: 120,
        col: '#FFB600',
        rad: 5,
        dmg_rad: 10,
        dmg: 30,
        scatter: 0.05,
        upt: 2,
        life: 200,
        grav: 0.6,
        trace_vx: 0.1,
        trace_vy: 0.1,

        arc: function (b){ target(b); },

        up: function (b){ if (b.tmp != -1) trace_player(b, b.tmp, 3.5, 20, 10); }

    },
    {

        name: "MiniRockets",
        rld: 4,
        col: '#00E4FF',
        rad: 2,
        dmg_rad: 5,
        dmg: 10,
        scatter: 0.2,
        upt: 2,
        life: 125,
        grav: 0.6,
        store: 10,
        store_rld: 10,
        trace_vx: 0.08,
        trace_vy: 0.06,

        arc: function (b){ target(b); },

        up: function (b){ if (b.tmp != -1) trace_player(b, b.tmp, 2.0, 40, 15); }

    },
    {

        name: "MIRV",
        rld: 250,
        col: '#4F69FF',
        rad: 0,
        dmg_rad: 5,
        dmg: 10,
        scatter: 0.05,
        upt: 2,
        life: 200,
        grav: 0.6,
        trace_vx: 0.08,
        trace_vy: 0.06,

        arc: function (b){ target(b); multiBullet("flak_arc", 12, 7, b.x, b.y, 0, 1.0, 2 * M_PI, 0.2, b.owner); detonateBullet(b); },

        up: function (b){ if (b.tmp != -1) trace_player(b, b.tmp, 2.0, 40, 15); }

    },
    {

        name: "Carpet Bomb",
        rld: 500,
        col: '#B200B2',
        rad: 0,
        dmg_rad: 0,
        dmg: 0,
        scatter: 0.05,
        life: 150,
        grav: 0.2,

        up: function (b){ if (b.life % 10 == 0) createBullet((Math.random() > 0.5 ? 3 : 5), b.x, b.y, 0, 0, b.owner); }

    }

]; }