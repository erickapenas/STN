const ANSI_OPTIONS = [
  { code: "30",     name: "Dark Gray (30)", hex: "#72767d", ansi: "30" },
  { code: "31",     name: "Red (31)",       hex: "#ed4245", ansi: "31" },
  { code: "32",     name: "Green (32)",     hex: "#57f287", ansi: "32" },
  { code: "33",     name: "Yellow (33)",    hex: "#fee75c", ansi: "33" },
  { code: "34",     name: "Blue (34)",      hex: "#5865f2", ansi: "34" },
  { code: "35",     name: "Magenta (35)",   hex: "#eb459e", ansi: "35" },
  { code: "36",     name: "Cyan (36)",      hex: "#00ffff", ansi: "36" },
  { code: "37",     name: "White (37)",     hex: "#ffffff", ansi: "37" },
  { code: "orange", name: "Orange (38)",    hex: "#f97316", ansi: "33" }
];

const DEFAULT_COLORS = {
  BANNER: "36",
  IGN: "32",
  CLAN: "33",
  DAMAGE: "31",
  SUPPORT: "32",
  FARM: "33",
  PET: "34",
  exclusive: "orange",
  divine: "37",
  legendary: "33",
  mythic: "31",
  epic: "35",
  rare: "34",
  common: "32"
};

const RARITY_TIERS = [
  { key: "exclusive", label: "EXCLUSIVE", color: "#f97316", border: "#f97316", bg: "rgba(249,115,22,0.08)" },
  { key: "divine",    label: "DIVINE",    color: "#ffffff", border: "#f8fafc", bg: "rgba(255,255,255,0.08)" },
  { key: "legendary", label: "LEGENDARY", color: "#facc15", border: "#facc15", bg: "rgba(250,204,21,0.08)" },
  { key: "mythic",    label: "MYTHIC",    color: "#ef4444", border: "#ef4444", bg: "rgba(239,68,68,0.08)" },
  { key: "epic",      label: "EPIC",      color: "#a855f7", border: "#a855f7", bg: "rgba(168,85,247,0.08)" },
  { key: "rare",      label: "RARE",      color: "#38bdf8", border: "#38bdf8", bg: "rgba(56,189,248,0.08)" },
  { key: "common",    label: "COMMON",    color: "#22c55e", border: "#22c55e", bg: "rgba(34,197,94,0.08)" }
];

