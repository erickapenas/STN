const LoadoutsUI = {
  activeSubView: "squad",
  players: [],
  pickerState: {
    open: false,
    playerIdx: 0,
    slotIdx: 0,
    type: "towers", // "towers" | "pets"
    rarity: "all",
    query: ""
  },

  init() {
    this.players = StorageManager.loadSquadLoadouts();

    const subBtns = document.querySelectorAll(".loadouts-sub-btn");
    subBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        this.activeSubView = btn.dataset.loadoutView;
        subBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const squadPanel = document.getElementById("squadLoadoutsPanel");
        const cbPanel = document.getElementById("clanBattlePanel");
        if (squadPanel) squadPanel.classList.toggle("active", this.activeSubView === "squad");
        if (cbPanel) cbPanel.classList.toggle("active", this.activeSubView === "clanbattle");

        if (this.activeSubView === "clanbattle" && typeof ClanBattleUI !== "undefined") {
          ClanBattleUI.updateUI();
        }
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
    this.render();
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
        document.querySelectorAll(".picker-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
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
    this.pickerState.type = currentDef && currentDef.role === "PET" ? "pets" : "towers";
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
      btn.textContent = c.label;
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

    const { playerIdx, slotIdx, type, rarity, query } = this.pickerState;
    const player = this.players[playerIdx];
    const slotCount = player.vip ? 5 : 4;
    const currentItemName = (player.slots[slotIdx] && player.slots[slotIdx].item) || null;
    const takenNames = player.slots
      .slice(0, slotCount)
      .filter((s, idx) => idx !== slotIdx && s && s.item)
      .map(s => s.item);

    const pool = ITEMS.filter(it => (type === "pets" ? it.role === "PET" : it.role !== "PET"));
    const filtered = pool.filter(it => {
      if (rarity !== "all" && it.rarity !== rarity) return false;
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
          subText = `${PET_BUFFS[it.name].icon} +${PET_BUFFS[it.name].value}% ${PET_BUFFS[it.name].label}`;
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

  save() {
    StorageManager.saveSquadLoadouts(this.players);
  },

  parseNum(v) {
    return parseFloat(String(v).replace(/[^0-9.]/g, "")) || 0;
  },

  formatNum(n) {
    if (!isFinite(n) || n <= 0) return "0";
    if (n >= 1000) return Math.round(n).toLocaleString();
    return Number.isInteger(n) ? n.toLocaleString() : Number(n.toFixed(1)).toLocaleString();
  },

  formatPct(n) {
    return Number.isInteger(n) ? `${n}%` : `${Number(n.toFixed(2))}%`;
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
            if (!buffEntriesByStat[buff.stat]) buffEntriesByStat[buff.stat] = [];
            buffEntriesByStat[buff.stat].push({
              petName: def.name,
              label: buff.label,
              icon: buff.icon,
              base: buff.value
            });
          }
        } else {
          totalTowers += 1;
          const stats = this.getTowerStatsForLevel(def, s.lvl);
          totalPlacements += stats.limit;
          unitCounts[def.name].placements += stats.limit;
          if (stats.hasStats) {
            baseSquadDps += stats.totalDps;
            baseBossDps += stats.totalDps * stats.bossMult;
          } else if (def.role === "DAMAGE") {
            towersMissingStats += 1;
          }
        }
      }
    });

    // Apply geometric diminishing returns: base * (0.6 ^ index) per stat
    const factor = (typeof BUFF_DIMINISHING_FACTOR !== "undefined") ? BUFF_DIMINISHING_FACTOR : 0.6;
    const buffsSummary = {};
    Object.keys(buffEntriesByStat).forEach(stat => {
      const list = buffEntriesByStat[stat].sort((a, b) => b.base - a.base);
      let total = 0;
      const steps = [];
      list.forEach((entry, idx) => {
        const mult = Math.pow(factor, idx);
        const eff = entry.base * mult;
        total += eff;
        steps.push({
          petName: entry.petName,
          eff,
          pctOfBase: Math.round(mult * 1000) / 10
        });
      });
      buffsSummary[stat] = {
        stat,
        label: list[0].label,
        icon: list[0].icon,
        count: list.length,
        total,
        steps
      };
    });

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
    const box = document.getElementById("squadSummaryContainer");
    if (!box) return;

    const totals = this.computeSquadTotals();
    const buffList = Object.values(totals.buffsSummary);

    const buffsHtml = buffList.length > 0
      ? buffList.map(b => {
          const breakdown = b.steps.map(st => `${this.formatPct(st.eff)}`).join(" + ");
          return `
            <div class="squad-buff-card">
              <div class="squad-buff-top">
                <span class="squad-buff-title">${b.icon} ${escapeXml(b.label)}</span>
                <span class="squad-buff-total">+${this.formatPct(b.total)}</span>
              </div>
              <div class="squad-buff-breakdown">${b.count} pet${b.count > 1 ? "s" : ""}: ${breakdown}</div>
            </div>
          `;
        }).join("")
      : `<div class="squad-empty-note">Add pets to players below to calculate stacked buffs (100% → 60% → 36%...).</div>`;

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
        <div class="squad-block-title">✨ Active Pet Buffs <span class="squad-decay-tag">60% diminishing returns per duplicate</span></div>
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
            badge.innerHTML = buff
              ? `<span class="squad-meta-buff">${buff.icon} +${buff.value}%</span>`
              : `<span class="squad-meta-muted">PET</span>`;
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
