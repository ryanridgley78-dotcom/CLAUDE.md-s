const header = document.querySelector("[data-site-header]");
const year = document.querySelector("[data-year]");
const heroMemberWelcome = document.querySelector("[data-hero-member-welcome]");
const publicBlogList = document.querySelector("[data-public-blog-list]");
const latestTorahCard = document.querySelector("[data-latest-torah-card]");
const publicQuestionForm = document.querySelector("[data-public-question-form]");
const patriarchApplicationForm = document.querySelector("[data-patriarch-application-form]");
const patriarchApplicationFields = document.querySelector("[data-patriarch-application-fields]");
const patriarchReferralGate = document.querySelector("[data-patriarch-referral-gate]");
const patriarchReferralUnlock = document.querySelector("[data-patriarch-referral-unlock]");
const patriarchReferralMessage = document.querySelector("[data-patriarch-referral-message]");
const patriarchReferralIdInput = document.querySelector("[data-patriarch-referral-id]");
const patriarchReferralTokenInput = document.querySelector("[data-patriarch-referral-token]");
const patriarchPreviewNotice = document.querySelector("[data-patriarch-preview-notice]");
const patriarchPreviewDenied = document.querySelector("[data-patriarch-preview-denied]");

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function textBlock(value) {
  return escapeHtml(value).replaceAll("\n", "<br>");
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

function formatCommentDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function blogImageForPost(post) {
  const images = {
    "a-psalm-of-the-house-of-israel": {
      src: "assets/blog/jared-a-psalm-house-israel.png",
      alt: "The Lament of the Desolate Woman, Reclaimed in Mercy",
    },
    "words-of-love-works-of-truth": {
      src: "assets/blog/jared-words-love-works-truth.png",
      alt: "Words of Love, Works of Truth",
    },
    "does-household-order-influence-progeny-gender": {
      src: "assets/blog/jared-household-order-progeny-gender.jpg",
      alt: "Does Household Order Influence Progeny Gender?",
    },
  };

  return images[String(post?.slug || "")] || null;
}

function authorInitials(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "YM";
  return parts.slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function blogAuthorBadge(post) {
  const authorEmail = String(post?.author_email || "").trim().toLowerCase();
  const authorName = String(post?.author_name || "").trim().toLowerCase();
  if (authorEmail === "restoringthekingdom2as1@gmail.com" || authorName === "jared cheshire") {
    return `<img src="assets/jared-cheshire.jpg" alt="">`;
  }

  return escapeHtml(authorInitials(post?.author_name));
}

function updateHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
}

function protectPaperReader() {
  if (!document.body.classList.contains("paper-reader-page")) return;

  document.addEventListener("contextmenu", (event) => event.preventDefault());
  document.addEventListener("dragstart", (event) => event.preventDefault());
  document.addEventListener("keydown", (event) => {
    const key = String(event.key || "").toLowerCase();
    if ((event.ctrlKey || event.metaKey) && (key === "s" || key === "p")) {
      event.preventDefault();
    }
  });
}

function pagePrefix() {
  return window.location.pathname.includes("/portal/") ? "../" : "";
}

function isPortalPage() {
  return window.location.pathname.includes("/portal/");
}

function normalizedPathname() {
  return window.location.pathname.replace(/\/$/, "");
}

function isPortalMemberWebsitePage() {
  return new Set([
    "/portal/member",
    "/portal/member.html",
    "/portal/member-directory",
    "/portal/member-directory.html",
    "/portal/messages",
    "/portal/messages.html",
    "/portal/mens-forum",
    "/portal/mens-forum.html",
  ]).has(normalizedPathname());
}

function isPortalMemberHomePage() {
  return new Set([
    "/portal/member",
    "/portal/member.html",
  ]).has(normalizedPathname());
}

function isMainHeroPage() {
  return new Set([
    "",
    "/",
    "/index.html",
  ]).has(normalizedPathname());
}

function followMenuLink(link, event) {
  if (!link || link.getAttribute("aria-disabled") === "true" || link.classList.contains("is-disabled")) return false;
  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0) return false;

  const href = link.getAttribute("href");
  if (!href || href === "#") return false;

  event.preventDefault();
  event.stopPropagation();
  window.location.href = link.href;
  return true;
}

function wireHeaderNavigation(nav) {
  if (!nav || nav.dataset.headerNavWired === "true") return;
  nav.dataset.headerNavWired = "true";

  const closeHeaderMenus = (exceptMenu = null) => {
    for (const dropdown of nav.querySelectorAll(".header-nav-dropdown, .header-nav-submenu")) {
      if (dropdown === exceptMenu || dropdown.contains(exceptMenu)) continue;
      dropdown.classList.remove("is-open");
      const trigger = dropdown.querySelector(":scope > .header-nav-trigger, :scope > .header-nav-submenu-link");
      trigger?.setAttribute("aria-expanded", "false");
    }
  };

  for (const trigger of nav.querySelectorAll(".header-nav-trigger, .header-nav-submenu-link")) {
    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const menu = trigger.closest(".header-nav-dropdown, .header-nav-submenu");
      if (!menu) return;
      const willOpen = !menu.classList.contains("is-open");
      closeHeaderMenus(menu);
      menu.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  }

  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (followMenuLink(link, event)) return;
    if (link) closeHeaderMenus();
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) closeHeaderMenus();
  });
}

