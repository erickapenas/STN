const IndexUI = {
  activeCategory: "turrets",
  searchQuery: "",

  init() {
    const subBtns = document.querySelectorAll(".index-sub-btn");
    subBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        this.activeCategory = btn.dataset.indexCat;
        subBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.render();
      });
    });

    const searchInput = document.getElementById("indexSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        this.searchQuery = searchInput.value.trim().toLowerCase();
        this.render();
      });
    }

    const modal = document.getElementById("indexDetailModal");
    const closeBtn = document.getElementById("indexModalCloseBtn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeModal());
    }
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) this.closeModal();
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeModal();
    });

    this.render();
  },

  getItemsForCategory() {
    if (this.activeCategory === "turrets") {
      return ITEMS.filter(it => it.role !== "PET");
    }
    if (this.activeCategory === "pets") {
      return ITEMS.filter(it => it.role === "PET");
    }
    if (this.activeCategory === "zombies") {
      return INDEX_ZOMBIES;
    }
    if (this.activeCategory === "bosses") {
      return INDEX_BOSSES;
    }
    return [];
  },

  openModal(item, tier, tierColor, invEntry) {
    const modal = document.getElementById("indexDetailModal");
    const body = document.getElementById("indexModalBody");
    if (!modal || !body) return;

    const details = (typeof INDEX_DETAILS !== "undefined") ? INDEX_DETAILS[item.name] : null;
    const isOwned = !!(invEntry && invEntry.owned);
    const isEvo = !!(isOwned && item.canEvo && invEntry.lvl > item.max);

    const artHtml = item.img
      ? `<div class="detail-art-box" style="border-color:${isEvo ? '#a855f7' : tierColor};"><img src="${item.img}" alt="${escapeXml(item.name)}"></div>`
      : `<div class="detail-art-box detail-art-emoji" style="border-color:${tierColor};"><span>${item.icon || "❓"}</span></div>`;

    const tags = details && details.tags
      ? details.tags
      : [
          tier.key.toUpperCase(),
          ...(item.role ? [item.role] : []),
          ...(item.canEvo ? ["EVOLUTION"] : [])
        ];

    const tagsHtml = tags.map(t => {
      const upper = t.toUpperCase();
      let cls = "detail-tag";
      if (upper === "EVOLUTION") cls += " detail-tag-evo";
      else if (upper === tier.key.toUpperCase()) cls += " detail-tag-rarity";
      return `<span class="${cls}" ${upper === tier.key.toUpperCase() ? `style="border-color:${tierColor}; color:${tierColor};"` : ""}>${escapeXml(upper)}</span>`;
    }).join("");

    let summaryStatsHtml = "";
    if (details && details.summaryStats) {
      summaryStatsHtml = `
        <div class="detail-summary-stats">
          ${details.summaryStats.map(s => `
            <div class="detail-summary-row">
              <span class="detail-summary-label">${escapeXml(s.label)}</span>
              <span class="detail-summary-val">${escapeXml(s.value)}</span>
            </div>
          `).join("")}
        </div>
        <div class="detail-summary-sub">LEVEL 1 → MAX LEVEL</div>
      `;
    } else {
      summaryStatsHtml = `
        <div class="detail-summary-stats">
          ${item.role ? `<div class="detail-summary-row"><span class="detail-summary-label">ROLE</span><span class="detail-summary-val">${escapeXml(item.role)}</span></div>` : ""}
          ${item.max ? `<div class="detail-summary-row"><span class="detail-summary-label">MAX LEVEL</span><span class="detail-summary-val">${item.max}${item.canEvo ? " (+ EVO)" : ""}</span></div>` : ""}
          ${item.trait ? `<div class="detail-summary-row"><span class="detail-summary-label">TRAIT</span><span class="detail-summary-val">${escapeXml(item.trait)}</span></div>` : ""}
        </div>
      `;
    }

    let sectionsHtml = "";

    if (details) {
      // Total Unlock Coins, Cash & DPS calculation from levels
      const levels = details.levels || [];
      const totalUnlockCoins = levels.reduce((sum, r) => sum + (r.unlockCoins || 0), 0);
      const totalMatchCash = levels.reduce((sum, r) => sum + (r.cashCost || 0), 0);

      const parseNum = (v) => parseFloat(String(v).replace(/[^0-9.]/g, "")) || 0;
      const formatDps = (n) => {
        if (!isFinite(n) || n <= 0) return "-";
        return Number.isInteger(n)
          ? n.toLocaleString()
          : Number(n.toFixed(1)).toLocaleString();
      };
      const bossMult = details.bossMultiplier || 1;
      const hasBossBonus = bossMult > 1;

      const levelsWithDps = levels.map(lv => {
        const dmg = parseNum(lv.damage);
        const rel = parseNum(lv.reload);
        const dps = rel > 0 ? dmg / rel : 0;
        const bossDps = dps * bossMult;
        return { ...lv, dps, bossDps };
      });

      const firstLv = levelsWithDps[0];
      const maxLv = levelsWithDps[levelsWithDps.length - 1];

      // Bullets
      if (details.bullets && details.bullets.length > 0) {
        sectionsHtml += `
          <ul class="detail-bullets">
            ${details.bullets.map(b => `<li>${b}</li>`).join("")}
          </ul>
        `;
      }

      // Key Numbers (injecting TOTAL DPS, TOTAL DPS (BOSS), and COINS TO MAX IT)
      const keyNumbersList = [...(details.keyNumbers || [])];
      if (maxLv && maxLv.dps > 0) {
        const dpsRows = [
          {
            label: "TOTAL DPS",
            value: `<strong>${formatDps(maxLv.dps)} DPS</strong> at Max Level <span style="color:#94a3b8;">(${formatDps(firstLv.dps)} → ${formatDps(maxLv.dps)})</span>`,
            highlight: true
          }
        ];
        if (hasBossBonus) {
          const pct = Math.round((bossMult - 1) * 100);
          dpsRows.push({
            label: "TOTAL DPS (BOSS)",
            value: `<strong>${formatDps(maxLv.bossDps)} DPS</strong> at Max Level (+${pct}%) <span style="color:#94a3b8;">(${formatDps(firstLv.bossDps)} → ${formatDps(maxLv.bossDps)})</span>`,
            highlight: true
          });
        }
        keyNumbersList.unshift(...dpsRows);
      }

      if (totalUnlockCoins > 0) {
        const cashIdx = keyNumbersList.findIndex(k => k.label.toUpperCase().includes("CASH TO MAX"));
        const coinsRow = {
          label: "COINS TO MAX IT (UNLOCK)",
          value: `<strong>${totalUnlockCoins.toLocaleString()} Coins</strong> in the lobby (all <strong>${levels.length} levels</strong>)`,
          highlight: true
        };
        if (cashIdx >= 0) {
          keyNumbersList.splice(cashIdx + 1, 0, coinsRow);
        } else {
          keyNumbersList.push(coinsRow);
        }
      }

      if (keyNumbersList.length > 0) {
        sectionsHtml += `
          <div class="detail-section">
            <div class="detail-section-title">KEY NUMBERS</div>
            <div class="detail-kv-list">
              ${keyNumbersList.map(k => `
                <div class="detail-kv-row${k.highlight ? " detail-kv-highlight" : ""}">
                  <span class="detail-kv-label">${escapeXml(k.label)}</span>
                  <span class="detail-kv-val">${k.value}</span>
                </div>
              `).join("")}
            </div>
          </div>
        `;
      }

      // Evolution box
      if (details.evolution) {
        sectionsHtml += `
          <div class="detail-evo-box">
            <div class="detail-evo-eyebrow">⚡ EVOLUTION</div>
            <div class="detail-evo-name">${escapeXml(details.evolution.name)}</div>
            <div class="detail-evo-desc">${escapeXml(details.evolution.description)}</div>
            <div class="detail-evo-quest">${escapeXml(details.evolution.quest)}</div>
          </div>
        `;
      }

      // Every Level Table
      if (levelsWithDps.length > 0) {
        const showDpsCols = levelsWithDps.some(lv => lv.dps > 0);
        const totalColSpan = 3 + (showDpsCols ? 1 : 0) + (showDpsCols && hasBossBonus ? 1 : 0);

        sectionsHtml += `
          <div class="detail-section">
            <div class="detail-section-head">
              <div class="detail-section-title">EVERY LEVEL</div>
              <div class="detail-section-note">UNLOCK = COINS IN THE LOBBY</div>
            </div>
            <div class="detail-table-wrap">
              <table class="detail-table">
                <thead>
                  <tr>
                    <th>LVL</th>
                    <th>CASH COST</th>
                    <th>DAMAGE</th>
                    <th>RELOAD</th>
                    ${showDpsCols ? "<th>TOTAL DPS</th>" : ""}
                    ${showDpsCols && hasBossBonus ? "<th>BOSS DPS</th>" : ""}
                    <th>RANGE</th>
                    <th>UNLOCK</th>
                  </tr>
                </thead>
                <tbody>
                  ${levelsWithDps.map(lv => `
                    <tr>
                      <td class="col-lvl">${lv.level}</td>
                      <td>$${lv.cashCost.toLocaleString()}</td>
                      <td>${escapeXml(lv.damage)}</td>
                      <td>${escapeXml(lv.reload)}</td>
                      ${showDpsCols ? `<td style="color:#60a5fa;">${formatDps(lv.dps)}</td>` : ""}
                      ${showDpsCols && hasBossBonus ? `<td style="color:#fbbf24;">${formatDps(lv.bossDps)}</td>` : ""}
                      <td>${escapeXml(lv.range)}</td>
                      <td class="col-unlock">${lv.unlockCoins === 0 ? "FREE" : lv.unlockCoins.toLocaleString()}</td>
                    </tr>
                  `).join("")}
                </tbody>
                <tfoot>
                  <tr class="detail-table-total">
                    <td>TOTAL</td>
                    <td>$${totalMatchCash.toLocaleString()}</td>
                    <td colspan="${totalColSpan}">Coins to Max (Lobby Unlock)</td>
                    <td class="col-unlock-total">${totalUnlockCoins.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        `;
      }

      // Where to get it
      if (details.whereToGet && details.whereToGet.length > 0) {
        sectionsHtml += `
          <div class="detail-section">
            <div class="detail-section-title">WHERE TO GET IT</div>
            <div class="detail-kv-list">
              ${details.whereToGet.map(w => `
                <div class="detail-kv-row">
                  <span class="detail-kv-label">${escapeXml(w.source)}</span>
                  <span class="detail-kv-val">${w.chance}</span>
                </div>
              `).join("")}
            </div>
          </div>
        `;
      }
    } else {
      sectionsHtml += `
        <div class="detail-coming-soon">
          📊 Full level breakdown &amp; unlock coin stats for <strong>${escapeXml(item.name)}</strong> haven't been added yet.
        </div>
      `;
    }

    body.innerHTML = `
      <div class="detail-hero">
        ${artHtml}
        <div class="detail-hero-info">
          <h2 class="detail-title" style="color:${tierColor};">${escapeXml(item.name)}</h2>
          <div class="detail-tags">${tagsHtml}</div>
          ${summaryStatsHtml}
        </div>
      </div>
      ${sectionsHtml}
    `;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  },

  closeModal() {
    const modal = document.getElementById("indexDetailModal");
    if (modal && modal.classList.contains("open")) {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
  },

  render() {
    const container = document.getElementById("indexContainer");
    const countBadge = document.getElementById("indexCountBadge");
    if (!container) return;

    container.innerHTML = "";
    const inv = StorageManager.loadInventory();
    const rawItems = this.getItemsForCategory();
    const filtered = this.searchQuery
      ? rawItems.filter(it =>
          it.name.toLowerCase().includes(this.searchQuery) ||
          (it.role && it.role.toLowerCase().includes(this.searchQuery)) ||
          (it.trait && it.trait.toLowerCase().includes(this.searchQuery))
        )
      : rawItems;

    if (countBadge) {
      if (this.activeCategory === "turrets" || this.activeCategory === "pets") {
        const ownedCount = filtered.filter(it => inv[it.name] && inv[it.name].owned).length;
        countBadge.textContent = `${filtered.length} Total • ${ownedCount} Owned`;
      } else {
        countBadge.textContent = `${filtered.length} Entries`;
      }
    }

    let renderedAny = false;

    // Strict order: Exclusive > Divine > Legendary > Mythic > Epic > Rare > Common
    RARITY_TIERS.forEach(tier => {
      const tierItems = filtered.filter(it => it.rarity === tier.key);
      if (tierItems.length === 0) return;
      renderedAny = true;

      const block = document.createElement("div");
      block.className = "inventory-category-block";

      const tierColor = getAnsiHex(userColors[tier.key] || DEFAULT_COLORS[tier.key] || "37");
      const title = document.createElement("div");
      title.className = "inv-cat-title";
      title.style.color = tierColor;
      title.innerHTML = `<span>💎</span> <span>${tier.label}</span> <span class="index-tier-count">(${tierItems.length})</span>`;
      block.appendChild(title);

      const grid = document.createElement("div");
      grid.className = "index-grid";

      tierItems.forEach(item => {
        const isPlayable = this.activeCategory === "turrets" || this.activeCategory === "pets";
        const invEntry = isPlayable ? inv[item.name] : null;
        const isOwned = !!(invEntry && invEntry.owned);
        const isEvo = !!(isOwned && item.canEvo && invEntry.lvl > item.max);
        const hasDetails = (typeof INDEX_DETAILS !== "undefined") && !!INDEX_DETAILS[item.name];

        const card = document.createElement("div");
        card.className = `index-card${isEvo ? ' is-evo' : ''}${isPlayable && isOwned ? ' is-owned' : ''}${hasDetails ? ' has-details' : ''}`;
        card.style.setProperty("--rarity-color", isEvo ? "#a855f7" : tierColor);
        card.style.cursor = "pointer";
        card.onclick = () => this.openModal(item, tier, tierColor, invEntry);

        const thumbHtml = item.img
          ? `<div class="index-thumb"><img src="${item.img}" alt="${escapeXml(item.name)}" onerror="this.style.display='none'"></div>`
          : `<div class="index-thumb index-thumb-emoji"><span>${item.icon || "❓"}</span></div>`;

        const infoBadgeHtml = hasDetails
          ? `<span class="index-info-dot" title="Click for full stats">📊</span>`
          : "";

        let metaHtml = "";
        if (isPlayable) {
          const roleColor = getAnsiHex(userColors[item.role] || "37");
          const evoPill = item.canEvo
            ? `<span class="index-pill index-pill-evo">⚡ EVO</span>`
            : "";
          const statusPill = isEvo
            ? `<span class="index-pill index-pill-owned-evo">EVOLVED</span>`
            : isOwned
            ? `<span class="index-pill index-pill-owned">Lvl ${invEntry.lvl}/${item.max}</span>`
            : `<span class="index-pill index-pill-locked">Max Lvl ${item.max}</span>`;

          metaHtml = `
            <div class="index-meta-row">
              <span class="index-role-tag" style="color:${roleColor};">[${item.role}]</span>
              ${evoPill}
            </div>
            <div class="index-status-row">${statusPill}</div>
          `;
        } else {
          metaHtml = `
            <div class="index-trait">${escapeXml(item.trait || tier.label)}</div>
          `;
        }

        card.innerHTML = `
          ${infoBadgeHtml}
          ${thumbHtml}
          <div class="index-card-name" style="color:${tierColor};">${escapeXml(item.name)}</div>
          ${metaHtml}
        `;
        grid.appendChild(card);
      });

      block.appendChild(grid);
      container.appendChild(block);
    });

    if (!renderedAny) {
      container.innerHTML = `<div class="index-empty">No entries found matching "${escapeXml(this.searchQuery)}".</div>`;
    }
  }
};
