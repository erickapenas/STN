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