function wireHeroTabs(nav) {
  if (!nav || nav.dataset.heroTabsWired === "true") return;
  nav.dataset.heroTabsWired = "true";

  const closeHeroMenus = (exceptMenu = null) => {
    for (const dropdown of nav.querySelectorAll(".hero-tab-dropdown, .hero-submenu")) {
      if (dropdown === exceptMenu || dropdown.contains(exceptMenu)) continue;
      dropdown.classList.remove("is-open");
      const trigger = dropdown.querySelector(":scope > .hero-tab-trigger, :scope > .hero-submenu-link");
      trigger?.setAttribute("aria-expanded", "false");
    }
  };

  for (const trigger of nav.querySelectorAll(".hero-tab-trigger, .hero-submenu-link")) {
    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("click", (event) => {
      const menu = trigger.closest(".hero-tab-dropdown, .hero-submenu");
      if (!menu) return;

      const hasSubmenu = Boolean(menu.querySelector(":scope > .hero-tab-menu, :scope > .hero-nested-menu"));
      if (!hasSubmenu) return;

      event.preventDefault();
      event.stopPropagation();
      const willOpen = !menu.classList.contains("is-open");
      closeHeroMenus(menu);
      menu.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  }

  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link?.classList.contains("hero-submenu-link")) return;
    if (followMenuLink(link, event)) return;
    if (link) closeHeroMenus();
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) closeHeroMenus();
  });
}

function addHeaderNavigation() {
  if (!header) return;

  const existingNav = header.querySelector("[data-header-nav]");
  if (existingNav) {
    wireHeaderNavigation(existingNav);
    addPublicAccountButtons();
    return;
  }

  if (isPortalPage() && !isPortalMemberWebsitePage()) return;

  const nav = document.createElement("nav");
  nav.className = "header-nav";
  nav.dataset.headerNav = "true";
  nav.setAttribute("aria-label", "Primary website navigation");
  const prefix = pagePrefix();
  const memberNavHidden = isPortalMemberWebsitePage() ? "" : " hidden";
  nav.innerHTML = `
    <div class="header-nav-dropdown">
      <button class="header-nav-trigger" type="button" aria-haspopup="true">
        Our Ministry
        <span class="header-nav-arrow" aria-hidden="true"></span>
      </button>
      <div class="header-nav-menu" aria-label="Our Ministry links">
        <a href="${prefix}mission.html">Mission</a>
        <a href="${prefix}staff.html">Leadership</a>
        <a href="${prefix}applications.html">Ministry Focus</a>
        <a href="${prefix}privacy-policy.html">Privacy Policy</a>
      </div>
    </div>
    <div class="header-nav-dropdown">
      <button class="header-nav-trigger" type="button" aria-haspopup="true">
        Engage
        <span class="header-nav-arrow" aria-hidden="true"></span>
      </button>
      <div class="header-nav-menu" aria-label="Engage links">
        <a href="${prefix}blogs.html">Ryan Ridgley Blog</a>
        <a href="${prefix}blogs-jared-cheshire.html">Jared Cheshire Blog</a>
        <a href="${prefix}portal/mens-forum.html" data-mens-forum-link aria-disabled="true">Men's Forum</a>
        <a href="${prefix}ask-question.html">Ask a Question</a>
        <a href="${prefix}donate.html">Donate</a>
      </div>
    </div>
    <div class="header-nav-dropdown">
      <button class="header-nav-trigger" type="button" aria-haspopup="true">
        Torah Study
        <span class="header-nav-arrow" aria-hidden="true"></span>
      </button>
      <div class="header-nav-menu" aria-label="Torah Study links">
        <a href="${prefix}video-recordings.html">Weekly Torah Study</a>
        <a href="${prefix}podcast.html">Meeting at the Gates</a>
      </div>
    </div>
    <div class="header-nav-dropdown">
      <button class="header-nav-trigger" type="button" aria-haspopup="true">
        Resources
        <span class="header-nav-arrow" aria-hidden="true"></span>
      </button>
      <div class="header-nav-menu" aria-label="Resources links">
        <a href="${prefix}calendar.html">Calendar</a>
        <a href="${prefix}events.html">Events</a>
      </div>
    </div>
    <div class="header-nav-dropdown" data-member-nav${memberNavHidden}>
      <button class="header-nav-trigger" type="button" aria-haspopup="true">
        Members
        <span class="header-nav-arrow" aria-hidden="true"></span>
      </button>
      <div class="header-nav-menu" aria-label="Member links">
        <a href="${prefix}portal/member-directory.html">Member Directory</a>
        <a href="${prefix}portal/messages.html">Messages</a>
      </div>
    </div>
    <a class="header-nav-live-link" href="${prefix}index.html#live-stream" data-live-stream-link hidden>Live Stream Sat 2:45 PM ET</a>
    <a class="header-nav-live-link" href="${prefix}index.html#forge-live" data-forge-live-link hidden>Forge Live</a>
  `;

  const closeHeaderMenus = (exceptMenu = null) => {
    for (const dropdown of nav.querySelectorAll(".header-nav-dropdown, .header-nav-submenu")) {
      if (dropdown === exceptMenu || dropdown.contains(exceptMenu)) continue;
      dropdown.classList.remove("is-open");
      const trigger = dropdown.querySelector(":scope > .header-nav-trigger, :scope > .header-nav-submenu-link");
      trigger?.setAttribute("aria-expanded", "false");
    }
  };

  for (const trigger of nav.querySelectorAll(".header-nav-trigger, .header-nav-submenu-link")) {
    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const menu = trigger.closest(".header-nav-dropdown, .header-nav-submenu");
      if (!menu) return;
      const willOpen = !menu.classList.contains("is-open");
      closeHeaderMenus(menu);
      menu.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  }

  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (followMenuLink(link, event)) return;
    if (link) closeHeaderMenus();
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) closeHeaderMenus();
  });

  const actions = header.querySelector(".header-actions");
  if (actions) {
    actions.before(nav);
    addPublicAccountButtons();
    return;
  }

  header.append(nav);
  addPublicAccountButtons();
}

