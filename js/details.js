const INDEX_DETAILS = {
  "Juggernaut": {
    tags: ["DIVINE", "SPIN", "EVOLUTION"],
    bossMultiplier: 1.25,
    summaryStats: [
      { label: "DAMAGE",     value: "250 → 10,000" },
      { label: "RELOAD",     value: "0.2s → 0.08s" },
      { label: "PLACE COST", value: "$37,500" }
    ],
    bullets: [
      "A machine gun that <strong>spins up</strong> while it shoots, getting <strong>faster</strong> for <strong>4 seconds</strong> until it holds <strong>full speed</strong>",
      "Deals <strong>extra damage to bosses</strong> and slowly spins down when it stops"
    ],
    keyNumbers: [
      { label: "STARTS AT",       value: "<strong>25%</strong> of its fire speed" },
      { label: "FULL SPEED",      value: "After <strong>4 seconds</strong> of shooting" },
      { label: "AGAINST BOSSES",  value: "<strong>+25%</strong> damage" },
      { label: "WHEN IT STOPS",   value: "It loses <strong>30%</strong> of its spin a second" },
      { label: "CASH TO MAX IT",  value: "<strong>$15,000,000</strong> in a match, for all <strong>9 levels</strong>" },
      { label: "PLACEMENT LIMIT", value: "<strong>3</strong> per player" }
    ],
    evolution: {
      name: "Ricochet",
      description: "Bullets bounce to 2 more zombies, for 2/3 and then 1/3 of the damage",
      quest: "Evolution Quest: 50,000 zombie kills with a maxed Juggernaut"
    },
    levels: [
      { level: 1, cashCost: 37500,   damage: "250",    reload: "0.2s",  range: "42", unlockCoins: 0 },
      { level: 2, cashCost: 75000,   damage: "450",    reload: "0.18s", range: "45", unlockCoins: 40000 },
      { level: 3, cashCost: 150000,  damage: "725",    reload: "0.16s", range: "48", unlockCoins: 90000 },
      { level: 4, cashCost: 300000,  damage: "1,200",  reload: "0.15s", range: "51", unlockCoins: 180000 },
      { level: 5, cashCost: 600000,  damage: "1,875",  reload: "0.13s", range: "54", unlockCoins: 320000 },
      { level: 6, cashCost: 1125000, damage: "3,000",  reload: "0.12s", range: "57", unlockCoins: 520000 },
      { level: 7, cashCost: 2025000, damage: "4,690",  reload: "0.11s", range: "62", unlockCoins: 780000 },
      { level: 8, cashCost: 3787500, damage: "7,250",  reload: "0.1s",  range: "65", unlockCoins: 1170000 },
      { level: 9, cashCost: 6900000, damage: "10,000", reload: "0.08s", range: "70", unlockCoins: 1900000 }
    ],
    whereToGet: [
      { source: "Divine Chest",  chance: "<strong>0.5%</strong> per chest" },
      { source: "Pumpkin Chest", chance: "<strong>0.5%</strong> per chest" },
      { source: "Lava Chest",    chance: "<strong>1.25%</strong> per chest" }
    ]
  },

  "Machine Mortar": {
    tags: ["DIVINE", "SPLASH"],
    rapidFire: { multiplier: 3, duration: 5 },
    summaryStats: [
      { label: "DAMAGE",     value: "1,000 → 16,000" },
      { label: "RELOAD",     value: "3s → 0.6s" },
      { label: "PLACE COST", value: "$20,000" }
    ],
    bullets: [
      "Lobs a shell from <strong>each of its barrels</strong> in turn, and every shell <strong>explodes</strong> on the zombies near where it lands",
      "When its cooldown is up it goes into <strong>Rapid Fire</strong> and shoots <strong>3x faster for 5 seconds</strong>"
    ],
    keyNumbers: [
      { label: "BARRELS",             value: "<strong>1 → 5</strong>, fired one after another" },
      { label: "EXPLOSION SIZE",      value: "<strong>15 → 26</strong> studs" },
      { label: "AT THE EDGE",         value: "<strong>45%</strong> of the damage. Full damage in the middle" },
      { label: "RAPID FIRE",          value: "<strong>3x</strong> fire speed for <strong>5 seconds</strong>" },
      { label: "RAPID FIRE COOLDOWN", value: "<strong>30s → 13s</strong>, counted from the end of the burst" },
      { label: "CASH TO MAX IT",      value: "<strong>$8,500,000</strong> in a match, for all <strong>9 levels</strong>" },
      { label: "PLACEMENT LIMIT",     value: "<strong>5</strong> per player" }
    ],
    levels: [
      { level: 1, cashCost: 20000,   damage: "1,000",  reload: "3s",    range: "50", blast: "15", unlockCoins: 0,       barrels: 1, rfCooldown: "30s" },
      { level: 2, cashCost: 45000,   damage: "1,800",  reload: "3s",    range: "53", blast: "16", unlockCoins: 25000,   barrels: 1, rfCooldown: "28s" },
      { level: 3, cashCost: 95000,   damage: "1,900",  reload: "1.5s",  range: "56", blast: "17", unlockCoins: 60000,   barrels: 2, rfCooldown: "26s" },
      { level: 4, cashCost: 180000,  damage: "3,200",  reload: "1.5s",  range: "60", blast: "18", unlockCoins: 130000,  barrels: 2, rfCooldown: "24s" },
      { level: 5, cashCost: 360000,  damage: "3,800",  reload: "1s",    range: "64", blast: "19", unlockCoins: 260000,  barrels: 3, rfCooldown: "21s" },
      { level: 6, cashCost: 700000,  damage: "5,800",  reload: "1s",    range: "68", blast: "20", unlockCoins: 450000,  barrels: 3, rfCooldown: "19s" },
      { level: 7, cashCost: 1300000, damage: "8,000",  reload: "0.75s", range: "73", blast: "22", unlockCoins: 775000,  barrels: 4, rfCooldown: "17s" },
      { level: 8, cashCost: 2300000, damage: "12,000", reload: "0.75s", range: "78", blast: "24", unlockCoins: 1300000, barrels: 4, rfCooldown: "15s" },
      { level: 9, cashCost: 3500000, damage: "16,000", reload: "0.6s",  range: "83", blast: "26", unlockCoins: 2000000, barrels: 5, rfCooldown: "13s" }
    ],
    whereToGet: [
      { source: "Legendary Chest", chance: "<strong>0.1%</strong> per chest" },
      { source: "Divine Chest",    chance: "<strong>1%</strong> per chest" },
      { source: "Pumpkin Chest",   chance: "<strong>1%</strong> per chest" },
      { source: "Lava Chest",      chance: "<strong>2.5%</strong> per chest" }
    ]
  },

  "Crusher": {
    tags: ["DIVINE", "SLAM"],
    isSlam: true,
    summaryStats: [
      { label: "DAMAGE",     value: "6,000 → 192,000" },
      { label: "RELOAD",     value: "3s → 2.4s" },
      { label: "PLACE COST", value: "$19,000" }
    ],
    bullets: [
      "Slowly charges up and <strong>smashes the ground</strong>, hurting <strong>every zombie around it</strong> once it is half charged",
      "If nothing comes close it keeps charging, and a <strong>full charge</strong> hits <strong>6x harder</strong>"
    ],
    keyNumbers: [
      { label: "HITS",            value: "<strong>Every zombie</strong> within <strong>22 → 25</strong> studs" },
      { label: "SLAMS",           value: "As soon as it is <strong>half charged</strong> and a zombie is in range" },
      { label: "HALF CHARGE",     value: "After <strong>3s → 2.4s</strong>. Deals the listed damage" },
      { label: "FULL CHARGE",     value: "After <strong>15s → 12s</strong>. Deals <strong>6x</strong> the damage" },
      { label: "IN BETWEEN",      value: "The damage climbs evenly from <strong>1x to 6x</strong>" },
      { label: "CASH TO MAX IT",  value: "<strong>$7,491,500</strong> in a match, for all <strong>9 levels</strong>" },
      { label: "PLACEMENT LIMIT", value: "<strong>4</strong> per player" }
    ],
    levels: [
      { level: 1, cashCost: 19000,   damage: "6,000",   fullSlam: "36,000",    reload: "3s",    toFull: "15s",    unlockCoins: 0 },
      { level: 2, cashCost: 37500,   damage: "11,800",  fullSlam: "70,800",    reload: "2.95s", toFull: "14.5s",  unlockCoins: 25000 },
      { level: 3, cashCost: 75000,   damage: "21,200",  fullSlam: "127,200",   reload: "2.9s",  toFull: "14s",    unlockCoins: 60000 },
      { level: 4, cashCost: 150000,  damage: "36,200",  fullSlam: "217,200",   reload: "2.85s", toFull: "13.5s",  unlockCoins: 130000 },
      { level: 5, cashCost: 300000,  damage: "59,600",  fullSlam: "357,600",   reload: "2.8s",  toFull: "13s",    unlockCoins: 260000 },
      { level: 6, cashCost: 560000,  damage: "86,400",  fullSlam: "518,400",   reload: "2.7s",  toFull: "12.75s", unlockCoins: 450000 },
      { level: 7, cashCost: 1000000, damage: "117,800", fullSlam: "706,800",   reload: "2.6s",  toFull: "12.5s",  unlockCoins: 775000 },
      { level: 8, cashCost: 1800000, damage: "153,300", fullSlam: "919,800",   reload: "2.5s",  toFull: "12.25s", unlockCoins: 1300000 },
      { level: 9, cashCost: 3550000, damage: "192,000", fullSlam: "1,152,000", reload: "2.4s",  toFull: "12s",    unlockCoins: 2000000 }
    ],
    whereToGet: [
      { source: "Legendary Chest", chance: "<strong>0.1%</strong> per chest" },
      { source: "Divine Chest",    chance: "<strong>1%</strong> per chest" },
      { source: "Pumpkin Chest",   chance: "<strong>1%</strong> per chest" },
      { source: "Lava Chest",      chance: "<strong>2.5%</strong> per chest" }
    ]
  },

  "Golem Forge": {
    tags: ["DIVINE", "GOLEM", "EVOLUTION"],
    isGolem: true,
    summaryStats: [
      { label: "DAMAGE",     value: "2,500 → 76,000" },
      { label: "RELOAD",     value: "1.4s → 1.2s" },
      { label: "PLACE COST", value: "$15,000" }
    ],
    bullets: [
      "Step on it and press <strong>Summon</strong> to send a <strong>golem</strong> to the door closest to it, where zombies near him <strong>attack him instead of the door</strong>",
      "He punches them and <strong>throws small zombies</strong> into the crowd, and when he dies the forge cooks a new one"
    ],
    keyNumbers: [
      { label: "SUMMON",            value: "Step on the forge and press <strong>Summon</strong>" },
      { label: "GOLEM HEALTH",      value: "<strong>80% → 200%</strong> of your strongest door's max health" },
      { label: "PUNCH",             value: "<strong>2,500 → 76,000</strong> to <strong>1 zombie</strong>, every <strong>1.4s → 1.2s</strong>" },
      { label: "THROW",             value: "Every <strong>9s → 5s</strong>. <strong>9,000 → 270,000</strong> to zombies within <strong>14 → 20</strong> studs" },
      { label: "THE THROWN ZOMBIE", value: "Takes the throw damage <strong>twice</strong>" },
      { label: "NEW GOLEM",         value: "<strong>90s → 60s</strong> after the last one dies" },
      { label: "CASH TO MAX IT",    value: "<strong>$5,515,000</strong> in a match, for all <strong>9 levels</strong>" },
      { label: "PLACEMENT LIMIT",   value: "<strong>2</strong> per player" }
    ],
    evolution: {
      name: "Molten Heart",
      description: "The golem heals for 50% of the damage he deals and explodes when he dies",
      quest: "Evolution Quest: 15,000 zombie kills with a maxed Golem Forge"
    },
    levels: [
      { level: 1, cashCost: 15000,   damage: "2,500",  reload: "1.4s",  health: "80%",  unlockCoins: 0,       throwDmg: "9,000",   throwEvery: "9s",   splash: "14",   newGolem: "90s" },
      { level: 2, cashCost: 30000,   damage: "4,800",  reload: "1.4s",  health: "90%",  unlockCoins: 15000,   throwDmg: "17,000",  throwEvery: "8.5s", splash: "14.5", newGolem: "87s" },
      { level: 3, cashCost: 60000,   damage: "8,500",  reload: "1.35s", health: "100%", unlockCoins: 36000,   throwDmg: "30,000",  throwEvery: "8s",   splash: "15.5", newGolem: "84s" },
      { level: 4, cashCost: 120000,  damage: "14,500", reload: "1.35s", health: "110%", unlockCoins: 78000,   throwDmg: "52,000",  throwEvery: "7.5s", splash: "16",   newGolem: "80s" },
      { level: 5, cashCost: 240000,  damage: "23,500", reload: "1.3s",  health: "120%", unlockCoins: 156000,  throwDmg: "85,000",  throwEvery: "7s",   splash: "17",   newGolem: "76s" },
      { level: 6, cashCost: 450000,  damage: "34,000", reload: "1.3s",  health: "140%", unlockCoins: 270000,  throwDmg: "122,000", throwEvery: "6.5s", splash: "17.5", newGolem: "72s" },
      { level: 7, cashCost: 800000,  damage: "46,000", reload: "1.25s", health: "160%", unlockCoins: 465000,  throwDmg: "165,000", throwEvery: "6s",   splash: "18.5", newGolem: "68s" },
      { level: 8, cashCost: 1400000, damage: "60,000", reload: "1.25s", health: "180%", unlockCoins: 780000,  throwDmg: "215,000", throwEvery: "5.5s", splash: "19",   newGolem: "64s" },
      { level: 9, cashCost: 2400000, damage: "76,000", reload: "1.2s",  health: "200%", unlockCoins: 1200000, throwDmg: "270,000", throwEvery: "5s",   splash: "20",   newGolem: "60s" }
    ],
    whereToGet: [
      { source: "Legendary Chest", chance: "<strong>0.1%</strong> per chest" },
      { source: "Divine Chest",    chance: "<strong>1%</strong> per chest" },
      { source: "Pumpkin Chest",   chance: "<strong>1%</strong> per chest" },
      { source: "Lava Chest",      chance: "<strong>2.5%</strong> per chest" }
    ]
  },

  "World Ender": {
    tags: ["LEGENDARY", "BEAM"],
    summaryStats: [
      { label: "DAMAGE",     value: "300 → 6,250" },
      { label: "RELOAD",     value: "0.67s → 0.25s" },
      { label: "PLACE COST", value: "$10,000" }
    ],
    bullets: [
      "Holds a <strong>beam</strong> on a zombie that <strong>gets stronger the longer it fires</strong>, over <strong>8 seconds</strong>",
      "It <strong>slowly loses power</strong> when it has nothing to shoot"
    ],
    keyNumbers: [
      { label: "BEAM STARTS AT",  value: "<strong>40% → 12%</strong> of its damage" },
      { label: "FULL POWER",      value: "After <strong>8 seconds</strong> on target" },
      { label: "WITH NO TARGET",  value: "It loses <strong>25%</strong> of its charge a second" },
      { label: "CASH TO MAX IT",  value: "<strong>$2,041,000</strong> in a match, for all <strong>8 levels</strong>" },
      { label: "PLACEMENT LIMIT", value: "<strong>6</strong> per player" }
    ],
    levels: [
      { level: 1, cashCost: 10000,  damage: "300",   reload: "0.67s", range: "33", startsAt: "40%", unlockCoins: 0 },
      { level: 2, cashCost: 22000,  damage: "715",   reload: "0.6s",  range: "36", startsAt: "34%", unlockCoins: 600 },
      { level: 3, cashCost: 50000,  damage: "1,310", reload: "0.53s", range: "39", startsAt: "28%", unlockCoins: 2000 },
      { level: 4, cashCost: 112000, damage: "2,050", reload: "0.44s", range: "42", startsAt: "23%", unlockCoins: 6400 },
      { level: 5, cashCost: 252000, damage: "2,965", reload: "0.36s", range: "44", startsAt: "18%", unlockCoins: 20000 },
      { level: 6, cashCost: 425000, damage: "4,335", reload: "0.3s",  range: "47", startsAt: "15%", unlockCoins: 64000 },
      { level: 7, cashCost: 500000, damage: "5,130", reload: "0.27s", range: "49", startsAt: "13%", unlockCoins: 70000 },
      { level: 8, cashCost: 670000, damage: "6,250", reload: "0.25s", range: "50", startsAt: "12%", unlockCoins: 137000 }
    ],
    whereToGet: [
      { source: "Rare Chest",      chance: "<strong>0.04%</strong> per chest" },
      { source: "Epic Chest",      chance: "<strong>0.08%</strong> per chest" },
      { source: "Mythic Chest",    chance: "<strong>0.16%</strong> per chest" },
      { source: "Legendary Chest", chance: "<strong>0.45%</strong> per chest" },
      { source: "Divine Chest",    chance: "<strong>1.64%</strong> per chest" },
      { source: "Pumpkin Chest",   chance: "<strong>2.05%</strong> per chest" },
      { source: "Lava Chest",      chance: "<strong>7.09%</strong> per chest" }
    ]
  },

  "Lava Launcher": {
    tags: ["LEGENDARY", "BURN"],
    poolDuration: 20,
    summaryStats: [
      { label: "DAMAGE",     value: "150 → 2,500" },
      { label: "RELOAD",     value: "4s → 2.5s" },
      { label: "PLACE COST", value: "$8,500" }
    ],
    bullets: [
      "Throws a <strong>ball of lava</strong> that leaves a <strong>burning pool</strong> on the ground for <strong>20 seconds</strong>",
      "Zombies standing in it keep getting burned, and <strong>pools on top of each other stack</strong>"
    ],
    keyNumbers: [
      { label: "DAMAGE IS",       value: "Per second, to <strong>every zombie</strong> standing in a pool" },
      { label: "A POOL LASTS",    value: "<strong>20 seconds</strong>" },
      { label: "POOL SIZE",       value: "<strong>8 → 13</strong> studs" },
      { label: "POOLS ON TOP",    value: "<strong>All burn</strong> at once, no limit" },
      { label: "CASH TO MAX IT",  value: "<strong>$2,092,500</strong> in a match, for all <strong>8 levels</strong>" },
      { label: "PLACEMENT LIMIT", value: "<strong>6</strong> per player" }
    ],
    levels: [
      { level: 1, cashCost: 8500,   damage: "150",   reload: "4s",   range: "40", poolSize: "8",    unlockCoins: 0 },
      { level: 2, cashCost: 17000,  damage: "270",   reload: "3.8s", range: "42", poolSize: "8.5",  unlockCoins: 500 },
      { level: 3, cashCost: 35000,  damage: "420",   reload: "3.6s", range: "44", poolSize: "9",    unlockCoins: 1400 },
      { level: 4, cashCost: 72000,  damage: "635",   reload: "3.4s", range: "46", poolSize: "9.5",  unlockCoins: 3800 },
      { level: 5, cashCost: 150000, damage: "900",   reload: "3.2s", range: "49", poolSize: "10.5", unlockCoins: 10500 },
      { level: 6, cashCost: 300000, damage: "1,350", reload: "3s",   range: "52", poolSize: "11",   unlockCoins: 28000 },
      { level: 7, cashCost: 560000, damage: "1,900", reload: "2.8s", range: "55", poolSize: "12",   unlockCoins: 76000 },
      { level: 8, cashCost: 950000, damage: "2,500", reload: "2.5s", range: "58", poolSize: "13",   unlockCoins: 180000 }
    ],
    whereToGet: [
      { source: "Epic Chest",      chance: "<strong>0.14%</strong> per chest" },
      { source: "Mythic Chest",    chance: "<strong>0.27%</strong> per chest" },
      { source: "Legendary Chest", chance: "<strong>0.75%</strong> per chest" },
      { source: "Divine Chest",    chance: "<strong>2.74%</strong> per chest" },
      { source: "Pumpkin Chest",   chance: "<strong>3.42%</strong> per chest" },
      { source: "Lava Chest",      chance: "<strong>11.82%</strong> per chest" }
    ]
  },

  "Bank": {
    tags: ["DIVINE", "ECONOMY"],
    isEconomy: true,
    summaryStats: [
      { label: "HOLDS UP TO", value: "$4,000 → $1,400,000" },
      { label: "PLACE COST",  value: "$200" }
    ],
    bullets: [
      "Fills up with cash that <strong>grows faster the longer you wait</strong>",
      "<strong>Withdraw</strong> it any time to take it all and start again from $0"
    ],
    keyNumbers: [
      { label: "HOLDS UP TO",     value: "<strong>$4,000 → $1,400,000</strong>" },
      { label: "FULL AFTER",      value: "<strong>4 min 30s</strong>, if you do not withdraw" },
      { label: "HOW IT FILLS",    value: "Slow, then fast: <strong>33%</strong> full at half time, <strong>61%</strong> at three quarters" },
      { label: "WITHDRAW",        value: "Takes <strong>everything</strong> and starts again from $0" },
      { label: "UPGRADING",       value: "Keeps the cash inside and raises the max" },
      { label: "CASH TO MAX IT",  value: "<strong>$278,000</strong> in a match, for all <strong>9 levels</strong>" },
      { label: "PLACEMENT LIMIT", value: "<strong>3</strong> per player" }
    ],
    levels: [
      { level: 1, cashCost: 200,    holdsUpTo: "$4,000",     unlockCoins: 0 },
      { level: 2, cashCost: 700,    holdsUpTo: "$11,000",    unlockCoins: 20000 },
      { level: 3, cashCost: 1600,   holdsUpTo: "$23,000",    unlockCoins: 45000 },
      { level: 4, cashCost: 3500,   holdsUpTo: "$45,000",    unlockCoins: 90000 },
      { level: 5, cashCost: 7500,   holdsUpTo: "$85,000",    unlockCoins: 175000 },
      { level: 6, cashCost: 13000,  holdsUpTo: "$175,000",   unlockCoins: 300000 },
      { level: 7, cashCost: 29500,  holdsUpTo: "$350,000",   unlockCoins: 450000 },
      { level: 8, cashCost: 67000,  holdsUpTo: "$700,000",   unlockCoins: 700000 },
      { level: 9, cashCost: 155000, holdsUpTo: "$1,400,000", unlockCoins: 1200000 }
    ],
    whereToGet: [
      { source: "Legendary Chest", chance: "<strong>0.1%</strong> per chest" },
      { source: "Divine Chest",    chance: "<strong>1%</strong> per chest" },
      { source: "Pumpkin Chest",   chance: "<strong>1%</strong> per chest" },
      { source: "Lava Chest",      chance: "<strong>2.5%</strong> per chest" }
    ]
  },

  "Military Base": {
    tags: ["MYTHIC", "BOOST"],
    isBoostBase: true,
    summaryStats: [
      { label: "DAMAGE",     value: "+15% → +40%" },
      { label: "RANGE",      value: "+17% → +50%" },
      { label: "PLACE COST", value: "$6,000" }
    ],
    bullets: [
      "<strong>Buffs every tower next to it</strong> so they <strong>deal more damage</strong>",
      "From <strong>level 4</strong> the buff also makes them <strong>shoot further</strong>"
    ],
    keyNumbers: [
      { label: "DAMAGE BUFF",     value: "<strong>+15% → +40%</strong> for every tower in reach" },
      { label: "RANGE BUFF",      value: "From <strong>level 4</strong>: +17%, then +33%, then +50%" },
      { label: "REACH",           value: "<strong>15 → 29</strong> studs" },
      { label: "SEVERAL BASES",   value: "Do not add up. The <strong>strongest</strong> one in reach counts" },
      { label: "CASH TO MAX IT",  value: "<strong>$925,000</strong> in a match, for all <strong>6 levels</strong>" },
      { label: "PLACEMENT LIMIT", value: "<strong>4</strong> per player" }
    ],
    levels: [
      { level: 1, cashCost: 6000,   dmgBuff: "+15%", rangeBuff: "+0%",  reach: "15", unlockCoins: 0 },
      { level: 2, cashCost: 15000,  dmgBuff: "+20%", rangeBuff: "+0%",  reach: "21", unlockCoins: 0 },
      { level: 3, cashCost: 39000,  dmgBuff: "+25%", rangeBuff: "+0%",  reach: "23", unlockCoins: 2000 },
      { level: 4, cashCost: 101000, dmgBuff: "+30%", rangeBuff: "+17%", reach: "25", unlockCoins: 7000 },
      { level: 5, cashCost: 259000, dmgBuff: "+35%", rangeBuff: "+33%", reach: "26", unlockCoins: 28000 },
      { level: 6, cashCost: 505000, dmgBuff: "+40%", rangeBuff: "+50%", reach: "29", unlockCoins: 113000 }
    ],
    whereToGet: [
      { source: "Rare Chest",      chance: "<strong>0.55%</strong> per chest" },
      { source: "Epic Chest",      chance: "<strong>1.48%</strong> per chest" },
      { source: "Mythic Chest",    chance: "<strong>3.21%</strong> per chest" },
      { source: "Legendary Chest", chance: "<strong>3.7%</strong> per chest" },
      { source: "Divine Chest",    chance: "<strong>18.64%</strong> per chest" },
      { source: "Pumpkin Chest",   chance: "<strong>17.16%</strong> per chest" }
    ]
  },

  "Medical Base": {
    tags: ["EPIC", "HEAL"],
    isHealBase: true,
    summaryStats: [
      { label: "💚 HEALS",      value: "0.2% → 2%" },
      { label: "⏳ RELOAD",     value: "1s → 1s" },
      { label: "🎯 RANGE",      value: "12 → 20" },
      { label: "💰 PLACE COST", value: "$750" }
    ],
    bullets: [
      "<strong>Repairs your house door</strong> over time with a healing beam",
      "The door must be <strong>in its range</strong>"
    ],
    keyNumbers: [
      { label: "💚 HEALS",        value: "<strong>0.2% → 2%</strong> of the door's <strong>max health</strong> every second" },
      { label: "⏳ RELOAD",       value: "<strong>1s</strong> per tick" },
      { label: "🎯 REACH",        value: "The door must be within <strong>12 → 20</strong> studs" },
      { label: "CASH TO MAX IT",  value: "<strong>$295,030</strong> in a match, for all <strong>6 levels</strong>" },
      { label: "PLACEMENT LIMIT", value: "<strong>4</strong> per player" }
    ],
    levels: [
      { level: 1, cashCost: 750,    healsPerSec: "0.2%",  range: "12", unlockCoins: 0 },
      { level: 2, cashCost: 1280,   healsPerSec: "0.35%", range: "13", unlockCoins: 0 },
      { level: 3, cashCost: 4000,   healsPerSec: "0.55%", range: "15", unlockCoins: 0 },
      { level: 4, cashCost: 14000,  healsPerSec: "0.85%", range: "16", unlockCoins: 0 },
      { level: 5, cashCost: 55000,  healsPerSec: "1.3%",  range: "18", unlockCoins: 5000 },
      { level: 6, cashCost: 220000, healsPerSec: "2%",    range: "20", unlockCoins: 45000 }
    ],
    whereToGet: [
      { source: "Common Chest",    chance: "<strong>0.26%</strong> per chest" },
      { source: "Rare Chest",      chance: "<strong>0.5%</strong> per chest" },
      { source: "Epic Chest",      chance: "<strong>5.2%</strong> per chest" },
      { source: "Mythic Chest",    chance: "<strong>10.4%</strong> per chest" },
      { source: "Legendary Chest", chance: "<strong>15.84%</strong> per chest" }
    ]
  },

  "Protector Base": {
    tags: ["EPIC", "BOOST"],
    isProtectorBase: true,
    summaryStats: [
      { label: "RELOAD",     value: "+15% → +75%" },
      { label: "SHIELD",     value: "45s → 25s" },
      { label: "PLACE COST", value: "$5,000" }
    ],
    bullets: [
      "<strong>Buffs every tower next to it</strong> so they <strong>shoot faster</strong>",
      "From <strong>level 4</strong> it also gives them a <strong>shield</strong> that <strong>blocks a stun</strong>, and the shield comes back after a short wait"
    ],
    keyNumbers: [
      { label: "RELOAD BUFF",       value: "<strong>+15% → +75%</strong> for every tower in reach" },
      { label: "SHIELD",            value: "From <strong>level 4</strong>. Blocks <strong>1 boss stun</strong> on each tower in reach" },
      { label: "SHIELD COMES BACK", value: "After <strong>45s</strong> at level 4, <strong>35s</strong> at level 5, <strong>25s</strong> at level 6" },
      { label: "REACH",             value: "<strong>21 → 32</strong> studs" },
      { label: "SEVERAL BASES",     value: "Do not add up. The <strong>strongest</strong> one in reach counts" },
      { label: "CASH TO MAX IT",    value: "<strong>$780,500</strong> in a match, for all <strong>6 levels</strong>" },
      { label: "PLACEMENT LIMIT",   value: "<strong>5</strong> per player" }
    ],
    levels: [
      { level: 1, cashCost: 5000,   reloadBuff: "+15%", reach: "21", shieldBack: "NO SHIELD", unlockCoins: 0 },
      { level: 2, cashCost: 12500,  reloadBuff: "+25%", reach: "23", shieldBack: "NO SHIELD", unlockCoins: 0 },
      { level: 3, cashCost: 33000,  reloadBuff: "+35%", reach: "26", shieldBack: "NO SHIELD", unlockCoins: 0 },
      { level: 4, cashCost: 85000,  reloadBuff: "+45%", reach: "29", shieldBack: "45s",       unlockCoins: 0 },
      { level: 5, cashCost: 215000, reloadBuff: "+60%", reach: "31", shieldBack: "35s",       unlockCoins: 5000 },
      { level: 6, cashCost: 430000, reloadBuff: "+75%", reach: "32", shieldBack: "25s",       unlockCoins: 45000 }
    ],
    whereToGet: [
      { source: "Common Chest",    chance: "<strong>0.26%</strong> per chest" },
      { source: "Rare Chest",      chance: "<strong>0.5%</strong> per chest" },
      { source: "Epic Chest",      chance: "<strong>5.2%</strong> per chest" },
      { source: "Mythic Chest",    chance: "<strong>10.4%</strong> per chest" },
      { source: "Legendary Chest", chance: "<strong>15.82%</strong> per chest" }
    ]
  },

  "Ice Turret": {
    tags: ["LEGENDARY", "SLOW", "EVOLUTION"],
    summaryStats: [
      { label: "DAMAGE",     value: "222 → 3,900" },
      { label: "RELOAD",     value: "1.6s → 0.9s" },
      { label: "PLACE COST", value: "$8,000" }
    ],
    bullets: [
      "<strong>Slows</strong> every zombie it hits for <strong>10 seconds</strong>, making them walk and attack slower"
    ],
    keyNumbers: [
      { label: "🧊 SLOW",         value: "<strong>20% → 50%</strong> slower walking <strong>and</strong> attacking" },
      { label: "LASTS",           value: "<strong>10 seconds</strong> after the last hit" },
      { label: "SEVERAL SLOWS",   value: "Do not add up. The <strong>strongest</strong> one counts" },
      { label: "CASH TO MAX IT",  value: "<strong>$3,090,000</strong> in a match, for all <strong>8 levels</strong>" },
      { label: "PLACEMENT LIMIT", value: "<strong>8</strong> per player" }
    ],
    evolution: {
      name: "Shatter",
      description: "Zombies it slowed shatter when they die, and the ice shards hit and slow zombies nearby",
      quest: "Evolution Quest: 32,500 zombie kills with a maxed Ice Turret"
    },
    levels: [
      { level: 1, cashCost: 8000,    damage: "222",   reload: "1.6s", range: "35", slow: "20%", unlockCoins: 0 },
      { level: 2, cashCost: 18000,   damage: "475",   reload: "1.5s", range: "38", slow: "25%", unlockCoins: 600 },
      { level: 3, cashCost: 41000,   damage: "775",   reload: "1.4s", range: "41", slow: "30%", unlockCoins: 2000 },
      { level: 4, cashCost: 92000,   damage: "1,150", reload: "1.3s", range: "44", slow: "35%", unlockCoins: 6400 },
      { level: 5, cashCost: 209000,  damage: "1,620", reload: "1.2s", range: "46", slow: "40%", unlockCoins: 20000 },
      { level: 6, cashCost: 472000,  damage: "2,225", reload: "1.1s", range: "49", slow: "45%", unlockCoins: 64000 },
      { level: 7, cashCost: 850000,  damage: "3,000", reload: "1s",   range: "52", slow: "50%", unlockCoins: 137000 },
      { level: 8, cashCost: 1400000, damage: "3,900", reload: "0.9s", range: "55", slow: "50%", unlockCoins: 270000 }
    ],
    whereToGet: [
      { source: "Common Chest",    chance: "<strong>0.03%</strong> per chest" },
      { source: "Epic Chest",      chance: "<strong>0.27%</strong> per chest" },
      { source: "Mythic Chest",    chance: "<strong>0.55%</strong> per chest" },
      { source: "Legendary Chest", chance: "<strong>1.51%</strong> per chest" },
      { source: "Divine Chest",    chance: "<strong>5.47%</strong> per chest" },
      { source: "Pumpkin Chest",   chance: "<strong>6.87%</strong> per chest" },
      { source: "Lava Chest",      chance: "<strong>23.63%</strong> per chest" }
    ]
  },

  "Arctic Fox": {
    tags: ["MYTHIC", "PET"],
    buffColumnLabel: "RELOAD",
    buff2ColumnLabel: "🧊 SLOWS",
    summaryStats: [
      { label: "RELOAD",   value: "+10% → +20%" },
      { label: "🧊 SLOWS", value: "+10% → +14%" }
    ],
    bullets: [
      "Your towers <strong>reload faster</strong> and zombies attacking your house <strong>walk and attack slower</strong>"
    ],
    keyNumbers: [
      { label: "YOUR TOWERS",           value: "<strong>Reload faster</strong>" },
      { label: "ZOMBIES AT YOUR HOUSE", value: "Walk <strong>and</strong> attack slower" },
      { label: "MORE OF THE SAME PET",  value: "In one house the 2nd counts <strong>60%</strong>, the 3rd <strong>36%</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+10%",   buff2: "+10%", upgradeCoins: 0 },
      { level: 2, buff: "+12.5%", buff2: "+11%", upgradeCoins: 8000 },
      { level: 3, buff: "+15%",   buff2: "+12%", upgradeCoins: 30000 },
      { level: 4, buff: "+17.5%", buff2: "+13%", upgradeCoins: 125000 },
      { level: 5, buff: "+20%",   buff2: "+14%", upgradeCoins: 500000 }
    ],
    whereToGet: [
      { source: "Rare Egg",      chance: "<strong>0.55%</strong> per egg" },
      { source: "Epic Egg",      chance: "<strong>1.2%</strong> per egg" },
      { source: "Mythic Egg",    chance: "<strong>2.6%</strong> per egg" },
      { source: "Legendary Egg", chance: "<strong>3%</strong> per egg" },
      { source: "Divine Egg",    chance: "<strong>15.3%</strong> per egg" },
      { source: "Pumpkin Egg",   chance: "<strong>14.1%</strong> per egg" }
    ]
  },

  "Raccoon": {
    tags: ["MYTHIC", "PET"],
    buffColumnLabel: `${ICON_STARTCASH} START CASH`,
    buff2ColumnLabel: `${ICON_FARMS} FARMS`,
    summaryStats: [
      { label: `${ICON_STARTCASH} START CASH`, value: "+$100 → +$500" },
      { label: `${ICON_FARMS} FARMS`,          value: "+15% → +25%" }
    ],
    bullets: [
      "Everyone in your house starts with <strong>extra cash</strong> and your <strong>farms pay out faster</strong>"
    ],
    keyNumbers: [
      { label: `${ICON_STARTCASH} START CASH`, value: "For <strong>everyone</strong> in your house" },
      { label: `${ICON_FARMS} FARMS`,          value: "<strong>Pay out faster</strong>" },
      { label: "MORE OF THE SAME PET",         value: "In one house the 2nd counts <strong>60%</strong>, the 3rd <strong>36%</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+$100", buff2: "+15%",   upgradeCoins: 0 },
      { level: 2, buff: "+$200", buff2: "+17.5%", upgradeCoins: 8000 },
      { level: 3, buff: "+$300", buff2: "+20%",   upgradeCoins: 30000 },
      { level: 4, buff: "+$400", buff2: "+22.5%", upgradeCoins: 125000 },
      { level: 5, buff: "+$500", buff2: "+25%",   upgradeCoins: 500000 }
    ],
    whereToGet: [
      { source: "Epic Egg",      chance: "<strong>1.2%</strong> per egg" },
      { source: "Mythic Egg",    chance: "<strong>2.6%</strong> per egg" },
      { source: "Legendary Egg", chance: "<strong>3%</strong> per egg" },
      { source: "Divine Egg",    chance: "<strong>15.3%</strong> per egg" },
      { source: "Pumpkin Egg",   chance: "<strong>14.1%</strong> per egg" }
    ]
  },

  "Void Farm": {
    tags: ["LEGENDARY", "ECONOMY", "EVOLUTION"],
    isVoidFarm: true,
    summaryStats: [
      { label: "EARNS",      value: "$55 → $4,000 / 5s" },
      { label: "PAYS",       value: "EVERY 5s" },
      { label: "PLACE COST", value: "$500" }
    ],
    bullets: [
      "Earns cash on its own and sends a <strong>pulse</strong> that makes all economy towers next to it earn <strong>more cash for 10 seconds</strong>"
    ],
    keyNumbers: [
      { label: "PAYS",                    value: "Every <strong>5 seconds</strong>" },
      { label: `${ICON_PULSE} PULSE`,     value: "Every <strong>34s → 20s</strong>" },
      { label: `${ICON_PULSE} PULSE BUFF`, value: "Economy towers <strong>next to it</strong> earn <strong>+15% → +50%</strong> for <strong>10 seconds</strong>" },
      { label: "CASH TO MAX IT",          value: "<strong>$202,400</strong> in a match, for all <strong>8 levels</strong>" },
      { label: "PLACEMENT LIMIT",         value: "<strong>10</strong> per player" }
    ],
    evolution: {
      name: "Void Ward",
      description: "Its pulse gives the doors it reaches a shield that blocks 75% of damage",
      quest: "Evolution Quest: earn $300,000,000 with a maxed Void Farm"
    },
    levels: [
      { level: 1, cashCost: 500,   pays: "$55",    every: "5s", perMin: "$660",    unlockCoins: 0,      pulseEvery: "34s", neighborsEarn: "+15%" },
      { level: 2, cashCost: 2700,  pays: "$265",   every: "5s", perMin: "$3,180",  unlockCoins: 500,    pulseEvery: "32s", neighborsEarn: "+20%" },
      { level: 3, cashCost: 6500,  pays: "$605",   every: "5s", perMin: "$7,260",  unlockCoins: 1400,   pulseEvery: "30s", neighborsEarn: "+25%" },
      { level: 4, cashCost: 13600, pays: "$1,040", every: "5s", perMin: "$12,480", unlockCoins: 3800,   pulseEvery: "28s", neighborsEarn: "+30%" },
      { level: 5, cashCost: 24600, pays: "$1,650", every: "5s", perMin: "$19,800", unlockCoins: 10500,  pulseEvery: "26s", neighborsEarn: "+35%" },
      { level: 6, cashCost: 34300, pays: "$2,320", every: "5s", perMin: "$27,840", unlockCoins: 28000,  pulseEvery: "24s", neighborsEarn: "+40%" },
      { level: 7, cashCost: 52200, pays: "$3,150", every: "5s", perMin: "$37,800", unlockCoins: 76000,  pulseEvery: "22s", neighborsEarn: "+45%" },
      { level: 8, cashCost: 68000, pays: "$4,000", every: "5s", perMin: "$48,000", unlockCoins: 180000, pulseEvery: "20s", neighborsEarn: "+50%" }
    ],
    whereToGet: [
      { source: "Common Chest",    chance: "<strong>0.02%</strong> per chest" },
      { source: "Epic Chest",      chance: "<strong>0.19%</strong> per chest" },
      { source: "Mythic Chest",    chance: "<strong>0.38%</strong> per chest" },
      { source: "Legendary Chest", chance: "<strong>1.05%</strong> per chest" },
      { source: "Divine Chest",    chance: "<strong>3.84%</strong> per chest" },
      { source: "Pumpkin Chest",   chance: "<strong>4.79%</strong> per chest" },
      { source: "Lava Chest",      chance: "<strong>16.54%</strong> per chest" }
    ]
  },

  "Dino": {
    tags: ["LEGENDARY", "PET"],
    buffColumnLabel: "COINS",
    summaryStats: [
      { label: "COINS", value: "+20% → +40%" }
    ],
    bullets: [
      "You earn <strong>more coins</strong> at the end of every match you finish"
    ],
    keyNumbers: [
      { label: "BUFFS",                value: "The coins of <strong>every match you finish</strong>" },
      { label: "MORE OF THE SAME PET", value: "In one house the 2nd counts <strong>60%</strong>, the 3rd <strong>36%</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+20%", upgradeCoins: 0 },
      { level: 2, buff: "+25%", upgradeCoins: 15000 },
      { level: 3, buff: "+30%", upgradeCoins: 60000 },
      { level: 4, buff: "+35%", upgradeCoins: 250000 },
      { level: 5, buff: "+40%", upgradeCoins: 1000000 }
    ],
    whereToGet: [
      { source: "Rare Egg",      chance: "<strong>0.04%</strong> per egg" },
      { source: "Epic Egg",      chance: "<strong>0.22%</strong> per egg" },
      { source: "Mythic Egg",    chance: "<strong>0.43%</strong> per egg" },
      { source: "Legendary Egg", chance: "<strong>1.18%</strong> per egg" },
      { source: "Divine Egg",    chance: "<strong>4.27%</strong> per egg" },
      { source: "Pumpkin Egg",   chance: "<strong>5.38%</strong> per egg" },
      { source: "Lava Egg",      chance: "<strong>19.09%</strong> per egg" }
    ]
  },

  "Croc": {
    tags: ["LEGENDARY", "PET"],
    buffColumnLabel: "GEMS",
    summaryStats: [
      { label: "GEMS", value: "+20% → +40%" }
    ],
    bullets: [
      "You earn <strong>more gems</strong> at the end of every match you finish"
    ],
    keyNumbers: [
      { label: "BUFFS",                 value: "The gems of <strong>every match you finish</strong>" },
      { label: "MORE OF THE SAME PET",  value: "In one house the 2nd counts <strong>60%</strong>, the 3rd <strong>36%</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+20%", upgradeCoins: 0 },
      { level: 2, buff: "+25%", upgradeCoins: 15000 },
      { level: 3, buff: "+30%", upgradeCoins: 60000 },
      { level: 4, buff: "+35%", upgradeCoins: 250000 },
      { level: 5, buff: "+40%", upgradeCoins: 1000000 }
    ],
    whereToGet: [
      { source: "Rare Egg",      chance: "<strong>0.04%</strong> per egg" },
      { source: "Epic Egg",      chance: "<strong>0.22%</strong> per egg" },
      { source: "Mythic Egg",    chance: "<strong>0.43%</strong> per egg" },
      { source: "Legendary Egg", chance: "<strong>1.18%</strong> per egg" },
      { source: "Divine Egg",    chance: "<strong>4.28%</strong> per egg" },
      { source: "Pumpkin Egg",   chance: "<strong>5.36%</strong> per egg" },
      { source: "Lava Egg",      chance: "<strong>19.08%</strong> per egg" }
    ]
  },

  "Bear": {
    tags: ["RARE", "PET"],
    buffColumnLabel: "RANGE",
    summaryStats: [
      { label: "RANGE", value: "+10% → +20%" }
    ],
    bullets: [
      "All of your towers <strong>shoot further</strong>"
    ],
    keyNumbers: [
      { label: "BUFFS",                value: "The range of <strong>every tower</strong> in your house" },
      { label: "MORE OF THE SAME PET", value: "In one house the 2nd counts <strong>60%</strong>, the 3rd <strong>36%</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+10%",   upgradeCoins: 0 },
      { level: 2, buff: "+12.5%", upgradeCoins: 1500 },
      { level: 3, buff: "+15%",   upgradeCoins: 6000 },
      { level: 4, buff: "+17.5%", upgradeCoins: 25000 },
      { level: 5, buff: "+20%",   upgradeCoins: 100000 }
    ],
    whereToGet: [
      { source: "Rare Egg", chance: "<strong>24.22%</strong> per egg" },
      { source: "Epic Egg", chance: "<strong>66.98%</strong> per egg" }
    ]
  },

  "Cat": {
    tags: ["RARE", "PET"],
    buffColumnLabel: "CASH",
    summaryStats: [
      { label: "CASH", value: "+10% → +20%" }
    ],
    bullets: [
      "You earn <strong>more cash</strong> from everything during the match"
    ],
    keyNumbers: [
      { label: "BUFFS",                value: "All the cash you earn <strong>during a match</strong>" },
      { label: "MORE OF THE SAME PET", value: "In one house the 2nd counts <strong>60%</strong>, the 3rd <strong>36%</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+10%",   upgradeCoins: 0 },
      { level: 2, buff: "+12.5%", upgradeCoins: 1500 },
      { level: 3, buff: "+15%",   upgradeCoins: 6000 },
      { level: 4, buff: "+17.5%", upgradeCoins: 25000 },
      { level: 5, buff: "+20%",   upgradeCoins: 100000 }
    ],
    whereToGet: [
      { source: "Rare Egg",   chance: "<strong>24.21%</strong> per egg" },
      { source: "Mythic Egg", chance: "<strong>32.99%</strong> per egg" }
    ]
  },

  "Dog": {
    tags: ["RARE", "PET"],
    buffColumnLabel: "DAMAGE",
    summaryStats: [
      { label: "DAMAGE", value: "+10% → +20%" }
    ],
    bullets: [
      "All of your towers <strong>hit harder</strong>"
    ],
    keyNumbers: [
      { label: "BUFFS",                value: "The damage of <strong>every tower</strong> in your house" },
      { label: "MORE OF THE SAME PET", value: "In one house the 2nd counts <strong>60%</strong>, the 3rd <strong>36%</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+10%",   upgradeCoins: 0 },
      { level: 2, buff: "+12.5%", upgradeCoins: 1500 },
      { level: 3, buff: "+15%",   upgradeCoins: 6000 },
      { level: 4, buff: "+17.5%", upgradeCoins: 25000 },
      { level: 5, buff: "+20%",   upgradeCoins: 100000 }
    ],
    whereToGet: [
      { source: "Rare Egg", chance: "<strong>24.21%</strong> per egg" }
    ]
  },

  "Squirrel": {
    tags: ["RARE", "PET"],
    buffColumnLabel: "RELOAD",
    summaryStats: [
      { label: "RELOAD", value: "+10% → +20%" }
    ],
    bullets: [
      "All of your towers <strong>reload faster</strong>"
    ],
    keyNumbers: [
      { label: "BUFFS",                value: "The reload of <strong>every tower</strong> in your house" },
      { label: "MORE OF THE SAME PET", value: "In one house the 2nd counts <strong>60%</strong>, the 3rd <strong>36%</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+10%",   upgradeCoins: 0 },
      { level: 2, buff: "+12.5%", upgradeCoins: 1500 },
      { level: 3, buff: "+15%",   upgradeCoins: 6000 },
      { level: 4, buff: "+17.5%", upgradeCoins: 25000 },
      { level: 5, buff: "+20%",   upgradeCoins: 100000 }
    ],
    whereToGet: [
      { source: "Rare Egg", chance: "<strong>24.21%</strong> per egg" }
    ]
  },

  "Turkey": {
    tags: ["RARE", "EXCLUSIVE", "PET"],
    buffColumnLabel: "EVENT",
    summaryStats: [
      { label: "EVENT", value: "+10% → +20%" }
    ],
    bullets: [
      "You earn <strong>more event currency</strong> from every event win"
    ],
    keyNumbers: [
      { label: "BUFFS",                value: "The <strong>Drumsticks</strong> you earn by <strong>winning</strong> an event match" },
      { label: "LEVEL UPS",            value: "Cost <strong>Drumsticks</strong> while the event runs" },
      { label: "MORE OF THE SAME PET", value: "In one house the 2nd counts <strong>60%</strong>, the 3rd <strong>36%</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+10%",   upgradeCoins: 0 },
      { level: 2, buff: "+12.5%", upgradeCoins: 1500 },
      { level: 3, buff: "+15%",   upgradeCoins: 6000 },
      { level: 4, buff: "+17.5%", upgradeCoins: 25000 },
      { level: 5, buff: "+20%",   upgradeCoins: 100000 }
    ],
    whereToGet: [
      { source: "Exclusive",   chance: "<strong>Thanksgiving Event</strong>" },
      { source: "Harvest Egg", chance: "<strong>70%</strong> per egg" }
    ]
  },

  "Beaver": {
    tags: ["EPIC", "PET"],
    buffColumnLabel: "🚪 DOORS START",
    summaryStats: [
      { label: "🚪 DOORS START", value: "+3 Lvl → +8 Lvl" }
    ],
    bullets: [
      "All doors in your house <strong>start at a higher level</strong>"
    ],
    keyNumbers: [
      { label: "WORKS ON",             value: "<strong>Every door</strong> of your house, from the start of the match" },
      { label: "MORE OF THE SAME PET", value: "In one house the 2nd counts <strong>60%</strong>, the 3rd <strong>36%</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+3 Lvl", upgradeCoins: 0 },
      { level: 2, buff: "+4 Lvl", upgradeCoins: 4000 },
      { level: 3, buff: "+6 Lvl", upgradeCoins: 15000 },
      { level: 4, buff: "+7 Lvl", upgradeCoins: 60000 },
      { level: 5, buff: "+8 Lvl", upgradeCoins: 250000 }
    ],
    whereToGet: [
      { source: "Epic Egg",   chance: "<strong>6.5%</strong> per egg" },
      { source: "Mythic Egg", chance: "<strong>13%</strong> per egg" }
    ]
  },

  "Hippo": {
    tags: ["EPIC", "PET"],
    buffColumnLabel: "💚 DOOR HEALTH",
    summaryStats: [
      { label: "💚 DOOR HEALTH", value: "+20% → +40%" }
    ],
    bullets: [
      "Your door has <strong>more health</strong>"
    ],
    keyNumbers: [
      { label: "BUFFS",                value: "The max health of <strong>every door</strong>" },
      { label: "MORE OF THE SAME PET", value: "In one house the 2nd counts <strong>60%</strong>, the 3rd <strong>36%</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+20%", upgradeCoins: 0 },
      { level: 2, buff: "+25%", upgradeCoins: 4000 },
      { level: 3, buff: "+30%", upgradeCoins: 15000 },
      { level: 4, buff: "+35%", upgradeCoins: 60000 },
      { level: 5, buff: "+40%", upgradeCoins: 250000 }
    ],
    whereToGet: [
      { source: "Rare Egg",   chance: "<strong>2.5%</strong> per egg" },
      { source: "Epic Egg",   chance: "<strong>6.5%</strong> per egg" },
      { source: "Mythic Egg", chance: "<strong>13%</strong> per egg" }
    ]
  },

  "Deer": {
    tags: ["EPIC", "PET"],
    buffColumnLabel: "⚡ RELOAD",
    buff2ColumnLabel: "⚔️ DAMAGE",
    summaryStats: [
      { label: "⚡ RELOAD", value: "+48% → +80%" },
      { label: "⚔️ DAMAGE", value: "+48% → +80%" }
    ],
    bullets: [
      "When any door drops below half health, all of your towers <strong>attack much faster</strong> and <strong>hit much harder</strong>"
    ],
    keyNumbers: [
      { label: "SWITCHES ON",          value: "While any door is <strong>below 50%</strong> health" },
      { label: "SWITCHES OFF",         value: "When every door is back at 50% or more" },
      { label: "BROKEN DOORS",         value: "Do not count" },
      { label: "MORE OF THE SAME PET", value: "In one house the 2nd counts <strong>60%</strong>, the 3rd <strong>36%</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+48%", buff2: "+48%", upgradeCoins: 0 },
      { level: 2, buff: "+56%", buff2: "+56%", upgradeCoins: 4000 },
      { level: 3, buff: "+64%", buff2: "+64%", upgradeCoins: 15000 },
      { level: 4, buff: "+72%", buff2: "+72%", upgradeCoins: 60000 },
      { level: 5, buff: "+80%", buff2: "+80%", upgradeCoins: 250000 }
    ],
    whereToGet: [
      { source: "Epic Egg",      chance: "<strong>6.5%</strong> per egg" },
      { source: "Mythic Egg",    chance: "<strong>13%</strong> per egg" },
      { source: "Legendary Egg", chance: "<strong>39.66%</strong> per egg" }
    ]
  },

  "Penguin": {
    tags: ["EPIC", "PET"],
    buffColumnLabel: "⚔️ DAMAGE",
    buff2ColumnLabel: "⚡ RELOAD",
    buff3ColumnLabel: "🎯 RANGE",
    summaryStats: [
      { label: "⚔️ DAMAGE", value: "+30% → +50%" },
      { label: "⚡ RELOAD", value: "+30% → +50%" },
      { label: "🎯 RANGE",  value: "+50%" }
    ],
    bullets: [
      "Only your <strong>most expensive</strong> tower gets a boost: it <strong>hits harder</strong>, <strong>reloads faster</strong>, and <strong>shoots further</strong>"
    ],
    keyNumbers: [
      { label: "BUFFS",              value: "Only your <strong>most expensive</strong> damage tower" },
      { label: "TWO THE SAME PRICE", value: "The one placed first" },
      { label: "RANGE",              value: "<strong>+50%</strong> at every level" }
    ],
    petLevels: [
      { level: 1, buff: "+30%", buff2: "+30%", buff3: "+50%", upgradeCoins: 0 },
      { level: 2, buff: "+35%", buff2: "+35%", buff3: "+50%", upgradeCoins: 4000 },
      { level: 3, buff: "+40%", buff2: "+40%", buff3: "+50%", upgradeCoins: 15000 },
      { level: 4, buff: "+45%", buff2: "+45%", buff3: "+50%", upgradeCoins: 60000 },
      { level: 5, buff: "+50%", buff2: "+50%", buff3: "+50%", upgradeCoins: 250000 }
    ],
    whereToGet: [
      { source: "Epic Egg",      chance: "<strong>6.5%</strong> per egg" },
      { source: "Mythic Egg",    chance: "<strong>13%</strong> per egg" },
      { source: "Legendary Egg", chance: "<strong>39.65%</strong> per egg" }
    ]
  },

  "Pilgrim Bear": {
    tags: ["EPIC", "EXCLUSIVE", "PET"],
    buffColumnLabel: "⚔️ DAMAGE",
    buff2ColumnLabel: "🎯 RANGE",
    summaryStats: [
      { label: "⚔️ DAMAGE", value: "+10% → +20%" },
      { label: "🎯 RANGE",  value: "+10% → +20%" }
    ],
    bullets: [
      "Every one of your towers <strong>hits harder</strong> and <strong>shoots further</strong>"
    ],
    keyNumbers: [
      { label: "BUFFS",                value: "The damage <strong>and</strong> range of <strong>every tower</strong> in your house" },
      { label: "LEVEL UPS",            value: "Cost <strong>Drumsticks</strong> while the event runs" },
      { label: "MORE OF THE SAME PET", value: "In one house the 2nd counts <strong>60%</strong>, the 3rd <strong>36%</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+10%",   buff2: "+10%",   upgradeCoins: 0 },
      { level: 2, buff: "+12.5%", buff2: "+12.5%", upgradeCoins: 4000 },
      { level: 3, buff: "+15%",   buff2: "+15%",   upgradeCoins: 15000 },
      { level: 4, buff: "+17.5%", buff2: "+17.5%", upgradeCoins: 60000 },
      { level: 5, buff: "+20%",   buff2: "+20%",   upgradeCoins: 250000 }
    ],
    whereToGet: [
      { source: "Exclusive",   chance: "<strong>Thanksgiving Event</strong>" },
      { source: "Harvest Egg", chance: "<strong>27%</strong> per egg" }
    ]
  },

  "Monkey": {
    tags: ["MYTHIC", "PET"],
    buffColumnLabel: `${ICON_EXP} EXP`,
    buff2ColumnLabel: "⚔️ DAMAGE",
    buff3ColumnLabel: `${ICON_CLANSUPPLIES} CLAN SUPPLIES`,
    summaryStats: [
      { label: `${ICON_EXP} EXP`,                   value: "+20% → +40%" },
      { label: "⚔️ DAMAGE",                          value: "-20% → 0%" },
      { label: `${ICON_CLANSUPPLIES} CLAN SUPPLIES`, value: "+5% → +25%" }
    ],
    bullets: [
      "You <strong>level up faster</strong> and earn <strong>more clan supplies</strong>, but your towers <strong>hit weaker</strong>",
      "Upgrading the pet <strong>makes the downside smaller</strong>"
    ],
    keyNumbers: [
      { label: "UPSIDE",               value: "More EXP and more clan supplies" },
      { label: "DOWNSIDE",             value: "Your towers deal less damage. It is <strong>gone at level 5</strong>" },
      { label: "MORE OF THE SAME PET", value: "In one house the 2nd counts <strong>60%</strong>, the 3rd <strong>36%</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+20%", buff2: "-20%", buff3: "+5%",  upgradeCoins: 0 },
      { level: 2, buff: "+25%", buff2: "-15%", buff3: "+10%", upgradeCoins: 8000 },
      { level: 3, buff: "+30%", buff2: "-10%", buff3: "+15%", upgradeCoins: 30000 },
      { level: 4, buff: "+35%", buff2: "-5%",  buff3: "+20%", upgradeCoins: 125000 },
      { level: 5, buff: "+40%", buff2: "0%",   buff3: "+25%", upgradeCoins: 500000 }
    ],
    whereToGet: [
      { source: "Epic Egg",      chance: "<strong>1.2%</strong> per egg" },
      { source: "Mythic Egg",    chance: "<strong>2.6%</strong> per egg" },
      { source: "Legendary Egg", chance: "<strong>3%</strong> per egg" },
      { source: "Divine Egg",    chance: "<strong>15.3%</strong> per egg" },
      { source: "Pumpkin Egg",   chance: "<strong>14.1%</strong> per egg" }
    ]
  },

  "Tiger": {
    tags: ["LEGENDARY", "PET"],
    buffColumnLabel: "⚔️ DAMAGE",
    buff2ColumnLabel: "⚡ RELOAD",
    summaryStats: [
      { label: "⚔️ DAMAGE", value: "+20% → +40%" },
      { label: "⚡ RELOAD", value: "+20% → +30%" }
    ],
    bullets: [
      "Every tower <strong>hits harder</strong> and <strong>reloads faster</strong>"
    ],
    keyNumbers: [
      { label: "BUFFS",                value: "The damage <strong>and</strong> reload of every tower" },
      { label: "MORE OF THE SAME PET", value: "In one house the 2nd counts <strong>60%</strong>, the 3rd <strong>36%</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+20%", buff2: "+20%",   upgradeCoins: 0 },
      { level: 2, buff: "+25%", buff2: "+22.5%", upgradeCoins: 15000 },
      { level: 3, buff: "+30%", buff2: "+25%",   upgradeCoins: 60000 },
      { level: 4, buff: "+35%", buff2: "+27.5%", upgradeCoins: 250000 },
      { level: 5, buff: "+40%", buff2: "+30%",   upgradeCoins: 1000000 }
    ],
    whereToGet: [
      { source: "Epic Egg",      chance: "<strong>0.22%</strong> per egg" },
      { source: "Mythic Egg",    chance: "<strong>0.43%</strong> per egg" },
      { source: "Legendary Egg", chance: "<strong>1.18%</strong> per egg" },
      { source: "Divine Egg",    chance: "<strong>4.27%</strong> per egg" },
      { source: "Pumpkin Egg",   chance: "<strong>5.38%</strong> per egg" },
      { source: "Lava Egg",      chance: "<strong>19.09%</strong> per egg" }
    ]
  },

  "Elephant": {
    tags: ["LEGENDARY", "PET"],
    buffColumnLabel: "🛡️ STUNS FOR",
    buff2ColumnLabel: "⏱️ COOLDOWN",
    summaryStats: [
      { label: "🛡️ STUNS FOR", value: "5s → 8s" },
      { label: "⏱️ COOLDOWN",  value: "70s → 40s" }
    ],
    bullets: [
      "When a boss tries to stun your towers, the stun bounces back and <strong>every boss at your house is stunned</strong> instead"
    ],
    keyNumbers: [
      { label: "TRIGGERS",          value: "When a boss tries to <strong>stun your towers</strong>" },
      { label: "WHAT HAPPENS",      value: "The stun is canceled and <strong>every boss</strong> at your house is stunned" },
      { label: "BOSS STUN",         value: "<strong>5s → 8s</strong> by level" },
      { label: "COOLDOWN",          value: "<strong>70s → 40s</strong> by level" },
      { label: "SEVERAL ELEPHANTS", value: "Each has its own cooldown. Maxed, the 2nd waits <strong>67s</strong>, the 3rd <strong>111s</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "5s",    buff2: "70s",   upgradeCoins: 0 },
      { level: 2, buff: "5.75s", buff2: "62.5s", upgradeCoins: 15000 },
      { level: 3, buff: "6.5s",  buff2: "55s",   upgradeCoins: 60000 },
      { level: 4, buff: "7.25s", buff2: "47.5s", upgradeCoins: 250000 },
      { level: 5, buff: "8s",    buff2: "40s",   upgradeCoins: 1000000 }
    ],
    whereToGet: [
      { source: "Epic Egg",      chance: "<strong>0.11%</strong> per egg" },
      { source: "Mythic Egg",    chance: "<strong>0.22%</strong> per egg" },
      { source: "Legendary Egg", chance: "<strong>0.59%</strong> per egg" },
      { source: "Divine Egg",    chance: "<strong>2.13%</strong> per egg" },
      { source: "Pumpkin Egg",   chance: "<strong>2.69%</strong> per egg" },
      { source: "Lava Egg",      chance: "<strong>9.54%</strong> per egg" }
    ]
  },

  "Dragon": {
    tags: ["LEGENDARY", "PET"],
    buffColumnLabel: "🩸 LIFESTEAL",
    summaryStats: [
      { label: "🩸 LIFESTEAL", value: "+30% → +40%" }
    ],
    bullets: [
      "A share of the damage your towers deal <strong>repairs your door</strong>"
    ],
    keyNumbers: [
      { label: "HEALS",                value: "Your door, with a share of the <strong>damage your towers deal</strong>" },
      { label: "MORE OF THE SAME PET", value: "In one house the 2nd counts <strong>60%</strong>, the 3rd <strong>36%</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+30%",   upgradeCoins: 0 },
      { level: 2, buff: "+32.5%", upgradeCoins: 15000 },
      { level: 3, buff: "+35%",   upgradeCoins: 60000 },
      { level: 4, buff: "+37.5%", upgradeCoins: 250000 },
      { level: 5, buff: "+40%",   upgradeCoins: 1000000 }
    ],
    whereToGet: [
      { source: "Epic Egg",      chance: "<strong>0.04%</strong> per egg" },
      { source: "Mythic Egg",    chance: "<strong>0.09%</strong> per egg" },
      { source: "Legendary Egg", chance: "<strong>0.24%</strong> per egg" },
      { source: "Divine Egg",    chance: "<strong>1%</strong> per egg" },
      { source: "Pumpkin Egg",   chance: "<strong>1.08%</strong> per egg" },
      { source: "Lava Egg",      chance: "<strong>3.82%</strong> per egg" }
    ]
  },

  "Golden Turkey": {
    tags: ["LEGENDARY", "EXCLUSIVE", "PET"],
    buffColumnLabel: "🪙 COINS",
    buff2ColumnLabel: "🍗 EVENT",
    buff3ColumnLabel: "🦅 LIFT",
    summaryStats: [
      { label: "🪙 COINS", value: "+20% → +40%" },
      { label: "🍗 EVENT", value: "+30% → +70%" },
      { label: "🦅 LIFT",  value: "16s → 8s" }
    ],
    bullets: [
      "Every few seconds it <strong>flies off with a zombie</strong> and <strong>drops it dead</strong>",
      "You also earn <strong>more coins</strong> from every match and <strong>much more event currency</strong> from every event win"
    ],
    keyNumbers: [
      { label: "LIFT EVERY",             value: "<strong>16s → 8s</strong> by level, when a zombie is near your house" },
      { label: "PICKS",                  value: "The <strong>toughest normal zombie</strong> within <strong>50 studs</strong> of a door" },
      { label: "WHAT HAPPENS",           value: "Carries it <strong>20 studs</strong> up and drops it. It <strong>dies</strong>" },
      { label: "BOSSES",                 value: "Are never picked" },
      { label: "SEVERAL GOLDEN TURKEYS", value: "All lift, but wait longer. Maxed: <strong>8s</strong>, <strong>13s</strong>, <strong>22s</strong>" },
      { label: "COINS",                  value: "<strong>+20% → +40%</strong> from every match you finish" },
      { label: "DRUMSTICKS",             value: "<strong>+30% → +70%</strong> from every event match you win" },
      { label: "LEVEL UPS",              value: "Cost <strong>Drumsticks</strong> while the event runs" }
    ],
    petLevels: [
      { level: 1, buff: "+20%", buff2: "+30%", buff3: "16s", upgradeCoins: 0 },
      { level: 2, buff: "+25%", buff2: "+40%", buff3: "14s", upgradeCoins: 15000 },
      { level: 3, buff: "+30%", buff2: "+50%", buff3: "12s", upgradeCoins: 60000 },
      { level: 4, buff: "+35%", buff2: "+60%", buff3: "10s", upgradeCoins: 250000 },
      { level: 5, buff: "+40%", buff2: "+70%", buff3: "8s",  upgradeCoins: 1000000 }
    ],
    whereToGet: [
      { source: "Exclusive",   chance: "<strong>Thanksgiving Event</strong>" },
      { source: "Harvest Egg", chance: "<strong>3%</strong> per egg" }
    ]
  },

  "Turtle": {
    tags: ["LEGENDARY", "PET"],
    buffColumnLabel: "🛡️ SHIELD",
    buff2ColumnLabel: "⚡ RELOAD",
    summaryStats: [
      { label: "🛡️ SHIELD", value: "5s → 20s" },
      { label: "⚡ RELOAD", value: "+100% → +200%" }
    ],
    bullets: [
      "When a door is about to break, every door in your house gets a <strong>shield</strong> and your towers <strong>reload much faster</strong> for a few seconds",
      "Works once per match"
    ],
    keyNumbers: [
      { label: "TRIGGERS",        value: "When a hit would <strong>break a door</strong>" },
      { label: "SHIELD",          value: "<strong>Every door</strong> takes no damage for <strong>5s → 20s</strong>" },
      { label: "WHILE IT IS UP",  value: "Your towers reload <strong>+100% → +200%</strong> faster" },
      { label: "USES",            value: "<strong>1 per match</strong> for each Turtle" },
      { label: "HEALING",         value: "Still works while the shield is up" },
      { label: "SEVERAL TURTLES", value: "Fire one after another, strongest first" }
    ],
    petLevels: [
      { level: 1, buff: "5s",     buff2: "+100%", upgradeCoins: 0 },
      { level: 2, buff: "8.75s",  buff2: "+125%", upgradeCoins: 15000 },
      { level: 3, buff: "12.5s",  buff2: "+150%", upgradeCoins: 60000 },
      { level: 4, buff: "16.25s", buff2: "+175%", upgradeCoins: 250000 },
      { level: 5, buff: "20s",    buff2: "+200%", upgradeCoins: 1000000 }
    ],
    whereToGet: [
      { source: "Epic Egg",      chance: "<strong>0.08%</strong> per egg" },
      { source: "Mythic Egg",    chance: "<strong>0.15%</strong> per egg" },
      { source: "Legendary Egg", chance: "<strong>0.41%</strong> per egg" },
      { source: "Divine Egg",    chance: "<strong>1.49%</strong> per egg" },
      { source: "Pumpkin Egg",   chance: "<strong>1.88%</strong> per egg" },
      { source: "Lava Egg",      chance: "<strong>6.68%</strong> per egg" }
    ]
  },

  "Bunny": {
    tags: ["MYTHIC", "PET"],
    buffColumnLabel: "💚 HEALS",
    summaryStats: [
      { label: "💚 HEALS", value: "0.5%/s → 1.5%/s" }
    ],
    bullets: [
      "Repairs all of your doors <strong>a little every second</strong>, all match long"
    ],
    keyNumbers: [
      { label: "HEALS",                value: "<strong>Every door</strong>, every second, all match long" },
      { label: "AMOUNT",               value: "A share of the door's <strong>max health</strong>" },
      { label: "MORE OF THE SAME PET", value: "In one house the 2nd counts <strong>60%</strong>, the 3rd <strong>36%</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "0.5%/s",  upgradeCoins: 0 },
      { level: 2, buff: "0.75%/s", upgradeCoins: 8000 },
      { level: 3, buff: "1%/s",    upgradeCoins: 30000 },
      { level: 4, buff: "1.25%/s", upgradeCoins: 125000 },
      { level: 5, buff: "1.5%/s",  upgradeCoins: 500000 }
    ],
    whereToGet: [
      { source: "Epic Egg",      chance: "<strong>1.2%</strong> per egg" },
      { source: "Mythic Egg",    chance: "<strong>2.6%</strong> per egg" },
      { source: "Legendary Egg", chance: "<strong>3%</strong> per egg" },
      { source: "Divine Egg",    chance: "<strong>15.3%</strong> per egg" },
      { source: "Pumpkin Egg",   chance: "<strong>14.1%</strong> per egg" }
    ]
  },

  "Rhino": {
    tags: ["MYTHIC", "PET"],
    buffColumnLabel: "💥 RAM DAMAGE",
    buff2ColumnLabel: "⏱️ COOLDOWN",
    buff3ColumnLabel: "🛡️ DOOR ARMOR",
    summaryStats: [
      { label: "💥 RAM DAMAGE", value: "+20% → +40%" },
      { label: "⏱️ COOLDOWN",   value: "18s → 10s" },
      { label: "🛡️ DOOR ARMOR", value: "+10% → +20%" }
    ],
    bullets: [
      "<strong>Charges</strong> across your doors, <strong>hitting zombies hard</strong> and <strong>knocking them back</strong> (bosses are immune)",
      "Your doors also <strong>take less damage</strong>"
    ],
    keyNumbers: [
      { label: "CHARGE",         value: "Every <strong>18s → 10s</strong>, when zombies are at a door" },
      { label: "NORMAL ZOMBIES", value: "Lose <strong>20% → 40%</strong> of their max health" },
      { label: "KNOCKBACK",      value: "<strong>16 studs</strong> back, then dazed for <strong>1.1s</strong>" },
      { label: "BOSSES",         value: "Are not touched" },
      { label: "DOOR ARMOR",     value: "Your doors take <strong>10% → 20%</strong> less damage" },
      { label: "SEVERAL RHINOS", value: "All charge, but wait longer. Maxed: <strong>10s</strong>, <strong>17s</strong>, <strong>28s</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+20%", buff2: "18s", buff3: "+10%",   upgradeCoins: 0 },
      { level: 2, buff: "+25%", buff2: "16s", buff3: "+12.5%", upgradeCoins: 8000 },
      { level: 3, buff: "+30%", buff2: "14s", buff3: "+15%",   upgradeCoins: 30000 },
      { level: 4, buff: "+35%", buff2: "12s", buff3: "+17.5%", upgradeCoins: 125000 },
      { level: 5, buff: "+40%", buff2: "10s", buff3: "+20%",   upgradeCoins: 500000 }
    ],
    whereToGet: [
      { source: "Epic Egg",      chance: "<strong>1.2%</strong> per egg" },
      { source: "Mythic Egg",    chance: "<strong>2.6%</strong> per egg" },
      { source: "Legendary Egg", chance: "<strong>3%</strong> per egg" },
      { source: "Divine Egg",    chance: "<strong>15.3%</strong> per egg" },
      { source: "Pumpkin Egg",   chance: "<strong>14.1%</strong> per egg" }
    ]
  },

  "Horse": {
    tags: ["DIVINE", "PET"],
    buffColumnLabel: "💥 STAMPEDE",
    buff2ColumnLabel: "💫 BOSS STUN",
    buff3ColumnLabel: "🧲 PER CHARGE",
    summaryStats: [
      { label: "💥 STAMPEDE",   value: "+15% → +25%" },
      { label: "💫 BOSS STUN",  value: "3s → 5s" },
      { label: "🧲 PER CHARGE", value: "+10% (Max +50% DMG / +50% Reload / +25% Range)" }
    ],
    bullets: [
      "Starts with <strong>3 stampede charges</strong> and earns more by <strong>killing zombies</strong>, up to 5. Each stored charge <strong>buffs all your towers</strong>",
      "When a door drops below <strong>75% health</strong>, a charge is used to <strong>wipe out small zombies</strong>, stun and hurt bosses and <strong>repair your doors</strong>"
    ],
    keyNumbers: [
      { label: "STARTS WITH",         value: "<strong>3 stampede charges</strong>" },
      { label: "EARN 1 MORE",         value: "Every <strong>60 zombies</strong> killed at your house. A boss counts as 10" },
      { label: "MOST STORED",         value: "<strong>5 charges</strong>" },
      { label: "EVERY STORED CHARGE", value: "<strong>+10%</strong> damage, <strong>+10%</strong> reload and <strong>+5%</strong> range for all your towers" },
      { label: "AT 5 CHARGES",        value: "<strong>+50%</strong> damage, <strong>+50%</strong> reload, <strong>+25%</strong> range" },
      { label: "SEVERAL HORSES",      value: "The 2nd adds <strong>+6%</strong> a charge, the 3rd <strong>+3.6%</strong>" },
      { label: "STAMPEDE TRIGGERS",   value: "When a door drops <strong>below 75%</strong> health and zombies are at it" },
      { label: "STAMPEDE COSTS",      value: "<strong>1 charge</strong>, and its tower buff until you earn it back" },
      { label: "NORMAL ZOMBIES",      value: "At your doors are <strong>killed</strong>" },
      { label: "BOSSES",              value: "Stunned for <strong>3s → 5s</strong> by level, and hurt (see table)" },
      { label: "DOORS",               value: "Every door heals <strong>20%</strong> of its health over <strong>10 seconds</strong>. Heals stack" },
      { label: "BETWEEN TWO",         value: "At least <strong>3 seconds</strong>" }
    ],
    extraTable: {
      title: "STAMPEDE DAMAGE TO A BOSS",
      note: "SHARE OF ITS MAX HEALTH",
      headers: ["BOSS FROM", "LVL 1", "LVL 2", "LVL 3", "LVL 4", "LVL 5"],
      rows: [
        ["Easy",           "15%", "17.5%", "20%", "22.5%", "25%"],
        ["Hard",           "12%", "14%",   "16%", "18%",   "20%"],
        ["Nightmare",      "9%",  "10.5%", "12%", "13.5%", "15%"],
        ["Impossible",     "6%",  "7%",    "8%",  "9%",    "10%"],
        ["Crazy",          "3%",  "3.5%",  "4%",  "4.5%",  "5%"],
        ["Any other mode", "0%",  "0%",    "0%",  "0%",    "0%"]
      ]
    },
    petLevels: [
      { level: 1, buff: "+15%",   buff2: "3s",   buff3: "+10%", upgradeCoins: 0 },
      { level: 2, buff: "+17.5%", buff2: "3.5s", buff3: "+10%", upgradeCoins: 45000 },
      { level: 3, buff: "+20%",   buff2: "4s",   buff3: "+10%", upgradeCoins: 180000 },
      { level: 4, buff: "+22.5%", buff2: "4.5s", buff3: "+10%", upgradeCoins: 750000 },
      { level: 5, buff: "+25%",   buff2: "5s",   buff3: "+10%", upgradeCoins: 3000000 }
    ],
    whereToGet: [
      { source: "Divine Egg",  chance: "<strong>0.5%</strong> per egg" },
      { source: "Pumpkin Egg", chance: "<strong>0.5%</strong> per egg" },
      { source: "Lava Egg",    chance: "<strong>1.25%</strong> per egg" }
    ]
  },

  "Unicorn": {
    tags: ["DIVINE", "PET"],
    buffColumnLabel: "🎰 WISHES",
    buff2ColumnLabel: "⏱️ COOLDOWN",
    summaryStats: [
      { label: "🎰 WISHES",   value: "9" },
      { label: "⏱️ COOLDOWN", value: "60s → 30s" }
    ],
    bullets: [
      "Gives you a <strong>wish button</strong> that grants a random <strong>powerful wish</strong>: huge tower boosts, extra cash, unbreakable doors and more",
      "Upgrading it <strong>lowers the cooldown</strong>"
    ],
    keyNumbers: [
      { label: "WISH BUTTON",      value: "Press it to roll <strong>1 random wish</strong>" },
      { label: "COOLDOWN",         value: "<strong>60s → 30s</strong> by level. It starts when the wish ends" },
      { label: "UPGRADING",        value: "Only shortens the cooldown. Chances <strong>never change</strong>" },
      { label: "THE ROLL",         value: "The reel spins for <strong>4.5 seconds</strong>, then the wish starts" },
      { label: "SEVERAL UNICORNS", value: "Each is its own button at <strong>full strength</strong>" }
    ],
    extraTables: [
      {
        title: "THE 9 WISHES",
        note: "SAME CHANCES AT EVERY LEVEL",
        headers: ["CHANCE", "WISH", "EFFECT"],
        rows: [
          ["18%", "Pocket Money",      "Instant cash: what your farms earn in 60 seconds"],
          ["17%", "Golden Kills",      "40s. Every kill pays 1.5s of your farm income, a boss 30s"],
          ["15%", "Money Rain",        "45s. Your farms pay 2x"],
          ["13%", "Invincible Doors",  "20s. Your doors take no damage"],
          ["12%", "Reverse Card",      "15s. Zombie hits heal your doors instead"],
          ["11%", "Free Upgrade",      "A random tower gets 1 free level"],
          ["9%",  "Rainbow Fury",      "40s. Every tower: +200% damage, +200% reload, +50% range"],
          ["4%",  "Divine Strike",     "Kills every normal zombie at your house. Bosses lose 15% of the health they have left"],
          ["1%",  "Jackpot",           "3 wishes at once"]
        ]
      },
      {
        title: "IN PVP THE WISHES ARE WEAKER",
        headers: ["WISH", "PVP EFFECT"],
        rows: [
          ["Pocket Money",     "30 seconds of income"],
          ["Golden Kills",     "0.75s a kill, 15s a boss"],
          ["Money Rain",       "1.5x"],
          ["Invincible Doors", "10s"],
          ["Reverse Card",     "8s"],
          ["Rainbow Fury",     "+100% damage, +100% reload, +25% range"],
          ["Divine Strike",    "Nothing is killed. Zombies lose half their health, bosses 7.5%"]
        ]
      }
    ],
    petLevels: [
      { level: 1, buff: "9", buff2: "60s",   upgradeCoins: 0 },
      { level: 2, buff: "9", buff2: "52.5s", upgradeCoins: 45000 },
      { level: 3, buff: "9", buff2: "45s",   upgradeCoins: 180000 },
      { level: 4, buff: "9", buff2: "37.5s", upgradeCoins: 750000 },
      { level: 5, buff: "9", buff2: "30s",   upgradeCoins: 3000000 }
    ],
    whereToGet: [
      { source: "Legendary Egg", chance: "<strong>0.1%</strong> per egg" },
      { source: "Divine Egg",    chance: "<strong>1%</strong> per egg" },
      { source: "Pumpkin Egg",   chance: "<strong>1%</strong> per egg" },
      { source: "Lava Egg",      chance: "<strong>2.5%</strong> per egg" }
    ]
  },

  "Jinx": {
    tags: ["DIVINE", "PET"],
    buffColumnLabel: "🔮 LUCK",
    buff2ColumnLabel: "💀 ZOMBIE DAMAGE",
    summaryStats: [
      { label: "🔮 LUCK",          value: "+20% → +40%" },
      { label: "💀 ZOMBIE DAMAGE", value: "+30%" }
    ],
    bullets: [
      "After every <strong>win</strong>, everyone she curses spins a <strong>crystal ball</strong> for <strong>bonus coins and gems</strong>",
      "Each Jinx adds <strong>luck</strong> but makes zombies <strong>hit harder</strong>"
    ],
    keyNumbers: [
      { label: "EVERY JINX (CURSE)", value: "Zombies at your house deal <strong>+30% damage</strong>" },
      { label: "SEVERAL JINXES",     value: "All add up in full: 2 are <strong>+60%</strong>, 3 are <strong>+90%</strong>" },
      { label: "WHO IS CURSED",      value: "Only the house Jinx is in" },
      { label: "CRYSTAL BALL SPIN",  value: "After every <strong>win</strong> (Clans Easy: after clearing <strong>50 waves</strong>). A loss gives no spin" },
      { label: "WHO SPINS",          value: "<strong>Everyone</strong> in the cursed house, once (Jinx must be there for at least <strong>half</strong> of your time)" },
      { label: "3 REELS",            value: "Each lands on a <strong>coin pack</strong> or <strong>gem pack</strong> (50/50). A pair pays <strong>double</strong>; 3 of a kind = <strong>Jackpot</strong> up to <strong>25x</strong>" },
      { label: "LUCK",               value: "<strong>20% → 40%</strong> luck per Jinx (all added up) + mode bonus luck, capped by mode" },
      { label: "JACKPOT CHANCE",     value: "<strong>2%</strong>, plus <strong>4%</strong> for every 100% luck, up to <strong>25%</strong>" },
      { label: "EXAMPLE",            value: "One level 5 Jinx in Crazy: 40% + 60% = <strong>100% luck</strong>, a <strong>6%</strong> jackpot chance" }
    ],
    extraTables: [
      {
        title: "THE REELS",
        note: "PAYS = SHARE OF THE SPIN BASE",
        headers: ["SYMBOL", "PAYS", "3 OF A KIND", "0% LUCK", "100% LUCK", "250% LUCK", "500% LUCK"],
        rows: [
          ["PACK 1",  "6%",  "1x",   "40%", "22.7%", "9.7%",  "2.9%"],
          ["PACK 2",  "12%", "2.5x", "28%", "23.8%", "15.3%", "7.1%"],
          ["PACK 3",  "25%", "5x",   "18%", "22.9%", "22.2%", "15.9%"],
          ["PACK 4",  "50%", "10x",  "10%", "19.1%", "27.7%", "30.9%"],
          ["PACK 5",  "90%", "25x",  "4%",  "11.5%", "25%",   "43.3%"],
          ["Jackpot", "—",   "—",    "2%",  "6%",    "12%",   "22%"]
        ]
      },
      {
        title: "EVERY MODE",
        note: "SPIN BASE = ONE FULL CLEAR",
        headers: ["MODE", "BONUS LUCK", "MAX LUCK", "BASE COINS", "BASE GEMS"],
        rows: [
          ["Easy",            "+0%",  "100%", "1,500",  "23"],
          ["Hard",            "+15%", "125%", "5,000",  "66"],
          ["Nightmare",       "+30%", "250%", "14,500", "183"],
          ["Impossible",      "+50%", "400%", "21,000", "267"],
          ["Crazy",           "+60%", "500%", "31,720", "406"],
          ["Clans Easy",      "+0%",  "100%", "1,500",  "23"],
          ["Clans Hard",      "+15%", "150%", "41,499", "506"],
          ["Clans Crazy",     "+40%", "300%", "53,199", "649"],
          ["Apocalypse",      "+60%", "500%", "64,992", "793"],
          ["Feast Easy",      "+15%", "150%", "9,000",  "120"],
          ["Feast Nightmare", "+40%", "300%", "17,000", "228"],
          ["Feast Crazy",     "+60%", "500%", "23,000", "308"]
        ]
      }
    ],
    petLevels: [
      { level: 1, buff: "+20%", buff2: "+30%", upgradeCoins: 0 },
      { level: 2, buff: "+25%", buff2: "+30%", upgradeCoins: 45000 },
      { level: 3, buff: "+30%", buff2: "+30%", upgradeCoins: 180000 },
      { level: 4, buff: "+35%", buff2: "+30%", upgradeCoins: 750000 },
      { level: 5, buff: "+40%", buff2: "+30%", upgradeCoins: 3000000 }
    ],
    whereToGet: [
      { source: "Divine Egg",  chance: "<strong>1%</strong> per egg" },
      { source: "Pumpkin Egg", chance: "<strong>1%</strong> per egg" },
      { source: "Lava Egg",    chance: "<strong>2.5%</strong> per egg" }
    ]
  },

  "Pie Launcher": {
    tags: ["MYTHIC", "EXCLUSIVE", "BLIND"],
    summaryStats: [
      { label: "⚔️ DAMAGE",     value: "300 → 4,800" },
      { label: "🥧 BLIND",      value: "1s → 2s" },
      { label: "💰 PLACE COST", value: "$4,000" }
    ],
    bullets: [
      "Throws <strong>pumpkin pies</strong> that splat every zombie near where they land and get <strong>cream in their eyes</strong>: blinded zombies <strong>cannot hit the door</strong> and stumble slower"
    ],
    keyNumbers: [
      { label: "SPLAT SIZE",      value: "<strong>12 → 18</strong> studs" },
      { label: "AT THE EDGE",     value: "<strong>45%</strong> of the damage. Full damage in the middle" },
      { label: "PIE IN THE FACE", value: "Zombies it hits <strong>cannot hit the door</strong> for <strong>1s → 2s</strong>" },
      { label: "WHILE BLIND",     value: "They walk <strong>30%</strong> slower" },
      { label: "AFTER",           value: "A zombie can't be blinded again for <strong>3s</strong>" },
      { label: "BOSSES",          value: "Blinded for <strong>half as long</strong>" },
      { label: "GET IT FROM",     value: "The <strong>Thanksgiving Event</strong> tower crate" },
      { label: "CASH TO MAX IT",  value: "<strong>$1,013,500</strong> in a match, for all <strong>8 levels</strong>" },
      { label: "PLACEMENT LIMIT", value: "<strong>6</strong> per player" }
    ],
    levels: [
      { level: 1, cashCost: 4000,   damage: "300",   reload: "3s",   range: "46", splat: "12",   blind: "1s",   unlockCoins: 0 },
      { level: 2, cashCost: 8500,   damage: "580",   reload: "2.8s", range: "49", splat: "13",   blind: "1.1s", unlockCoins: 0 },
      { level: 3, cashCost: 17000,  damage: "950",   reload: "2.6s", range: "52", splat: "14",   blind: "1.2s", unlockCoins: 300 },
      { level: 4, cashCost: 34000,  damage: "1,656", reload: "2.4s", range: "55", splat: "14.5", blind: "1.4s", unlockCoins: 1000 },
      { level: 5, cashCost: 70000,  damage: "2,310", reload: "2.2s", range: "58", splat: "15",   blind: "1.5s", unlockCoins: 3400 },
      { level: 6, cashCost: 140000, damage: "3,100", reload: "2s",   range: "61", splat: "16",   blind: "1.6s", unlockCoins: 10700 },
      { level: 7, cashCost: 270000, damage: "3,960", reload: "1.8s", range: "64", splat: "17",   blind: "1.8s", unlockCoins: 34000 },
      { level: 8, cashCost: 470000, damage: "4,800", reload: "1.6s", range: "68", splat: "18",   blind: "2s",   unlockCoins: 100600 }
    ],
    whereToGet: [
      { source: "Harvest Crate", chance: "<strong>29%</strong> per chest" }
    ]
  },

  "Corn Popper": {
    tags: ["EPIC", "EXCLUSIVE", "POP"],
    summaryStats: [
      { label: "⚔️ DAMAGE",     value: "9 → 558" },
      { label: "🍿 POP",        value: "6 → 10 studs" },
      { label: "💰 PLACE COST", value: "$450" }
    ],
    bullets: [
      "Shoots <strong>sticky kernels</strong> that heat up and <strong>pop all together</strong>, blasting every zombie around",
      "Zombies that die with kernels in them <strong>pop too</strong>"
    ],
    keyNumbers: [
      { label: "EVERY KERNEL",      value: "<strong>Sticks</strong> in the zombie. It does no damage yet" },
      { label: "THE FUSE",          value: "<strong>1.6s → 1.2s</strong> after the first kernel, <strong>they all pop at once</strong>" },
      { label: "THE ZOMBIE",        value: "Takes <strong>every kernel's damage</strong> when they pop" },
      { label: "ZOMBIES AROUND IT", value: "Take <strong>35% → 50%</strong> of it, <strong>6 → 10</strong> studs around" },
      { label: "MORE KERNELS",      value: "A <strong>bigger pop</strong>: +10% size per kernel, up to +30%" },
      { label: "IF IT DIES FIRST",  value: "Its kernels <strong>pop where it fell</strong>" },
      { label: "GET IT FROM",       value: "The <strong>Thanksgiving Event</strong> tower crate" },
      { label: "CASH TO MAX IT",    value: "<strong>$417,950</strong> in a match, for all <strong>8 levels</strong>" },
      { label: "PLACEMENT LIMIT",   value: "<strong>12</strong> per player" }
    ],
    levels: [
      { level: 1, cashCost: 450,    damage: "9",   reload: "0.7s",  range: "32", pop: "6",   fuse: "1.6s", unlockCoins: 0 },
      { level: 2, cashCost: 1100,   damage: "18",  reload: "0.65s", range: "34", pop: "6.5", fuse: "1.6s", unlockCoins: 0 },
      { level: 3, cashCost: 2600,   damage: "33",  reload: "0.6s",  range: "36", pop: "7",   fuse: "1.5s", unlockCoins: 0 },
      { level: 4, cashCost: 6100,   damage: "60",  reload: "0.55s", range: "38", pop: "7.5", fuse: "1.5s", unlockCoins: 0 },
      { level: 5, cashCost: 13700,  damage: "108", reload: "0.5s",  range: "41", pop: "8",   fuse: "1.4s", unlockCoins: 600 },
      { level: 6, cashCost: 32000,  damage: "188", reload: "0.45s", range: "44", pop: "8.5", fuse: "1.4s", unlockCoins: 2400 },
      { level: 7, cashCost: 100000, damage: "329", reload: "0.4s",  range: "47", pop: "9",   fuse: "1.3s", unlockCoins: 9500 },
      { level: 8, cashCost: 262000, damage: "558", reload: "0.35s", range: "50", pop: "10",  fuse: "1.2s", unlockCoins: 37500 }
    ],
    whereToGet: [
      { source: "Harvest Crate", chance: "<strong>70%</strong> per chest" }
    ]
  },

  "Lion": {
    tags: ["DIVINE", "PET"],
    buffColumnLabel: "⚡ RELOAD",
    buff2ColumnLabel: `${ICON_FARMS} FARMS`,
    buff3ColumnLabel: "⬆️ BLESSED SPOTS",
    summaryStats: [
      { label: "⚡ RELOAD",             value: "+100% → +200%" },
      { label: `${ICON_FARMS} FARMS`,   value: "+60% → +100%" },
      { label: "⬆️ BLESSED SPOTS",      value: "4 → 8" }
    ],
    bullets: [
      "Blesses a <strong>random area of your base</strong>",
      "Towers placed there <strong>reload much faster</strong> and farms there <strong>earn faster</strong>"
    ],
    keyNumbers: [
      { label: "BLESSED SPOTS", value: "<strong>4 → 8</strong> random spots of your base, picked once a match" },
      { label: "TOWERS ON THEM", value: "Reload <strong>+100% → +200%</strong> faster" },
      { label: "FARMS ON THEM",  value: "Earn <strong>+60% → +100%</strong> faster" },
      { label: "SEVERAL LIONS",  value: "Each blesses its own spots at <strong>full strength</strong>" },
      { label: "IN PVP",         value: "Both buffs are <strong>half</strong> as strong" }
    ],
    petLevels: [
      { level: 1, buff: "+100%", buff2: "+60%",  buff3: "4", upgradeCoins: 0 },
      { level: 2, buff: "+125%", buff2: "+70%",  buff3: "5", upgradeCoins: 45000 },
      { level: 3, buff: "+150%", buff2: "+80%",  buff3: "6", upgradeCoins: 180000 },
      { level: 4, buff: "+175%", buff2: "+90%",  buff3: "7", upgradeCoins: 750000 },
      { level: 5, buff: "+200%", buff2: "+100%", buff3: "8", upgradeCoins: 3000000 }
    ],
    whereToGet: [
      { source: "Legendary Egg", chance: "<strong>0.1%</strong> per egg" },
      { source: "Divine Egg",    chance: "<strong>1%</strong> per egg" },
      { source: "Pumpkin Egg",   chance: "<strong>1%</strong> per egg" },
      { source: "Lava Egg",      chance: "<strong>2.5%</strong> per egg" }
    ]
  },

  "Polar Bear": {
    tags: ["LEGENDARY", "PET"],
    buffColumnLabel: "🌵 THORNS",
    summaryStats: [
      { label: "🌵 THORNS", value: "+15% → +25%" }
    ],
    bullets: [
      "Every zombie that hits your door <strong>takes damage back</strong>"
    ],
    keyNumbers: [
      { label: "THORNS",               value: "Every zombie that hits your door <strong>takes damage back</strong>" },
      { label: "NOT ALLOWED IN",       value: "<strong>Clans Hard, Crazy and Apocalypse</strong>. It does nothing there" },
      { label: "MORE OF THE SAME PET", value: "In one house the 2nd counts <strong>60%</strong>, the 3rd <strong>36%</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+15%",   upgradeCoins: 0 },
      { level: 2, buff: "+17.5%", upgradeCoins: 15000 },
      { level: 3, buff: "+20%",   upgradeCoins: 60000 },
      { level: 4, buff: "+22.5%", upgradeCoins: 250000 },
      { level: 5, buff: "+25%",   upgradeCoins: 1000000 }
    ],
    whereToGet: [
      { source: "Rare Egg",      chance: "<strong>0.02%</strong> per egg" },
      { source: "Epic Egg",      chance: "<strong>0.13%</strong> per egg" },
      { source: "Mythic Egg",    chance: "<strong>0.26%</strong> per egg" },
      { source: "Legendary Egg", chance: "<strong>0.71%</strong> per egg" },
      { source: "Divine Egg",    chance: "<strong>2.56%</strong> per egg" },
      { source: "Pumpkin Egg",   chance: "<strong>3.23%</strong> per egg" },
      { source: "Lava Egg",      chance: "<strong>11.45%</strong> per egg" }
    ]
  },

  "Ghostie": {
    tags: ["EXCLUSIVE", "PET"],
    buffColumnLabel: "🎯 RANGE",
    buff2ColumnLabel: "👻 DURATION",
    summaryStats: [
      { label: "🎯 RANGE",    value: "+100% → +200%" },
      { label: "👻 DURATION", value: "15s → 30s" },
      { label: "⏱️ COOLDOWN", value: "30s" }
    ],
    bullets: [
      "Every <strong>30 seconds</strong> it <strong>haunts a random tower</strong> and gives it <strong>huge range</strong> for a while",
      "Upgrading the pet <strong>makes the haunt last longer</strong>"
    ],
    keyNumbers: [
      { label: "TRIGGERS",        value: "Every <strong>30 seconds</strong>" },
      { label: "TARGETS",         value: "<strong>1 random tower</strong>" },
      { label: "RANGE BUFF",      value: "<strong>+100% → +200%</strong> range while haunted" },
      { label: "HAUNT DURATION",  value: "<strong>15s → 30s</strong> by level" },
      { label: "LEVEL 5 UPGRADE", value: "<strong>2,265,000 Coins</strong>" }
    ],
    petLevels: [
      { level: 1, buff: "+100%", buff2: "15s", upgradeCoins: 0 },
      { level: 2, buff: "+125%", buff2: "19s", upgradeCoins: 0 },
      { level: 3, buff: "+150%", buff2: "22s", upgradeCoins: 0 },
      { level: 4, buff: "+175%", buff2: "26s", upgradeCoins: 0 },
      { level: 5, buff: "+200%", buff2: "30s", upgradeCoins: 2265000 }
    ],
    whereToGet: [
      { source: "Exclusive", chance: "<strong>Halloween Event</strong>" }
    ]
  },

  "Walker": {
    tags: ["EASY", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 1, barColor: "#4ade80" },
      { label: "SPEED",  bars: 2, barColor: "#4ade80" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "The <strong>weakest</strong> zombie in Easy",
      "Comes in <strong>big groups</strong>"
    ]
  },

  "Biter": {
    tags: ["EASY", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 2, barColor: "#4ade80" },
      { label: "SPEED",  bars: 2, barColor: "#4ade80" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "<strong>Tougher</strong> than the Walker and hits harder, but a bit <strong>slower</strong>"
    ]
  },

  "Stalker": {
    tags: ["EASY", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 4, barColor: "#4ade80" },
      { label: "SPEED",  bars: 1, barColor: "#4ade80" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "<strong>Tougher</strong> than the Biter and hits harder, but <strong>slower</strong>"
    ]
  },

  "Guard": {
    tags: ["EASY", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 5, barColor: "#4ade80" },
      { label: "SPEED",  bars: 1, barColor: "#4ade80" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "The <strong>strongest</strong> normal zombie in Easy",
      "Slow, but it <strong>takes a lot of hits</strong>"
    ]
  },

  "Ghoul": {
    tags: ["HARD", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 1, barColor: "#ef4444" },
      { label: "SPEED",  bars: 5, barColor: "#ef4444" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "The <strong>weakest</strong> zombie in Hard, and the <strong>fastest</strong>",
      "Comes in <strong>big groups</strong>"
    ]
  },

  "Mummy": {
    tags: ["HARD", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 2, barColor: "#ef4444" },
      { label: "SPEED",  bars: 4, barColor: "#ef4444" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "<strong>Tougher</strong> than the Ghoul and hits harder, but a bit <strong>slower</strong>"
    ]
  },

  "Ripper": {
    tags: ["HARD", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 3, barColor: "#ef4444" },
      { label: "SPEED",  bars: 4, barColor: "#ef4444" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "<strong>Tougher</strong> than the Mummy and hits harder, but <strong>slower</strong>"
    ]
  },

  "Raider": {
    tags: ["HARD", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 4, barColor: "#ef4444" },
      { label: "SPEED",  bars: 3, barColor: "#ef4444" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "<strong>Tougher</strong> than the Ripper and hits harder, but <strong>slower</strong>"
    ]
  },

  "Thrower": {
    tags: ["HARD", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 5, barColor: "#ef4444" },
      { label: "SPEED",  bars: 2, barColor: "#ef4444" },
      { label: "ATTACK", value: "FROM FAR AWAY" }
    ],
    bullets: [
      "Stays back and <strong>hits your door from far away</strong>",
      "The <strong>strongest</strong> normal zombie in Hard"
    ]
  },

  "Shade": {
    tags: ["NIGHTMARE", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 1, barColor: "#a855f7" },
      { label: "SPEED",  bars: 5, barColor: "#a855f7" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "The <strong>weakest</strong> zombie in Nightmare, and the <strong>fastest</strong>",
      "Comes in <strong>big groups</strong>"
    ]
  },

  "Shard": {
    tags: ["NIGHTMARE", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 2, barColor: "#a855f7" },
      { label: "SPEED",  bars: 5, barColor: "#a855f7" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "<strong>Tougher</strong> than the Shade and hits harder, but a bit <strong>slower</strong>"
    ]
  },

  "Golem": {
    tags: ["NIGHTMARE", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 3, barColor: "#a855f7" },
      { label: "SPEED",  bars: 5, barColor: "#a855f7" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "<strong>Tougher</strong> than the Shard and hits harder, but <strong>slower</strong>"
    ]
  },

  "Slayer": {
    tags: ["NIGHTMARE", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 3, barColor: "#a855f7" },
      { label: "SPEED",  bars: 4, barColor: "#a855f7" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "<strong>Tougher</strong> than the Golem and hits harder, but <strong>slower</strong>"
    ]
  },

  "Caster": {
    tags: ["NIGHTMARE", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 4, barColor: "#a855f7" },
      { label: "SPEED",  bars: 3, barColor: "#a855f7" },
      { label: "ATTACK", value: "FROM FAR AWAY" }
    ],
    bullets: [
      "Stays back and <strong>hits your door from far away</strong>"
    ]
  },

  "Wraith": {
    tags: ["NIGHTMARE", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 5, barColor: "#a855f7" },
      { label: "SPEED",  bars: 2, barColor: "#a855f7" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "The <strong>strongest</strong> normal zombie in Nightmare",
      "Slow, but it <strong>takes a lot of hits</strong>"
    ]
  },

  "Husk": {
    tags: ["IMPOSSIBLE", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 1, barColor: "#f8fafc" },
      { label: "SPEED",  bars: 3, barColor: "#f8fafc" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "The <strong>weakest</strong> zombie in Impossible, and the <strong>fastest</strong>",
      "Comes in <strong>big groups</strong>"
    ]
  },

  "Chainbound": {
    tags: ["IMPOSSIBLE", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 3, barColor: "#f8fafc" },
      { label: "SPEED",  bars: 3, barColor: "#f8fafc" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "<strong>Tougher</strong> than the Husk and hits harder, but a bit <strong>slower</strong>"
    ]
  },

  "Dread Guard": {
    tags: ["IMPOSSIBLE", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 5, barColor: "#f8fafc" },
      { label: "SPEED",  bars: 1, barColor: "#f8fafc" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "The <strong>strongest</strong> normal zombie in Impossible",
      "Slow, but it <strong>takes a lot of hits</strong>"
    ]
  },

  "Cinder": {
    tags: ["CRAZY", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 1, barColor: "#f97316" },
      { label: "SPEED",  bars: 3, barColor: "#f97316" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "The <strong>weakest</strong> zombie in Crazy",
      "Comes in <strong>big groups</strong>"
    ]
  },

  "Stitch": {
    tags: ["CRAZY", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 2, barColor: "#f97316" },
      { label: "SPEED",  bars: 3, barColor: "#f97316" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "<strong>Tougher</strong> than the Cinder and hits harder, and a bit <strong>faster</strong> too"
    ]
  },

  "Conehead": {
    tags: ["CRAZY", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 3, barColor: "#f97316" },
      { label: "SPEED",  bars: 3, barColor: "#f97316" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "<strong>Tougher</strong> than the Stitch and hits harder, but <strong>slower</strong>"
    ]
  },

  "Rockback": {
    tags: ["CRAZY", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 3, barColor: "#f97316" },
      { label: "SPEED",  bars: 2, barColor: "#f97316" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "<strong>Tougher</strong> than the Conehead and hits harder, but <strong>slower</strong>"
    ]
  },

  "Torch": {
    tags: ["CRAZY", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 4, barColor: "#f97316" },
      { label: "SPEED",  bars: 4, barColor: "#f97316" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "The <strong>fastest</strong> zombie in Crazy, and <strong>tougher</strong> than the Rockback"
    ]
  },

  "Cinder Knight": {
    tags: ["CRAZY", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 5, barColor: "#f97316" },
      { label: "SPEED",  bars: 2, barColor: "#f97316" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "The <strong>strongest</strong> normal zombie in Crazy",
      "It <strong>takes a lot of hits</strong>"
    ]
  },

  "Watcher": {
    tags: ["CLANS APOCALYPSE", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 1, barColor: "#10b981" },
      { label: "SPEED",  bars: 1, barColor: "#10b981" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "A small eye the <strong>Seraph Eye</strong> opens at your doors",
      "<strong>Kill every one</strong> to break his shield"
    ]
  },

  "Scarecrow (Zombie)": {
    tags: ["HARVEST FEAST", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 1, barColor: "#f59e0b" },
      { label: "SPEED",  bars: 5, barColor: "#f59e0b" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "The <strong>weakest</strong> zombie in the Harvest Feast, and the <strong>fastest</strong>",
      "Comes in <strong>big groups</strong>"
    ]
  },

  "Pilgrim": {
    tags: ["HARVEST FEAST", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 2, barColor: "#f59e0b" },
      { label: "SPEED",  bars: 4, barColor: "#f59e0b" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "<strong>Tougher</strong> than the Scarecrow and hits harder, but a bit <strong>slower</strong>"
    ]
  },

  "Pumpkin Head": {
    tags: ["HARVEST FEAST", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 4, barColor: "#f59e0b" },
      { label: "SPEED",  bars: 3, barColor: "#f59e0b" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "<strong>Tougher</strong> than the Pilgrim and hits harder, but <strong>slower</strong>"
    ]
  },

  "Gobbler": {
    tags: ["HARVEST FEAST", "ZOMBIE"],
    hideLevelSub: true,
    summaryStats: [
      { label: "HEALTH", bars: 5, barColor: "#f59e0b" },
      { label: "SPEED",  bars: 2, barColor: "#f59e0b" },
      { label: "ATTACK", value: "UP CLOSE" }
    ],
    bullets: [
      "The <strong>strongest</strong> normal zombie in the Harvest Feast",
      "Slow, but it <strong>takes a lot of hits</strong>",
      "The <strong>Turkey Tyrant</strong> calls more of them with his bell"
    ]
  },

  "Iron Fist": {
    tags: ["EASY", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 5" }
    ],
    bossAbility: {
      name: "No special ability",
      bullets: [
        "The <strong>first boss</strong> you meet",
        "He walks up to your door and smashes it",
        "He has <strong>far more health</strong> than a normal zombie and <strong>hits much harder</strong>"
      ]
    }
  },

  "Rotten Brute": {
    tags: ["EASY", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 10" }
    ],
    bossAbility: {
      name: "No special ability",
      bullets: [
        "He walks up to your door and smashes it",
        "He has <strong>far more health</strong> than a normal zombie and <strong>hits much harder</strong>"
      ]
    }
  },

  "Golden King": {
    tags: ["EASY", "FINAL BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 15" }
    ],
    bossAbility: {
      name: "No special ability",
      bullets: [
        "The <strong>final boss</strong> of Easy",
        "He walks up to your door and smashes it",
        "He has <strong>far more health</strong> than a normal zombie and <strong>hits much harder</strong>"
      ]
    }
  },

  "Blood Destroyer": {
    tags: ["HARD", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 5" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "No special ability",
      bullets: [
        "He walks up to your door and smashes it",
        "He has <strong>far more health</strong> than a normal zombie and <strong>hits much harder</strong>"
      ]
    }
  },

  "Thorn Guardian": {
    tags: ["HARD", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 10" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "No special ability",
      bullets: [
        "He walks up to your door and smashes it",
        "He has <strong>far more health</strong> than a normal zombie and <strong>hits much harder</strong>"
      ]
    }
  },

  "Grave Mender": {
    tags: ["HARD", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 15" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Heal",
      bullets: [
        "Kneels and raises a <strong>healing circle</strong> around himself for about 7 seconds",
        "Every zombie inside it <strong>keeps getting health back</strong>, small zombies fast and bosses slowly"
      ],
      when: [
        "After his <strong>2nd hit</strong> on your door, then after every <strong>3 hits</strong>"
      ],
      howToStop: [
        "Nothing blocks it",
        "<strong>Kill him first</strong>, or kill the zombies in his circle faster than he heals them"
      ]
    }
  },

  "Cursed Priest": {
    tags: ["HARD", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 20" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Shield",
      bullets: [
        "Kneels and raises a <strong>blue circle</strong> around himself for about 7 seconds",
        "Every zombie inside it <strong>takes 40% less damage</strong>"
      ],
      when: [
        "After his <strong>2nd hit</strong> on your door, then after every <strong>3 hits</strong>"
      ],
      howToStop: [
        "Nothing blocks it",
        "The shield only lasts while the circle is up"
      ]
    }
  },

  "Thorn King": {
    tags: ["HARD", "FINAL BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 25" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "No special ability",
      bullets: [
        "The <strong>final boss</strong> of Hard",
        "He walks up to your door and smashes it",
        "He has <strong>far more health</strong> than a normal zombie and <strong>hits much harder</strong>"
      ]
    }
  },

  "Rift Stalker": {
    tags: ["NIGHTMARE", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 5" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "No special ability",
      bullets: [
        "<strong>Fast</strong> for a boss",
        "He walks up to your door and smashes it",
        "He has <strong>far more health</strong> than a normal zombie and <strong>hits much harder</strong>"
      ]
    }
  },

  "Plague Mender": {
    tags: ["NIGHTMARE", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 10" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Heal",
      bullets: [
        "Kneels and raises a <strong>healing circle</strong> around himself for about 7 seconds",
        "Every zombie inside it <strong>keeps getting health back</strong>, small zombies fast and bosses slowly"
      ],
      when: [
        "After his <strong>1st hit</strong> on your door, then after every <strong>2 hits</strong>"
      ],
      howToStop: [
        "Nothing blocks it",
        "<strong>Kill him first</strong>, or kill the zombies in his circle faster than he heals them"
      ]
    }
  },

  "Crimson Herald": {
    tags: ["NIGHTMARE", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 15" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Rage",
      bullets: [
        "Kneels and raises a <strong>red circle</strong> around himself for about 7 seconds",
        "Every zombie inside it <strong>deals 40% more damage</strong> to your door"
      ],
      when: [
        "After his <strong>1st hit</strong> on your door, then after every <strong>2 hits</strong>"
      ],
      howToStop: [
        "Nothing blocks it",
        "The boost only lasts while the circle is up"
      ]
    }
  },

  "Crystal King": {
    tags: ["NIGHTMARE", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 20" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Crystal Cage",
      bullets: [
        "Floats up and fires <strong>6 crystals</strong>, one after another, each at a random tower",
        "A tower that gets hit <strong>cannot shoot for 15 seconds</strong>"
      ],
      when: [
        "After his <strong>3rd hit</strong> on your door, then after every <strong>10 hits</strong>"
      ],
      howToStop: [
        "A ready <strong>Elephant</strong> pet bounces it back and stuns every boss at your house",
        "A tower with a <strong>Protector Base</strong> shield is not affected"
      ]
    }
  },

  "Nightmare Sovereign": {
    tags: ["NIGHTMARE", "FINAL BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 25" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "No special ability",
      bullets: [
        "The <strong>final boss</strong> of Nightmare",
        "More of him arrive on every boss wave after his first",
        "He walks up to your door and smashes it",
        "He has <strong>far more health</strong> than a normal zombie and <strong>hits much harder</strong>"
      ]
    }
  },

  "Executioner": {
    tags: ["IMPOSSIBLE", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 5" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "No special ability",
      bullets: [
        "He walks up to your door and smashes it",
        "He has <strong>far more health</strong> than a normal zombie and <strong>hits much harder</strong>"
      ]
    }
  },

  "Hook Warden": {
    tags: ["IMPOSSIBLE", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 10" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Reel In",
      bullets: [
        "Throws his hook at <strong>2 of your towers</strong>, one after the other",
        "A tower it grabs <strong>cannot shoot for 12 seconds</strong>"
      ],
      when: [
        "After his <strong>2nd hit</strong> on your door, then after every <strong>5 hits</strong>"
      ],
      howToStop: [
        "A ready <strong>Elephant</strong> pet bounces it back and stuns every boss at your house",
        "A tower with a <strong>Protector Base</strong> shield is not affected"
      ]
    }
  },

  "Coffin Bearer": {
    tags: ["IMPOSSIBLE", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 15" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Dig",
      bullets: [
        "Digs into the ground and <strong>5 to 10 small zombies</strong> climb out around him",
        "He can have up to 25 of them alive at once"
      ],
      when: [
        "After his <strong>1st hit</strong> on your door, then after every <strong>3 hits</strong>"
      ],
      howToStop: [
        "Nothing blocks it",
        "No more climb out once he is dead"
      ]
    }
  },

  "War Drummer": {
    tags: ["IMPOSSIBLE", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 20" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "War Drums",
      bullets: [
        "Beats his drums the whole way to your house, and zombies near him <strong>walk 30% faster</strong>",
        "Once he reaches a door, zombies near him <strong>attack 40% faster</strong> too"
      ],
      when: [
        "The whole time he is alive",
        "The attack boost starts at his <strong>1st hit</strong> on your door"
      ],
      howToStop: [
        "Nothing blocks it",
        "Both boosts end when he dies"
      ]
    }
  },

  "Soul Mender": {
    tags: ["IMPOSSIBLE", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 25" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Rage Circle",
      bullets: [
        "Raises a <strong>red circle</strong> at your door",
        "Every zombie inside it <strong>deals 40% more damage</strong>"
      ],
      when: [
        "After his <strong>1st hit</strong> on your door",
        "The circle stays up until he dies"
      ],
      howToStop: [
        "Nothing blocks it",
        "<strong>Kill him</strong> and the circle is gone"
      ]
    }
  },

  "Pale Marksman": {
    tags: ["IMPOSSIBLE", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 30" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Long Shot",
      bullets: [
        "<strong>Shoots your door from anywhere</strong> on the map while he walks in",
        "One shot every 8 seconds, and each one hits <strong>3 times as hard</strong> as his normal attack"
      ],
      when: [
        "From the moment he appears until he reaches your door"
      ],
      howToStop: [
        "Nothing blocks the shots",
        "They stop when he dies"
      ]
    }
  },

  "Hollow Digger": {
    tags: ["IMPOSSIBLE", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 35" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Burrow",
      bullets: [
        "<strong>Digs underground</strong> and travels fast to your door",
        "While he is under the ground <strong>no tower can hit him</strong>"
      ],
      when: [
        "Once, about 3 seconds after he appears",
        "He comes out right at your door"
      ],
      howToStop: [
        "Nothing can hit him underground",
        "Your towers shoot him again when he comes out"
      ]
    }
  },

  "Lantern Wraith": {
    tags: ["IMPOSSIBLE", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 40" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Snuff",
      bullets: [
        "Lifts his lantern and it fires <strong>6 red rays</strong> very fast, each at a different tower",
        "A tower that gets hit <strong>cannot shoot for 20 seconds</strong>"
      ],
      when: [
        "After his <strong>1st hit</strong> on your door, then after every <strong>6 hits</strong>"
      ],
      howToStop: [
        "A ready <strong>Elephant</strong> pet bounces it back and stuns every boss at your house",
        "A tower with a <strong>Protector Base</strong> shield is not affected"
      ]
    }
  },

  "Bone Launcher": {
    tags: ["IMPOSSIBLE", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 45" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Rocket Volley",
      bullets: [
        "The launcher on his back fires <strong>10 rockets at your door</strong> from anywhere on the map",
        "One volley hurts as much as 4 of his normal hits",
        "Once he stands at a door he hits it himself, and the rockets fly to <strong>another door</strong> of your house"
      ],
      when: [
        "Every <strong>10 seconds</strong>, starting right after he appears"
      ],
      howToStop: [
        "Nothing blocks the rockets",
        "They stop when he dies"
      ]
    }
  },

  "Grave Bearer": {
    tags: ["IMPOSSIBLE", "FINAL BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 50" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "No special ability",
      bullets: [
        "The <strong>final boss</strong> of Impossible",
        "Huge and <strong>fast</strong>",
        "He walks up to your door and smashes it",
        "He has <strong>far more health</strong> than a normal zombie and <strong>hits much harder</strong>"
      ]
    }
  },

  "Inferno Warlord": {
    tags: ["CRAZY", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 5" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Fissure",
      bullets: [
        "Slams his axe into the ground and a <strong>molten crack</strong> runs straight into your house",
        "Every tower standing on the crack <strong>cannot shoot for 8 seconds</strong>"
      ],
      when: [
        "After his <strong>2nd hit</strong> on your door, then after every <strong>4 hits</strong>"
      ],
      howToStop: [
        "A ready <strong>Elephant</strong> pet bounces it back and stuns every boss at your house",
        "A tower with a <strong>Protector Base</strong> shield is not affected"
      ]
    }
  },

  "Pyre Inquisitor": {
    tags: ["CRAZY", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 10" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Purge",
      bullets: [
        "Plants his staff, and for <strong>15 seconds</strong> no door of your house can be healed or repaired",
        "The Repair button, the Medical Base and pet heals all stop working"
      ],
      when: [
        "After his <strong>2nd hit</strong> on your door, then after every <strong>4 hits</strong>"
      ],
      howToStop: [
        "Nothing blocks it",
        "Healing works again after 15 seconds"
      ]
    }
  },

  "Magma Giant": {
    tags: ["CRAZY", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 15" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Rebirth",
      bullets: [
        "The first time he dies he falls into a <strong>molten pile</strong>",
        "If the pile is still there after 6 seconds he <strong>stands up again</strong> with 40% of his health"
      ],
      when: [
        "Once, the first time you kill him"
      ],
      howToStop: [
        "The pile has 30% of his health",
        "<strong>Destroy it within 6 seconds</strong> and he stays dead"
      ]
    }
  },

  "Flame Warden": {
    tags: ["CRAZY", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 20" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Taunt",
      bullets: [
        "Raises his guard for about 6 seconds",
        "Every tower that can reach him is <strong>forced to shoot only him</strong>, and he <strong>takes 90% less damage</strong> while it lasts"
      ],
      when: [
        "After his <strong>1st hit</strong> on your door, then after every <strong>4 hits</strong>"
      ],
      howToStop: [
        "A ready <strong>Elephant</strong> pet bounces it back and stuns every boss at your house",
        "A tower with a <strong>Protector Base</strong> shield keeps picking its own targets"
      ]
    }
  },

  "Sunbreaker": {
    tags: ["CRAZY", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 25" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Flare",
      bullets: [
        "His halo flashes and every tower in your house <strong>loses half its range</strong> for 10 seconds"
      ],
      when: [
        "After his <strong>2nd hit</strong> on your door, then after every <strong>4 hits</strong>"
      ],
      howToStop: [
        "A ready <strong>Elephant</strong> pet bounces it back and stuns every boss at your house",
        "A tower with a <strong>Protector Base</strong> shield is not affected"
      ]
    }
  },

  "Ash Colossus": {
    tags: ["CRAZY", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 30" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Fire Ring",
      bullets: [
        "Slams his hammer and a <strong>ring of fire</strong> rolls along the ground toward your house",
        "A player it touches is <strong>locked in a cage</strong> and cannot move for 20 seconds"
      ],
      when: [
        "After his <strong>2nd hit</strong> on your door, then after every <strong>5 hits</strong>"
      ],
      howToStop: [
        "<strong>Jump over the ring</strong> when it reaches you, or stand up on the walls"
      ]
    }
  },

  "Magma Titan": {
    tags: ["CRAZY", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 35" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Eruption",
      bullets: [
        "The volcano on his back throws <strong>6 lava bombs</strong> into your house, at your towers first",
        "Each one leaves a lava pool for 8 seconds",
        "A tower in a pool <strong>shoots half as often</strong>, and a player a bomb lands on is caged for 3 seconds"
      ],
      when: [
        "After his <strong>2nd hit</strong> on your door, then after every <strong>4 hits</strong>"
      ],
      howToStop: [
        "A ready <strong>Elephant</strong> pet bounces it back and stuns every boss at your house",
        "A tower with a <strong>Protector Base</strong> shield keeps its speed"
      ]
    }
  },

  "Ashwing": {
    tags: ["CRAZY", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 40" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Skydive",
      bullets: [
        "<strong>Flies up</strong> and crashes down onto <strong>another door</strong> of your house, hitting it as hard as one and a half normal hits",
        "No tower can hit him while he is in the air"
      ],
      when: [
        "After his <strong>3rd hit</strong> on your door, then after every <strong>5 hits</strong>"
      ],
      howToStop: [
        "Nothing blocks it",
        "Your towers shoot him again when he lands"
      ]
    }
  },

  "Ember Shogun": {
    tags: ["CRAZY", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 45" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Flurry",
      bullets: [
        "Slices your door <strong>13 times</strong> in under 3 seconds",
        "While it lasts he deals <strong>3 times his normal damage</strong>"
      ],
      when: [
        "After his <strong>2nd hit</strong> on your door, then after every <strong>4 hits</strong>"
      ],
      howToStop: [
        "Nothing blocks it"
      ]
    }
  },

  "Sabertooth": {
    tags: ["CRAZY", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 50" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Roar",
      bullets: [
        "His roar <strong>scares the pets</strong> of your house for 8 seconds",
        "While they are scared their abilities <strong>do nothing</strong>: no Elephant bounce, no new Turtle shield, no thorns, no Rhino armor, no boss slow and no pet door heal"
      ],
      when: [
        "After his <strong>2nd hit</strong> on your door, then after every <strong>5 hits</strong>"
      ],
      howToStop: [
        "Nothing blocks it",
        "Your pets work again after 8 seconds"
      ]
    }
  },

  "Incinerator": {
    tags: ["CRAZY", "BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 55" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Burn",
      bullets: [
        "His flamethrower <strong>sets your door on fire</strong>",
        "It burns for 10 seconds and does as much damage as 2 of his normal hits"
      ],
      when: [
        "After his <strong>2nd hit</strong> on your door, then after every <strong>5 hits</strong>"
      ],
      howToStop: [
        "Anyone in your house can press <strong>Repair</strong> to put the fire out",
        "Killing him puts it out too"
      ]
    }
  },

  "Sun Pharaoh": {
    tags: ["CRAZY", "FINAL BOSS"],
    hideLevelSub: true,
    summaryStats: [
      { label: "ARRIVES ON", value: "Wave 60" },
      { label: "ALSO IN",    value: "CLANS" }
    ],
    bossAbility: {
      name: "Ankh",
      bullets: [
        "The <strong>final boss</strong> of Crazy",
        "He raises his ankh and the <strong>last boss that died</strong> at your house stands up again next to him with 30% of its health"
      ],
      when: [
        "Once, after his <strong>1st hit</strong> on your door, if a boss has already died there"
      ],
      howToStop: [
        "Nothing blocks it",
        "He can only do it once"
      ]
    }
  }
};
