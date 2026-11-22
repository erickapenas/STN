const InventoryUI = {
  inv: {},
  nitro: false,
  includeRoleTags: true,
  showUnowned: false,
  sortMode: "rarity",
  imgTimer: null,

  init() {
    this.inv = StorageManager.loadInventory();
    this.nitro = StorageManager.loadNitro();
    this.includeRoleTags = StorageManager.loadIncludeRoleTags();
    this.showUnowned = StorageManager.loadShowUnownedInImage();
    this.sortMode = StorageManager.loadInvSortMode();

    const headlines = StorageManager.loadHeadlines();
    const invHeadlineInput = document.getElementById("invHeadline");
    const invBannerInput = document.getElementById("invBanner");
    const invSortSelect = document.getElementById("invSortSelect");

    invHeadlineInput.value = headlines.inv;
    invBannerInput.value = headlines.invBanner || "";
    invSortSelect.value = this.sortMode;

    invHeadlineInput.oninput = () => {
      StorageManager.saveHeadlines(undefined, invHeadlineInput.value, undefined, invBannerInput.value);
      this.updateUI();
    };

    invBannerInput.oninput = () => {
      StorageManager.saveHeadlines(undefined, invHeadlineInput.value, undefined, invBannerInput.value);
      this.updateUI();
    };

    invSortSelect.onchange = () => {
      this.sortMode = invSortSelect.value;
      StorageManager.saveInvSortMode(this.sortMode);
      this.renderItems();
      this.updateUI();
    };

    this.updateNitroButton();
    this.updateRoleTagButtons();
    this.updateUnownedButton();
    this.bindTools();

    document.getElementById("invNitroBtn").onclick = () => {
      this.nitro = !this.nitro;
      StorageManager.saveNitro(this.nitro);
      this.updateNitroButton();
      this.updateUI();
    };

    const toggleTags = () => {
      this.includeRoleTags = !this.includeRoleTags;
      StorageManager.saveIncludeRoleTags(this.includeRoleTags);
      this.updateRoleTagButtons();
      this.updateUI();
      if (typeof ClanBattleUI !== 'undefined') ClanBattleUI.updateUI();
    };

    document.getElementById("invRoleTagBtnTop").onclick = toggleTags;
    document.getElementById("invRoleTagBtnBottom").onclick = toggleTags;

    document.getElementById("btnInvToggleUnowned").onclick = () => {
      this.showUnowned = !this.showUnowned;
      StorageManager.saveShowUnownedInImage(this.showUnowned);
      this.updateUnownedButton();
      this.renderItems();
      this.renderImagePreview();
    };

    document.getElementById("invCopyImgBtn").onclick = () => this.copyImage();
    document.getElementById("invDownloadImgBtn").onclick = () => this.downloadImage();

    this.renderItems();
    this.updateUI();
  },

  updateNitroButton() {
    const btn = document.getElementById("invNitroBtn");
    btn.className = `status-toggle-btn ${this.nitro ? 'active' : 'inactive'}`;
    btn.textContent = this.nitro ? "🚀 Discord Nitro: ON (4000)" : "🚀 Discord Nitro: OFF (2000)";
  },

  updateRoleTagButtons() {
    const text = this.includeRoleTags ? "🏷️ Role Tags: ON" : "🏷️ Role Tags: OFF";
    const cls = `status-toggle-btn ${this.includeRoleTags ? 'active' : 'inactive'}`;

    const bTop = document.getElementById("invRoleTagBtnTop");
    const bBot = document.getElementById("invRoleTagBtnBottom");
    if (bTop) { bTop.textContent = text; bTop.className = cls; }
    if (bBot) { bBot.textContent = text; bBot.className = cls; }
  },

  updateUnownedButton() {
    const btn = document.getElementById("btnInvToggleUnowned");
    if (btn) {
      btn.className = `status-toggle-btn ${this.showUnowned ? 'active' : 'inactive'}`;
      btn.textContent = this.showUnowned ? "👁️ Show Unowned: ON" : "👁️ Show Unowned: OFF";
    }
  },

  bindTools() {
    document.getElementById("btnInvSelectAll").onclick = () => {
      ITEMS.forEach(it => { this.inv[it.name].owned = true; });
      this.renderItems();
      this.updateUI();
      if (typeof IndexUI !== 'undefined') IndexUI.render();
    };
    document.getElementById("btnInvDeselectAll").onclick = () => {
      ITEMS.forEach(it => { this.inv[it.name].owned = false; });
      this.renderItems();
      this.updateUI();
      if (typeof IndexUI !== 'undefined') IndexUI.render();
    };
    document.getElementById("btnInvMaxAll").onclick = () => {
      ITEMS.forEach(it => {
        this.inv[it.name].owned = true;
        this.inv[it.name].lvl = it.max;
      });
      this.renderItems();
      this.updateUI();
      if (typeof IndexUI !== 'undefined') IndexUI.render();
    };
  },

  renderItems() {
    const container = document.getElementById("inventoryContainer");
    container.innerHTML = "";

    const renderCard = (it) => {
      const itemState = this.inv[it.name];
      const isEvoState = () => !!(itemState.owned && it.canEvo && itemState.lvl > it.max);
      const rarityHex = getAnsiHex(userColors[it.rarity] || DEFAULT_COLORS[it.rarity] || "37");
      const roleHex = getAnsiHex(userColors[it.role] || DEFAULT_COLORS[it.role] || "37");

      const card = document.createElement("div");
      const syncCardClasses = () => {
        const evo = isEvoState();
        card.className = `inv-card ${itemState.owned ? 'owned' : 'not-owned'}${evo ? ' evo' : ''}`;
        card.style.setProperty("--rarity-color", evo ? "#a855f7" : rarityHex);
        chkBox.className = `inv-card-check ${itemState.owned ? 'checked' : 'unchecked'}`;
        chkBox.textContent = itemState.owned ? "✓" : "✕";
      };

      const chkBox = document.createElement("button");
      chkBox.type = "button";
      chkBox.title = "Toggle Owned";

      const toggleOwned = () => {
        itemState.owned = !itemState.owned;
        syncCardClasses();
        if (!this.showUnowned && !itemState.owned) {
          this.renderItems();
        }
        this.updateUI();
        if (typeof IndexUI !== 'undefined') IndexUI.render();
      };

      chkBox.onclick = (e) => {
        e.stopPropagation();
        toggleOwned();
      };

      const topRow = document.createElement("div");
      topRow.className = "inv-card-top";
      topRow.innerHTML = `<span class="index-role-tag" style="color:${roleHex};">[${it.role}]</span>`;
      topRow.appendChild(chkBox);

      const thumb = document.createElement("div");
      thumb.className = "index-thumb inv-card-thumb";
      thumb.innerHTML = `<img src="${it.img}" alt="${it.name}" onerror="this.style.display='none'">`;

      const nameSpan = document.createElement("div");
      nameSpan.className = "index-card-name inv-name";
      nameSpan.style.color = rarityHex;
      nameSpan.textContent = it.name;

      const sel = document.createElement("select");
      sel.className = "inv-card-lvl";
      for (let l = 1; l <= it.max; l++) {
        const opt = document.createElement("option");
        opt.value = l;
        opt.textContent = `Lvl ${l}/${it.max}${l === it.max ? ' (MAX)' : ''}`;
        if (itemState.lvl === l) opt.selected = true;
        sel.appendChild(opt);
      }
      if (it.canEvo) {
        const evoOpt = document.createElement("option");
        evoOpt.value = it.max + 1;
        evoOpt.textContent = "⚡ EVO";
        if (itemState.lvl > it.max) evoOpt.selected = true;
        sel.appendChild(evoOpt);
      }
      sel.onclick = (e) => e.stopPropagation();
      sel.onchange = () => {
        itemState.lvl = parseInt(sel.value, 10);
        if (!itemState.owned) itemState.owned = true;
        syncCardClasses();
        this.updateUI();
        if (typeof IndexUI !== 'undefined') IndexUI.render();
      };

      card.onclick = toggleOwned;
      card.appendChild(topRow);
      card.appendChild(thumb);
      card.appendChild(nameSpan);
      card.appendChild(sel);
      syncCardClasses();
      return card;
    };

    let renderedAny = false;

    if (this.sortMode === "rarity") {
      RARITY_TIERS.forEach(tier => {
        const itemsInTier = ITEMS.filter(it => it.rarity === tier.key && (this.showUnowned || (this.inv[it.name] && this.inv[it.name].owned)));
        if (itemsInTier.length === 0) return;
        renderedAny = true;

        const block = document.createElement("div");
        block.className = "inventory-category-block";

        const title = document.createElement("div");
        title.className = "inv-cat-title";
        title.style.color = tier.color;
        title.innerHTML = `<span>💎</span> <span>${tier.label}</span>`;
        block.appendChild(title);

        const grid = document.createElement("div");
        grid.className = "inventory-grid";

        itemsInTier.forEach(it => grid.appendChild(renderCard(it)));
        block.appendChild(grid);
        container.appendChild(block);
      });
    } else {
      CATEGORIES.forEach(cat => {
        const itemsInCat = ITEMS.filter(it => it.role === cat.id && (this.showUnowned || (this.inv[it.name] && this.inv[it.name].owned)));
        if (itemsInCat.length === 0) return;
        renderedAny = true;

        const block = document.createElement("div");
        block.className = "inventory-category-block";

        const title = document.createElement("div");
        title.className = "inv-cat-title";
        title.style.color = "#5865f2";
        title.innerHTML = `<span>${cat.title}</span>`;
        block.appendChild(title);

        const grid = document.createElement("div");
        grid.className = "inventory-grid";

        itemsInCat.forEach(it => grid.appendChild(renderCard(it)));
        block.appendChild(grid);
        container.appendChild(block);
      });
    }

    if (!renderedAny) {
      container.innerHTML = `<div class="index-empty">No owned units selected. Turn <strong>Show Unowned: ON</strong> to select your units.</div>`;
    }
  },

  updateUI() {
    StorageManager.saveInventory(this.inv);

    const headline = document.getElementById("invHeadline").value;
    const bannerSubtitle = document.getElementById("invBanner").value;
    const maxChars = this.nitro ? 4000 : 2000;
    const bannerTitle = bannerSubtitle && bannerSubtitle.trim() ? bannerSubtitle.trim() : "=== INVENTORY ===";
    const parts = chunkInventoryMessages(headline, bannerTitle, "", this.inv, userColors, this.includeRoleTags, maxChars, this.sortMode);

    const previewContainer = document.getElementById("invPreviewContainer");
    previewContainer.innerHTML = "";

    const charBadge = document.getElementById("invCharBadge");
    charBadge.className = "char-badge char-ok";
    charBadge.textContent = parts.length === 1 ? `1 Discord Message (${parts[0].charCount} chars)` : `${parts.length} Discord Messages generated`;

    const actionsContainer = document.getElementById("invActionButtons");
    actionsContainer.innerHTML = "";
    actionsContainer.style.display = "flex";
    actionsContainer.style.gap = "10px";
    actionsContainer.style.flexWrap = "wrap";

    parts.forEach((p, idx) => {
      const partCard = document.createElement("div");
      partCard.className = "part-card";

      const hl = document.createElement("div");
      hl.className = "preview-headline";
      hl.textContent = p.headlineHtml;

      const pre = document.createElement("pre");
      pre.className = "preview-box";
      pre.innerHTML = p.html;

      const sub = document.createElement("div");
      sub.className = "preview-subtext";
      sub.innerHTML = PROMO_FOOTER_HTML;

      partCard.appendChild(hl);
      partCard.appendChild(pre);
      partCard.appendChild(sub);
      previewContainer.appendChild(partCard);

      const btn = document.createElement("button");
      btn.className = "btn";
      btn.textContent = parts.length > 1 ? `📋 Copy Part ${idx + 1}/${parts.length}` : "📋 Copy Inventory for Discord";
      btn.onclick = async () => {
        await navigator.clipboard.writeText(p.raw);
        const orig = btn.textContent;
        btn.textContent = `✅ Part ${idx + 1} Copied!`;
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = orig;
          btn.classList.remove("copied");
        }, 2000);
      };
      actionsContainer.appendChild(btn);
    });

    this.renderImagePreview();
  },

  renderImagePreview() {
    clearTimeout(this.imgTimer);
    this.imgTimer = setTimeout(async () => {
      const headline = document.getElementById("invHeadline").value;
      const bannerSubtitle = document.getElementById("invBanner").value;
      const imgBox = document.getElementById("invImagePreviewBox");
      if (!imgBox) return;

      try {
        const canvas = await CanvasManager.captureInventoryCanvas(headline, bannerSubtitle, userIgn, this.inv, userColors, this.showUnowned, this.sortMode, this.includeRoleTags);
        imgBox.innerHTML = `<img src="${canvas.toDataURL('image/png')}" alt="Inventory Image Preview" style="user-select:none; pointer-events:none; max-width:100%;">`;
      } catch {
        imgBox.innerHTML = `<div style="padding:15px; color:#ef4444;">Could not generate inventory image preview.</div>`;
      }
    }, 280);
  },

  async copyImage() {
    const headline = document.getElementById("invHeadline").value;
    const bannerSubtitle = document.getElementById("invBanner").value;
    const btn = document.getElementById("invCopyImgBtn");

    try {
      const canvas = await CanvasManager.captureInventoryCanvas(headline, bannerSubtitle, userIgn, this.inv, userColors, this.showUnowned, this.sortMode, this.includeRoleTags);
      canvas.toBlob(blob => {
        if (!blob) {
          CanvasManager.downloadCanvas(canvas, `inventory_${Date.now()}.png`);
          return;
        }
        navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).then(() => {
          const orig = btn.textContent;
          btn.textContent = "✅ Inventory Image Copied!";
          btn.classList.add("copied");
          setTimeout(() => {
            btn.textContent = orig;
            btn.classList.remove("copied");
          }, 2000);
        }).catch(() => CanvasManager.downloadCanvas(canvas, `inventory_${Date.now()}.png`));
      }, "image/png");
    } catch {
      alert("Error generating image.");
    }
  },

  async downloadImage() {
    const headline = document.getElementById("invHeadline").value;
    const bannerSubtitle = document.getElementById("invBanner").value;
    try {
      const canvas = await CanvasManager.captureInventoryCanvas(headline, bannerSubtitle, userIgn, this.inv, userColors, this.showUnowned, this.sortMode, this.includeRoleTags);
      CanvasManager.downloadCanvas(canvas, `inventory_${Date.now()}.png`);
    } catch {
      alert("Error downloading image.");
    }
  }
};