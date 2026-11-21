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
  }
};