const ITEMS = [
  { name: "Scarecrow",      role: "DAMAGE",  max: 8,  rarity: "exclusive", hex: "#f97316", img: "images/Scarecrow.png" },
  { name: "Juggernaut",     role: "DAMAGE",  max: 9,  rarity: "divine",    hex: "#ffffff", img: "images/Juggernaut.png",    canEvo: true },
  { name: "Machine Mortar", role: "DAMAGE",  max: 9,  rarity: "divine",    hex: "#ffffff", img: "images/MortarMachine.png" },
  { name: "Crusher",        role: "DAMAGE",  max: 9,  rarity: "divine",    hex: "#ffffff", img: "images/Crusher.png" },
  { name: "Golem Forge",    role: "DAMAGE",  max: 9,  rarity: "divine",    hex: "#ffffff", img: "images/GolemForge.png",    canEvo: true },
  { name: "Drone Hangar",   role: "DAMAGE",  max: 9,  rarity: "divine",    hex: "#ffffff", img: "images/DroneHangar.png" },
  { name: "World Ender",    role: "DAMAGE",  max: 8,  rarity: "legendary", hex: "#f59e0b", img: "images/WorldEnder.png" },
  { name: "Samurai",        role: "DAMAGE",  max: 8,  rarity: "legendary", hex: "#f59e0b", img: "images/Samurai.png" },
  { name: "Railgun",        role: "DAMAGE",  max: 8,  rarity: "legendary", hex: "#f59e0b", img: "images/Railgun.png" },
  { name: "Lava Launcher",  role: "DAMAGE",  max: 8,  rarity: "legendary", hex: "#f59e0b", img: "images/LavaLauncher.png" },
  { name: "Ice Turret",     role: "DAMAGE",  max: 8,  rarity: "legendary", hex: "#f59e0b", img: "images/IceTurret.png",     canEvo: true },
  { name: "Toxic Turret",   role: "DAMAGE",  max: 8,  rarity: "mythic",    hex: "#ef4444", img: "images/ToxicTurret.png",   canEvo: true },
  { name: "Fire Spitter",   role: "DAMAGE",  max: 8,  rarity: "mythic",    hex: "#ef4444", img: "images/FireSpitter.png" },
  { name: "Ballista",       role: "DAMAGE",  max: 8,  rarity: "mythic",    hex: "#ef4444", img: "images/Ballista.png",      canEvo: true },
  { name: "Pie Launcher",   role: "DAMAGE",  max: 8,  rarity: "mythic",    hex: "#ef4444", img: "images/PieLauncher.png" },
  { name: "Rocketeer",      role: "DAMAGE",  max: 8,  rarity: "epic",      hex: "#a855f7", img: "images/Rocketeer.png",     canEvo: true },
  { name: "Tesla",          role: "DAMAGE",  max: 8,  rarity: "epic",      hex: "#a855f7", img: "images/Tesla.png",         canEvo: true },
  { name: "Corn Popper",    role: "DAMAGE",  max: 8,  rarity: "epic",      hex: "#a855f7", img: "images/CornPopper.png" },
  { name: "Mortar",         role: "DAMAGE",  max: 8,  rarity: "rare",      hex: "#38bdf8", img: "images/Mortar.png" },
  { name: "Flamethrower",   role: "DAMAGE",  max: 8,  rarity: "rare",      hex: "#38bdf8", img: "images/Flamethrower.png",  canEvo: true },
  { name: "Cannon",         role: "DAMAGE",  max: 10, rarity: "rare",      hex: "#38bdf8", img: "images/Cannon.png",        canEvo: true },
  { name: "Turret",         role: "DAMAGE",  max: 10, rarity: "common",    hex: "#22c55e", img: "images/Turret.png",        canEvo: true },
  { name: "Crossbow",       role: "DAMAGE",  max: 10, rarity: "common",    hex: "#22c55e", img: "images/CrossBow.png",      canEvo: true },

  { name: "Medical Base",   role: "SUPPORT", max: 6,  rarity: "epic",      hex: "#a855f7", img: "images/MedicalBase.png" },
  { name: "Military Base",  role: "SUPPORT", max: 6,  rarity: "mythic",    hex: "#ef4444", img: "images/MilitaryBase.png" },
  { name: "Protector Base", role: "SUPPORT", max: 6,  rarity: "epic",      hex: "#a855f7", img: "images/ProtectorBase.png" },

  { name: "Bank",           role: "FARM",    max: 9,  rarity: "divine",    hex: "#ffffff", img: "images/TheBank.png" },
  { name: "Void Farm",      role: "FARM",    max: 8,  rarity: "legendary", hex: "#f59e0b", img: "images/VoidFarm.png",      canEvo: true },
  { name: "Vault",          role: "FARM",    max: 8,  rarity: "epic",      hex: "#a855f7", img: "images/Vault.png" },
  { name: "Mining Cave",    role: "FARM",    max: 8,  rarity: "rare",      hex: "#38bdf8", img: "images/MiningCave.png" },
  { name: "Money Printer",  role: "FARM",    max: 8,  rarity: "epic",      hex: "#a855f7", img: "images/MoneyPrinter.png",  canEvo: true },
  { name: "Farm",           role: "FARM",    max: 8,  rarity: "common",    hex: "#22c55e", img: "images/Farm.png" },

  { name: "Ghostie",        role: "PET",     max: 5,  rarity: "exclusive", hex: "#f97316", img: "images/Ghostie.png" },
  { name: "Turkey",         role: "PET",     max: 5,  rarity: "exclusive", hex: "#f97316", img: "images/Turkey.png" },
  { name: "Pilgrim Bear",   role: "PET",     max: 5,  rarity: "exclusive", hex: "#f97316", img: "images/PilgrimBear.png" },
  { name: "Golden Turkey",  role: "PET",     max: 5,  rarity: "exclusive", hex: "#f97316", img: "images/GoldenTurkey.png" },
  { name: "Jinx",           role: "PET",     max: 5,  rarity: "divine",    hex: "#ffffff", img: "images/Jinx.png" },
  { name: "Unicorn",        role: "PET",     max: 5,  rarity: "divine",    hex: "#ffffff", img: "images/Unicorn.png" },
  { name: "Lion",           role: "PET",     max: 5,  rarity: "divine",    hex: "#ffffff", img: "images/Lion.png" },
  { name: "Horse",          role: "PET",     max: 5,  rarity: "divine",    hex: "#ffffff", img: "images/Horse.png" },
  { name: "Dragon",         role: "PET",     max: 5,  rarity: "legendary", hex: "#f59e0b", img: "images/Dragon.png" },
  { name: "Croc",           role: "PET",     max: 5,  rarity: "legendary", hex: "#f59e0b", img: "images/Croc.png" },
  { name: "Turtle",         role: "PET",     max: 5,  rarity: "legendary", hex: "#f59e0b", img: "images/Turtle.png" },
  { name: "Elephant",       role: "PET",     max: 5,  rarity: "legendary", hex: "#f59e0b", img: "images/Elephant.png" },
  { name: "Polar Bear",     role: "PET",     max: 5,  rarity: "legendary", hex: "#f59e0b", img: "images/PolarBear.png" },
  { name: "Dino",           role: "PET",     max: 5,  rarity: "legendary", hex: "#f59e0b", img: "images/Dino.png" },
  { name: "Tiger",          role: "PET",     max: 5,  rarity: "legendary", hex: "#f59e0b", img: "images/Tiger.png" },
  { name: "Rhino",          role: "PET",     max: 5,  rarity: "mythic",    hex: "#ef4444", img: "images/Rhino.png" },
  { name: "Monkey",         role: "PET",     max: 5,  rarity: "mythic",    hex: "#ef4444", img: "images/Monkey.png" },
  { name: "Bunny",          role: "PET",     max: 5,  rarity: "mythic",    hex: "#ef4444", img: "images/Bunny.png" },
  { name: "Arctic Fox",     role: "PET",     max: 5,  rarity: "mythic",    hex: "#ef4444", img: "images/ArcticFox.png" },
  { name: "Raccoon",        role: "PET",     max: 5,  rarity: "mythic",    hex: "#ef4444", img: "images/Raccoon.png" },
  { name: "Deer",           role: "PET",     max: 5,  rarity: "epic",      hex: "#a855f7", img: "images/Deer.png" },
  { name: "Beaver",         role: "PET",     max: 5,  rarity: "epic",      hex: "#a855f7", img: "images/Beaver.png" },
  { name: "Penguin",        role: "PET",     max: 5,  rarity: "epic",      hex: "#a855f7", img: "images/Penguin.png" },
  { name: "Hippo",          role: "PET",     max: 5,  rarity: "epic",      hex: "#a855f7", img: "images/Hippo.png" },
  { name: "Squirrel",       role: "PET",     max: 5,  rarity: "rare",      hex: "#38bdf8", img: "images/Squirrel.png" },
  { name: "Dog",            role: "PET",     max: 5,  rarity: "rare",      hex: "#38bdf8", img: "images/Dog.png" },
  { name: "Cat",            role: "PET",     max: 5,  rarity: "rare",      hex: "#38bdf8", img: "images/Cat.png" },
  { name: "Bear",           role: "PET",     max: 5,  rarity: "rare",      hex: "#38bdf8", img: "images/Bear.png" }
];

