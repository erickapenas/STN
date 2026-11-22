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
  }
};