function hasSiteEditorAccess(user) {
  const role = String(user?.role || "").toLowerCase();
  const displayRole = String(user?.display_role || "").toLowerCase();
  return role === "admin" ||
    role === "editor" ||
    role === "elder" ||
    displayRole.includes("elder") ||
    displayRole.includes("deacon") ||
    displayRole.includes("co-founder");
}

function dashboardPathForSiteUser(user) {
  if (hasSiteEditorAccess(user)) return "/portal/editor.html";
  if (user?.role === "client") return "/portal/dashboard.html";
  if (user?.role === "member") return "/portal/member.html";
  return "/portal/login.html";
}

function ensureMemberHeroLogoutButton(actions) {
  if (!actions || !isPortalMemberWebsitePage()) return null;

  let logoutButton = actions.querySelector("[data-portal-logout]");
  if (!logoutButton) {
    logoutButton = document.createElement("button");
    logoutButton.className = "header-button";
    logoutButton.type = "button";
    logoutButton.dataset.portalLogout = "true";
  }

  logoutButton.textContent = "Log out";
  if (logoutButton.parentElement !== actions) actions.append(logoutButton);
  return logoutButton;
}

function ensureHeroLogoutButton(actions) {
  if (!actions || !isMainHeroPage()) return null;

  let logoutButton = actions.querySelector("[data-public-logout]");
  if (!logoutButton) {
    logoutButton = document.createElement("button");
    logoutButton.className = "header-button";
    logoutButton.type = "button";
    logoutButton.dataset.publicLogout = "true";
    logoutButton.addEventListener("click", async () => {
      logoutButton.disabled = true;
      await fetch("/api/portal/logout", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: "{}",
      }).catch(() => {});
      window.location.assign("index.html");
    });
  }

  logoutButton.textContent = "Log out";
  if (logoutButton.parentElement !== actions) actions.append(logoutButton);
  return logoutButton;
}

function removeHeroLogoutButton() {
  header?.querySelector("[data-public-logout]")?.remove();
}

async function syncPublicGateButton(link) {
  if (!link) return;

  try {
    const response = await fetch("/api/portal/me", {
      credentials: "same-origin",
      headers: { "accept": "application/json" },
    });
    if (!response.ok) return;

    const { user } = await response.json();
    if (!user?.role) return;

    link.href = dashboardPathForSiteUser(user);
    link.textContent = "Dashboard";
    link.dataset.gateLoginAction = "true";
    const actions = link.closest(".header-actions");
    const logoutButton = ensureHeroLogoutButton(actions);
    if (logoutButton && logoutButton.parentElement === actions && link.nextElementSibling !== logoutButton) {
      actions.insertBefore(logoutButton, link.nextSibling);
    }
  } catch {
    link.href = `${pagePrefix()}portal/login.html`;
    link.textContent = "Gate";
    removeHeroLogoutButton();
  }
}

async function setupPatriarchApplicationPreview() {
  if (!patriarchApplicationForm) return;

  const params = new URLSearchParams(window.location.search);
  if (params.get("preview") !== "editor") return;

  try {
    const response = await fetch("/api/portal/me", {
      credentials: "same-origin",
      headers: { "accept": "application/json" },
    });
    if (!response.ok) throw new Error("Not signed in.");

    const { user } = await response.json();
    if (!hasSiteEditorAccess(user)) throw new Error("Editor access required.");

    patriarchApplicationForm.hidden = false;
    patriarchApplicationForm.setAttribute("aria-hidden", "false");
    patriarchApplicationForm.classList.remove("patriarch-form-disabled");
    unlockPatriarchApplicationFields("Referral requirement bypassed for private elder/admin preview.", false);
    if (patriarchPreviewNotice) patriarchPreviewNotice.hidden = false;
    if (patriarchPreviewDenied) patriarchPreviewDenied.hidden = true;
  } catch {
    patriarchApplicationForm.hidden = true;
    patriarchApplicationForm.setAttribute("aria-hidden", "true");
    if (patriarchPreviewNotice) patriarchPreviewNotice.hidden = true;
    if (patriarchPreviewDenied) patriarchPreviewDenied.hidden = false;
  }
}

function showPatriarchReferralMessage(message, isError = true) {
  if (!patriarchReferralMessage) return;
  patriarchReferralMessage.hidden = false;
  patriarchReferralMessage.textContent = message;
  patriarchReferralMessage.dataset.state = isError ? "error" : "success";
}