const CATEGORIES = [
  { id: "DAMAGE",  title: "⚔️ DAMAGE TOWERS",   cssClass: "cat-damage" },
  { id: "SUPPORT", title: "🛡️ SUPPORT BASES",    cssClass: "cat-support" },
  { id: "FARM",    title: "🌾 ECONOMY & FARMS",  cssClass: "cat-farm" },
  { id: "PET",     title: "🐾 PETS",             cssClass: "cat-pet" }
];

const ZOMBIE_DIFFICULTY_TIERS = [
  { key: "easy",            label: "EASY",             color: "#22c55e" },
  { key: "hard",            label: "HARD",             color: "#ef4444" },
  { key: "nightmare",       label: "NIGHTMARE",        color: "#a855f7" },
  { key: "impossible",      label: "IMPOSSIBLE",       color: "#f8fafc" },
  { key: "crazy",           label: "CRAZY",            color: "#f97316" },
  { key: "clans_apocalypse",label: "CLANS APOCALYPSE", color: "#10b981" },
  { key: "harvest_feast",   label: "HARVEST FEAST",    color: "#f59e0b" }
];

const INDEX_ZOMBIES = [
  { name: "Walker",        rarity: "easy",             img: "images/Walker.png",          trait: "UP CLOSE" },
  { name: "Biter",         rarity: "easy",             img: "images/Biter.png",           trait: "UP CLOSE" },
  { name: "Stalker",       rarity: "easy",             img: "images/Watcher.png",         trait: "UP CLOSE" },
  { name: "Guard",         rarity: "easy",             img: "images/Guard.png",           trait: "UP CLOSE" },
  { name: "Ghoul",         rarity: "hard",             img: "images/Ghoul.png",           trait: "UP CLOSE" },
  { name: "Mummy",         rarity: "hard",             img: "images/Mummy.png",           trait: "UP CLOSE" },
  { name: "Ripper",        rarity: "hard",             img: "images/Ripper.png",          trait: "UP CLOSE" },
  { name: "Raider",        rarity: "hard",             img: "images/Raider.png",          trait: "UP CLOSE" },
  { name: "Thrower",       rarity: "hard",             img: "images/Thrower.png",         trait: "FROM FAR AWAY" },
  { name: "Shade",         rarity: "nightmare",        img: "images/Shade.png",           trait: "UP CLOSE" },
  { name: "Shard",         rarity: "nightmare",        img: "images/Shard.png",           trait: "UP CLOSE" },
  { name: "Golem",         rarity: "nightmare",        img: "images/GolemZombie.png",     trait: "UP CLOSE" },
  { name: "Slayer",        rarity: "nightmare",        img: "images/Slayer.png",          trait: "UP CLOSE" },
  { name: "Caster",        rarity: "nightmare",        img: "images/Caster.png",          trait: "FROM FAR AWAY" },
  { name: "Wraith",        rarity: "nightmare",        img: "images/Wraith.png",          trait: "UP CLOSE" },
  { name: "Husk",          rarity: "impossible",       img: "images/Husk.png",            trait: "UP CLOSE" },
  { name: "Chainbound",    rarity: "impossible",       img: "images/Chainbound.png",      trait: "UP CLOSE" },
  { name: "Dread Guard",   rarity: "impossible",       img: "images/DreadGuard.png",      trait: "UP CLOSE" },
  { name: "Cinder",        rarity: "crazy",            img: "images/Cinder.png",          trait: "UP CLOSE" },
  { name: "Stitch",        rarity: "crazy",            img: "images/Stitch.png",          trait: "UP CLOSE" },
  { name: "Conehead",      rarity: "crazy",            img: "images/Conehead.png",        trait: "UP CLOSE" },
  { name: "Rockback",      rarity: "crazy",            img: "images/Rockback.png",        trait: "UP CLOSE" },
  { name: "Torch",         rarity: "crazy",            img: "images/Torch.png",           trait: "UP CLOSE" },
  { name: "Cinder Knight", rarity: "crazy",            img: "images/CinderKnight.png",    trait: "UP CLOSE" },
  { name: "Watcher",       rarity: "clans_apocalypse", img: "images/WatcherEye.png",      trait: "UP CLOSE" },
  { name: "Scarecrow",     rarity: "harvest_feast",    img: "images/ScarecrowZombie.png", trait: "UP CLOSE", detailKey: "Scarecrow (Zombie)" },
  { name: "Pilgrim",       rarity: "harvest_feast",    img: "images/PilgrimZombie.png",   trait: "UP CLOSE" },
  { name: "Pumpkin Head",  rarity: "harvest_feast",    img: "images/PumpkinHead.png",     trait: "UP CLOSE" },
  { name: "Gobbler",       rarity: "harvest_feast",    img: "images/Gobbler.png",         trait: "UP CLOSE" }
];

