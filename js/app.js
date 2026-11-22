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

    if (btn.dataset.tab === "indexTab" && typeof IndexUI !== "undefined") IndexUI.render();
    if (btn.dataset.tab === "inventoryTab") InventoryUI.updateUI();
    if (btn.dataset.tab === "clanBattleTab") {
      if (typeof LoadoutsUI !== "undefined") LoadoutsUI.render();
      ClanBattleUI.updateUI();
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
  if (typeof CLAN_BUFF_DEFS === "undefined") return;
  CLAN_BUFF_DEFS.forEach(def => {
    const sel = document.getElementById(`clanBuff_${def.key}`);
    const pill = document.getElementById(`clanBuffVal_${def.key}`);
    if (!sel) return;

    let opts = "";
    for (let l = 0; l <= def.maxLvl; l++) {
      const pct = l * def.perLevel;
      const pctStr = Number.isInteger(pct) ? `${pct}%` : `${Number(pct.toFixed(1))}%`;
      const label = l === 0
        ? `Level 0 (OFF)`
        : `Level ${l}${l === def.maxLvl ? " (MAX)" : ""} — +${pctStr}`;
      opts += `<option value="${l}" ${userClanBuffs[def.key] === l ? "selected" : ""}>${label}</option>`;
    }
    sel.innerHTML = opts;

    const updatePill = () => {
      if (!pill) return;
      const lvl = userClanBuffs[def.key] || 0;
      const pct = lvl * def.perLevel;
      const pctStr = Number.isInteger(pct) ? `${pct}%` : `${Number(pct.toFixed(1))}%`;
      pill.textContent = `+${pctStr} ${def.label}`;
      pill.classList.toggle("is-active", lvl > 0);
    };
    updatePill();

    sel.onchange = () => {
      userClanBuffs[def.key] = parseInt(sel.value, 10) || 0;
      StorageManager.saveClanBuffs(userClanBuffs);
      updatePill();
      if (typeof LoadoutsUI !== "undefined") LoadoutsUI.render();
    };
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
  InventoryUI.updateUI();
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
ClanBattleUI.init();