function patriarchReferralValue(name) {
  return String(patriarchApplicationForm?.elements?.[name]?.value || "").trim();
}

function patriarchReferralFile() {
  const input = patriarchApplicationForm?.elements?.referral_letter;
  return input?.files?.[0] || null;
}

function patriarchReferralIsComplete() {
  return Boolean(
    patriarchReferralValue("referral_code") &&
    patriarchReferralFile(),
  );
}

function setPatriarchReferralRecord(referral) {
  if (patriarchReferralIdInput) patriarchReferralIdInput.value = String(referral?.id || "");
  if (patriarchReferralTokenInput) patriarchReferralTokenInput.value = String(referral?.token || "");
}

function lockPatriarchReferralGate() {
  if (!patriarchReferralGate) return;
  for (const field of patriarchReferralGate.querySelectorAll("input, textarea, select")) {
    field.disabled = true;
  }
  if (patriarchReferralUnlock) {
    patriarchReferralUnlock.disabled = true;
    patriarchReferralUnlock.textContent = "Referral Connected";
  }
}

function unlockPatriarchApplicationFields(message = "Referral connected. Continue the Patriarch application below.", showGateAsConnected = true) {
  if (!patriarchApplicationFields) return;
  patriarchApplicationFields.hidden = false;
  patriarchApplicationFields.setAttribute("aria-hidden", "false");
  patriarchApplicationForm.dataset.patriarchUnlocked = "true";
  patriarchReferralGate?.classList.toggle("is-connected", showGateAsConnected);
  showPatriarchReferralMessage(message, false);
}