const INDEX_BOSSES = [
  { name: "Iron Fist",           rarity: "easy",      img: "images/BossIronFist.png",           trait: "Wave 5" },
  { name: "Rotten Brute",        rarity: "easy",      img: "images/BossRottenBrute.png",        trait: "Wave 10" },
  { name: "Golden King",         rarity: "easy",      img: "images/BossGoldenKing.png",         trait: "Wave 15 • Final Boss" },
  { name: "Blood Destroyer",     rarity: "hard",      img: "images/BossBloodDestroyer.png",     trait: "Wave 5 • Clans" },
  { name: "Thorn Guardian",      rarity: "hard",      img: "images/BossThornGuardian.png",      trait: "Wave 10 • Clans" },
  { name: "Grave Mender",        rarity: "hard",      img: "images/BossGraveMender.png",        trait: "Wave 15 • Heal" },
  { name: "Cursed Priest",       rarity: "hard",      img: "images/BossCursedPriest.png",       trait: "Wave 20 • Shield" },
  { name: "Thorn King",          rarity: "hard",      img: "images/BossThornKing.png",          trait: "Wave 25 • Final Boss" },
  { name: "Rift Stalker",        rarity: "nightmare", img: "images/BossRiftStalker.png",        trait: "Wave 5 • Fast" },
  { name: "Plague Mender",       rarity: "nightmare", img: "images/BossPlagueMender.png",       trait: "Wave 10 • Heal" },
  { name: "Crimson Herald",      rarity: "nightmare", img: "images/BossCrimsonHerald.png",      trait: "Wave 15 • Rage" },
  { name: "Crystal King",        rarity: "nightmare",  img: "images/BossCrystalKing.png",        trait: "Wave 20 • Crystal Cage" },
  { name: "Nightmare Sovereign", rarity: "nightmare",  img: "images/BossNightmareSovereign.png", trait: "Wave 25 • Final Boss" },
  { name: "Executioner",         rarity: "impossible", img: "images/BossExecutioner.png",        trait: "Wave 5 • Clans" },
  { name: "Hook Warden",         rarity: "impossible", img: "images/BossHookWarden.png",         trait: "Wave 10 • Reel In" },
  { name: "Coffin Bearer",       rarity: "impossible", img: "images/BossCoffinBearer.png",       trait: "Wave 15 • Dig" },
  { name: "War Drummer",         rarity: "impossible", img: "images/BossWarDrummer.png",         trait: "Wave 20 • War Drums" },
  { name: "Soul Mender",         rarity: "impossible", img: "images/BossSoulMender.png",         trait: "Wave 25 • Rage Circle" },
  { name: "Pale Marksman",       rarity: "impossible", img: "images/BossPaleMarksman.png",       trait: "Wave 30 • Long Shot" },
  { name: "Hollow Digger",       rarity: "impossible", img: "images/BossHollowDigger.png",       trait: "Wave 35 • Burrow" },
  { name: "Lantern Wraith",      rarity: "impossible", img: "images/BossLanternWraith.png",      trait: "Wave 40 • Snuff" },
  { name: "Bone Launcher",       rarity: "impossible", img: "images/BossBoneLauncher.png",       trait: "Wave 45 • Rocket Volley" },
  { name: "Grave Bearer",        rarity: "impossible", img: "images/BossGraveBearer.png",        trait: "Wave 50 • Final Boss" },
  { name: "Inferno Warlord",     rarity: "crazy",      img: "images/BossInfernoWarlord.png",     trait: "Wave 5 • Fissure" },
  { name: "Pyre Inquisitor",     rarity: "crazy",      img: "images/BossPyreInquisitor.png",     trait: "Wave 10 • Purge" },
  { name: "Magma Giant",         rarity: "crazy",      img: "images/BossMagmaGiant.png",         trait: "Wave 15 • Rebirth" },
  { name: "Flame Warden",        rarity: "crazy",      img: "images/BossFlameWarden.png",        trait: "Wave 20 • Taunt" },
  { name: "Sunbreaker",          rarity: "crazy",      img: "images/BossSunbreaker.png",         trait: "Wave 25 • Flare" },
  { name: "Ash Colossus",        rarity: "crazy",      img: "images/BossAshColossus.png",        trait: "Wave 30 • Fire Ring" },
  { name: "Magma Titan",         rarity: "crazy",      img: "images/BossMagmaTitan.png",         trait: "Wave 35 • Eruption" },
  { name: "Ashwing",             rarity: "crazy",      img: "images/BossAshwing.png",            trait: "Wave 40 • Skydive" },
  { name: "Ember Shogun",        rarity: "crazy",      img: "images/BossEmberShogun.png",        trait: "Wave 45 • Flurry" },
  { name: "Sabertooth",          rarity: "crazy",      img: "images/BossSabertooth.png",         trait: "Wave 50 • Roar" },
  { name: "Incinerator",          rarity: "crazy",            img: "images/BossIncinerator.png",        trait: "Wave 55 • Burn" },
  { name: "Sun Pharaoh",          rarity: "crazy",            img: "images/BossSunPharaoh.png",         trait: "Wave 60 • Final Boss" },
  { name: "Emerald Dread Knight", rarity: "clans_apocalypse", img: "images/BossEmeraldDreadKnight.png", trait: "Late Waves • 3 Forms" },
  { name: "Necro Overlord",       rarity: "clans_apocalypse", img: "images/BossNecroOverlord.png",      trait: "Late Waves • 3 Forms" },
  { name: "Swamp Leviathan",      rarity: "clans_apocalypse", img: "images/BossSwampLeviathan.png",     trait: "Late Waves • 3 Forms" },
  { name: "Seraph Eye",           rarity: "clans_apocalypse", img: "images/BossSeraphEye.png",          trait: "Last Wave • Final Boss" }
];

