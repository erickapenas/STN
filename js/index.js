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

        const card = document.createElement("div");
        card.className = `index-card${isEvo ? ' is-evo' : ''}${isPlayable && isOwned ? ' is-owned' : ''}`;
        card.style.setProperty("--rarity-color", isEvo ? "#a855f7" : tierColor);

        const thumbHtml = item.img
          ? `<div class="index-thumb"><img src="${item.img}" alt="${escapeXml(item.name)}" onerror="this.style.display='none'"></div>`
          : `<div class="index-thumb index-thumb-emoji"><span>${item.icon || "❓"}</span></div>`;

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
