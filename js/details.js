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
      { label: "HEALS",      value: "0.2% → 2%" },
      { label: "RELOAD",     value: "1s → 1s" },
      { label: "PLACE COST", value: "$750" }
    ],
    bullets: [
      "<strong>Repairs your house door</strong> over time with a healing beam",
      "The door must be <strong>in its range</strong>"
    ],
    keyNumbers: [
      { label: "HEALS",           value: "<strong>0.2% → 2%</strong> of the door's <strong>max health</strong> every second" },
      { label: "REACH",           value: "The door must be within <strong>12 → 20</strong> studs" },
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
  }
};