const TOWER_PLACEMENT_LIMITS = {
  "Juggernaut": 3,
  "Machine Mortar": 5,
  "Scarecrow": 6,
  "Crusher": 4,
  "Golem Forge": 2,
  "Drone Hangar": 3,
  "World Ender": 6,
  "Samurai": 9,
  "Railgun": 7,
  "Lava Launcher": 6,
  "Ice Turret": 8,
  "Toxic Turret": 10,
  "Fire Spitter": 10,
  "Ballista": 8,
  "Pie Launcher": 6,
  "Rocketeer": 10,
  "Tesla": 12,
  "Corn Popper": 12,
  "Mortar": 5,
  "Flamethrower": 17,
  "Cannon": 16,
  "Turret": 20,
  "Crossbow": 20,
  "Medical Base": 4,
  "Military Base": 4,
  "Protector Base": 5,
  "Bank": 3,
  "Void Farm": 10,
  "Vault": 4,
  "Mining Cave": 26,
  "Money Printer": 1,
  "Farm": 20
};

const ICON_FARMS = `<img src="images/icon-farms.png" class="stat-icon-img" alt="">`;
const ICON_STARTCASH = `<img src="images/icon-startcash.png" class="stat-icon-img" alt="">`;
const ICON_PULSE = `<img src="images/icon-pulse.png" class="stat-icon-img" alt="">`;
const ICON_EXP = `<img src="images/icon-exp.png" class="stat-icon-img" alt="">`;
const ICON_CLANSUPPLIES = `<img src="images/icon-clansupplies.png" class="stat-icon-img" alt="">`;
const ICON_DMG = `<img src="images/icon-dmg.png" class="stat-icon-img" alt="">`;
const ICON_DMG_PURPLE = `<img src="images/icon-dmg-purple.png" class="stat-icon-img" alt="">`;
const ICON_DMG_CYAN = `<img src="images/icon-dmg-cyan.png" class="stat-icon-img" alt="">`;
const ICON_RELOAD = `<img src="images/icon-reload.png" class="stat-icon-img" alt="">`;
const ICON_RANGE = `<img src="images/icon-range.png" class="stat-icon-img" alt="">`;
const ICON_BEAM_CHARGE = `<img src="images/icon-beam-charge.png" class="stat-icon-img" alt="">`;
const ICON_POOL_SIZE = `<img src="images/icon-pool-size.png" class="stat-icon-img" alt="">`;
const ICON_COMBO = `<img src="images/icon-combo.png" class="stat-icon-img" alt="">`;
const ICON_CHARGE_CYAN = `<img src="images/icon-charge-cyan.png" class="stat-icon-img" alt="">`;
const ICON_POISON = `<img src="images/icon-poison.png" class="stat-icon-img" alt="">`;
const ICON_POISON_SPLASH = `<img src="images/icon-poison-splash.png" class="stat-icon-img" alt="">`;
const ICON_NOZZLE = `<img src="images/icon-nozzle.png" class="stat-icon-img" alt="">`;
const ICON_DRONE = `<img src="images/icon-drone.png" class="stat-icon-img" alt="">`;