function setupPatriarchReferralGate() {
  if (!patriarchApplicationForm || !patriarchApplicationFields) return;

  patriarchApplicationForm.dataset.patriarchUnlocked = patriarchApplicationFields.hidden ? "false" : "true";

  patriarchReferralUnlock?.addEventListener("click", async () => {
    if (!patriarchReferralIsComplete()) {
      showPatriarchReferralMessage("Enter the referral code and attach the referral letter before opening the application.");
      return;
    }

    const originalText = patriarchReferralUnlock.textContent;
    patriarchReferralUnlock.disabled = true;
    patriarchReferralUnlock.textContent = "Connecting Referral...";
    showPatriarchReferralMessage("Saving referral code and document...", false);

    const referralData = new FormData();
    for (const name of [
      "referral_code",
      "referral_notes",
    ]) {
      referralData.append(name, patriarchReferralValue(name));
    }
    referralData.append("referral_letter", patriarchReferralFile());

    try {
      const response = await fetch("/api/patriarch-referrals", {
        method: "POST",
        headers: { "accept": "application/json" },
        body: referralData,
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Referral could not be connected.");

      setPatriarchReferralRecord(result.referral || {});
      lockPatriarchReferralGate();
      unlockPatriarchApplicationFields();
    } catch (error) {
      patriarchReferralUnlock.disabled = false;
      patriarchReferralUnlock.textContent = originalText;
      showPatriarchReferralMessage(error.message || "Referral could not be connected.");
    }
  });

  patriarchApplicationForm.addEventListener("submit", (event) => {
    if (patriarchApplicationForm.dataset.patriarchUnlocked === "true") return;
    event.preventDefault();
    showPatriarchReferralMessage("Connect the referral letter before submitting the Patriarch application.");
  });
}

function addPublicAccountButtons() {
  if (!header || (isPortalPage() && !isPortalMemberWebsitePage())) return;
  let actions = header.querySelector(".header-actions");
  if (!actions) {
    actions = document.createElement("div");
    actions.className = "header-actions";
    actions.setAttribute("aria-label", "Account actions");
    header.append(actions);
  }

  const memberHeroLogoutButton = ensureMemberHeroLogoutButton(actions);

  const existingJoinLink = Array.from(header.querySelectorAll("a")).find((link) => {
    const href = String(link.getAttribute("href") || "");
    const text = String(link.textContent || "").trim().toLowerCase();
    return link.dataset.joinQahalAction === "true" || href.includes("general-application.html") || text === "join qahal";
  });
  if (existingJoinLink) {
    existingJoinLink.dataset.joinQahalAction = "true";
  } else {
    const link = document.createElement("a");
    link.className = "header-button header-button-primary";
    link.href = `${pagePrefix()}general-application.html`;
    link.dataset.joinQahalAction = "true";
    link.textContent = "Join Qahal";
    actions.prepend(link);
  }

  const existingGateLink = Array.from(header.querySelectorAll("a")).find((link) => {
    const href = String(link.getAttribute("href") || "");
    const text = String(link.textContent || "").trim().toLowerCase();
    return link.dataset.gateLoginAction === "true" || href.includes("portal/login.html") || text === "gate" || text === "dashboard";
  });
  if (existingGateLink) {
    existingGateLink.dataset.gateLoginAction = "true";
    if (memberHeroLogoutButton && memberHeroLogoutButton.parentElement !== actions) {
      actions.append(memberHeroLogoutButton);
    }
    syncPublicGateButton(existingGateLink);
    return;
  }

  const gateLink = document.createElement("a");
  gateLink.className = "header-button header-button-primary";
  gateLink.href = isPortalMemberWebsitePage() ? "/portal/member.html" : `${pagePrefix()}portal/login.html`;
  gateLink.dataset.gateLoginAction = "true";
  gateLink.textContent = isPortalMemberWebsitePage() ? "Dashboard" : "Gate";
  if (memberHeroLogoutButton) {
    actions.insertBefore(gateLink, memberHeroLogoutButton);
  } else {
    actions.append(gateLink);
  }
  syncPublicGateButton(gateLink);
}

async function updateMemberNavigation() {
  const memberNavs = document.querySelectorAll("[data-member-nav]");
  if (!memberNavs.length) return;

  if (isPortalMemberWebsitePage()) {
    for (const nav of memberNavs) nav.hidden = false;
    return;
  }

  try {
    const response = await fetch("/api/portal/me", {
      credentials: "same-origin",
      headers: { "accept": "application/json" },
    });
    if (!response.ok) return;

    const { user } = await response.json();
    if (!user?.role || user.role === "client") return;

    for (const nav of memberNavs) nav.hidden = false;
  } catch {
    for (const nav of memberNavs) nav.hidden = true;
  }
}

function wireAllHeroTabs() {
  for (const nav of document.querySelectorAll(".hero-tabs")) {
    wireHeroTabs(nav);
  }
}

function wireRequiredCheckboxGroups() {
  for (const group of document.querySelectorAll("[data-required-checkbox-group]")) {
    const checkboxes = Array.from(group.querySelectorAll("input[type='checkbox']"));
    if (!checkboxes.length) continue;

    const syncValidity = () => {
      const hasChecked = checkboxes.some((checkbox) => checkbox.checked);
      checkboxes[0].setCustomValidity(hasChecked ? "" : "Choose at least one option in this section.");
    };

    for (const checkbox of checkboxes) {
      checkbox.addEventListener("change", syncValidity);
    }
    syncValidity();
  }
}

function wireReferralComboboxes() {
  for (const combobox of document.querySelectorAll("[data-referral-combobox]")) {
    const valueInput = combobox.querySelector("[data-referral-combobox-value]");
    const toggle = combobox.querySelector("[data-referral-combobox-toggle]");
    const menu = combobox.querySelector("[data-referral-combobox-menu]");
    const otherInput = combobox.querySelector("[data-referral-combobox-other]");
    const form = combobox.closest("form");
    if (!valueInput || !toggle || !menu || !otherInput) continue;

    const setOpen = (open) => {
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      combobox.classList.toggle("is-open", open);
    };

    const syncValidity = () => {
      const otherMatch = valueInput.value.trim().match(/^Other:\s*(.*)$/i);
      valueInput.setCustomValidity(otherMatch && !otherMatch[1].trim() ? "Enter the referral name after Other." : "");
    };

    const syncOtherInput = () => {
      const otherMatch = valueInput.value.match(/^Other:\s*(.*)$/i);
      if (otherMatch && document.activeElement !== otherInput) otherInput.value = otherMatch[1];
      syncValidity();
    };

    valueInput.addEventListener("focus", () => setOpen(true));
    valueInput.addEventListener("click", () => setOpen(true));
    valueInput.addEventListener("input", syncOtherInput);
    toggle.addEventListener("click", () => {
      const nextOpen = menu.hidden;
      setOpen(nextOpen);
      if (nextOpen) valueInput.focus();
    });

    for (const option of combobox.querySelectorAll("[data-referral-combobox-option]")) {
      option.addEventListener("click", () => {
        valueInput.value = option.dataset.referralComboboxOption || "";
        otherInput.value = "";
        syncValidity();
        valueInput.focus();
        setOpen(false);
      });
    }

    otherInput.addEventListener("focus", () => {
      if (!valueInput.value.trim().match(/^Other:/i)) valueInput.value = "Other: ";
      syncValidity();
    });
    otherInput.addEventListener("input", () => {
      valueInput.value = `Other: ${otherInput.value}`;
      syncValidity();
    });

    combobox.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        valueInput.focus();
        setOpen(false);
      }
    });
    document.addEventListener("click", (event) => {
      if (!combobox.contains(event.target)) setOpen(false);
    });
    form?.addEventListener("reset", () => {
      window.setTimeout(() => {
        otherInput.value = "";
        syncValidity();
        setOpen(false);
      }, 0);
    });
    syncValidity();
  }
}

async function updateMemberWelcome() {
  if (!heroMemberWelcome) return;

  try {
    const response = await fetch("/api/portal/me", {
      credentials: "same-origin",
      headers: { "accept": "application/json" },
    });
    if (!response.ok) return;

    const { user } = await response.json();
    if (!user?.name) return;

    heroMemberWelcome.textContent = `Welcome, ${user.name}`;
    heroMemberWelcome.hidden = false;
  } catch {
    heroMemberWelcome.hidden = true;
  }
}

function hasMensForumAccess(user) {
  const displayRole = String(user?.display_role || "").toLowerCase();
  return Boolean(user?.mens_forum_approved) ||
    user?.role === "admin" ||
    user?.role === "editor" ||
    user?.role === "elder" ||
    displayRole.includes("elder") ||
    displayRole.includes("deacon") ||
    displayRole.includes("co-founder");
}

