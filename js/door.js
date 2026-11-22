const DOOR_BASE_HP = 420;
const DOOR_FIRST_UPGRADE_COST = 100;
const DOOR_COST_GROWTH = 1.55;
const DOOR_HP_GROWTH = 1.45;
const DOOR_MAX_LEVEL = 100;

const DOOR_UNIT_NAMES = [
  "Hippo",
  "Beaver",
  "Rhino",
  "Bunny",
  "Turtle",
  "Dragon",
  "Horse",
  "Medical Base"
];

const MEDICAL_BASE_HEAL_LEVELS = [0.2, 0.35, 0.55, 0.85, 1.3, 2.0]; // % max HP per sec per placed base
const MEDICAL_BASE_MAX_PLACED = 4;

const DoorUI = {
  activeSubView: "door",
  targetLevel: 20,
  squadDps: 0,
  pets: [], // [{ name, lvl, placed? }]

  init() {
    this.loadState();

    document.querySelectorAll("#doorTab .calc-sub-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.selectSubView(btn.dataset.calcView);
      });
    });

    const lvlInput = document.getElementById("doorTargetLevelInput");
    const lvlRange = document.getElementById("doorTargetLevelRange");
    if (lvlInput) {
      lvlInput.value = this.targetLevel;
      lvlInput.addEventListener("input", () => {
        const v = Math.max(1, Math.min(DOOR_MAX_LEVEL, parseInt(lvlInput.value, 10) || 1));
        this.targetLevel = v;
        if (lvlRange) lvlRange.value = v;
        this.saveState();
        this.render();
      });
    }
    if (lvlRange) {
      lvlRange.value = this.targetLevel;
      lvlRange.addEventListener("input", () => {
        const v = Math.max(1, Math.min(DOOR_MAX_LEVEL, parseInt(lvlRange.value, 10) || 1));
        this.targetLevel = v;
        if (lvlInput) lvlInput.value = v;
        this.saveState();
        this.render();
      });
    }

    const dpsInput = document.getElementById("doorSquadDpsInput");
    if (dpsInput) {
      dpsInput.value = this.squadDps > 0 ? Math.round(this.squadDps) : "";
      dpsInput.addEventListener("input", () => {
        this.squadDps = Math.max(0, parseFloat(dpsInput.value) || 0);
        this.saveState();
        this.render();
      });
    }

    document.querySelectorAll(".door-preset-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const v = Math.max(1, Math.min(DOOR_MAX_LEVEL, parseInt(btn.dataset.doorLvl, 10) || 20));
        this.targetLevel = v;
        if (lvlInput) lvlInput.value = v;
        if (lvlRange) lvlRange.value = v;
        this.saveState();
        this.render();
      });
    });

    const importBtn = document.getElementById("btnDoorImportLoadouts");
    if (importBtn) {
      importBtn.onclick = () => this.importFromLoadouts();
    }

    const clearPetsBtn = document.getElementById("btnDoorClearPets");
    if (clearPetsBtn) {
      clearPetsBtn.onclick = () => {
        this.pets = [];
        this.squadDps = 0;
        const dpsEl = document.getElementById("doorSquadDpsInput");
        if (dpsEl) dpsEl.value = "";
        this.saveState();
        this.render();
      };
    }

    this.renderPetPickerButtons();
    this.selectSubView("door");
  },

  selectSubView(view) {
    this.activeSubView = view || "door";
    document.querySelectorAll("#doorTab .calc-sub-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.calcView === this.activeSubView);
    });
    const doorPanel = document.getElementById("calcDoorPanel");
    const jinxPanel = document.getElementById("calcJinxPanel");
    if (doorPanel) doorPanel.classList.toggle("active", this.activeSubView === "door");
    if (jinxPanel) jinxPanel.classList.toggle("active", this.activeSubView === "jinx");

    if (this.activeSubView === "jinx" && typeof JinxCalcUI !== "undefined") {
      JinxCalcUI.render();
    } else {
      this.render();
    }
  },

  loadState() {
    try {
      const raw = localStorage.getItem("td_door_calc_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.targetLevel === "number") {
          this.targetLevel = Math.max(1, Math.min(DOOR_MAX_LEVEL, Math.round(parsed.targetLevel)));
        }
        if (parsed && typeof parsed.squadDps === "number" && isFinite(parsed.squadDps)) {
          this.squadDps = Math.max(0, parsed.squadDps);
        }
        if (parsed && Array.isArray(parsed.pets)) {
          this.pets = parsed.pets
            .filter(p => p && DOOR_UNIT_NAMES.includes(p.name))
            .slice(0, 20)
            .map(p => {
              const maxLvl = p.name === "Medical Base" ? 6 : 5;
              const entry = {
                name: p.name,
                lvl: Math.max(1, Math.min(maxLvl, parseInt(p.lvl, 10) || maxLvl))
              };
              if (p.name === "Medical Base") {
                entry.placed = Math.max(1, Math.min(MEDICAL_BASE_MAX_PLACED, parseInt(p.placed, 10) || MEDICAL_BASE_MAX_PLACED));
              }
              return entry;
            });
        }
      }
    } catch {}
  },

  saveState() {
    try {
      localStorage.setItem("td_door_calc_v1", JSON.stringify({
        targetLevel: this.targetLevel,
        squadDps: this.squadDps,
        pets: this.pets
      }));
    } catch {}
  },

  importFromLoadouts() {
    if (typeof LoadoutsUI === "undefined" || !Array.isArray(LoadoutsUI.players)) return;
    const imported = [];
    LoadoutsUI.players.forEach(p => {
      const slotCount = p.vip ? 5 : 4;
      for (let i = 0; i < slotCount; i++) {
        const s = p.slots[i];
        if (s && s.item && DOOR_UNIT_NAMES.includes(s.item)) {
          const maxLvl = s.item === "Medical Base" ? 6 : 5;
          const entry = {
            name: s.item,
            lvl: Math.max(1, Math.min(maxLvl, s.lvl || maxLvl))
          };
          if (s.item === "Medical Base") {
            entry.placed = MEDICAL_BASE_MAX_PLACED;
          }
          imported.push(entry);
        }
      }
    });

    // Pull full Squad DPS from Loadouts (buffed DPS) for Dragon Lifesteal math
    const totals = LoadoutsUI.computeSquadTotals();
    const dps = totals.buffedSquadDps > 0 ? totals.buffedSquadDps : (totals.baseSquadDps || 0);
    this.squadDps = Math.round(dps);

    const dpsInput = document.getElementById("doorSquadDpsInput");
    if (dpsInput) {
      dpsInput.value = this.squadDps > 0 ? this.squadDps : "";
    }

    this.pets = imported.slice(0, 20);
    this.saveState();
    this.render();
  },

  addUnit(name) {
    if (!DOOR_UNIT_NAMES.includes(name) || this.pets.length >= 20) return;
    if (name === "Medical Base") {
      this.pets.push({ name, lvl: 6, placed: MEDICAL_BASE_MAX_PLACED });
    } else {
      this.pets.push({ name, lvl: 5 });
    }
    this.saveState();
    this.render();
  },

  removeUnit(idx) {
    this.pets.splice(idx, 1);
    this.saveState();
    this.render();
  },

  getUnitInfo(name) {
    if (name === "Medical Base") {
      return { icon: "🏥", label: "Door Heal", maxLvl: 6 };
    }
    if (name === "Horse") {
      return { icon: "🐎", label: "Stampede Heal", maxLvl: 5 };
    }
    const buff = (typeof PET_BUFFS !== "undefined") ? PET_BUFFS[name] : null;
    return {
      icon: buff ? buff.icon : "🐾",
      label: buff ? buff.label : "Buff",
      maxLvl: 5
    };
  },

  getPetValue(name, lvl) {
    if (name === "Medical Base") {
      const idx = Math.min(Math.max(1, lvl || 1), MEDICAL_BASE_HEAL_LEVELS.length) - 1;
      return MEDICAL_BASE_HEAL_LEVELS[idx];
    }
    if (name === "Horse") {
      return 20; // 20% door health healed over 10 seconds per Stampede
    }
    const buff = (typeof PET_BUFFS !== "undefined") ? PET_BUFFS[name] : null;
    if (!buff) return 0;
    if (Array.isArray(buff.levels) && buff.levels.length > 0) {
      const idx = Math.min(Math.max(1, lvl || 1), buff.levels.length) - 1;
      return buff.levels[idx];
    }
    return buff.value || 0;
  },

  computeBuffs() {
    const factor = (typeof BUFF_DIMINISHING_FACTOR !== "undefined") ? BUFF_DIMINISHING_FACTOR : 0.6;
    const byStat = {
      doorhp: [],
      doorlvl: [],
      doorarmor: [],
      doorheal: [],
      shield: [],
      lifesteal: []
    };

    let medBaseHealPct = 0;
    let medBasePlacedTotal = 0;
    let horseCount = 0;

    this.pets.forEach(p => {
      if (p.name === "Medical Base") {
        const perBase = this.getPetValue("Medical Base", p.lvl);
        const placed = Math.max(1, Math.min(MEDICAL_BASE_MAX_PLACED, p.placed || MEDICAL_BASE_MAX_PLACED));
        medBaseHealPct += perBase * placed;
        medBasePlacedTotal += placed;
        return;
      }
      if (p.name === "Horse") {
        horseCount += 1;
        return;
      }
      const buff = (typeof PET_BUFFS !== "undefined") ? PET_BUFFS[p.name] : null;
      if (!buff || !byStat[buff.stat]) return;
      byStat[buff.stat].push(this.getPetValue(p.name, p.lvl));
    });

    const sumWithDecay = (arr) => {
      const sorted = [...arr].sort((a, b) => b - a);
      return sorted.reduce((acc, v, idx) => acc + v * Math.pow(factor, idx), 0);
    };

    const doorHpPct = sumWithDecay(byStat.doorhp);
    const doorStartAddRaw = sumWithDecay(byStat.doorlvl);
    const doorStartAdd = Math.round(doorStartAddRaw);
    const doorArmorPct = Math.min(90, sumWithDecay(byStat.doorarmor));
    const bunnyHealPct = sumWithDecay(byStat.doorheal);
    const shieldSecs = byStat.shield.reduce((acc, v) => acc + v, 0);
    const lifestealPct = sumWithDecay(byStat.lifesteal);
    const horseStampedeHealPctPerSec = horseCount * 2; // 20% over 10s = 2%/s per active Stampede (stacks)

    return {
      doorHpPct,
      doorStartAddRaw,
      doorStartAdd,
      startLevel: 1 + doorStartAdd,
      doorArmorPct,
      bunnyHealPct,
      medBaseHealPct,
      medBasePlacedTotal,
      totalPctHealPerSec: bunnyHealPct + medBaseHealPct,
      horseCount,
      horseStampedeHealPctPerSec,
      shieldSecs,
      lifestealPct
    };
  },

  getBaseHp(level) {
    if (level <= 1) return DOOR_BASE_HP;
    return DOOR_BASE_HP * Math.pow(DOOR_HP_GROWTH, level - 1);
  },

  getUpgradeCost(toLevel) {
    if (toLevel <= 1) return 0;
    return DOOR_FIRST_UPGRADE_COST * Math.pow(DOOR_COST_GROWTH, toLevel - 2);
  },

  formatBig(n) {
    if (!isFinite(n) || n <= 0) return "0";
    if (n < 100000) return Math.round(n).toLocaleString();
    const units = [
      { v: 1e18, s: "Qi" },
      { v: 1e15, s: "Qa" },
      { v: 1e12, s: "T" },
      { v: 1e9,  s: "B" },
      { v: 1e6,  s: "M" },
      { v: 1e3,  s: "K" }
    ];
    for (const u of units) {
      if (n >= u.v) {
        return `${(n / u.v).toFixed(2).replace(/\.00$/, "")}${u.s}`;
      }
    }
    return Math.round(n).toLocaleString();
  },

  formatExact(n) {
    if (!isFinite(n) || n <= 0) return "0";
    return Math.round(n).toLocaleString();
  },

  formatPct(n) {
    return Number.isInteger(n) ? `${n}%` : `${Number(n.toFixed(2))}%`;
  },

  renderPetPickerButtons() {
    const bar = document.getElementById("doorPetAddBar");
    if (!bar) return;
    bar.innerHTML = "";

    DOOR_UNIT_NAMES.forEach(name => {
      const def = ITEMS.find(it => it.name === name);
      if (!def) return;
      const info = this.getUnitInfo(name);
      const color = getAnsiHex(userColors[def.rarity] || DEFAULT_COLORS[def.rarity] || "37");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "door-pet-add-btn";
      btn.style.setProperty("--rarity-color", color);
      btn.onclick = () => this.addUnit(name);
      btn.innerHTML = `
        <img src="${def.img}" alt="${escapeXml(name)}" onerror="this.style.display='none'">
        <div class="door-pet-add-info">
          <span class="door-pet-add-name" style="color:${color};">+ ${escapeXml(name)}</span>
          <span class="door-pet-add-sub">${info.icon} ${escapeXml(info.label)}</span>
        </div>
      `;
      bar.appendChild(btn);
    });
  },

  renderEquippedUnits() {
    const list = document.getElementById("doorEquippedPetsList");
    if (!list) return;
    list.innerHTML = "";

    if (this.pets.length === 0) {
      list.innerHTML = `<div class="squad-empty-note">No pets or Medical Base added yet. Click any unit above or <strong>Import from Loadouts</strong> to include buffs &amp; Squad DPS.</div>`;
      return;
    }

    this.pets.forEach((p, idx) => {
      const def = ITEMS.find(it => it.name === p.name);
      if (!def) return;
      const info = this.getUnitInfo(p.name);
      const color = getAnsiHex(userColors[def.rarity] || DEFAULT_COLORS[def.rarity] || "37");
      const val = this.getPetValue(p.name, p.lvl);

      let valStr = "";
      if (p.name === "Medical Base") {
        const placed = p.placed || MEDICAL_BASE_MAX_PLACED;
        const totPct = Number((val * placed).toFixed(2));
        valStr = `🏥 ${totPct}%/s (×${placed})`;
      } else if (p.name === "Horse") {
        valStr = `🐎 20% / 10s`;
      } else {
        const buff = PET_BUFFS[p.name];
        const unit = (buff && buff.unit) || "%";
        const formatted = unit === "lvl" ? `+${val} Lvl` : unit === "s" ? `${val}s` : unit === "%/s" ? `${val}%/s` : `+${val}%`;
        valStr = `${info.icon} ${formatted}`;
      }

      const pill = document.createElement("div");
      pill.className = "door-pet-chip";
      pill.style.borderColor = `${color}77`;

      const img = document.createElement("img");
      img.src = def.img;
      img.alt = p.name;
      img.onerror = () => { img.style.display = "none"; };

      const nameEl = document.createElement("span");
      nameEl.className = "door-pet-chip-name";
      nameEl.style.color = color;
      nameEl.textContent = p.name;

      const lvlSel = document.createElement("select");
      lvlSel.className = "door-pet-chip-lvl";
      for (let l = 1; l <= info.maxLvl; l++) {
        const opt = document.createElement("option");
        opt.value = l;
        opt.textContent = `Lvl ${l}${l === info.maxLvl ? " (MAX)" : ""}`;
        if (p.lvl === l) opt.selected = true;
        lvlSel.appendChild(opt);
      }
      lvlSel.onchange = () => {
        this.pets[idx].lvl = parseInt(lvlSel.value, 10) || info.maxLvl;
        this.saveState();
        this.render();
      };

      pill.appendChild(img);
      pill.appendChild(nameEl);
      pill.appendChild(lvlSel);

      if (p.name === "Medical Base") {
        const placedSel = document.createElement("select");
        placedSel.className = "door-pet-chip-lvl";
        placedSel.title = "Placed Medical Bases (limit 4 per player)";
        for (let c = 1; c <= MEDICAL_BASE_MAX_PLACED; c++) {
          const opt = document.createElement("option");
          opt.value = c;
          opt.textContent = `×${c}`;
          if ((p.placed || MEDICAL_BASE_MAX_PLACED) === c) opt.selected = true;
          placedSel.appendChild(opt);
        }
        placedSel.onchange = () => {
          this.pets[idx].placed = parseInt(placedSel.value, 10) || MEDICAL_BASE_MAX_PLACED;
          this.saveState();
          this.render();
        };
        pill.appendChild(placedSel);
      }

      const valEl = document.createElement("span");
      valEl.className = "door-pet-chip-val";
      valEl.textContent = valStr;

      const rmBtn = document.createElement("button");
      rmBtn.type = "button";
      rmBtn.className = "squad-slot-remove-btn";
      rmBtn.title = "Remove unit";
      rmBtn.textContent = "✕";
      rmBtn.onclick = () => this.removeUnit(idx);

      pill.appendChild(valEl);
      pill.appendChild(rmBtn);
      list.appendChild(pill);
    });
  },

  render() {
    const buffs = this.computeBuffs();
    this.renderEquippedUnits();

    const effectiveTarget = Math.max(this.targetLevel, buffs.startLevel);
    const hpMult = 1 + buffs.doorHpPct / 100;
    const armorDiv = 1 - buffs.doorArmorPct / 100;

    const baseHpAtTarget = this.getBaseHp(effectiveTarget);
    const buffedHpAtTarget = baseHpAtTarget * hpMult;
    const effectiveHpAtTarget = armorDiv > 0 ? buffedHpAtTarget / armorDiv : buffedHpAtTarget;
    const nextUpgradeCost = this.getUpgradeCost(effectiveTarget + 1);

    let totalCostNoBeaver = 0;
    let totalCostWithBeaver = 0;
    for (let l = 2; l <= effectiveTarget; l++) {
      const c = this.getUpgradeCost(l);
      totalCostNoBeaver += c;
      if (l > buffs.startLevel) {
        totalCostWithBeaver += c;
      }
    }
    const cashSaved = Math.max(0, totalCostNoBeaver - totalCostWithBeaver);

    const bunnyHealPerSec = buffedHpAtTarget * (buffs.bunnyHealPct / 100);
    const medBaseHealPerSec = buffedHpAtTarget * (buffs.medBaseHealPct / 100);
    const dragonHealPerSec = this.squadDps * (buffs.lifestealPct / 100);
    const totalHealPerSec = bunnyHealPerSec + medBaseHealPerSec + dragonHealPerSec;
    const horseStampedePerSec = buffedHpAtTarget * (buffs.horseStampedeHealPctPerSec / 100);

    // Active Buff Pills
    const buffPills = [];
    if (buffs.doorHpPct > 0) buffPills.push(`<span class="door-buff-pill">💚 Door HP: <strong>+${this.formatPct(buffs.doorHpPct)}</strong></span>`);
    if (buffs.doorStartAdd > 0) buffPills.push(`<span class="door-buff-pill">🚪 Start Level: <strong>Lvl ${buffs.startLevel} (+${buffs.doorStartAdd})</strong></span>`);
    if (buffs.doorArmorPct > 0) buffPills.push(`<span class="door-buff-pill">🛡️ Door Armor: <strong>+${this.formatPct(buffs.doorArmorPct)}</strong></span>`);
    if (buffs.bunnyHealPct > 0) buffPills.push(`<span class="door-buff-pill">🐰 Bunny Regen: <strong>${Number(buffs.bunnyHealPct.toFixed(2))}%/s</strong></span>`);
    if (buffs.medBaseHealPct > 0) buffPills.push(`<span class="door-buff-pill">🏥 Medical Base (×${buffs.medBasePlacedTotal}): <strong>${Number(buffs.medBaseHealPct.toFixed(2))}%/s</strong></span>`);
    if (buffs.lifestealPct > 0) {
      const lsNote = this.squadDps > 0
        ? ` (${this.formatBig(dragonHealPerSec)} HP/s from ${this.formatBig(this.squadDps)} DPS)`
        : " (set/import Squad DPS)";
      buffPills.push(`<span class="door-buff-pill">🩸 Dragon Lifesteal: <strong>+${this.formatPct(buffs.lifestealPct)}</strong>${lsNote}</span>`);
    }
    if (buffs.horseCount > 0) {
      buffPills.push(`<span class="door-buff-pill">🐎 Horse (${buffs.horseCount}): <strong>+${buffs.horseCount * 20}% / 10s</strong> (${this.formatBig(horseStampedePerSec)} HP/s on Stampede)</span>`);
    }
    if (buffs.shieldSecs > 0) buffPills.push(`<span class="door-buff-pill">🛡️ Turtle Shield: <strong>${Number(buffs.shieldSecs.toFixed(2))}s</strong></span>`);

    const activeBuffsEl = document.getElementById("doorActiveBuffsRow");
    if (activeBuffsEl) {
      activeBuffsEl.innerHTML = buffPills.length > 0
        ? buffPills.join("")
        : `<span class="door-buff-pill muted">Base Door Stats (no pet or Medical Base buffs active)</span>`;
    }

    // KPI Summary
    const summaryEl = document.getElementById("doorSummaryKpis");
    if (summaryEl) {
      const hasHpBuff = buffs.doorHpPct > 0;
      const hasArmor = buffs.doorArmorPct > 0;

      const healParts = [];
      if (bunnyHealPerSec > 0) healParts.push(`Bunny: ${this.formatBig(bunnyHealPerSec)}/s`);
      if (medBaseHealPerSec > 0) healParts.push(`Med: ${this.formatBig(medBaseHealPerSec)}/s`);
      if (dragonHealPerSec > 0) healParts.push(`Dragon: ${this.formatBig(dragonHealPerSec)}/s`);
      if (horseStampedePerSec > 0) healParts.push(`Horse: +${this.formatBig(horseStampedePerSec)}/s`);
      if (buffs.doorArmorPct > 0) healParts.push(`Armor: ${this.formatPct(buffs.doorArmorPct)}`);
      if (buffs.shieldSecs > 0) healParts.push(`Shield: ${Number(buffs.shieldSecs.toFixed(1))}s`);

      summaryEl.innerHTML = `
        <div class="squad-kpi-card">
          <div class="squad-kpi-label">❤️ Door HP (Lvl ${effectiveTarget})</div>
          <div class="squad-kpi-val" title="${this.formatExact(buffedHpAtTarget)} HP">${this.formatBig(buffedHpAtTarget)} <small>HP</small></div>
          ${hasHpBuff ? `<div class="squad-kpi-sub">Base: ${this.formatBig(baseHpAtTarget)} HP</div>` : ""}
          ${hasArmor ? `<div class="squad-kpi-sub" style="color:#38bdf8;">Effective (Armor): ${this.formatBig(effectiveHpAtTarget)} HP</div>` : ""}
        </div>
        <div class="squad-kpi-card">
          <div class="squad-kpi-label">⬆️ Upgrade to Lvl ${effectiveTarget + 1}</div>
          <div class="squad-kpi-val" style="color:#fbbf24;" title="$${this.formatExact(nextUpgradeCost)}">$${this.formatBig(nextUpgradeCost)}</div>
          <div class="squad-kpi-sub">Next HP: ${this.formatBig(this.getBaseHp(effectiveTarget + 1) * hpMult)} HP</div>
        </div>
        <div class="squad-kpi-card squad-kpi-dps">
          <div class="squad-kpi-label">💵 Total Cost (Lvl ${buffs.startLevel} → ${effectiveTarget})</div>
          <div class="squad-kpi-val" title="$${this.formatExact(totalCostWithBeaver)}">$${this.formatBig(totalCostWithBeaver)}</div>
          ${cashSaved > 0 ? `<div class="squad-kpi-sub" style="color:#4ade80;">Saved $${this.formatBig(cashSaved)} with Beaver!</div>` : `<div class="squad-kpi-sub">Start: Lvl ${buffs.startLevel}</div>`}
        </div>
        <div class="squad-kpi-card">
          <div class="squad-kpi-label">💚 Total Door Heal / sec</div>
          <div class="squad-kpi-val" style="color:#4ade80;" title="${this.formatExact(totalHealPerSec)} HP/s">${this.formatBig(totalHealPerSec)} <small>HP/s</small></div>
          <div class="squad-kpi-sub">${healParts.length > 0 ? healParts.join(" • ") : "No active healing or armor"}</div>
        </div>
      `;
    }

    // Level-by-level Table
    const tableWrap = document.getElementById("doorLevelsTableContainer");
    if (tableWrap) {
      const showBuffedCol = buffs.doorHpPct > 0;
      const showEffCol = buffs.doorArmorPct > 0;
      const showHealCol = buffs.totalPctHealPerSec > 0 || dragonHealPerSec > 0;

      let rowsHtml = "";
      let runningCost = 0;
      for (let l = 1; l <= effectiveTarget; l++) {
        const upgCost = this.getUpgradeCost(l);
        const isFreeBeaver = l > 1 && l <= buffs.startLevel;
        if (l > buffs.startLevel) runningCost += upgCost;

        const baseHp = this.getBaseHp(l);
        const buffedHp = baseHp * hpMult;
        const effHp = armorDiv > 0 ? buffedHp / armorDiv : buffedHp;
        const regen = buffedHp * (buffs.totalPctHealPerSec / 100) + dragonHealPerSec;
        const isTargetRow = l === effectiveTarget;

        rowsHtml += `
          <tr class="${isTargetRow ? "door-row-target" : ""}${isFreeBeaver ? " door-row-free" : ""}">
            <td class="col-lvl">Lvl ${l}${l === buffs.startLevel && buffs.startLevel > 1 ? ' <span class="door-start-tag">START</span>' : ""}</td>
            <td title="$${this.formatExact(upgCost)}">${l === 1 ? "—" : isFreeBeaver ? '<span style="color:#4ade80;font-weight:800;">FREE</span>' : `$${this.formatBig(upgCost)}`}</td>
            <td title="$${this.formatExact(runningCost)}">${l <= buffs.startLevel ? "$0" : `$${this.formatBig(runningCost)}`}</td>
            <td title="${this.formatExact(baseHp)} HP">${this.formatBig(baseHp)}</td>
            ${showBuffedCol ? `<td style="color:#4ade80;font-weight:700;" title="${this.formatExact(buffedHp)} HP">${this.formatBig(buffedHp)}</td>` : ""}
            ${showEffCol ? `<td style="color:#38bdf8;font-weight:700;" title="${this.formatExact(effHp)} HP">${this.formatBig(effHp)}</td>` : ""}
            ${showHealCol ? `<td style="color:#a7f3d0;" title="${this.formatExact(regen)} HP/s">${this.formatBig(regen)}/s</td>` : ""}
          </tr>
        `;
      }

      tableWrap.innerHTML = `
        <table class="detail-table door-levels-table">
          <thead>
            <tr>
              <th>LEVEL</th>
              <th>UPGRADE COST (+55%)</th>
              <th>TOTAL COST</th>
              <th>BASE HP (+45%)</th>
              ${showBuffedCol ? "<th>💚 BUFFED HP</th>" : ""}
              ${showEffCol ? "<th>🛡️ EFFECTIVE HP</th>" : ""}
              ${showHealCol ? "<th>💚 HEAL / SEC</th>" : ""}
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      `;
    }
  }
};