// Base pet buff percentages (level scaling optional; duplicate pets decay by 0.6^(n-1): 100%, 60%, 36%, 21.6%...)
const PET_BUFFS = {
  "Bear":          { stat: "range",    label: "Range",     value: 20, levels: [10, 12.5, 15, 17.5, 20], icon: "🎯" },
  "Cat":           { stat: "cash",     label: "Cash",      value: 20, levels: [10, 12.5, 15, 17.5, 20], icon: "💰" },
  "Dog":           { stat: "damage",   label: "Damage",    value: 20, levels: [10, 12.5, 15, 17.5, 20], icon: "⚔️" },
  "Squirrel":      { stat: "firerate", label: "Fire Rate", value: 20, levels: [10, 12.5, 15, 17.5, 20], icon: "⚡" },
  "Deer":          {
    stat: "firerate", label: "Fire Rate", value: 80, levels: [48, 56, 64, 72, 80], icon: "⚡",
    extraBuffs: [
      { stat: "damage", label: "Damage", value: 80, levels: [48, 56, 64, 72, 80], icon: "⚔️" }
    ]
  },
  "Beaver":        { stat: "doorlvl",  label: "Doors Start", value: 8,  levels: [3, 4, 6, 7, 8],      unit: "lvl", icon: "🚪" },
  "Penguin":       {
    stat: "damage", label: "Damage", value: 50, levels: [30, 35, 40, 45, 50], icon: "⚔️",
    extraBuffs: [
      { stat: "firerate", label: "Fire Rate", value: 50, levels: [30, 35, 40, 45, 50], icon: "⚡" },
      { stat: "range",    label: "Range",     value: 50, levels: [50, 50, 50, 50, 50], icon: "🎯" }
    ]
  },
  "Hippo":         { stat: "doorhp",   label: "Door Health", value: 40, levels: [20, 25, 30, 35, 40], icon: "💚" },
  "Rhino":         { stat: "doorarmor", label: "Door Armor", value: 20, levels: [10, 12.5, 15, 17.5, 20], icon: "🛡️" },
  "Monkey":        {
    stat: "exp", label: "EXP", value: 40, levels: [20, 25, 30, 35, 40], icon: ICON_EXP,
    extraBuffs: [
      { stat: "clansupplies", label: "Clan Supplies", value: 25, levels: [5, 10, 15, 20, 25], icon: ICON_CLANSUPPLIES },
      { stat: "damage",       label: "Damage",        value: 0,  levels: [-20, -15, -10, -5, 0], icon: "⚔️" }
    ]
  },
  "Bunny":         { stat: "doorheal",  label: "Door Heal",  value: 1.5, levels: [0.5, 0.75, 1, 1.25, 1.5], unit: "%/s", icon: "💚" },
  "Arctic Fox":    {
    stat: "firerate", label: "Fire Rate", value: 20, levels: [10, 12.5, 15, 17.5, 20], icon: "⚡",
    extraBuffs: [
      { stat: "slow", label: "Slow", value: 14, levels: [10, 11, 12, 13, 14], icon: "🧊" }
    ]
  },
  "Raccoon":       {
    stat: "farms", label: "Farms", value: 25, levels: [15, 17.5, 20, 22.5, 25], icon: ICON_FARMS,
    extraBuffs: [
      { stat: "startcash", label: "Start Cash", value: 500, levels: [100, 200, 300, 400, 500], unit: "$", icon: ICON_STARTCASH }
    ]
  },
  "Dragon":        { stat: "lifesteal", label: "Lifesteal",   value: 40, levels: [30, 32.5, 35, 37.5, 40], icon: "🩸" },
  "Croc":          { stat: "gems",      label: "Gems",        value: 40, levels: [20, 25, 30, 35, 40], icon: "💎" },
  "Turtle":        {
    stat: "shield", label: "Door Shield", value: 20, levels: [5, 8.75, 12.5, 16.25, 20], unit: "s", icon: "🛡️",
    extraBuffs: [
      { stat: "firerate", label: "Fire Rate", value: 200, levels: [100, 125, 150, 175, 200], icon: "⚡" }
    ]
  },
  "Elephant":      { stat: "bossstun",  label: "Boss Stun",   value: 8,  levels: [5, 5.75, 6.5, 7.25, 8], unit: "s", icon: "🛡️" },
  "Polar Bear":    { stat: "thorns",    label: "Thorns",      value: 25, levels: [15, 17.5, 20, 22.5, 25], icon: "🌵" },
  "Dino":          { stat: "coins",    label: "Coins",     value: 40, levels: [20, 25, 30, 35, 40], icon: "🪙" },
  "Tiger":         {
    stat: "damage", label: "Damage", value: 40, levels: [20, 25, 30, 35, 40], icon: "⚔️",
    extraBuffs: [
      { stat: "firerate", label: "Fire Rate", value: 30, levels: [20, 22.5, 25, 27.5, 30], icon: "⚡" }
    ]
  },
  "Jinx":          {
    stat: "luck", label: "Luck", value: 40, levels: [20, 25, 30, 35, 40], icon: "🔮", noDecay: true,
    extraBuffs: [
      { stat: "curse", label: "Zombie DMG", value: 30, levels: [30, 30, 30, 30, 30], icon: "💀", noDecay: true }
    ]
  },
  "Unicorn":       { stat: "wish",     label: "Wish CD",   value: 30, levels: [60, 52.5, 45, 37.5, 30], unit: "s", icon: "🎰" },
  "Lion":          {
    stat: "firerate", label: "Fire Rate", value: 200, levels: [100, 125, 150, 175, 200], icon: "⚡",
    extraBuffs: [
      { stat: "farms", label: "Farms", value: 100, levels: [60, 70, 80, 90, 100], icon: ICON_FARMS }
    ]
  },
  "Horse":         {
    stat: "damage", label: "Damage", value: 50, levels: [50, 50, 50, 50, 50], icon: "⚔️",
    extraBuffs: [
      { stat: "firerate", label: "Fire Rate", value: 50, levels: [50, 50, 50, 50, 50], icon: "⚡" },
      { stat: "range",    label: "Range",     value: 25, levels: [25, 25, 25, 25, 25], icon: "🎯" }
    ]
  },
  "Ghostie":       { stat: "range",     label: "Range",     value: 200, levels: [100, 125, 150, 175, 200], icon: "🎯" },
  "Turkey":        { stat: "event",    label: "Event",     value: 20, levels: [10, 12.5, 15, 17.5, 20], icon: "🍗" },
  "Pilgrim Bear":  {
    stat: "damage", label: "Damage", value: 20, levels: [10, 12.5, 15, 17.5, 20], icon: "⚔️",
    extraBuffs: [
      { stat: "range", label: "Range", value: 20, levels: [10, 12.5, 15, 17.5, 20], icon: "🎯" }
    ]
  },
  "Golden Turkey": {
    stat: "coins", label: "Coins", value: 40, levels: [20, 25, 30, 35, 40], icon: "🪙",
    extraBuffs: [
      { stat: "event", label: "Event", value: 70, levels: [30, 40, 50, 60, 70], icon: "🍗" }
    ]
  }
};

