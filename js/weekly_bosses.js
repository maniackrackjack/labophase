// ============================================================
// Weekly Bosses tab
// ============================================================

const WKB_BOSSES = [
  { icon: '🦂', name: 'Deathstalker',          hp4: '2.900.000~', hp6: '3.960.000~' },
  { icon: '🏴‍☠️', name: 'Barbarossa',            hp4: '2.590.500~', hp6: '4.110.000~' },
  { icon: '🪵', name: 'Madera',                hp4: '2.645.500',  hp6: '4.070.000'  },
  { icon: '🐯', name: 'Sanshoo',               hp4: '3.682.500',  hp6: '4.910.000'  },
  { icon: '🗡️', name: 'Hassan',                hp4: '1.892.000',  hp6: '3.440.000'  },
  { icon: '🎯', name: 'Van Augur',             hp4: '2.696.000',  hp6: '3.370.000'  },
  { icon: '💪', name: 'Jesus Burgess',         hp4: '2.442.000',  hp6: '4.070.000'  },
  { icon: '🤼', name: 'Yokozuna',              hp4: '2.947.000~', hp6: '4.210.000'  },
  { icon: '🐒', name: 'Humandrill Swordmaster', hp4: '3.062.400~', hp6: '3.828.000'  },
  { icon: '🐴', name: 'Duval',                 hp4: '3.060.000',  hp6: '4.080.000'  },
];

function wkbToggleFolder(btn) {
  const submenu = document.getElementById('wkb-folder-submenu');
  if (!submenu) return;
  const open = submenu.classList.toggle('wb-submenu-open');
  btn.classList.toggle('wb-folder-open', open);
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function weeklyBossesInit(tabId) {
  if (!tabId) return;
  const panel = document.getElementById(tabId);
  if (!panel || panel.dataset.wkbRendered) return;
  panel.dataset.wkbRendered = '1';

  if (tabId === 'wkb_general') {
    wkbRenderGeneral();
  }
}

function wkbRenderGeneral() {
  const container = document.getElementById('wkb-general-content');
  if (!container) return;

  const p4Label = t('wkbPlayers4');
  const p6Label = t('wkbPlayers6');
  const titleLabel = t('wkbHardHpTitle');
  const approxNote = t('wkbApproxNote');

  let html = `<div class="wkb-section">
    <div class="wkb-section-head">
      <h4>${wkbEsc(titleLabel)}</h4>
    </div>
    <div class="wkb-boss-grid">`;

  for (const boss of WKB_BOSSES) {
    html += `
      <div class="wkb-boss-card">
        <div class="wkb-card-icon">${boss.icon}</div>
        <div class="wkb-card-body">
          <div class="wkb-card-name">${wkbEsc(boss.name)}</div>
          <div class="wkb-hp-rows">
            <div class="wkb-hp-row">
              <span class="wkb-hp-badge wkb-hp-badge-4">${wkbEsc(p4Label)}</span>
              <span class="wkb-hp-value">${wkbEsc(boss.hp4)}</span>
            </div>
            <div class="wkb-hp-row">
              <span class="wkb-hp-badge wkb-hp-badge-6">${wkbEsc(p6Label)}</span>
              <span class="wkb-hp-value">${wkbEsc(boss.hp6)}</span>
            </div>
          </div>
        </div>
      </div>`;
  }

  html += `
    </div>
    <p class="wkb-approx-note">${wkbEsc(approxNote)}</p>
  </div>`;

  container.innerHTML = html;
}

function wkbEsc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function weeklyBossesApplyTranslations() {
  const panel = document.getElementById('wkb_general');
  if (!panel || !panel.dataset.wkbRendered) return;
  wkbRenderGeneral();
}
