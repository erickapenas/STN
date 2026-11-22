const LoadoutsUI = {
  activeSubView: "squad",
  players: [],
  clanBuffEnabled: false,
  _cachedCanvas: null,
  _cachedBlobPromise: null,
  _isCopying: false,
  pickerState: {
    open: false,
    playerIdx: 0,
    slotIdx: 0,
    type: "all", // "all" | "towers" | "pets"
    subFilter: "all",
    rarity: "all",
    query: ""
  },

  init() {
    this.players = StorageManager.loadSquadLoadouts();
    this.clanBuffEnabled = StorageManager.loadClanBuffsEnabled();

    const clanBuffBtn = document.getElementById("btnToggleClanBuff");
    if (clanBuffBtn) {
      clanBuffBtn.onclick = () => {
        this.clanBuffEnabled = !this.clanBuffEnabled;
        StorageManager.saveClanBuffsEnabled(this.clanBuffEnabled);
        this.invalidateExportCache();
        this.updateClanBuffButton();
        this.renderSummary();
      };
      this.updateClanBuffButton();
    }

    const copyImgBtn = document.getElementById("squadCopyImgBtn");
    if (copyImgBtn) copyImgBtn.onclick = () => this.copyImage();

    const dlImgBtn = document.getElementById("squadDownloadImgBtn");
    if (dlImgBtn) dlImgBtn.onclick = () => this.downloadImage();

    const subBtns = document.querySelectorAll("#clanBattleTab .loadouts-sub-btn");
    subBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        this.selectSubView(btn.dataset.loadoutView);
      });
    });

    const addBtn = document.getElementById("btnAddSquadPlayer");
    if (addBtn) {
      addBtn.onclick = () => {
        if (this.players.length >= 10) return;
        this.players.push({
          name: `Player ${this.players.length + 1}`,
          vip: true,
          slots: [
            { item: null, lvl: 1 },
            { item: null, lvl: 1 },
            { item: null, lvl: 1 },
            { item: null, lvl: 1 },
            { item: null, lvl: 1 }
          ]
        });
        this.save();
        this.render();
      };
    }

    const clearBtn = document.getElementById("btnClearSquadLoadouts");
    if (clearBtn) {
      clearBtn.onclick = () => {
        if (!confirm("Clear all player loadouts?")) return;
        this.players = [{
          name: "Player 1",
          vip: true,
          slots: [
            { item: null, lvl: 1 },
            { item: null, lvl: 1 },
            { item: null, lvl: 1 },
            { item: null, lvl: 1 },
            { item: null, lvl: 1 }
          ]
        }];
        this.save();
        this.render();
      };
    }

    this.initPickerModal();
    this.selectSubView("squad");
  },

  selectSubView(view) {
    this.activeSubView = view || "squad";
    const subBtns = document.querySelectorAll("#clanBattleTab .loadouts-sub-btn");
    subBtns.forEach(b => b.classList.toggle("active", b.dataset.loadoutView === this.activeSubView));

    const squadPanel = document.getElementById("squadLoadoutsPanel");
    const cbPanel = document.getElementById("clanBattlePanel");
    if (squadPanel) squadPanel.classList.toggle("active", this.activeSubView === "squad");
    if (cbPanel) cbPanel.classList.toggle("active", this.activeSubView === "clanbattle");

    if (this.activeSubView === "clanbattle" && typeof ClanBattleUI !== "undefined") {
      ClanBattleUI.updateUI();
    } else {
      this.render();
    }
  },

  initPickerModal() {
    const modal = document.getElementById("unitPickerModal");
    const closeBtn = document.getElementById("unitPickerCloseBtn");
    const clearBtn = document.getElementById("unitPickerClearBtn");
    const searchInput = document.getElementById("unitPickerSearch");

    if (closeBtn) closeBtn.onclick = () => this.closePicker();
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) this.closePicker();
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.pickerState.open) this.closePicker();
    });

    if (clearBtn) {
      clearBtn.onclick = () => {
        const { playerIdx, slotIdx } = this.pickerState;
        if (this.players[playerIdx]) {
          this.players[playerIdx].slots[slotIdx] = { item: null, lvl: 1 };
          this.save();
          this.closePicker();
          this.render();
        }
      };
    }

    document.querySelectorAll(".picker-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.pickerState.type = btn.dataset.pickerType;
        this.pickerState.subFilter = "all";
        document.querySelectorAll(".picker-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.renderPickerSubFilterBar();
        this.renderPickerGrid();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        this.pickerState.query = searchInput.value.trim().toLowerCase();
        this.renderPickerGrid();
      });
    }
  },

  openPicker(playerIdx, slotIdx) {
    const modal = document.getElementById("unitPickerModal");
    if (!modal) return;

    const player = this.players[playerIdx];
    const currentSlot = player.slots[slotIdx] || { item: null, lvl: 1 };
    const currentDef = currentSlot.item ? ITEMS.find(x => x.name === currentSlot.item) : null;

    this.pickerState.open = true;
    this.pickerState.playerIdx = playerIdx;
    this.pickerState.slotIdx = slotIdx;
    this.pickerState.type = "all";
    this.pickerState.subFilter = "all";
    this.pickerState.rarity = "all";
    this.pickerState.query = "";

    const subtitle = document.getElementById("unitPickerSubtitle");
    if (subtitle) {
      subtitle.textContent = `${player.name || `Player ${playerIdx + 1}`} • Slot ${slotIdx + 1}`;
    }

    const clearBtn = document.getElementById("unitPickerClearBtn");
    if (clearBtn) {
      clearBtn.style.display = currentDef ? "inline-flex" : "none";
    }

    document.querySelectorAll(".picker-tab-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.pickerType === this.pickerState.type);
    });

    const searchInput = document.getElementById("unitPickerSearch");
    if (searchInput) {
      searchInput.value = "";
    }

    this.renderPickerSubFilterBar();
    this.renderPickerRarityBar();
    this.renderPickerGrid();

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    if (searchInput) setTimeout(() => searchInput.focus(), 50);
  },

  closePicker() {
    const modal = document.getElementById("unitPickerModal");
    if (modal && modal.classList.contains("open")) {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
    this.pickerState.open = false;
  },

  renderPickerSubFilterBar() {
    const bar = document.getElementById("unitPickerSubFilterBar");
    if (!bar) return;

    const chips = this.pickerState.type === "all"
      ? [
          { key: "all",     label: "All Units",  color: "#60a5fa" },
          { key: "DAMAGE",  label: "⚔️ Damage",  color: "#ef4444" },
          { key: "SUPPORT", label: "🛡️ Support", color: "#22c55e" },
          { key: "FARM",    label: "🌾 Farm",    color: "#facc15" },
          { key: "PET",     label: "🐾 Pets",    color: "#a855f7" }
        ]
      : this.pickerState.type === "towers"
      ? [
          { key: "all",     label: "All Types",   color: "#60a5fa" },
          { key: "DAMAGE",  label: "⚔️ Damage",   color: "#ef4444" },
          { key: "SUPPORT", label: "🛡️ Support",  color: "#22c55e" },
          { key: "FARM",    label: "🌾 Farm",     color: "#facc15" }
        ]
      : [
          { key: "all",      label: "All Buffs",    color: "#60a5fa" },
          { key: "damage",   label: "⚔️ Damage",    color: "#ef4444" },
          { key: "firerate", label: "⚡ Fire Rate", color: "#f59e0b" },
          { key: "range",    label: "🎯 Range",     color: "#38bdf8" },
          { key: "slow",     label: "🧊 Slow",      color: "#67e8f9" },
          { key: "cash",      label: "💰 Cash",       color: "#22c55e" },
          { key: "startcash", label: `${ICON_STARTCASH} Start Cash`, color: "#4ade80" },
          { key: "farms",     label: `${ICON_FARMS} Farms`,          color: "#c084fc" },
          { key: "coins",     label: "🪙 Coins",       color: "#facc15" },
          { key: "gems",      label: "💎 Gems",        color: "#a855f7" },
          { key: "doorlvl",   label: "🚪 Doors Start", color: "#d97706" },
          { key: "doorhp",    label: "💚 Door Health", color: "#4ade80" },
          { key: "event",     label: "🍗 Event",       color: "#f97316" }
        ];

    bar.innerHTML = "";
    chips.forEach(c => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `picker-rarity-chip${this.pickerState.subFilter === c.key ? " active" : ""}`;
      btn.style.setProperty("--chip-color", c.color);
      btn.innerHTML = c.label;
      btn.onclick = () => {
        this.pickerState.subFilter = c.key;
        this.renderPickerSubFilterBar();
        this.renderPickerGrid();
      };
      bar.appendChild(btn);
    });
  },

  renderPickerRarityBar() {
    const bar = document.getElementById("unitPickerRarityBar");
    if (!bar) return;

    const chips = [
      { key: "all", label: "All Rarities", color: "#fbbf24" },
      ...RARITY_TIERS.map(t => ({
        key: t.key,
        label: t.key.charAt(0).toUpperCase() + t.key.slice(1),
        color: getAnsiHex(userColors[t.key] || DEFAULT_COLORS[t.key] || "37")
      }))
    ];

    bar.innerHTML = "";
    chips.forEach(c => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `picker-rarity-chip${this.pickerState.rarity === c.key ? " active" : ""}`;
      btn.style.setProperty("--chip-color", c.color);
      btn.innerHTML = c.label;
      btn.onclick = () => {
        this.pickerState.rarity = c.key;
        this.renderPickerRarityBar();
        this.renderPickerGrid();
      };
      bar.appendChild(btn);
    });
  },

  renderPickerGrid() {
    const container = document.getElementById("unitPickerGridContainer");
    if (!container) return;
    container.innerHTML = "";

    const { playerIdx, slotIdx, type, subFilter, rarity, query } = this.pickerState;
    const player = this.players[playerIdx];
    const slotCount = player.vip ? 5 : 4;

    const pool = type === "all"
      ? ITEMS
      : ITEMS.filter(it => (type === "pets" ? it.role === "PET" : it.role !== "PET"));
    const filtered = pool.filter(it => {
      if (rarity !== "all" && it.rarity !== rarity) return false;
      if (subFilter !== "all") {
        if ((type === "towers" || type === "all") && it.role !== subFilter) return false;
        if (type === "pets") {
          const buff = (typeof PET_BUFFS !== "undefined") ? PET_BUFFS[it.name] : null;
          if (!buff) return false;
          const allStats = [buff.stat, ...(buff.extraBuffs ? buff.extraBuffs.map(eb => eb.stat) : [])];
          if (!allStats.includes(subFilter)) return false;
        }
      }
      if (query && !it.name.toLowerCase().includes(query) && !it.role.toLowerCase().includes(query)) return false;
      return true;
    });

    let renderedAny = false;

    // Strict order: Exclusive > Divine > Legendary > Mythic > Epic > Rare > Common
    RARITY_TIERS.forEach(tier => {
      const tierItems = filtered.filter(it => it.rarity === tier.key);
      if (tierItems.length === 0) return;
      renderedAny = true;

      const tierColor = getAnsiHex(userColors[tier.key] || DEFAULT_COLORS[tier.key] || "37");
      const block = document.createElement("div");
      block.className = "inventory-category-block";

      const title = document.createElement("div");
      title.className = "inv-cat-title";
      title.style.color = tierColor;
      title.innerHTML = `<span>💎</span> <span>${tier.label}</span> <span class="index-tier-count">(${tierItems.length})</span>`;
      block.appendChild(title);

      const grid = document.createElement("div");
      grid.className = "picker-grid";

      tierItems.forEach(it => {
        const equippedSlotIdx = player.slots
          .slice(0, slotCount)
          .findIndex(s => s && s.item === it.name);
        const isEquipped = equippedSlotIdx !== -1;

        const card = document.createElement("div");
        card.className = `picker-unit-card${isEquipped ? " selected" : ""}`;
        card.style.setProperty("--rarity-color", tierColor);

        let subText = "";
        if (isEquipped) {
          subText = "✓ Equipped (Click to remove)";
        } else if (it.role === "PET" && PET_BUFFS[it.name]) {
          const b = PET_BUFFS[it.name];
          const fmtVal = (pb) => this.formatStatVal(pb.value, pb.unit || "%");
          const extra = b.extraBuffs ? b.extraBuffs.map(eb => `${eb.icon} +${fmtVal(eb)}`).join(" ") : "";
          subText = `${b.icon} +${fmtVal(b)} ${b.label}${extra ? " • " + extra : ""}`;
        } else {
          const lim = (typeof TOWER_PLACEMENT_LIMITS !== "undefined" && TOWER_PLACEMENT_LIMITS[it.name]) || 1;
          subText = `Limit ×${lim}${it.canEvo ? " • ⚡EVO" : ""}`;
        }

        card.innerHTML = `
          <div class="picker-unit-thumb">
            <img src="${it.img}" alt="${escapeXml(it.name)}" onerror="this.style.display='none'">
          </div>
          <div class="picker-unit-name" style="color:${tierColor};">${escapeXml(it.name)}</div>
          <div class="picker-unit-sub">${subText}</div>
        `;

        card.onclick = () => {
          if (isEquipped) {
            player.slots[equippedSlotIdx] = { item: null, lvl: 1 };
          } else {
            player.slots[slotIdx] = { item: it.name, lvl: it.max };
          }
          this.save();
          this.closePicker();
          this.render();
        };

        grid.appendChild(card);
      });

      block.appendChild(grid);
      container.appendChild(block);
    });

    if (!renderedAny) {
      container.innerHTML = `<div class="index-empty">No ${type} found matching your filter.</div>`;
    }
  },

  updateClanBuffButton() {
    const btn = document.getElementById("btnToggleClanBuff");
    if (!btn) return;
    btn.className = `status-toggle-btn ${this.clanBuffEnabled ? "active" : "inactive"} squad-action-btn`;
    btn.textContent = this.clanBuffEnabled ? "🏰 Clan Buff: ON" : "🏰 Clan Buff: OFF";
  },

  invalidateExportCache() {
    this._cachedCanvas = null;
    this._cachedBlobPromise = null;
  },

  save() {
    this.invalidateExportCache();
    StorageManager.saveSquadLoadouts(this.players);
  },

  async _getOrBuildCanvas() {
    if (this._cachedCanvas) return this._cachedCanvas;
    const totals = this.computeSquadTotals();
    const canvas = await CanvasManager.captureSquadLoadoutsCanvas(
      this.players,
      totals,
      this.clanBuffEnabled,
      userColors
    );
    this._cachedCanvas = canvas;
    this._cachedBlobPromise = CanvasManager.canvasToBlob(canvas);
    return canvas;
  },

  async copyImage() {
    if (this._isCopying) return;
    const btn = document.getElementById("squadCopyImgBtn");
    if (!btn) return;
    const origHtml = btn.innerHTML;
    this._isCopying = true;
    btn.disabled = true;
    btn.classList.remove("copied");
    btn.classList.add("is-copying");
    btn.innerHTML = `<span class="btn-spinner" aria-hidden="true"></span><span>Copying Image...</span>`;

    try {
      const hasReadyBlob = !!this._cachedBlobPromise;
      const blobPromise = hasReadyBlob
        ? this._cachedBlobPromise
        : new Promise(resolve => requestAnimationFrame(resolve))
            .then(() => this._getOrBuildCanvas())
            .then(canvas => this._cachedBlobPromise || CanvasManager.canvasToBlob(canvas));

      const result = await CanvasManager.copyBlobToClipboard(
        blobPromise,
        () => this._getOrBuildCanvas(),
        `squad_loadouts_${Date.now()}.png`
      );

      btn.classList.remove("is-copying");
      btn.classList.add("copied");
      btn.innerHTML = result === "copied" ? "✅ Loadout Image Copied!" : "💾 Loadout Image Downloaded!";
      setTimeout(() => {
        btn.innerHTML = origHtml;
        btn.classList.remove("copied");
        btn.disabled = false;
        this._isCopying = false;
      }, 2000);
    } catch {
      btn.classList.remove("is-copying");
      btn.innerHTML = origHtml;
      btn.disabled = false;
      this._isCopying = false;
      alert("Error generating squad loadout image.");
    }
  },

  async downloadImage() {
    const btn = document.getElementById("squadDownloadImgBtn");
    const origHtml = btn ? btn.innerHTML : "";
    if (btn) {
      btn.disabled = true;
      btn.classList.add("is-copying");
      btn.innerHTML = `<span class="btn-spinner" aria-hidden="true"></span><span>Preparing PNG...</span>`;
    }
    try {
      if (!this._cachedCanvas) {
        await new Promise(resolve => requestAnimationFrame(resolve));
      }
      const canvas = await this._getOrBuildCanvas();
      CanvasManager.downloadCanvas(canvas, `squad_loadouts_${Date.now()}.png`);
    } catch {
      alert("Error downloading squad loadout image.");
    } finally {
      if (btn) {
        btn.classList.remove("is-copying");
        btn.innerHTML = origHtml;
        btn.disabled = false;
      }
    }
  },

  parseNum(v) {
    return parseFloat(String(v).replace(/[^0-9.]/g, "")) || 0;
  },

  formatNum(n) {
    if (!isFinite(n) || n <= 0) return "0";
    if (n >= 1000) return Math.round(n).toLocaleString();
    return Number.isInteger(n) ? n.toLocaleString() : Number(n.toFixed(1)).toLocaleString();
  },

  formatStatVal(n, unit = "%") {
    const num = Number.isInteger(n) ? n.toLocaleString() : Number(n.toFixed(2)).toLocaleString();
    if (unit === "$") return `$${num}`;
    if (unit === "lvl") return `${num} Lvl`;
    return `${num}%`;
  },

  formatPct(n) {
    return this.formatStatVal(n, "%");
  },

  getPetBuffValue(buff, lvl) {
    if (!buff) return 0;
    if (Array.isArray(buff.levels) && buff.levels.length > 0) {
      const idx = Math.min(Math.max(1, lvl || 1), buff.levels.length) - 1;
      return buff.levels[idx];
    }
    return buff.value;
  },

  getTowerStatsForLevel(itemDef, lvl) {
    const details = (typeof INDEX_DETAILS !== "undefined") ? INDEX_DETAILS[itemDef.name] : null;
    const limit = (typeof TOWER_PLACEMENT_LIMITS !== "undefined" && TOWER_PLACEMENT_LIMITS[itemDef.name]) || 1;
    if (!details || !Array.isArray(details.levels) || details.levels.length === 0) {
      return { hasStats: false, limit, singleDps: 0, totalDps: 0, bossMult: 1 };
    }
    const clampedLvl = Math.min(Math.max(1, lvl), details.levels.length);
    const lvData = details.levels.find(l => l.level === clampedLvl) || details.levels[details.levels.length - 1];
    const dmg = this.parseNum(lvData.damage);
    const rel = this.parseNum(lvData.reload);
    const singleDps = rel > 0 ? dmg / rel : 0;
    const bossMult = details.bossMultiplier || 1;
    return {
      hasStats: singleDps > 0,
      limit,
      singleDps,
      totalDps: singleDps * limit,
      bossMult
    };
  },

  computeSquadTotals() {
    let totalTowers = 0;
    let totalPets = 0;
    let totalPlacements = 0;
    let baseSquadDps = 0;
    let baseBossDps = 0;
    let towersMissingStats = 0;

    const unitCounts = {}; // name -> { item, count, placements }
    const buffEntriesByStat = {}; // stat -> [{ petName, label, icon, base }]
    const bestSupportBaseLvl = {}; // "Military Base" -> max lvl equipped, "Protector Base" -> max lvl equipped

    this.players.forEach(p => {
      const slotCount = p.vip ? 5 : 4;
      for (let i = 0; i < slotCount; i++) {
        const s = p.slots[i];
        if (!s || !s.item) continue;
        const def = ITEMS.find(x => x.name === s.item);
        if (!def) continue;

        if (!unitCounts[def.name]) {
          unitCounts[def.name] = { item: def, count: 0, placements: 0 };
        }
        unitCounts[def.name].count += 1;

        if (def.role === "PET") {
          totalPets += 1;
          const buff = (typeof PET_BUFFS !== "undefined") ? PET_BUFFS[def.name] : null;
          if (buff) {
            const allPetBuffs = [buff, ...(buff.extraBuffs || [])];
            allPetBuffs.forEach(pb => {
              if (!buffEntriesByStat[pb.stat]) buffEntriesByStat[pb.stat] = [];
              buffEntriesByStat[pb.stat].push({
                petName: def.name,
                label: pb.label,
                icon: pb.icon,
                base: this.getPetBuffValue(pb, s.lvl)
              });
            });
          }
        } else {
          totalTowers += 1;
          const stats = this.getTowerStatsForLevel(def, s.lvl);
          totalPlacements += stats.limit;
          unitCounts[def.name].placements += stats.limit;

          if (typeof SUPPORT_BASE_BUFFS !== "undefined" && SUPPORT_BASE_BUFFS[def.name]) {
            const clampedLvl = Math.min(Math.max(1, s.lvl || 1), def.max);
            if (!bestSupportBaseLvl[def.name] || clampedLvl > bestSupportBaseLvl[def.name]) {
              bestSupportBaseLvl[def.name] = clampedLvl;
            }
          }

          if (stats.hasStats) {
            baseSquadDps += stats.totalDps;
            baseBossDps += stats.totalDps * stats.bossMult;
          } else if (def.role === "DAMAGE") {
            towersMissingStats += 1;
          }
        }
      }
    });

    // Apply geometric diminishing returns: base * (0.6 ^ index) per stat for pets
    const factor = (typeof BUFF_DIMINISHING_FACTOR !== "undefined") ? BUFF_DIMINISHING_FACTOR : 0.6;
    const STAT_META = {
      damage:   { label: "Damage",    icon: "⚔️" },
      firerate: { label: "Fire Rate", icon: "⚡" },
      range:    { label: "Range",     icon: "🎯" },
      slow:     { label: "Slow",      icon: "🧊" },
      cash:      { label: "Cash",       icon: "💰", unit: "%" },
      startcash: { label: "Start Cash", icon: ICON_STARTCASH, unit: "$" },
      farms:     { label: "Farms",      icon: ICON_FARMS,     unit: "%" },
      coins:     { label: "Coins",       icon: "🪙", unit: "%" },
      gems:      { label: "Gems",        icon: "💎", unit: "%" },
      doorlvl:   { label: "Doors Start", icon: "🚪", unit: "lvl" },
      doorhp:    { label: "Door Health", icon: "💚", unit: "%" },
      event:     { label: "Event",       icon: "🍗", unit: "%" }
    };

    const buffsSummary = {};
    const ensureStat = (stat, label, icon) => {
      if (!buffsSummary[stat]) {
        const meta = STAT_META[stat] || { label: label || stat, icon: icon || "✨" };
        buffsSummary[stat] = {
          stat,
          label: label || meta.label,
          icon: icon || meta.icon,
          unit: meta.unit || "%",
          petCount: 0,
          petTotal: 0,
          baseAdds: [],
          clanAdd: 0,
          clanInfo: null,
          total: 0,
          steps: []
        };
      }
      return buffsSummary[stat];
    };

    Object.keys(buffEntriesByStat).forEach(stat => {
      const list = buffEntriesByStat[stat].sort((a, b) => b.base - a.base);
      const entryObj = ensureStat(stat, list[0].label, list[0].icon);
      let petTotal = 0;
      const steps = [];
      list.forEach((entry, idx) => {
        const mult = Math.pow(factor, idx);
        const eff = entry.base * mult;
        petTotal += eff;
        steps.push({
          petName: entry.petName,
          eff,
          pctOfBase: Math.round(mult * 1000) / 10
        });
      });
      entryObj.petCount = list.length;
      entryObj.petTotal = petTotal;
      entryObj.steps = steps;
      entryObj.total += petTotal;
    });

    // Add Support Base Buffs (Military Base: Damage & Range; Protector Base: Fire Rate — strongest only, non-stacking)
    if (typeof SUPPORT_BASE_BUFFS !== "undefined") {
      Object.keys(bestSupportBaseLvl).forEach(baseName => {
        const lvl = bestSupportBaseLvl[baseName];
        const baseDef = SUPPORT_BASE_BUFFS[baseName];
        Object.keys(baseDef).forEach(stat => {
          const arr = baseDef[stat];
          const val = arr[Math.min(lvl, arr.length) - 1] || 0;
          if (val <= 0) return;
          const entryObj = ensureStat(stat);
          entryObj.baseAdds.push({ name: `${baseName} Lvl ${lvl}`, value: val });
          entryObj.total += val;
        });
      });
    }

    // Add Clan Buffs when enabled (Armory, Ammo Depot, Watchtower, Treasury)
    if (this.clanBuffEnabled && typeof CLAN_BUFF_DEFS !== "undefined") {
      const clanLevels = StorageManager.loadClanBuffs();
      CLAN_BUFF_DEFS.forEach(def => {
        const lvl = clanLevels[def.key] || 0;
        if (lvl <= 0) return;
        const addPct = lvl * def.perLevel;
        const entryObj = ensureStat(def.stat, def.label, def.icon);
        entryObj.clanAdd = addPct;
        entryObj.clanInfo = `${def.name} Lvl ${lvl}`;
        entryObj.total += addPct;
      });
    }

    const dmgMult = 1 + ((buffsSummary.damage ? buffsSummary.damage.total : 0) / 100);
    const rateMult = 1 + ((buffsSummary.firerate ? buffsSummary.firerate.total : 0) / 100);
    const buffedSquadDps = baseSquadDps * dmgMult * rateMult;
    const buffedBossDps = baseBossDps * dmgMult * rateMult;

    return {
      totalTowers,
      totalPets,
      totalPlacements,
      baseSquadDps,
      buffedSquadDps,
      baseBossDps,
      buffedBossDps,
      towersMissingStats,
      buffsSummary,
      unitCounts
    };
  },

  renderSummary() {
    this.invalidateExportCache();
    const box = document.getElementById("squadSummaryContainer");
    if (!box) return;

    const totals = this.computeSquadTotals();
    const buffList = Object.values(totals.buffsSummary);

    const buffsHtml = buffList.length > 0
      ? buffList.map(b => {
          const u = b.unit || "%";
          const parts = [];
          if (b.petCount > 0) {
            const petBreak = b.steps.map(st => `${this.formatStatVal(st.eff, u)}`).join(" + ");
            parts.push(`${b.petCount} pet${b.petCount > 1 ? "s" : ""}: ${petBreak}`);
          }
          if (b.baseAdds && b.baseAdds.length > 0) {
            b.baseAdds.forEach(ba => parts.push(`🛡️ ${ba.name}: +${this.formatStatVal(ba.value, u)}`));
          }
          if (b.clanAdd > 0 && b.clanInfo) {
            parts.push(`🏰 ${b.clanInfo}: +${this.formatStatVal(b.clanAdd, u)}`);
          }
          return `
            <div class="squad-buff-card${(b.clanAdd > 0 || (b.baseAdds && b.baseAdds.length > 0)) ? " has-clan" : ""}">
              <div class="squad-buff-top">
                <span class="squad-buff-title">${b.icon} ${escapeXml(b.label)}</span>
                <span class="squad-buff-total">+${this.formatStatVal(b.total, u)}</span>
              </div>
              <div class="squad-buff-breakdown">${parts.join(" • ")}</div>
            </div>
          `;
        }).join("")
      : `<div class="squad-empty-note">Add pets, Military/Protector Base, or enable <strong>Clan Buff</strong> (Settings) to see stacked buffs.</div>`;

    const rosterEntries = Object.values(totals.unitCounts);
    const rosterHtml = rosterEntries.length > 0
      ? rosterEntries.map(entry => {
          const color = getAnsiHex(userColors[entry.item.rarity] || DEFAULT_COLORS[entry.item.rarity] || "37");
          const placedNote = entry.item.role !== "PET" ? ` <small>(${entry.placements} placed)</small>` : "";
          return `
            <div class="squad-roster-pill" style="border-color:${color}66;">
              <img src="${entry.item.img}" alt="" onerror="this.style.display='none'">
              <span style="color:${color}; font-weight:700;">${entry.count}× ${escapeXml(entry.item.name)}</span>${placedNote}
            </div>
          `;
        }).join("")
      : `<div class="squad-empty-note">No towers or pets equipped yet.</div>`;

    const hasBuffedDiff = totals.buffedSquadDps > totals.baseSquadDps + 0.5;
    const missingNote = totals.towersMissingStats > 0
      ? `<div class="squad-dps-note">ℹ️ ${totals.towersMissingStats} equipped damage tower(s) don't have Index DPS stats yet.</div>`
      : "";

    box.innerHTML = `
      <div class="squad-kpi-grid">
        <div class="squad-kpi-card">
          <div class="squad-kpi-label">👥 Players</div>
          <div class="squad-kpi-val">${this.players.length} <small>/ 10</small></div>
        </div>
        <div class="squad-kpi-card">
          <div class="squad-kpi-label">🔫 Total Towers</div>
          <div class="squad-kpi-val">${totals.totalTowers} <small>(${totals.totalPlacements} placed)</small></div>
        </div>
        <div class="squad-kpi-card">
          <div class="squad-kpi-label">🐾 Total Pets</div>
          <div class="squad-kpi-val">${totals.totalPets}</div>
        </div>
        <div class="squad-kpi-card squad-kpi-dps">
          <div class="squad-kpi-label">⚡ Total Squad DPS</div>
          <div class="squad-kpi-val">${this.formatNum(hasBuffedDiff ? totals.buffedSquadDps : totals.baseSquadDps)} <small>DPS</small></div>
          ${hasBuffedDiff ? `<div class="squad-kpi-sub">Base: ${this.formatNum(totals.baseSquadDps)} DPS</div>` : ""}
          ${totals.buffedBossDps > totals.buffedSquadDps + 0.5 ? `<div class="squad-kpi-sub" style="color:#fbbf24;">Boss: ${this.formatNum(totals.buffedBossDps)} DPS</div>` : ""}
        </div>
      </div>

      ${missingNote}

      <div class="squad-section-block">
        <div class="squad-block-title">
          ✨ Active Buffs
          <span class="squad-decay-tag">Pets: 60% decay per duplicate</span>
          ${this.clanBuffEnabled ? `<span class="squad-clan-mode-tag">🏰 Clan Buff ON (Clan Easy / Hard / Crazy / Apocalypse)</span>` : ""}
        </div>
        <div class="squad-buffs-grid">${buffsHtml}</div>
      </div>

      <div class="squad-section-block">
        <div class="squad-block-title">📦 Squad Units Summary</div>
        <div class="squad-roster-list">${rosterHtml}</div>
      </div>
    `;
  },

  buildItemSelectOptions(selectedName, takenNames) {
    let html = `<option value="">— Empty Slot —</option>`;
    CATEGORIES.forEach(cat => {
      const catItems = ITEMS.filter(it => it.role === cat.id);
      if (catItems.length === 0) return;
      html += `<optgroup label="${cat.title}">`;
      catItems.forEach(it => {
        const disabled = takenNames.includes(it.name) && it.name !== selectedName ? "disabled" : "";
        const selected = it.name === selectedName ? "selected" : "";
        const suffix = it.role === "PET" && PET_BUFFS[it.name]
          ? ` (+${PET_BUFFS[it.name].value}% ${PET_BUFFS[it.name].label})`
          : (it.role !== "PET" && TOWER_PLACEMENT_LIMITS[it.name] ? ` (Limit ${TOWER_PLACEMENT_LIMITS[it.name]})` : "");
        html += `<option value="${escapeXml(it.name)}" ${selected} ${disabled}>${escapeXml(it.name)}${suffix}</option>`;
      });
      html += `</optgroup>`;
    });
    return html;
  },

  render() {
    const addBtn = document.getElementById("btnAddSquadPlayer");
    if (addBtn) {
      addBtn.textContent = `➕ Add Player (${this.players.length}/10)`;
      addBtn.disabled = this.players.length >= 10;
    }

    this.renderSummary();

    const listContainer = document.getElementById("squadPlayersContainer");
    if (!listContainer) return;
    listContainer.innerHTML = "";

    this.players.forEach((player, pIdx) => {
      const slotCount = player.vip ? 5 : 4;
      const takenNames = player.slots.slice(0, slotCount).filter(s => s && s.item).map(s => s.item);

      const card = document.createElement("div");
      card.className = "squad-player-card";

      const header = document.createElement("div");
      header.className = "squad-player-header";

      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.className = "squad-player-name";
      nameInput.value = player.name;
      nameInput.placeholder = `Player ${pIdx + 1}`;
      nameInput.oninput = () => {
        player.name = nameInput.value;
        this.save();
      };

      const controls = document.createElement("div");
      controls.className = "squad-player-controls";

      const vipBtn = document.createElement("button");
      vipBtn.type = "button";
      vipBtn.className = `status-toggle-btn squad-mini-btn ${player.vip ? "active" : "inactive"}`;
      vipBtn.textContent = player.vip ? "⭐ 5 Slots" : "⭐ 4 Slots";
      vipBtn.onclick = () => {
        player.vip = !player.vip;
        this.save();
        this.render();
      };
      controls.appendChild(vipBtn);

      if (this.players.length > 1) {
        const rmBtn = document.createElement("button");
        rmBtn.type = "button";
        rmBtn.className = "squad-remove-btn";
        rmBtn.title = "Remove Player";
        rmBtn.textContent = "✕";
        rmBtn.onclick = () => {
          this.players.splice(pIdx, 1);
          this.save();
          this.render();
        };
        controls.appendChild(rmBtn);
      }

      header.appendChild(nameInput);
      header.appendChild(controls);
      card.appendChild(header);

      const slotsWrap = document.createElement("div");
      slotsWrap.className = "squad-slots-list";

      for (let sIdx = 0; sIdx < slotCount; sIdx++) {
        const slot = player.slots[sIdx] || { item: null, lvl: 1 };
        const def = slot.item ? ITEMS.find(x => x.name === slot.item) : null;
        const rarityColor = def ? getAnsiHex(userColors[def.rarity] || DEFAULT_COLORS[def.rarity] || "37") : "#64748b";
        const isEvo = !!(def && def.canEvo && slot.lvl > def.max);

        const row = document.createElement("div");
        row.className = `squad-slot-row${isEvo ? " is-evo" : ""}`;

        const thumb = document.createElement("div");
        thumb.className = "squad-slot-thumb";
        thumb.title = "Click to pick Tower or Pet";
        thumb.onclick = () => this.openPicker(pIdx, sIdx);
        if (def) {
          thumb.style.borderColor = isEvo ? "#a855f7" : rarityColor;
          thumb.innerHTML = `<img src="${def.img}" alt="${escapeXml(def.name)}" onerror="this.style.display='none'">`;
        } else {
          thumb.innerHTML = `<span>+</span>`;
        }

        const pickerBtn = document.createElement("button");
        pickerBtn.type = "button";
        pickerBtn.className = "squad-slot-picker-btn";
        pickerBtn.onclick = () => this.openPicker(pIdx, sIdx);
        if (def) {
          pickerBtn.innerHTML = `<span style="color:${rarityColor};">${escapeXml(def.name)}</span><span class="picker-caret">▾</span>`;
        } else {
          pickerBtn.innerHTML = `<span>+ Select Tower / Pet...</span><span class="picker-caret">▾</span>`;
        }

        const lvlSel = document.createElement("select");
        lvlSel.className = "squad-slot-lvl";
        if (def) {
          for (let l = 1; l <= def.max; l++) {
            const opt = document.createElement("option");
            opt.value = l;
            opt.textContent = `Lvl ${l}${l === def.max ? " (MAX)" : ""}`;
            if (slot.lvl === l) opt.selected = true;
            lvlSel.appendChild(opt);
          }
          if (def.canEvo) {
            const evoOpt = document.createElement("option");
            evoOpt.value = def.max + 1;
            evoOpt.textContent = "⚡ EVO";
            if (slot.lvl > def.max) evoOpt.selected = true;
            lvlSel.appendChild(evoOpt);
          }
          lvlSel.onchange = () => {
            player.slots[sIdx].lvl = parseInt(lvlSel.value, 10) || 1;
            this.save();
            this.render();
          };
        } else {
          lvlSel.innerHTML = `<option>—</option>`;
          lvlSel.disabled = true;
        }

        const badge = document.createElement("div");
        badge.className = "squad-slot-meta";
        if (def) {
          if (def.role === "PET") {
            const buff = PET_BUFFS[def.name];
            if (buff) {
              const allStr = [buff, ...(buff.extraBuffs || [])]
                .map(pb => `${pb.icon}+${this.formatStatVal(this.getPetBuffValue(pb, slot.lvl), pb.unit || "%")}`)
                .join(" ");
              badge.innerHTML = `<span class="squad-meta-buff">${allStr}</span>`;
            } else {
              badge.innerHTML = `<span class="squad-meta-muted">PET</span>`;
            }
          } else {
            const stats = this.getTowerStatsForLevel(def, slot.lvl);
            badge.innerHTML = stats.hasStats
              ? `<span class="squad-meta-dps" title="${this.formatNum(stats.singleDps)} DPS × ${stats.limit} limit">×${stats.limit} • ${this.formatNum(stats.totalDps)}</span>`
              : `<span class="squad-meta-limit">×${stats.limit} limit</span>`;
          }
        } else {
          badge.innerHTML = `<span class="squad-meta-muted">Empty</span>`;
        }

        const removeSlotBtn = document.createElement("button");
        removeSlotBtn.type = "button";
        removeSlotBtn.className = "squad-slot-remove-btn";
        removeSlotBtn.title = "Remove equipped unit";
        removeSlotBtn.textContent = "✕";
        if (!def) {
          removeSlotBtn.disabled = true;
          removeSlotBtn.style.visibility = "hidden";
        } else {
          removeSlotBtn.onclick = () => {
            player.slots[sIdx] = { item: null, lvl: 1 };
            this.save();
            this.render();
          };
        }

        row.appendChild(thumb);
        row.appendChild(pickerBtn);
        row.appendChild(lvlSel);
        row.appendChild(badge);
        row.appendChild(removeSlotBtn);
        slotsWrap.appendChild(row);
      }

      card.appendChild(slotsWrap);
      listContainer.appendChild(card);
    });
  }
};