const BUFF_DIMINISHING_FACTOR = 0.6;

const JINX_MODES = [
  { key: "easy",           name: "Easy",            bonusLuck: 0,  maxLuck: 100, baseCoins: 1500,  baseGems: 23  },
  { key: "hard",           name: "Hard",            bonusLuck: 15, maxLuck: 125, baseCoins: 5000,  baseGems: 66  },
  { key: "nightmare",      name: "Nightmare",       bonusLuck: 30, maxLuck: 250, baseCoins: 14500, baseGems: 183 },
  { key: "impossible",     name: "Impossible",      bonusLuck: 50, maxLuck: 400, baseCoins: 21000, baseGems: 267 },
  { key: "crazy",          name: "Crazy",           bonusLuck: 60, maxLuck: 500, baseCoins: 31720, baseGems: 406 },
  { key: "clans_easy",     name: "Clans Easy",      bonusLuck: 0,  maxLuck: 100, baseCoins: 1500,  baseGems: 23  },
  { key: "clans_hard",     name: "Clans Hard",      bonusLuck: 15, maxLuck: 150, baseCoins: 41499, baseGems: 506 },
  { key: "clans_crazy",    name: "Clans Crazy",     bonusLuck: 40, maxLuck: 300, baseCoins: 53199, baseGems: 649 },
  { key: "apocalypse",     name: "Apocalypse",      bonusLuck: 60, maxLuck: 500, baseCoins: 64992, baseGems: 793 },
  { key: "feast_easy",     name: "Feast Easy",      bonusLuck: 15, maxLuck: 150, baseCoins: 9000,  baseGems: 120 },
  { key: "feast_nightmare",name: "Feast Nightmare", bonusLuck: 40, maxLuck: 300, baseCoins: 17000, baseGems: 228 },
  { key: "feast_crazy",    name: "Feast Crazy",     bonusLuck: 60, maxLuck: 500, baseCoins: 23000, baseGems: 308 }
];