async function updateMensForumLinks() {
  const links = document.querySelectorAll("[data-mens-forum-link]");
  if (!links.length) return;

  const setEnabled = (enabled) => {
    for (const link of links) {
      link.setAttribute("aria-disabled", enabled ? "false" : "true");
      link.classList.toggle("is-disabled", !enabled);
      link.title = enabled ? "" : "Men's Forum access has not been approved for this account.";
    }
  };

  setEnabled(false);

  for (const link of links) {
    link.addEventListener("click", (event) => {
      if (link.getAttribute("aria-disabled") === "true") {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }

  try {
    const response = await fetch("/api/portal/me", {
      credentials: "same-origin",
      headers: { "accept": "application/json" },
    });
    if (!response.ok) return;

    const { user } = await response.json();
    setEnabled(hasMensForumAccess(user));
  } catch {
    setEnabled(false);
  }
}

async function updateLiveStreamLinks() {
  const liveStreamLinks = document.querySelectorAll("[data-live-stream-link]");
  if (!liveStreamLinks.length) return;

  const setLiveStreamState = (payload = {}) => {
    const visible = Boolean((payload.visible ?? payload.enabled) && payload.url);
    const enabled = Boolean(payload.clickable ?? payload.enabled);
    for (const link of liveStreamLinks) {
      link.hidden = !visible;
      link.href = enabled ? payload.url : `${pagePrefix()}index.html#live-stream`;
      link.target = enabled ? "_blank" : "";
      link.rel = enabled ? "noopener noreferrer" : "";
      link.setAttribute("aria-disabled", visible && !enabled ? "true" : "false");
      link.classList.toggle("is-disabled", visible && !enabled);
      link.title = enabled
        ? payload.always_available
          ? "Join the live stream"
          : "Join the Saturday 2:45 PM Eastern live stream"
        : visible
          ? "Live Stream opens Saturdays at 2:45 PM Eastern"
          : "";
    }
  };

  setLiveStreamState();

  for (const link of liveStreamLinks) {
    link.addEventListener("click", (event) => {
      if (link.getAttribute("aria-disabled") === "true") {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }

  try {
    const response = await fetch("/api/site-settings/live-stream", {
      credentials: "same-origin",
      headers: { "accept": "application/json" },
    });
    const payload = await response.json();
    setLiveStreamState(payload);
  } catch {
    setLiveStreamState();
  }
}

async function updateForgeLiveLinks() {
  const forgeLiveLinks = document.querySelectorAll("[data-forge-live-link]");
  if (!forgeLiveLinks.length) return;

  try {
    const response = await fetch("/api/site-settings/forge-live", {
      credentials: "same-origin",
      headers: { "accept": "application/json" },
    });
    const payload = await response.json();

    for (const link of forgeLiveLinks) {
      link.hidden = !payload.enabled;
    }
  } catch {
    for (const link of forgeLiveLinks) {
      link.hidden = true;
    }
  }
}

async function loadLatestTorahStudy() {
  if (!latestTorahCard) return;

  try {
    const response = await fetch("/video-recordings.html", {
      credentials: "same-origin",
      headers: { "accept": "text/html" },
    });
    if (!response.ok) return;

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const latest = doc.querySelector(".video-highlight");
    if (!latest) return;

    const title = latest.querySelector("h3")?.textContent?.trim();
    const time = latest.querySelector("time");
    const rumbleUrl = latest.dataset.rumbleUrl || latest.querySelector("iframe")?.getAttribute("src");

    const cardTitle = latestTorahCard.querySelector("[data-latest-torah-title]");
    const cardDate = latestTorahCard.querySelector("[data-latest-torah-date]");
    const cardLink = latestTorahCard.querySelector("[data-latest-torah-link]");

    if (title && cardTitle) cardTitle.textContent = title;
    if (time && cardDate) {
      cardDate.textContent = time.textContent.trim();
      if (time.getAttribute("datetime")) cardDate.setAttribute("datetime", time.getAttribute("datetime"));
    }
    if (rumbleUrl && cardLink) cardLink.href = rumbleUrl;
  } catch {
    // Keep the built-in fallback card if the recordings page cannot be read.
  }
}

async function loadPublicBlogPosts() {
  if (!publicBlogList) return;

  try {
    const authorEmailFilter = String(publicBlogList.dataset.publicBlogAuthor || "").trim().toLowerCase();
    const params = new URLSearchParams();
    if (authorEmailFilter) params.set("author_email", authorEmailFilter);
    const requestUrl = params.toString() ? `/api/blog-posts?${params}` : "/api/blog-posts";
    const response = await fetch(requestUrl, {
      credentials: "same-origin",
      headers: { "accept": "application/json" },
    });
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || "Blog posts could not be loaded.");
    }

    const blogTypeFilter = String(publicBlogList.dataset.publicBlogList || "");
    const posts = (payload.posts || []).filter((post) => (
      !blogTypeFilter || String(post.post_type || "internal") === blogTypeFilter
    ));
    if (!posts.length) {
      publicBlogList.innerHTML = `
        <article class="blog-card">
          <h3>Written Teachings Coming Soon</h3>
          <p>Published blog posts will appear here.</p>
        </article>
      `;
      return;
    }

    publicBlogList.innerHTML = posts.map((post) => {
      const image = blogImageForPost(post);
      return `
        <details class="blog-card blog-card-clickable" id="${escapeHtml(post.slug)}">
          <summary>
            ${image ? `
              <img class="blog-card-image" src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" loading="lazy">
            ` : ""}
            <span class="blog-card-content">
              <span class="blog-author-badge" aria-hidden="true">${blogAuthorBadge(post)}</span>
              <span class="blog-meta">
                <span>${escapeHtml(formatDate(post.published_at || post.created_at))}</span>
                ${post.post_type === "external" ? `<span>External Blog Link</span>` : ""}
                ${post.source_name ? `<span>${escapeHtml(post.source_name)}</span>` : post.author_name ? `<span>By ${escapeHtml(post.author_name)}</span>` : ""}
              </span>
              <span class="blog-card-title">${escapeHtml(post.title)}</span>
              ${post.excerpt ? `<span class="blog-excerpt">${escapeHtml(post.excerpt)}</span>` : ""}
              <span class="blog-card-footer">
                <span class="blog-card-stat" aria-label="Hearts">&#9825; <strong data-blog-card-heart-count="${escapeHtml(post.id)}">0</strong></span>
                <span class="blog-card-stat" aria-label="Comments">&#9711; <strong data-blog-card-comment-count="${escapeHtml(post.id)}">0</strong></span>
                <span class="blog-open-label">Open post</span>
              </span>
            </span>
          </summary>
          <div class="blog-body">${textBlock(post.body)}</div>
          ${post.post_type === "external" && post.external_url ? `
            <a class="button primary blog-link-button" href="${escapeHtml(post.external_url)}" target="_blank" rel="noopener noreferrer">Open external blog</a>
          ` : ""}
          <section class="blog-interactions" data-blog-interactions="${escapeHtml(post.id)}">
            <div class="blog-interaction-actions">
              <button class="blog-heart-button" type="button" data-blog-heart="${escapeHtml(post.id)}" aria-label="Heart this post">
                <span aria-hidden="true">&#9825;</span>
                <strong data-blog-heart-count="${escapeHtml(post.id)}">0</strong>
              </button>
            </div>
            <form class="blog-comment-form" data-blog-comment-form="${escapeHtml(post.id)}">
              <label>
                Name
                <input type="text" name="commenter_name" placeholder="Your name">
              </label>
              <label>
                Comment
                <textarea name="body" rows="3" placeholder="Leave a comment" required></textarea>
              </label>
              <button class="button primary" type="submit">Post comment</button>
              <p class="blog-comment-message" data-blog-comment-message="${escapeHtml(post.id)}" hidden></p>
            </form>
            <div class="blog-comment-list" data-blog-comment-list="${escapeHtml(post.id)}">
              <p>Loading comments...</p>
            </div>
          </section>
        </details>
      `;
    }).join("");
    await loadBlogInteractions(posts);
  } catch (error) {
    publicBlogList.innerHTML = `
      <article class="blog-card">
        <p>${escapeHtml(error.message)}</p>
      </article>
    `;
  }
}

function renderBlogComments(postId, comments) {
  const list = document.querySelector(`[data-blog-comment-list="${postId}"]`);
  if (!list) return;

  const topLevelComments = comments.filter((comment) => !comment.parent_comment_id);
  const repliesByParent = comments.reduce((groups, comment) => {
    if (comment.parent_comment_id) {
      const key = String(comment.parent_comment_id);
      groups[key] = groups[key] || [];
      groups[key].push(comment);
    }
    return groups;
  }, {});

  if (!topLevelComments.length) {
    list.innerHTML = "<p>No comments yet.</p>";
    return;
  }

  list.innerHTML = topLevelComments.map((comment) => `
    <article class="blog-comment" data-blog-comment-id="${escapeHtml(comment.id)}">
      <div class="blog-comment-heading">
        <strong>${escapeHtml(comment.commenter_name || "Anonymous")}</strong>
        <button class="blog-reply-button" type="button" data-blog-reply="${escapeHtml(comment.id)}">Reply</button>
      </div>
      <small>${escapeHtml(formatCommentDate(comment.created_at))}</small>
      <p>${textBlock(comment.body)}</p>
      <form class="blog-comment-form blog-reply-form" data-blog-reply-form="${escapeHtml(postId)}" data-parent-comment-id="${escapeHtml(comment.id)}" hidden>
        <label>
          Name
          <input type="text" name="commenter_name" placeholder="Your name">
        </label>
        <label>
          Reply
          <textarea name="body" rows="3" placeholder="Write a reply" required></textarea>
        </label>
        <button class="button primary" type="submit">Post reply</button>
        <p class="blog-comment-message" data-blog-reply-message="${escapeHtml(comment.id)}" hidden></p>
      </form>
      ${(repliesByParent[String(comment.id)] || []).length ? `
        <div class="blog-replies">
          ${(repliesByParent[String(comment.id)] || []).map((reply) => `
            <article class="blog-comment blog-comment-reply">
              <strong>${escapeHtml(reply.commenter_name || "Anonymous")}</strong>
              <small>${escapeHtml(formatCommentDate(reply.created_at))}</small>
              <p>${textBlock(reply.body)}</p>
            </article>
          `).join("")}
        </div>
      ` : ""}
    </article>
  `).join("");
}

async function loadBlogInteractions(posts) {
  await Promise.all(posts.map(async (post) => {
    try {
      const response = await fetch(`/api/blog-interactions?post_id=${encodeURIComponent(post.id)}`, {
        credentials: "same-origin",
        headers: { "accept": "application/json" },
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to load comments.");

      const heartCount = document.querySelector(`[data-blog-heart-count="${post.id}"]`);
      if (heartCount) heartCount.textContent = String(payload.hearts_count || 0);
      const cardHeartCount = document.querySelector(`[data-blog-card-heart-count="${post.id}"]`);
      if (cardHeartCount) cardHeartCount.textContent = String(payload.hearts_count || 0);
      const cardCommentCount = document.querySelector(`[data-blog-card-comment-count="${post.id}"]`);
      if (cardCommentCount) cardCommentCount.textContent = String((payload.comments || []).length);
      renderBlogComments(post.id, payload.comments || []);
    } catch (error) {
      const list = document.querySelector(`[data-blog-comment-list="${post.id}"]`);
      if (list) list.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
    }
  }));
}

publicBlogList?.addEventListener("click", async (event) => {
  const replyButton = event.target.closest("[data-blog-reply]");
  if (replyButton) {
    event.preventDefault();
    const comment = replyButton.closest("[data-blog-comment-id]");
    const form = comment?.querySelector("[data-blog-reply-form]");
    if (!form) return;
    form.hidden = !form.hidden;
    replyButton.textContent = form.hidden ? "Reply" : "Cancel reply";
    return;
  }

  const heartButton = event.target.closest("[data-blog-heart]");
  if (!heartButton) return;

  event.preventDefault();
  const postId = Number(heartButton.dataset.blogHeart || 0);
  heartButton.disabled = true;

  try {
    const response = await fetch("/api/blog-interactions", {
      method: "POST",
      credentials: "same-origin",
      headers: { "content-type": "application/json", "accept": "application/json" },
      body: JSON.stringify({ action: "heart", post_id: postId }),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Unable to save heart.");

    const heartCount = document.querySelector(`[data-blog-heart-count="${postId}"]`);
    if (heartCount) heartCount.textContent = String(payload.hearts_count || 0);
    const cardHeartCount = document.querySelector(`[data-blog-card-heart-count="${postId}"]`);
    if (cardHeartCount) cardHeartCount.textContent = String(payload.hearts_count || 0);
    heartButton.classList.add("is-hearted");
  } catch (error) {
    window.alert(error.message);
  } finally {
    heartButton.disabled = false;
  }
});

publicBlogList?.addEventListener("submit", async (event) => {
  const form = event.target.closest("[data-blog-comment-form], [data-blog-reply-form]");
  if (!form) return;

  event.preventDefault();
  const postId = Number(form.dataset.blogCommentForm || form.dataset.blogReplyForm || 0);
  const parentCommentId = Number(form.dataset.parentCommentId || 0);
  const message = parentCommentId
    ? document.querySelector(`[data-blog-reply-message="${parentCommentId}"]`)
    : document.querySelector(`[data-blog-comment-message="${postId}"]`);
  const submitButton = form.querySelector("button[type='submit']");
  const formData = new FormData(form);

  if (message) {
    message.hidden = false;
    message.textContent = "Posting comment...";
  }
  submitButton.disabled = true;

  try {
    const response = await fetch("/api/blog-interactions", {
      method: "POST",
      credentials: "same-origin",
      headers: { "content-type": "application/json", "accept": "application/json" },
      body: JSON.stringify({
        action: "comment",
        post_id: postId,
        parent_comment_id: parentCommentId || null,
        commenter_name: String(formData.get("commenter_name") || ""),
        body: String(formData.get("body") || ""),
      }),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Unable to post comment.");

    form.reset();
    if (message) message.textContent = parentCommentId ? "Reply posted." : "Comment posted.";
    await loadBlogInteractions([{ id: postId }]);
  } catch (error) {
    if (message) message.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
});

publicQuestionForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = publicQuestionForm.querySelector("button[type='submit']");
  const message = publicQuestionForm.querySelector("[data-public-question-message]");
  const formData = new FormData(publicQuestionForm);

  if (message) {
    message.hidden = false;
    message.textContent = "Sending your question...";
    message.dataset.state = "success";
  }
  if (submitButton) submitButton.disabled = true;

  try {
    const response = await fetch("/api/public-question", {
      method: "POST",
      headers: { "content-type": "application/json", "accept": "application/json" },
      body: JSON.stringify({
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        subject: String(formData.get("subject") || ""),
        question: String(formData.get("question") || ""),
        website: String(formData.get("website") || ""),
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "Your question could not be sent.");

    publicQuestionForm.reset();
    if (message) {
      message.textContent = "Your question was sent to Elder Ryan Ridgley.";
      message.dataset.state = "success";
    }
  } catch (error) {
    if (message) {
      message.textContent = error.message;
      message.dataset.state = "error";
    }
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
});

if (year) {
  year.textContent = new Date().getFullYear();
}
addHeaderNavigation();
updateMemberNavigation();
wireAllHeroTabs();
wireRequiredCheckboxGroups();
wireReferralComboboxes();
protectPaperReader();
setupPatriarchReferralGate();
setupPatriarchApplicationPreview();
updateMemberWelcome();
updateMensForumLinks();
updateLiveStreamLinks();
updateForgeLiveLinks();
loadLatestTorahStudy();
loadPublicBlogPosts();
updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });
