let userColors = StorageManager.loadColors();
let userInventory = StorageManager.loadInventory();
let userIgn = StorageManager.loadIgn();
let userClanBuffs = StorageManager.loadClanBuffs();
let isNitro = StorageManager.loadNitro();
let includeRoleTags = StorageManager.loadIncludeRoleTags();
let isTextOutput = StorageManager.loadTextOutput();

const ignInput = document.getElementById("ignInput");
const ignLinePreview = document.getElementById("ignLinePreview");
ignInput.value = userIgn;

updateIgnPreview();
updateNitroButtons();
updateRoleTagButtons();
updateTextOutputState();

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");

    if (btn.dataset.tab === "indexTab" && typeof IndexUI !== "undefined") IndexUI.selectCategory("turrets");
    if (btn.dataset.tab === "inventoryTab") InventoryUI.updateUI();
    if (btn.dataset.tab === "clanBattleTab") {
      if (typeof LoadoutsUI !== "undefined") LoadoutsUI.selectSubView("squad");
    }
    if (btn.dataset.tab === "doorTab" && typeof DoorUI !== "undefined") {
      DoorUI.renderPetPickerButtons();
      DoorUI.selectSubView(DoorUI.activeSubView || "door");
    }
  });
});

function initSettings() {
  document.querySelectorAll(".setting-select").forEach(sel => {
    const key = sel.dataset.key;
    sel.innerHTML = ANSI_OPTIONS.map(opt => 
      `<option value="${opt.code}" ${opt.code === (userColors[key] || DEFAULT_COLORS[key] || "37") ? 'selected' : ''}>${opt.name}</option>`
    ).join('');

    sel.addEventListener("change", () => {
      userColors[key] = sel.value;
      StorageManager.saveColors(userColors);
      updateSettingsLabels();
      updateIgnPreview();
      if (typeof IndexUI !== "undefined") IndexUI.render();
      if (typeof LoadoutsUI !== "undefined") LoadoutsUI.render();
      InventoryUI.renderItems();
      InventoryUI.updateUI();
      ClanBattleUI.render();
      ClanBattleUI.updateUI();
    });
  });
  updateSettingsLabels();

  const btnTextOutputToggle = document.getElementById("btnTextOutputToggle");
  btnTextOutputToggle.onclick = () => {
    isTextOutput = !isTextOutput;
    StorageManager.saveTextOutput(isTextOutput);
    updateTextOutputState();
  };

  initClanBuffSettings();
}

function initClanBuffSettings() {
  const container = document.getElementById("clanBuffsContainer");
  if (!container || typeof CLAN_BUFF_DEFS === "undefined") return;
  container.innerHTML = "";

  CLAN_BUFF_DEFS.forEach(def => {
    const card = document.createElement("div");

    const topRow = document.createElement("div");
    topRow.className = "inv-card-top";

    const tag = document.createElement("span");
    tag.className = "index-role-tag";
    tag.style.color = def.color;
    tag.textContent = `[${def.label.toUpperCase()}]`;

    const pill = document.createElement("span");
    pill.className = "clan-buff-val-pill";
    pill.id = `clanBuffVal_${def.key}`;

    topRow.appendChild(tag);
    topRow.appendChild(pill);

    const thumb = document.createElement("div");
    thumb.className = "index-thumb inv-card-thumb clan-buff-thumb";
    thumb.innerHTML = `<img src="${def.img}?v=${IMAGE_VERSION}" alt="${def.name}" onerror="this.style.display='none'">`;

    const nameEl = document.createElement("div");
    nameEl.className = "index-card-name";
    nameEl.style.color = def.color;
    nameEl.textContent = def.name;

    const subEl = document.createElement("div");
    subEl.className = "clan-buff-sub";
    subEl.textContent = `+${def.perLevel}% / lvl`;

    const sel = document.createElement("select");
    sel.id = `clanBuff_${def.key}`;
    sel.className = "inv-card-lvl";
    for (let l = 0; l <= def.maxLvl; l++) {
      const pct = l * def.perLevel;
      const pctStr = Number.isInteger(pct) ? `${pct}%` : `${Number(pct.toFixed(1))}%`;
      const opt = document.createElement("option");
      opt.value = l;
      opt.textContent = l === 0
        ? "Lvl 0 (OFF)"
        : `Lvl ${l}/${def.maxLvl}${l === def.maxLvl ? " (MAX)" : ""} (+${pctStr})`;
      if ((userClanBuffs[def.key] || 0) === l) opt.selected = true;
      sel.appendChild(opt);
    }

    const syncCard = () => {
      const lvl = userClanBuffs[def.key] || 0;
      const pct = lvl * def.perLevel;
      const pctStr = Number.isInteger(pct) ? `${pct}%` : `${Number(pct.toFixed(1))}%`;
      card.className = `inv-card clan-buff-inv-card ${lvl > 0 ? "owned" : "not-owned"}`;
      card.style.setProperty("--rarity-color", def.color);
      pill.textContent = `+${pctStr}`;
      pill.classList.toggle("is-active", lvl > 0);
    };

    sel.onclick = (e) => e.stopPropagation();
    sel.onchange = () => {
      userClanBuffs[def.key] = parseInt(sel.value, 10) || 0;
      StorageManager.saveClanBuffs(userClanBuffs);
      syncCard();
      if (typeof LoadoutsUI !== "undefined") LoadoutsUI.render();
    };

    card.onclick = () => {
      sel.focus();
    };

    card.appendChild(topRow);
    card.appendChild(thumb);
    card.appendChild(nameEl);
    card.appendChild(subEl);
    card.appendChild(sel);
    syncCard();
    container.appendChild(card);
  });
}

function updateTextOutputState() {
  const btn = document.getElementById("btnTextOutputToggle");
  if (btn) {
    btn.className = `status-toggle-btn ${isTextOutput ? 'active' : 'inactive'}`;
    btn.textContent = isTextOutput ? "📝 Text Output: ON" : "📝 Text Output: OFF";
  }
  if (isTextOutput) {
    document.body.classList.remove("hide-text-output");
  } else {
    document.body.classList.add("hide-text-output");
  }
}

function updateSettingsLabels() {
  Object.keys(DEFAULT_COLORS).forEach(k => {
    const lbl = document.getElementById(`lbl_${k}`);
    if (lbl) lbl.style.color = getAnsiHex(userColors[k] || DEFAULT_COLORS[k]);
  });
}

function updateIgnPreview() {
  const ignColor = getAnsiHex(userColors.IGN || "32");
  ignLinePreview.style.color = ignColor;
  ignLinePreview.textContent = userIgn && userIgn.trim() ? `Ingame Name: ${userIgn.trim()}` : `Ingame Name: (none)`;
}

function updateNitroButtons() {
  const nitroBtns = [document.getElementById("invNitroBtn"), document.getElementById("cbNitroBtn")];
  nitroBtns.forEach(b => {
    if (!b) return;
    b.className = `status-toggle-btn ${isNitro ? 'active' : 'inactive'}`;
    b.textContent = isNitro ? "🚀 Discord Nitro: ON (4000)" : "🚀 Discord Nitro: OFF (2000)";
  });
}

function toggleNitro() {
  isNitro = !isNitro;
  StorageManager.saveNitro(isNitro);
  updateNitroButtons();
  InventoryUI.updateUI();
  ClanBattleUI.updateUI();
}

document.getElementById("invNitroBtn").onclick = toggleNitro;
document.getElementById("cbNitroBtn").onclick = toggleNitro;

ignInput.addEventListener("input", () => {
  userIgn = ignInput.value;
  StorageManager.saveIgn(userIgn);
  updateIgnPreview();
  if (typeof InventoryUI !== "undefined") {
    InventoryUI.syncActiveProfileName(userIgn);
    InventoryUI.updateUI();
  }
});

document.getElementById("btnExportData").onclick = () => StorageManager.exportAllData();

const importFileInput = document.getElementById("importFileInput");
document.getElementById("btnImportData").onclick = () => importFileInput.click();
importFileInput.onchange = e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    if (StorageManager.importAllData(ev.target.result)) {
      alert("All data imported successfully!");
      location.reload();
    } else {
      alert("Failed to parse JSON backup file.");
    }
  };
  reader.readAsText(file);
};

