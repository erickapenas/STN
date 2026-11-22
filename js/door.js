const DOOR_BASE_HP = 420;
const DOOR_FIRST_UPGRADE_COST = 100;
const DOOR_COST_GROWTH = 1.55;
const DOOR_HP_GROWTH = 1.45;
const DOOR_MAX_LEVEL = 100;

const DOOR_PET_NAMES = ["Hippo", "Beaver", "Rhino", "Bunny", "Turtle", "Dragon"];

const DoorUI = {
  targetLevel: 20,
  pets: [], // [{ name, lvl }]

  init() {
    this.loadState();

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
        this.saveState();
        this.render();
      };
    }

    this.renderPetPickerButtons();
    this.render();
  },

  loadState() {
    try {
      const raw = localStorage.getItem("td_door_calc_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.targetLevel === "number") {
          this.targetLevel = Math.max(1, Math.min(DOOR_MAX_LEVEL, Math.round(parsed.targetLevel)));
        }
        if (parsed && Array.isArray(parsed.pets)) {
          this.pets = parsed.pets
            .filter(p => p && DOOR_PET_NAMES.includes(p.name))
            .slice(0, 15)
            .map(p => ({ name: p.name, lvl: Math.max(1, Math.min(5, parseInt(p.lvl, 10) || 5)) }));
        }
      }
    } catch {}
  },

  saveState() {
    try {
      localStorage.setItem("td_door_calc_v1", JSON.stringify({
        targetLevel: this.targetLevel,
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
        if (s && s.item && DOOR_PET_NAMES.includes(s.item)) {
          imported.push({ name: s.item, lvl: Math.max(1, Math.min(5, s.lvl || 5)) });
        }
      }
    });
    this.pets = imported.slice(0, 15);
    this.saveState();
    this.render();
  },

  addPet(name) {
    if (!DOOR_PET_NAMES.includes(name) || this.pets.length >= 15) return;
    this.pets.push({ name, lvl: 5 });
    this.saveState();
    this.render();
  },

  removePet(idx) {
    this.pets.splice(idx, 1);
    this.saveState();
    this.render();
  },

  getPetValue(name, lvl) {
    const buff = (typeof PET_BUFFS !== "undefined") ? PET_BUFFS[name] : null;
    if (!buff) return 0;
    if (Array.isArray(buff.levels) && buff.levels.length > 0) {
      const idx = Math.min(Math.max(1, lvl || 1), buff.levels.length) - 1;
      return buff.levels[idx];
    }
    return buff.value || 0;
  },

  computePetBuffs() {
    const factor = (typeof BUFF_DIMINISHING_FACTOR !== "undefined") ? BUFF_DIMINISHING_FACTOR : 0.6;
    const byStat = {
      doorhp: [],
      doorlvl: [],
      doorarmor: [],
      doorheal: [],
      shield: [],
      lifesteal: []
    };

    this.pets.forEach(p => {
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
    const doorHealPct = sumWithDecay(byStat.doorheal);
    const shieldSecs = byStat.shield.reduce((acc, v) => acc + v, 0); // Turtles fire one after another
    const lifestealPct = sumWithDecay(byStat.lifesteal);

    return {
      doorHpPct,
      doorStartAddRaw,
      doorStartAdd,
      startLevel: 1 + doorStartAdd,
      doorArmorPct,
      doorHealPct,
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

    DOOR_PET_NAMES.forEach(name => {
      const def = ITEMS.find(it => it.name === name);
      const buff = PET_BUFFS[name];
      if (!def || !buff) return;
      const color = getAnsiHex(userColors[def.rarity] || DEFAULT_COLORS[def.rarity] || "37");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "door-pet-add-btn";
      btn.style.setProperty("--rarity-color", color);
      btn.onclick = () => this.addPet(name);
      btn.innerHTML = `
        <img src="${def.img}" alt="${escapeXml(name)}" onerror="this.style.display='none'">
        <div class="door-pet-add-info">
          <span class="door-pet-add-name" style="color:${color};">+ ${escapeXml(name)}</span>
          <span class="door-pet-add-sub">${buff.icon} ${escapeXml(buff.label)}</span>
        </div>
      `;
      bar.appendChild(btn);
    });
  },

  renderEquippedPets(buffs) {
    const list = document.getElementById("doorEquippedPetsList");
    if (!list) return;
    list.innerHTML = "";

    if (this.pets.length === 0) {
      list.innerHTML = `<div class="squad-empty-note">No pets added yet. Click any pet above or import from Loadouts to include pet buffs in the calculation.</div>`;
      return;
    }

    this.pets.forEach((p, idx) => {
      const def = ITEMS.find(it => it.name === p.name);
      const buff = PET_BUFFS[p.name];
      if (!def || !buff) return;
      const color = getAnsiHex(userColors[def.rarity] || DEFAULT_COLORS[def.rarity] || "37");
      const val = this.getPetValue(p.name, p.lvl);
      const unit = buff.unit || "%";
      const valStr = unit === "lvl" ? `+${val} Lvl` : unit === "s" ? `${val}s` : unit === "%/s" ? `${val}%/s` : `+${val}%`;

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
      for (let l = 1; l <= 5; l++) {
        const opt = document.createElement("option");
        opt.value = l;
        opt.textContent = `Lvl ${l}${l === 5 ? " (MAX)" : ""}`;
        if (p.lvl === l) opt.selected = true;
        lvlSel.appendChild(opt);
      }
      lvlSel.onchange = () => {
        this.pets[idx].lvl = parseInt(lvlSel.value, 10) || 5;
        this.saveState();
        this.render();
      };

      const valEl = document.createElement("span");
      valEl.className = "door-pet-chip-val";
      valEl.textContent = `${buff.icon} ${valStr}`;

      const rmBtn = document.createElement("button");
      rmBtn.type = "button";
      rmBtn.className = "squad-slot-remove-btn";
      rmBtn.title = "Remove pet";
      rmBtn.textContent = "✕";
      rmBtn.onclick = () => this.removePet(idx);

      pill.appendChild(img);
      pill.appendChild(nameEl);
      pill.appendChild(lvlSel);
      pill.appendChild(valEl);
      pill.appendChild(rmBtn);
      list.appendChild(pill);
    });
  },

  render() {
    const buffs = this.computePetBuffs();
    this.renderEquippedPets(buffs);

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
    const healPerSec = buffedHpAtTarget * (buffs.doorHealPct / 100);

    // Active Buff Pills
    const buffPills = [];
    if (buffs.doorHpPct > 0) buffPills.push(`<span class="door-buff-pill">💚 Door HP: <strong>+${this.formatPct(buffs.doorHpPct)}</strong></span>`);
    if (buffs.doorStartAdd > 0) buffPills.push(`<span class="door-buff-pill">🚪 Start Level: <strong>Lvl ${buffs.startLevel} (+${buffs.doorStartAdd})</strong></span>`);
    if (buffs.doorArmorPct > 0) buffPills.push(`<span class="door-buff-pill">🛡️ Door Armor: <strong>+${this.formatPct(buffs.doorArmorPct)}</strong></span>`);
    if (buffs.doorHealPct > 0) buffPills.push(`<span class="door-buff-pill">💚 Regen: <strong>${Number(buffs.doorHealPct.toFixed(2))}%/s</strong></span>`);
    if (buffs.shieldSecs > 0) buffPills.push(`<span class="door-buff-pill">🛡️ Turtle Shield: <strong>${Number(buffs.shieldSecs.toFixed(2))}s</strong></span>`);
    if (buffs.lifestealPct > 0) buffPills.push(`<span class="door-buff-pill">🩸 Lifesteal: <strong>+${this.formatPct(buffs.lifestealPct)}</strong></span>`);

    const activeBuffsEl = document.getElementById("doorActiveBuffsRow");
    if (activeBuffsEl) {
      activeBuffsEl.innerHTML = buffPills.length > 0
        ? buffPills.join("")
        : `<span class="door-buff-pill muted">Base Door Stats (no pet buffs active)</span>`;
    }

    // KPI Summary
    const summaryEl = document.getElementById("doorSummaryKpis");
    if (summaryEl) {
      const hasHpBuff = buffs.doorHpPct > 0;
      const hasArmor = buffs.doorArmorPct > 0;
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
          <div class="squad-kpi-label">💚 Regen &amp; Defense</div>
          <div class="squad-kpi-val" style="color:#4ade80;">${buffs.doorHealPct > 0 ? `${this.formatBig(healPerSec)} <small>HP/s</small>` : "0 <small>HP/s</small>"}</div>
          <div class="squad-kpi-sub">Armor: ${this.formatPct(buffs.doorArmorPct)}${buffs.shieldSecs > 0 ? ` • Shield: ${Number(buffs.shieldSecs.toFixed(1))}s` : ""}</div>
        </div>
      `;
    }

    // Level-by-level Table
    const tableWrap = document.getElementById("doorLevelsTableContainer");
    if (tableWrap) {
      const showBuffedCol = buffs.doorHpPct > 0;
      const showEffCol = buffs.doorArmorPct > 0;
      const showHealCol = buffs.doorHealPct > 0;

      let rowsHtml = "";
      let runningCost = 0;
      for (let l = 1; l <= effectiveTarget; l++) {
        const upgCost = this.getUpgradeCost(l);
        const isFreeBeaver = l > 1 && l <= buffs.startLevel;
        if (l > buffs.startLevel) runningCost += upgCost;

        const baseHp = this.getBaseHp(l);
        const buffedHp = baseHp * hpMult;
        const effHp = armorDiv > 0 ? buffedHp / armorDiv : buffedHp;
        const regen = buffedHp * (buffs.doorHealPct / 100);
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