const JINX_LUCK_LEVELS = [20, 25, 30, 35, 40];

const JinxCalcUI = {
  modeKey: "crazy",
  jinxes: [{ lvl: 5 }], // [{ lvl: 1..5 }]

  init() {
    this.loadState();

    const modeSel = document.getElementById("jinxCalcModeSelect");
    if (modeSel && typeof JINX_MODES !== "undefined") {
      modeSel.innerHTML = JINX_MODES.map(m =>
        `<option value="${m.key}" ${m.key === this.modeKey ? "selected" : ""}>🎮 ${m.name} (Bonus +${m.bonusLuck}% • Max ${m.maxLuck}%)</option>`
      ).join("");
      modeSel.onchange = () => {
        this.modeKey = modeSel.value;
        this.saveState();
        this.render();
      };
    }

    const addBtn = document.getElementById("btnJinxAdd");
    if (addBtn) {
      addBtn.onclick = () => {
        if (this.jinxes.length >= 20) return;
        this.jinxes.push({ lvl: 5 });
        this.saveState();
        this.render();
      };
    }

    const clearBtn = document.getElementById("btnJinxClear");
    if (clearBtn) {
      clearBtn.onclick = () => {
        this.jinxes = [];
        this.saveState();
        this.render();
      };
    }

    const importBtn = document.getElementById("btnJinxImportLoadouts");
    if (importBtn) {
      importBtn.onclick = () => this.importFromLoadouts();
    }

    document.querySelectorAll(".jinx-preset-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const cnt = Math.max(1, Math.min(20, parseInt(btn.dataset.jinxCount, 10) || 1));
        this.jinxes = Array.from({ length: cnt }, () => ({ lvl: 5 }));
        this.saveState();
        this.render();
      });
    });

    this.render();
  },

  loadState() {
    try {
      const raw = localStorage.getItem("td_jinx_calc_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.modeKey === "string") {
          this.modeKey = parsed.modeKey;
        }
        if (parsed && Array.isArray(parsed.jinxes)) {
          this.jinxes = parsed.jinxes
            .slice(0, 20)
            .map(j => ({ lvl: Math.max(1, Math.min(5, parseInt(j && j.lvl, 10) || 5)) }));
        }
      }
    } catch {}
  },

  saveState() {
    try {
      localStorage.setItem("td_jinx_calc_v1", JSON.stringify({
        modeKey: this.modeKey,
        jinxes: this.jinxes
      }));
    } catch {}
  },

  importFromLoadouts() {
    if (typeof LoadoutsUI === "undefined" || !Array.isArray(LoadoutsUI.players)) return;
    const found = [];
    LoadoutsUI.players.forEach(p => {
      const slotCount = p.vip ? 5 : 4;
      for (let i = 0; i < slotCount; i++) {
        const s = p.slots[i];
        if (s && s.item === "Jinx") {
          found.push({ lvl: Math.max(1, Math.min(5, s.lvl || 5)) });
        }
      }
    });
    if (LoadoutsUI.selectedMode) {
      this.modeKey = LoadoutsUI.selectedMode;
      const modeSel = document.getElementById("jinxCalcModeSelect");
      if (modeSel) modeSel.value = this.modeKey;
    }
    this.jinxes = found.slice(0, 20);
    this.saveState();
    this.render();
  },

  getLuckForLevel(lvl) {
    const idx = Math.min(Math.max(1, lvl || 1), 5) - 1;
    return JINX_LUCK_LEVELS[idx];
  },

  render() {
    const jinxDef = ITEMS.find(it => it.name === "Jinx");
    const jinxImg = jinxDef ? jinxDef.img : "";
    const jinxColor = jinxDef ? getAnsiHex(userColors[jinxDef.rarity] || DEFAULT_COLORS[jinxDef.rarity] || "37") : "#ffffff";

    // Render equipped Jinx chips
    const list = document.getElementById("jinxCalcPetsList");
    if (list) {
      list.innerHTML = "";
      if (this.jinxes.length === 0) {
        list.innerHTML = `<div class="squad-empty-note">No Jinx added yet. Click <strong>➕ Add Jinx</strong> or <strong>📥 Import from Loadouts</strong>.</div>`;
      } else {
        this.jinxes.forEach((jx, idx) => {
          const luckVal = this.getLuckForLevel(jx.lvl);
          const pill = document.createElement("div");
          pill.className = "door-pet-chip";
          pill.style.borderColor = "rgba(168, 85, 247, 0.55)";

          const img = document.createElement("img");
          img.src = jinxImg;
          img.alt = "Jinx";
          img.onerror = () => { img.style.display = "none"; };

          const nameEl = document.createElement("span");
          nameEl.className = "door-pet-chip-name";
          nameEl.style.color = jinxColor;
          nameEl.textContent = `Jinx #${idx + 1}`;

          const lvlSel = document.createElement("select");
          lvlSel.className = "door-pet-chip-lvl";
          for (let l = 1; l <= 5; l++) {
            const opt = document.createElement("option");
            opt.value = l;
            opt.textContent = `Lvl ${l}${l === 5 ? " (MAX)" : ""}`;
            if (jx.lvl === l) opt.selected = true;
            lvlSel.appendChild(opt);
          }
          lvlSel.onchange = () => {
            this.jinxes[idx].lvl = parseInt(lvlSel.value, 10) || 5;
            this.saveState();
            this.render();
          };

          const valEl = document.createElement("span");
          valEl.className = "door-pet-chip-val";
          valEl.style.color = "#c084fc";
          valEl.textContent = `🔮 +${luckVal}% • 💀 +30%`;

          const rmBtn = document.createElement("button");
          rmBtn.type = "button";
          rmBtn.className = "squad-slot-remove-btn";
          rmBtn.title = "Remove Jinx";
          rmBtn.textContent = "✕";
          rmBtn.onclick = () => {
            this.jinxes.splice(idx, 1);
            this.saveState();
            this.render();
          };

          pill.appendChild(img);
          pill.appendChild(nameEl);
          pill.appendChild(lvlSel);
          pill.appendChild(valEl);
          pill.appendChild(rmBtn);
          list.appendChild(pill);
        });
      }
    }

    const mode = (typeof JINX_MODES !== "undefined" && JINX_MODES.find(m => m.key === this.modeKey))
      || { key: "crazy", name: "Crazy", bonusLuck: 60, maxLuck: 500, baseCoins: 31720, baseGems: 406 };

    const count = this.jinxes.length;
    const petLuckSum = this.jinxes.reduce((sum, j) => sum + this.getLuckForLevel(j.lvl), 0);
    const rawLuck = count > 0 ? (mode.bonusLuck + petLuckSum) : 0;
    const cappedLuck = Math.min(rawLuck, mode.maxLuck);
    const overCap = Math.max(0, rawLuck - mode.maxLuck);
    const missingLuck = Math.max(0, mode.maxLuck - rawLuck);
    const lvl5NeededForCap = count > 0 ? Math.ceil(missingLuck / 40) : Math.ceil(Math.max(0, mode.maxLuck - mode.bonusLuck) / 40);
    const cursePct = count * 30;
    const jackpotChance = count > 0 ? Math.min(25, 2 + (cappedLuck / 100) * 4) : 0;
    const fmtPct = (n) => Number.isInteger(n) ? `${n}%` : `${Number(n.toFixed(2))}%`;

    const hintEl = document.getElementById("jinxCalcModeHint");
    if (hintEl) {
      hintEl.innerHTML = `Mode Bonus: <strong>+${mode.bonusLuck}%</strong> • Max Cap: <strong>${mode.maxLuck}%</strong> • Spin Base: <strong>${mode.baseCoins.toLocaleString()} Coins</strong> / <strong>${mode.baseGems.toLocaleString()} Gems</strong>`;
    }

    const kpiEl = document.getElementById("jinxCalcSummaryKpis");
    if (kpiEl) {
      const capSub = count === 0
        ? `Need ${lvl5NeededForCap}× Lvl 5 Jinx to hit cap`
        : overCap > 0
        ? `<span style="color:#fbbf24;">⚠️ +${overCap}% over cap (extra Jinxes only add Curse!)</span>`
        : missingLuck === 0
        ? `<span style="color:#4ade80;">✓ Max Luck Cap reached!</span>`
        : `Need +${missingLuck}% (${lvl5NeededForCap}× Lvl 5) for cap`;

      kpiEl.innerHTML = `
        <div class="squad-kpi-card">
          <div class="squad-kpi-label">🔮 Jinx Luck (${escapeXml(mode.name)})</div>
          <div class="squad-kpi-val" style="color:#c084fc;">${cappedLuck}% <small>/ ${mode.maxLuck}%</small></div>
          <div class="squad-kpi-sub">Mode +${mode.bonusLuck}% • ${count} Jinx (+${petLuckSum}%)</div>
          <div class="squad-kpi-sub">${capSub}</div>
        </div>
        <div class="squad-kpi-card">
          <div class="squad-kpi-label">🎰 Jackpot Chance</div>
          <div class="squad-kpi-val" style="color:#fbbf24;">${fmtPct(jackpotChance)}</div>
          <div class="squad-kpi-sub">2% base + 4% per 100% Luck (max 25%)</div>
        </div>
        <div class="squad-kpi-card">
          <div class="squad-kpi-label">💀 Total Curse (Zombie DMG)</div>
          <div class="squad-kpi-val" style="color:#f87171;">+${cursePct}%</div>
          <div class="squad-kpi-sub">${count} Jinx × +30% Zombie Damage</div>
        </div>
        <div class="squad-kpi-card squad-kpi-dps">
          <div class="squad-kpi-label">🪙 Spin Base / 25× Jackpot</div>
          <div class="squad-kpi-val">${mode.baseCoins.toLocaleString()} <small>Coins</small></div>
          <div class="squad-kpi-sub" style="color:#38bdf8;">${mode.baseGems.toLocaleString()} Base Gems</div>
          <div class="squad-kpi-sub" style="color:#fbbf24;">25× Max: ${(mode.baseCoins * 25).toLocaleString()} Coins / ${(mode.baseGems * 25).toLocaleString()} Gems</div>
        </div>
      `;
    }

    const tableWrap = document.getElementById("jinxCalcModesTable");
    if (tableWrap && typeof JINX_MODES !== "undefined") {
      const rowsHtml = JINX_MODES.map(m => {
        const rLuck = count > 0 ? (m.bonusLuck + petLuckSum) : 0;
        const cLuck = Math.min(rLuck, m.maxLuck);
        const oCap = Math.max(0, rLuck - m.maxLuck);
        const jp = count > 0 ? Math.min(25, 2 + (cLuck / 100) * 4) : 0;
        const isSelected = m.key === mode.key;
        return `
          <tr class="${isSelected ? "door-row-target" : ""}" style="cursor:pointer;" onclick="JinxCalcUI.selectMode('${m.key}')">
            <td class="col-lvl">${escapeXml(m.name)}</td>
            <td>+${m.bonusLuck}%</td>
            <td style="color:#c084fc;font-weight:700;">${cLuck}% / ${m.maxLuck}%${oCap > 0 ? ` <small style="color:#fbbf24;">(+${oCap}%)</small>` : ""}</td>
            <td style="color:#fbbf24;font-weight:700;">${fmtPct(jp)}</td>
            <td>${m.baseCoins.toLocaleString()}</td>
            <td style="color:#38bdf8;">${m.baseGems.toLocaleString()}</td>
          </tr>
        `;
      }).join("");

      tableWrap.innerHTML = `
        <table class="detail-table door-levels-table">
          <thead>
            <tr>
              <th>MODE</th>
              <th>BONUS LUCK</th>
              <th>YOUR LUCK / CAP</th>
              <th>JACKPOT %</th>
              <th>BASE COINS</th>
              <th>BASE GEMS</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      `;
    }
  },

  selectMode(key) {
    this.modeKey = key;
    const modeSel = document.getElementById("jinxCalcModeSelect");
    if (modeSel) modeSel.value = key;
    this.saveState();
    this.render();
  }
};