document.getElementById("btnResetColors").onclick = () => {
  userColors = { ...DEFAULT_COLORS };
  StorageManager.saveColors(userColors);
  initSettings();
  updateIgnPreview();
  if (typeof IndexUI !== "undefined") IndexUI.render();
  InventoryUI.renderItems();
  InventoryUI.updateUI();
  ClanBattleUI.render();
  ClanBattleUI.updateUI();
};

document.getElementById("btnResetAllData").onclick = () => {
  if (confirm("Are you sure you want to reset all data and settings? This will restore the default fresh view.")) {
    localStorage.clear();
    location.reload();
  }
};

function updateRoleTagButtons() {
  const buttons = [
    document.getElementById("invRoleTagBtnTop"), 
    document.getElementById("invRoleTagBtnBottom"), 
    document.getElementById("cbRoleTagBtnTop"), 
    document.getElementById("cbRoleTagBtnBottom")
  ];
  buttons.forEach(btn => {
    if (!btn) return;
    btn.className = `status-toggle-btn ${includeRoleTags ? 'active' : 'inactive'}`;
    btn.textContent = includeRoleTags ? "🏷️ Role Tags: ON" : "🚫 Role Tags: OFF";
  });
}

function toggleRoleTags() {
  includeRoleTags = !includeRoleTags;
  StorageManager.saveIncludeRoleTags(includeRoleTags);
  updateRoleTagButtons();
  InventoryUI.updateUI();
  ClanBattleUI.updateUI();
}

document.getElementById("invRoleTagBtnTop").onclick = toggleRoleTags;
document.getElementById("invRoleTagBtnBottom").onclick = toggleRoleTags;
document.getElementById("cbRoleTagBtnTop").onclick = toggleRoleTags;
document.getElementById("cbRoleTagBtnBottom").onclick = toggleRoleTags;

initSettings();
InventoryUI.init();
IndexUI.init();
LoadoutsUI.init();
if (typeof DoorUI !== "undefined") DoorUI.init();
if (typeof JinxCalcUI !== "undefined") JinxCalcUI.init();
ClanBattleUI.init();

// Lightweight real-time online viewer counter (Cloudflare Worker + Durable Object WebSocket)
(function initOnlineCounter() {
  const WS_URL = "wss://stn-online.erick-martins2010.workers.dev/ws";
  const textEl = document.getElementById("onlineCounterText");
  if (!textEl || typeof WebSocket === "undefined") return;

  let ws = null;
  let pingTimer = null;
  let retryDelay = 2000;
  let closedByPage = false;

  const setCount = (n) => {
    const count = Math.max(1, Number(n) || 1);
    textEl.textContent = `${count} online`;
  };

  const cleanup = () => {
    if (pingTimer) { clearInterval(pingTimer); pingTimer = null; }
  };

  const connect = () => {
    if (closedByPage) return;
    try {
      ws = new WebSocket(WS_URL);
    } catch {
      return;
    }

    ws.addEventListener("open", () => {
      retryDelay = 2000;
      try { ws.send("sync"); } catch {}
      cleanup();
      pingTimer = setInterval(() => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          try { ws.send("ping"); } catch {}
        }
      }, 30000);
    });

    ws.addEventListener("message", (ev) => {
      if (ev.data === "pong") return;
      try {
        const data = JSON.parse(ev.data);
        if (typeof data.online === "number") setCount(data.online);
      } catch {}
    });

    ws.addEventListener("close", () => {
      cleanup();
      if (!closedByPage) {
        setTimeout(connect, retryDelay);
        retryDelay = Math.min(retryDelay * 2, 30000);
      }
    });

    ws.addEventListener("error", () => {
      try { ws.close(); } catch {}
    });
  };

  window.addEventListener("pagehide", () => {
    closedByPage = true;
    cleanup();
    if (ws) { try { ws.close(1000, "bye"); } catch {} }
  });

  // Connect asynchronously after initial render so page load & FPS are untouched
  setTimeout(connect, 250);
})();