const CLAN_BUFF_DEFS = [
  { key: "armory",     name: "Armory",     stat: "damage",   label: "Damage",    perLevel: 10,  maxLvl: 13, icon: "⚔️", color: "#ef4444", img: "images/Armory.png" },
  { key: "ammoDepot",  name: "Ammo Depot", stat: "firerate", label: "Fire Rate", perLevel: 8,   maxLvl: 13, icon: "⚡", color: "#f59e0b", img: "images/AmmoDepot.png" },
  { key: "watchtower", name: "Watchtower", stat: "range",    label: "Range",     perLevel: 3,   maxLvl: 13, icon: "🎯", color: "#38bdf8", img: "images/Watchtower.png" },
  { key: "treasury",   name: "Treasury",   stat: "cash",     label: "Cash",      perLevel: 7.5, maxLvl: 13, icon: "💰", color: "#22c55e", img: "images/Treasury.png" }
];

const SUPPORT_BASE_BUFFS = {
  "Military Base": {
    damage: [15, 20, 25, 30, 35, 40],
    range:  [0, 0, 0, 17, 33, 50]
  },
  "Protector Base": {
    firerate: [15, 25, 35, 45, 60, 75]
  },
  "Ice Turret": {
    slow: [20, 25, 30, 35, 40, 45, 50, 50]
  }
};

const IMAGE_VERSION = "8.5";
ITEMS.forEach(item => {
  if (item.img && !item.img.includes("?")) {
    item.img = `${item.img}?v=${IMAGE_VERSION}`;
  }
});
