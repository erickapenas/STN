const CanvasManager = {
  buildTeamImageDom(headline, ign, loadouts, count, colors, includeRoleTag) {
    const bannerColor = getAnsiHex(colors.BANNER || "36");
    const ignColor = getAnsiHex(colors.IGN || "32");

    let totalSelectedSlots = 0;
    loadouts.forEach(ld => {
      totalSelectedSlots += ld.slots.slice(0, count).filter(s => s && s.item).length;
    });

    let loadoutCardsHtml = '';

    loadouts.forEach((ld, idx) => {
      const hasUnits = ld.slots.slice(0, count).some(s => s && s.item);
      if (idx > 0 && !hasUnits) return;

      let activeSlots = [];
      for (let i = 0; i < count; i++) {
        const slot = ld.slots[i];
        if (slot && slot.item) {
          const def = ITEMS.find(x => x.name === slot.item);
          if (def) activeSlots.push({ slot, def });
        }
      }

      const bannerText = ld.banner && ld.banner.trim() ? ld.banner.trim() : (idx === 0 ? "=== MY FIRST SETUP ===" : idx === 1 ? "=== MY SECOND SETUP ===" : "=== MY THIRD SETUP ===");
      const subText = ld.subtitle && ld.subtitle.trim() ? ld.subtitle.trim() : "";

      let itemsGridHtml = '';
      if (activeSlots.length === 0) {
        itemsGridHtml = `<div style="color:#72767d; font-style:italic; padding:18px 0; font-family:'Consolas', monospace;">(No units selected)</div>`;
      } else {
        let cardsList = '';
        activeSlots.forEach(({ slot, def }) => {
          const roleColor = getAnsiHex(colors[slot.role || def.role] || "37");
          const itemColor = getAnsiHex(colors[def.rarity] || "37");
          const isMax = slot.lvl >= def.max;
          const roleHtml = includeRoleTag ? `<div style="font-size:0.68rem; font-weight:800; color:${roleColor}; text-align:center; margin-bottom:4px; font-family:'Consolas', monospace;">[${slot.role || def.role}]</div>` : '';

          let badgeHtml = isMax
            ? `<div style="background:#15803d; color:#ffffff; font-weight:900; font-size:0.75rem; padding:3px 6px; border-radius:6px; text-align:center; font-family:'Consolas', monospace; box-shadow:0 0 8px rgba(34,197,94,0.45);">MAX (${slot.lvl}/${def.max})</div>`
            : `<div style="background:#1e2436; color:#e2e8f0; font-weight:800; font-size:0.75rem; padding:3px 6px; border-radius:6px; text-align:center; font-family:'Consolas', monospace; border:1px solid #333a4d;">Lvl ${slot.lvl}/${def.max}</div>`;

          cardsList += `
            <div style="width:130px; background:#10121b; border:5px solid ${itemColor}; border-radius:10px; padding:10px 8px; box-sizing:border-box; box-shadow:0 0 10px ${itemColor}33; display:flex; flex-direction:column; justify-content:space-between;">
              ${roleHtml}
              <div style="width:68px; height:68px; margin:0 auto 8px auto; display:flex; align-items:center; justify-content:center;">
                <img src="${def.img}" alt="${escapeXml(def.name)}" style="width:100%; height:100%; object-fit:contain; display:block;">
              </div>
              <div style="font-size:0.82rem; font-weight:bold; color:${itemColor}; text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:6px; font-family:'Consolas', monospace;">${escapeXml(def.name)}</div>
              ${badgeHtml}
            </div>
          `;
        });

        itemsGridHtml = `<div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:14px;">${cardsList}</div>`;
      }

      loadoutCardsHtml += `
        <div style="background:#10121b; border:1px solid #262c3f; border-left:5px solid #5865f2; border-radius:10px; padding:20px 24px; margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; gap:8px;">
            <div style="color:${bannerColor}; font-weight:bold; font-size:1.35rem; font-family:'Consolas', monospace;">${escapeXml(bannerText)}</div>
            ${subText ? `<div style="color:#94a3b8; font-weight:700; font-size:1.05rem; font-family:'Consolas', monospace;">${escapeXml(subText)}</div>` : ''}
          </div>
          ${itemsGridHtml}
        </div>
      `;
    });

    return `
      <div id="teamCaptureCard" style="background:#151822; padding:32px; border-radius:12px; width:940px; box-sizing:border-box;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #262c3f; padding-bottom:16px; margin-bottom:22px;">
          <div>
            <div style="font-size:1.65rem; font-weight:800; color:#ffffff; font-family:'Segoe UI', sans-serif;">${escapeXml(headline)}</div>
            ${ign && ign.trim() ? `<div style="font-size:1.05rem; font-weight:700; color:${ignColor}; margin-top:5px; font-family:'Consolas', monospace;">Ingame Name: ${escapeXml(ign.trim())}</div>` : ''}
          </div>
          <div style="display:flex; gap:14px;">
            <div style="background:#10121b; border:1px solid #262c3f; border-radius:8px; padding:8px 16px; text-align:center;">
              <div style="font-size:0.72rem; color:#94a3b8; font-weight:700; text-transform:uppercase;">Slots / Deck</div>
              <div style="font-size:1.15rem; font-weight:800; color:#38bdf8; font-family:'Consolas', monospace;">${count} Slots</div>
            </div>
            <div style="background:#10121b; border:1px solid #262c3f; border-radius:8px; padding:8px 16px; text-align:center;">
              <div style="font-size:0.72rem; color:#94a3b8; font-weight:700; text-transform:uppercase;">Equipped</div>
              <div style="font-size:1.15rem; font-weight:800; color:#4ade80; font-family:'Consolas', monospace;">${totalSelectedSlots} Units</div>
            </div>
          </div>
        </div>

        ${loadoutCardsHtml}

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:22px; padding-top:14px; border-top:1px solid #262c3f; font-size:0.85rem; color:#64748b; font-family:'Segoe UI', sans-serif;">
          <span>⚡ Generated with STN Showcase</span>
          <span>erickapenas.github.io/STN</span>
        </div>
      </div>
    `;
  },

  buildInventoryImageDom(headline, bannerSubtitle, ign, invData, colors, showUnowned, sortMode = "rarity", includeRoleTag = true) {
    let totalOwned = 0;
    let totalMaxed = 0;
    ITEMS.forEach(it => {
      const data = invData[it.name];
      if (data && data.owned) {
        totalOwned++;
        if (data.lvl >= it.max) totalMaxed++;
      }
    });

    let renderedSectionsHtml = '';

    const renderCard = (item, isOwned, data, tier) => {
      const currentLvl = isOwned ? data.lvl : 0;
      const isEvo = isOwned && !!item.canEvo && currentLvl > item.max;
      const isMax = isOwned && !isEvo && currentLvl >= item.max;
      const roleColor = getAnsiHex(colors[item.role] || "37");
      const itemColor = getAnsiHex(colors[item.rarity] || "37");
      const borderColor = isEvo ? "#a855f7" : (isOwned ? itemColor : "#262c3f");
      const cardGlow = isEvo ? "0 0 16px rgba(168,85,247,0.65)" : (isOwned ? `0 0 10px ${itemColor}33` : "none");
      const cardBg = isEvo ? "#19112b" : "#10121b";
      const roleHtml = includeRoleTag ? `<div style="font-size:0.68rem; font-weight:800; color:${roleColor}; text-align:center; margin-bottom:4px; font-family:'Consolas', monospace;">[${item.role}]</div>` : '';

      let levelBadgeHtml = isOwned
        ? (isEvo
            ? `<div style="background:linear-gradient(135deg,#7e22ce,#a855f7); color:#ffffff; font-weight:900; font-size:0.78rem; padding:3px 6px; border-radius:6px; text-align:center; font-family:'Consolas', monospace; box-shadow:0 0 10px rgba(168,85,247,0.6);">⚡ EVO</div>`
            : isMax
            ? `<div style="background:#15803d; color:#ffffff; font-weight:900; font-size:0.75rem; padding:3px 6px; border-radius:6px; text-align:center; font-family:'Consolas', monospace; box-shadow:0 0 8px rgba(34,197,94,0.45);">MAX (${currentLvl}/${item.max})</div>`
            : `<div style="background:#1e2436; color:#e2e8f0; font-weight:800; font-size:0.75rem; padding:3px 6px; border-radius:6px; text-align:center; font-family:'Consolas', monospace; border:1px solid #333a4d;">Lvl ${currentLvl}/${item.max}</div>`)
        : `<div style="background:#181b26; color:#64748b; font-weight:700; font-size:0.75rem; padding:3px 6px; border-radius:6px; text-align:center; font-family:'Consolas', monospace;">Not Owned</div>`;

      return `
        <div style="width:130px; background:${cardBg}; border:5px solid ${borderColor}; border-radius:10px; padding:10px 8px; box-sizing:border-box; opacity:${isOwned ? '1' : '0.35'}; filter:${isOwned ? 'none' : 'grayscale(1)'}; box-shadow:${cardGlow}; display:flex; flex-direction:column; justify-content:space-between;">
          ${roleHtml}
          <div style="width:68px; height:68px; margin:0 auto 8px auto; display:flex; align-items:center; justify-content:center;">
            <img src="${item.img}" alt="${escapeXml(item.name)}" style="width:100%; height:100%; object-fit:contain; display:block;">
          </div>
          <div style="font-size:0.82rem; font-weight:bold; color:${isOwned ? itemColor : '#64748b'}; text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:6px; font-family:'Consolas', monospace;">${escapeXml(item.name)}</div>
          ${levelBadgeHtml}
        </div>
      `;
    };

    if (sortMode === "rarity") {
      RARITY_TIERS.forEach(tier => {
        const tierItems = ITEMS.filter(it => it.rarity === tier.key);
        const displayItems = showUnowned ? tierItems : tierItems.filter(it => invData[it.name] && invData[it.name].owned);
        if (displayItems.length === 0) return;

        let cardsHtml = '';
        displayItems.forEach(item => {
          const data = invData[item.name];
          const isOwned = data && data.owned;
          cardsHtml += renderCard(item, isOwned, data, tier);
        });

        const tierColor = getAnsiHex(colors[tier.key] || "37");

        renderedSectionsHtml += `
          <div style="margin-bottom:24px;">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px; border-bottom:1px solid #262c3f; padding-bottom:6px;">
              <span style="font-size:0.95rem; font-weight:900; color:${tierColor}; font-family:'Consolas', monospace; letter-spacing:1px;">${tier.label}</span>
              <span style="font-size:0.8rem; color:#94a3b8; font-weight:700;">(${displayItems.length} Units)</span>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:12px;">
              ${cardsHtml}
            </div>
          </div>
        `;
      });
    } else {
      CATEGORIES.forEach(cat => {
        const catItems = ITEMS.filter(it => it.role === cat.id);
        const displayItems = showUnowned ? catItems : catItems.filter(it => invData[it.name] && invData[it.name].owned);
        if (displayItems.length === 0) return;

        let cardsHtml = '';
        displayItems.forEach(item => {
          const data = invData[item.name];
          const isOwned = data && data.owned;
          const tier = RARITY_TIERS.find(t => t.key === item.rarity) || RARITY_TIERS[4];
          cardsHtml += renderCard(item, isOwned, data, tier);
        });

        const catColor = getAnsiHex(colors[cat.id] || "37");

        renderedSectionsHtml += `
          <div style="margin-bottom:24px;">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px; border-bottom:1px solid #262c3f; padding-bottom:6px;">
              <span style="font-size:0.95rem; font-weight:900; color:${catColor}; font-family:'Consolas', monospace; letter-spacing:1px;">${cat.title}</span>
              <span style="font-size:0.8rem; color:#94a3b8; font-weight:700;">(${displayItems.length} Units)</span>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:12px;">
              ${cardsHtml}
            </div>
          </div>
        `;
      });
    }

    const bannerColor = getAnsiHex(colors.BANNER || "36");

    return `
      <div id="invCaptureCard" style="background:#151822; padding:32px; border-radius:12px; width:940px; box-sizing:border-box;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #262c3f; padding-bottom:16px; margin-bottom:22px;">
          <div>
            <div style="font-size:1.65rem; font-weight:800; color:#ffffff; font-family:'Segoe UI', sans-serif;">${escapeXml(headline)}</div>
            ${bannerSubtitle && bannerSubtitle.trim() ? `<div style="font-size:1.15rem; font-weight:700; color:${bannerColor}; margin-top:4px; font-family:'Consolas', monospace;">${escapeXml(bannerSubtitle.trim())}</div>` : ''}
            ${ign && ign.trim() ? `<div style="font-size:1.05rem; font-weight:700; color:#57f287; margin-top:5px; font-family:'Consolas', monospace;">Ingame Name: ${escapeXml(ign.trim())}</div>` : ''}
          </div>
          <div style="display:flex; gap:14px;">
            <div style="background:#10121b; border:1px solid #262c3f; border-radius:8px; padding:8px 16px; text-align:center;">
              <div style="font-size:0.72rem; color:#94a3b8; font-weight:700; text-transform:uppercase;">Owned Units</div>
              <div style="font-size:1.15rem; font-weight:800; color:#38bdf8; font-family:'Consolas', monospace;">${totalOwned} / ${ITEMS.length}</div>
            </div>
            <div style="background:#10121b; border:1px solid #262c3f; border-radius:8px; padding:8px 16px; text-align:center;">
              <div style="font-size:0.72rem; color:#94a3b8; font-weight:700; text-transform:uppercase;">Max Level</div>
              <div style="font-size:1.15rem; font-weight:800; color:#4ade80; font-family:'Consolas', monospace;">${totalMaxed}</div>
            </div>
          </div>
        </div>

        ${renderedSectionsHtml}

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:22px; padding-top:14px; border-top:1px solid #262c3f; font-size:0.85rem; color:#64748b; font-family:'Segoe UI', sans-serif;">
          <span>⚡ Generated with STN Showcase</span>
          <span>erickapenas.github.io/STN</span>
        </div>
      </div>
    `;
  },

  buildClanBattleImageDom(cbData, colors, includeRoleTag = true, sortMode = "rarity") {
    let activeUnits = ITEMS.filter(it => cbData.units[it.name] && cbData.units[it.name].needed);

    if (sortMode === "rarity") {
      const rarityRank = { exclusive: 0, divine: 1, legendary: 2, mythic: 3, epic: 4, rare: 5, common: 6 };
      activeUnits.sort((a, b) => rarityRank[a.rarity] - rarityRank[b.rarity]);
    }

    const bannerColor = getAnsiHex(colors.BANNER || "36");
    const clanColor = getAnsiHex(colors.CLAN || "33");

    let cardsList = '';
    activeUnits.forEach(item => {
      const u = cbData.units[item.name];
      const roleColor = getAnsiHex(colors[item.role] || "37");
      const itemColor = getAnsiHex(colors[item.rarity] || "37");
      const roleHtml = includeRoleTag ? `<div style="font-size:0.68rem; font-weight:800; color:${roleColor}; text-align:center; margin-bottom:4px; font-family:'Consolas', monospace;">[${item.role}]</div>` : '';

      cardsList += `
        <div style="width:130px; background:#10121b; border:5px solid ${itemColor}; border-radius:10px; padding:10px 8px; box-sizing:border-box; box-shadow:0 0 10px ${itemColor}33; display:flex; flex-direction:column; justify-content:space-between;">
          ${roleHtml}
          <div style="width:68px; height:68px; margin:0 auto 8px auto; display:flex; align-items:center; justify-content:center;">
            <img src="${item.img}" alt="${escapeXml(item.name)}" style="width:100%; height:100%; object-fit:contain; display:block;">
          </div>
          <div style="font-size:0.82rem; font-weight:bold; color:${itemColor}; text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:4px; font-family:'Consolas', monospace;">${escapeXml(item.name)}</div>
          <div style="background:#15803d; color:#ffffff; font-weight:800; font-size:0.72rem; padding:2px 4px; border-radius:4px; text-align:center; font-family:'Consolas', monospace; margin-bottom:3px;">Have ${u.haveCount} already</div>
          <div style="background:#854d0e; color:#fef08a; font-weight:800; font-size:0.72rem; padding:2px 4px; border-radius:4px; text-align:center; font-family:'Consolas', monospace; margin-bottom:3px;">Need ${u.needCount}</div>
          <div style="background:#1e2436; color:#94a3b8; font-weight:700; font-size:0.7rem; padding:2px 4px; border-radius:4px; text-align:center; font-family:'Consolas', monospace;">Bring Level ${u.minLvl}+</div>
        </div>
      `;
    });

    if (activeUnits.length === 0) {
      cardsList = `<div style="color:#72767d; font-style:italic; padding:20px; font-family:'Consolas', monospace;">(No specific units requested)</div>`;
    }

    return `
      <div id="cbCaptureCard" style="background:#151822; padding:32px; border-radius:12px; width:940px; box-sizing:border-box;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #262c3f; padding-bottom:16px; margin-bottom:22px;">
          <div>
            <div style="font-size:1.65rem; font-weight:800; color:#ffffff; font-family:'Segoe UI', sans-serif;">${escapeXml(cbData.headline)}</div>
            ${cbData.banner && cbData.banner.trim() ? `<div style="font-size:1.15rem; font-weight:700; color:${bannerColor}; margin-top:4px; font-family:'Consolas', monospace;">${escapeXml(cbData.banner.trim())}</div>` : ''}
            ${cbData.clanName && cbData.clanName.trim() ? `<div style="font-size:1.05rem; font-weight:700; color:${clanColor}; margin-top:5px; font-family:'Consolas', monospace;">Clan: ${escapeXml(cbData.clanName.trim())}</div>` : ''}
          </div>
          <div style="display:flex; gap:14px;">
            <div style="background:#10121b; border:1px solid #262c3f; border-radius:8px; padding:8px 16px; text-align:center;">
              <div style="font-size:0.72rem; color:#94a3b8; font-weight:700; text-transform:uppercase;">Looking For</div>
              <div style="font-size:1.15rem; font-weight:800; color:#57f287; font-family:'Consolas', monospace;">${escapeXml(cbData.playersNeeded || "Players")}</div>
            </div>
            <div style="background:#10121b; border:1px solid #262c3f; border-radius:8px; padding:8px 16px; text-align:center;">
              <div style="font-size:0.72rem; color:#94a3b8; font-weight:700; text-transform:uppercase;">Target Units</div>
              <div style="font-size:1.15rem; font-weight:800; color:#38bdf8; font-family:'Consolas', monospace;">${activeUnits.length} Units</div>
            </div>
          </div>
        </div>

        <div style="display:flex; flex-wrap:wrap; gap:12px; margin-bottom:20px;">
          ${cardsList}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:22px; padding-top:14px; border-top:1px solid #262c3f; font-size:0.85rem; color:#64748b; font-family:'Segoe UI', sans-serif;">
          <span>⚡ Generated with STN Showcase</span>
          <span>erickapenas.github.io/STN</span>
        </div>
      </div>
    `;
  },

  buildSquadLoadoutsImageDom(players, totals, clanBuffEnabled, colors) {
    const fmtNum = (n) => {
      if (!isFinite(n) || n <= 0) return "0";
      if (n >= 1000) return Math.round(n).toLocaleString();
      return Number.isInteger(n) ? n.toLocaleString() : Number(n.toFixed(1)).toLocaleString();
    };
    const fmtStatVal = (n, unit = "%") => {
      const num = Number.isInteger(n) ? n.toLocaleString() : Number(n.toFixed(2)).toLocaleString();
      if (unit === "$") return `$${num}`;
      if (unit === "lvl") return `${num} Lvl`;
      return `${num}%`;
    };
    const normalizeInlineIcon = (htmlStr) =>
      String(htmlStr || "").replace(
        /<img\b/g,
        '<img style="width:15px;height:15px;vertical-align:-2px;object-fit:contain;display:inline-block;"'
      );

    const hasBuffedDiff = totals.buffedSquadDps > totals.baseSquadDps + 0.5;
    const displayDps = fmtNum(hasBuffedDiff ? totals.buffedSquadDps : totals.baseSquadDps);
    const showBossDps = totals.buffedBossDps > totals.buffedSquadDps + 0.5;

    // Active Buffs HTML
    const buffList = Object.values(totals.buffsSummary || {});
    const buffsHtml = buffList.length > 0
      ? buffList.map(b => {
          const u = b.unit || "%";
          const parts = [];
          if (b.petCount > 0) {
            const petBreak = b.steps.map(st => fmtStatVal(st.eff, u)).join(" + ");
            parts.push(`${b.petCount} pet${b.petCount > 1 ? "s" : ""}: ${petBreak}`);
          }
          if (b.baseAdds && b.baseAdds.length > 0) {
            b.baseAdds.forEach(ba => parts.push(`🛡️ ${ba.name}: +${fmtStatVal(ba.value, u)}`));
          }
          if (b.clanAdd > 0 && b.clanInfo) {
            parts.push(`🏰 ${b.clanInfo}: +${fmtStatVal(b.clanAdd, u)}`);
          }
          const highlightBorder = (b.clanAdd > 0 || (b.baseAdds && b.baseAdds.length > 0)) ? "#f59e0b88" : "#262c3f";
          return `
            <div style="background:#10121b; border:1px solid ${highlightBorder}; border-radius:8px; padding:9px 12px; min-width:195px; flex:1 1 200px; box-sizing:border-box;">
              <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:4px;">
                <span style="font-size:0.84rem; font-weight:700; color:#e2e8f0; font-family:'Segoe UI', sans-serif;">${normalizeInlineIcon(b.icon)} ${escapeXml(b.label)}</span>
                <span style="font-size:0.9rem; font-weight:800; color:#4ade80; font-family:'Consolas', monospace;">+${fmtStatVal(b.total, u)}</span>
              </div>
              <div style="font-size:0.72rem; color:#94a3b8; font-family:'Consolas', monospace; line-height:1.35;">${escapeXml(parts.join(" • "))}</div>
            </div>
          `;
        }).join("")
      : `<div style="color:#64748b; font-size:0.82rem; font-style:italic; font-family:'Segoe UI', sans-serif;">No active buffs.</div>`;

    // Squad Units Summary HTML
    const rosterEntries = Object.values(totals.unitCounts || {});
    const rosterHtml = rosterEntries.length > 0
      ? rosterEntries.map(entry => {
          const color = getAnsiHex(colors[entry.item.rarity] || DEFAULT_COLORS[entry.item.rarity] || "37");
          const placedNote = entry.item.role !== "PET"
            ? ` <span style="color:#94a3b8; font-size:0.74rem; font-weight:600;">(${entry.placements} placed)</span>`
            : "";
          return `
            <div style="display:inline-flex; align-items:center; gap:7px; background:#10121b; border:1px solid ${color}66; border-radius:8px; padding:5px 10px;">
              <img src="${entry.item.img}" alt="" style="width:22px; height:22px; object-fit:contain; display:block;">
              <span style="color:${color}; font-weight:800; font-size:0.8rem; font-family:'Consolas', monospace;">${entry.count}× ${escapeXml(entry.item.name)}${placedNote}</span>
            </div>
          `;
        }).join("")
      : `<div style="color:#64748b; font-size:0.82rem; font-style:italic; font-family:'Segoe UI', sans-serif;">No towers or pets equipped yet.</div>`;

    // Participant Inventories HTML
    const playersHtml = players.map((player, pIdx) => {
      const slotCount = player.vip ? 5 : 4;
      const pName = (player.name && player.name.trim()) ? player.name.trim() : `Player ${pIdx + 1}`;
      let pTowers = 0;
      let pPets = 0;

      let slotsHtml = "";
      for (let sIdx = 0; sIdx < slotCount; sIdx++) {
        const slot = player.slots[sIdx] || { item: null, lvl: 1 };
        const def = slot.item ? ITEMS.find(x => x.name === slot.item) : null;
        if (!def) {
          slotsHtml += `
            <div style="display:flex; align-items:center; gap:8px; background:#0c0f18; border:1px dashed #262c3f; border-radius:7px; padding:5px 9px; min-height:38px; box-sizing:border-box;">
              <span style="width:28px; height:28px; border-radius:6px; background:#141824; color:#475569; display:flex; align-items:center; justify-content:center; font-size:0.78rem; font-family:'Consolas', monospace;">${sIdx + 1}</span>
              <span style="color:#475569; font-size:0.78rem; font-style:italic; font-family:'Consolas', monospace;">Empty Slot</span>
            </div>
          `;
          continue;
        }

        if (def.role === "PET") pPets++; else pTowers++;
        const rarityColor = getAnsiHex(colors[def.rarity] || DEFAULT_COLORS[def.rarity] || "37");
        const isEvo = !!(def.canEvo && slot.lvl > def.max);
        const isMax = !isEvo && slot.lvl >= def.max;
        const borderColor = isEvo ? "#a855f7" : rarityColor;

        const lvlBadge = isEvo
          ? `<span style="background:linear-gradient(135deg,#7e22ce,#a855f7); color:#fff; font-weight:900; font-size:0.68rem; padding:2px 6px; border-radius:5px; font-family:'Consolas', monospace;">⚡ EVO</span>`
          : isMax
          ? `<span style="background:#15803d; color:#fff; font-weight:800; font-size:0.68rem; padding:2px 6px; border-radius:5px; font-family:'Consolas', monospace;">MAX</span>`
          : `<span style="background:#1e2436; color:#cbd5e1; font-weight:700; font-size:0.68rem; padding:2px 6px; border-radius:5px; border:1px solid #333a4d; font-family:'Consolas', monospace;">Lvl ${slot.lvl}/${def.max}</span>`;

        let metaHtml = "";
        if (def.role === "PET") {
          const buff = (typeof PET_BUFFS !== "undefined") ? PET_BUFFS[def.name] : null;
          if (buff) {
            const allStr = [buff, ...(buff.extraBuffs || [])]
              .map(pb => {
                const val = typeof LoadoutsUI !== "undefined" ? LoadoutsUI.getPetBuffValue(pb, slot.lvl) : pb.value;
                return `${normalizeInlineIcon(pb.icon)}+${fmtStatVal(val, pb.unit || "%")}`;
              })
              .join(" ");
            metaHtml = `<span style="color:#c084fc; font-size:0.7rem; font-weight:700; font-family:'Consolas', monospace;">${allStr}</span>`;
          } else {
            metaHtml = `<span style="color:#94a3b8; font-size:0.7rem; font-family:'Consolas', monospace;">PET</span>`;
          }
        } else {
          const stats = typeof LoadoutsUI !== "undefined" ? LoadoutsUI.getTowerStatsForLevel(def, slot.lvl) : { hasStats: false, limit: 1, totalDps: 0 };
          metaHtml = stats.hasStats
            ? `<span style="color:#38bdf8; font-size:0.7rem; font-weight:700; font-family:'Consolas', monospace;">×${stats.limit} • ${fmtNum(stats.totalDps)}</span>`
            : `<span style="color:#94a3b8; font-size:0.7rem; font-family:'Consolas', monospace;">×${stats.limit} limit</span>`;
        }

        slotsHtml += `
          <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; background:${isEvo ? '#181129' : '#0f1320'}; border:1px solid ${borderColor}66; border-left:4px solid ${borderColor}; border-radius:7px; padding:5px 9px; min-height:38px; box-sizing:border-box;">
            <div style="display:flex; align-items:center; gap:8px; min-width:0; flex:1;">
              <div style="width:28px; height:28px; flex:0 0 28px; display:flex; align-items:center; justify-content:center; background:#090c14; border-radius:6px; border:1px solid ${borderColor}88; padding:2px; box-sizing:border-box;">
                <img src="${def.img}" alt="" style="width:100%; height:100%; object-fit:contain; display:block;">
              </div>
              <span style="color:${rarityColor}; font-weight:800; font-size:0.8rem; font-family:'Consolas', monospace; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeXml(def.name)}</span>
            </div>
            <div style="display:flex; align-items:center; gap:6px; flex-shrink:0;">
              ${metaHtml}
              ${lvlBadge}
            </div>
          </div>
        `;
      }

      const cardWidth = players.length === 1 ? "100%" : "calc(50% - 7px)";
      return `
        <div style="width:${cardWidth}; background:#10121b; border:1px solid #262c3f; border-radius:10px; padding:12px 14px; box-sizing:border-box;">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; border-bottom:1px solid #1e2436; padding-bottom:8px; margin-bottom:9px;">
            <div style="font-size:0.95rem; font-weight:800; color:#f8fafc; font-family:'Segoe UI', sans-serif; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">👤 ${escapeXml(pName)}</div>
            <div style="display:flex; align-items:center; gap:6px; flex-shrink:0;">
              <span style="font-size:0.7rem; font-weight:700; color:#94a3b8; font-family:'Consolas', monospace;">🔫${pTowers} • 🐾${pPets}</span>
              <span style="font-size:0.68rem; font-weight:800; color:#fbbf24; background:#1c1917; border:1px solid #f59e0b55; border-radius:5px; padding:2px 6px; font-family:'Consolas', monospace;">${slotCount} Slots</span>
            </div>
          </div>
          <div style="display:flex; flex-direction:column; gap:6px;">
            ${slotsHtml}
          </div>
        </div>
      `;
    }).join("");

    return `
      <div id="squadCaptureCard" style="background:#151822; padding:28px 30px; border-radius:12px; width:960px; box-sizing:border-box; color:#f8fafc; font-family:'Segoe UI', sans-serif;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; border-bottom:1px solid #262c3f; padding-bottom:14px; margin-bottom:18px;">
          <div>
            <div style="font-size:1.55rem; font-weight:800; color:#ffffff;">🛡️ Squad Loadouts</div>
            <div style="font-size:0.84rem; color:#94a3b8; margin-top:3px;">Team Composition, Stacked Buffs &amp; Participant Inventories</div>
          </div>
          ${clanBuffEnabled ? `<div style="background:#2e1d08; border:1px solid #f59e0b88; color:#fbbf24; font-weight:800; font-size:0.78rem; padding:6px 12px; border-radius:8px; font-family:'Consolas', monospace;">🏰 Clan Buff: ON</div>` : ""}
        </div>

        <div style="display:flex; gap:12px; margin-bottom:18px;">
          <div style="flex:1; background:#10121b; border:1px solid #262c3f; border-radius:9px; padding:10px 14px;">
            <div style="font-size:0.72rem; color:#94a3b8; font-weight:700; text-transform:uppercase; margin-bottom:3px;">👥 Players</div>
            <div style="font-size:1.22rem; font-weight:800; color:#f8fafc; font-family:'Consolas', monospace;">${players.length} <span style="font-size:0.82rem; color:#64748b;">/ 10</span></div>
          </div>
          <div style="flex:1; background:#10121b; border:1px solid #262c3f; border-radius:9px; padding:10px 14px;">
            <div style="font-size:0.72rem; color:#94a3b8; font-weight:700; text-transform:uppercase; margin-bottom:3px;">🔫 Total Towers</div>
            <div style="font-size:1.22rem; font-weight:800; color:#38bdf8; font-family:'Consolas', monospace;">${totals.totalTowers} <span style="font-size:0.76rem; color:#94a3b8;">(${totals.totalPlacements} placed)</span></div>
          </div>
          <div style="flex:1; background:#10121b; border:1px solid #262c3f; border-radius:9px; padding:10px 14px;">
            <div style="font-size:0.72rem; color:#94a3b8; font-weight:700; text-transform:uppercase; margin-bottom:3px;">🐾 Total Pets</div>
            <div style="font-size:1.22rem; font-weight:800; color:#c084fc; font-family:'Consolas', monospace;">${totals.totalPets}</div>
          </div>
          <div style="flex:1.25; background:#10121b; border:1px solid #f59e0b66; border-radius:9px; padding:10px 14px;">
            <div style="font-size:0.72rem; color:#fbbf24; font-weight:700; text-transform:uppercase; margin-bottom:3px;">⚡ Total Squad DPS</div>
            <div style="font-size:1.22rem; font-weight:800; color:#4ade80; font-family:'Consolas', monospace;">${displayDps} <span style="font-size:0.78rem; color:#94a3b8;">DPS</span></div>
            ${hasBuffedDiff ? `<div style="font-size:0.7rem; color:#94a3b8; font-family:'Consolas', monospace; margin-top:2px;">Base: ${fmtNum(totals.baseSquadDps)} DPS</div>` : ""}
            ${showBossDps ? `<div style="font-size:0.7rem; color:#fbbf24; font-family:'Consolas', monospace; margin-top:1px;">Boss: ${fmtNum(totals.buffedBossDps)} DPS</div>` : ""}
          </div>
        </div>

        <div style="margin-bottom:18px;">
          <div style="font-size:0.86rem; font-weight:800; color:#f8fafc; letter-spacing:0.4px; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
            <span>✨ Active Buffs</span>
            <span style="font-size:0.7rem; font-weight:700; color:#94a3b8; background:#10121b; border:1px solid #262c3f; padding:2px 8px; border-radius:99px;">Pets: 60% decay per duplicate</span>
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${buffsHtml}
          </div>
        </div>

        <div style="margin-bottom:18px;">
          <div style="font-size:0.86rem; font-weight:800; color:#f8fafc; letter-spacing:0.4px; margin-bottom:8px;">📦 Squad Units Summary</div>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${rosterHtml}
          </div>
        </div>

        <div>
          <div style="font-size:0.86rem; font-weight:800; color:#f8fafc; letter-spacing:0.4px; margin-bottom:10px;">👥 Participant Inventories (${players.length})</div>
          <div style="display:flex; flex-wrap:wrap; gap:14px;">
            ${playersHtml}
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; padding-top:12px; border-top:1px solid #262c3f; font-size:0.82rem; color:#64748b;">
          <span>⚡ Generated with STN Showcase</span>
          <span>erickapenas.github.io/STN</span>
        </div>
      </div>
    `;
  },

  async captureCanvas(headline, ign, loadouts, count, colors, includeRoleTag) {
    const captureContainer = document.getElementById("teamCaptureContainer");
    captureContainer.innerHTML = this.buildTeamImageDom(headline, ign, loadouts, count, colors, includeRoleTag);
    const element = document.getElementById("teamCaptureCard");
    return await html2canvas(element, { backgroundColor: "#151822", scale: 1.5, logging: false, useCORS: true });
  },

  async captureInventoryCanvas(headline, bannerSubtitle, ign, invData, colors, showUnowned, sortMode, includeRoleTag) {
    const captureContainer = document.getElementById("invCaptureContainer");
    captureContainer.innerHTML = this.buildInventoryImageDom(headline, bannerSubtitle, ign, invData, colors, showUnowned, sortMode, includeRoleTag);
    const element = document.getElementById("invCaptureCard");
    return await html2canvas(element, { backgroundColor: "#151822", scale: 1.5, logging: false, useCORS: true });
  },

  async captureClanBattleCanvas(cbData, colors, includeRoleTag, sortMode) {
    const captureContainer = document.getElementById("cbCaptureContainer");
    captureContainer.innerHTML = this.buildClanBattleImageDom(cbData, colors, includeRoleTag, sortMode);
    const element = document.getElementById("cbCaptureCard");
    return await html2canvas(element, { backgroundColor: "#151822", scale: 1.5, logging: false, useCORS: true });
  },

  async captureSquadLoadoutsCanvas(players, totals, clanBuffEnabled, colors) {
    const captureContainer = document.getElementById("squadCaptureContainer");
    captureContainer.innerHTML = this.buildSquadLoadoutsImageDom(players, totals, clanBuffEnabled, colors);
    const element = document.getElementById("squadCaptureCard");
    return await html2canvas(element, { backgroundColor: "#151822", scale: 1.5, logging: false, useCORS: true });
  },

  canvasToBlob(canvas) {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob || null), "image/png");
    });
  },

  async copyBlobToClipboard(blobOrPromise, fallbackCanvasFn, filename = `showcase_${Date.now()}.png`) {
    const blobPromise = Promise.resolve(blobOrPromise);

    if (navigator.clipboard && typeof ClipboardItem !== "undefined") {
      try {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blobPromise })]);
        return "copied";
      } catch {
        try {
          const blob = await blobPromise;
          if (blob) {
            await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
            return "copied";
          }
        } catch {
          // Fallback to download below
        }
      }
    }

    if (typeof fallbackCanvasFn === "function") {
      const canvas = await fallbackCanvasFn();
      if (canvas) this.downloadCanvas(canvas, filename);
    }
    return "downloaded";
  },

  async copyCanvasToClipboard(canvasOrPromise, filename = `showcase_${Date.now()}.png`) {
    const blobPromise = Promise.resolve(canvasOrPromise).then((c) => this.canvasToBlob(c));
    return await this.copyBlobToClipboard(blobPromise, () => canvasOrPromise, filename);
  },

  downloadCanvas(canvas, filename = `showcase_${Date.now()}.png`) {
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }
};