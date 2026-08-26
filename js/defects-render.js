// ============================================================
// DEFECTS RENDERER
// Builds one collapsible category card per entry in DEFECTS_DATA.
// Each card: header (category) + left-rail defect list + "What you
// can do" + "FAQ resources", mirroring the card design in Figma.
// ============================================================
(function () {
  "use strict";

  const container = document.getElementById("defect-cards");
  if (!container || typeof DEFECTS_DATA === "undefined") return;

  // --- Icons ---------------------------------------------------
  // Real GYG icons, inlined from the @getyourguide/compass icon set
  // (`c-icon`, compass-icons-v18) used by supply-frontend. Fill-based on a
  // 24×24 grid; each inherits `currentColor`. Names match the Figma icons.
  const cIcon = (inner) =>
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    inner + "</svg>";

  const IC_EXCLAMATION_CIRCLE = cIcon('<path fill="currentColor" d="M12 13.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2m1-1h-2v-4.5h2z"/><path fill="currentColor" fill-rule="evenodd" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16" clip-rule="evenodd"/>');
  const IC_CROSS_CIRCLE = cIcon('<path fill="currentColor" d="M16.207 9.207 13.414 12l2.793 2.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793z"/><path fill="currentColor" fill-rule="evenodd" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16" clip-rule="evenodd"/>');
  const IC_HEADPHONES = cIcon('<path fill="currentColor" fill-rule="evenodd" d="M12 3a9 9 0 0 1 9 9v6a3 3 0 0 1-3 3h-3v-8h4v-1a7 7 0 1 0-14 0v1h4v8H6a3 3 0 0 1-3-3v-6a9 9 0 0 1 9-9M5 15v3a1 1 0 0 0 1 1h1v-4zm12 4h1a1 1 0 0 0 1-1v-3h-2z" clip-rule="evenodd"/>');
  const IC_CHAT_BUBBLE = cIcon('<path fill="currentColor" d="M8.5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3.5 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m4.5-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/><path fill="currentColor" fill-rule="evenodd" d="m2 22 5.348-1.146A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.68.414 3.263 1.146 4.652zm3.253-5.638-.337-.641A7.96 7.96 0 0 1 4 12a8 8 0 1 1 8 8 7.96 7.96 0 0 1-3.72-.916l-.642-.337-3.035.65z" clip-rule="evenodd"/>');
  const IC_SUITCASE = cIcon('<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M15 3C16.1046 3 17 3.89543 17 5V7.00098H19C20.6569 7.00098 22 8.34412 22 10.001V19L21.9961 19.1543C21.9184 20.6883 20.6883 21.9184 19.1543 21.9961L19 22H5L4.8457 21.9961C3.31166 21.9184 2.08163 20.6883 2.00391 19.1543L2 19V10.001C2 8.34412 3.34315 7.00098 5 7.00098H7V5C7 3.89543 7.89543 3 9 3H15ZM5 9.00098C4.44772 9.00098 4 9.44869 4 10.001V19C4 19.5523 4.44772 20 5 20H5.95215L5.95117 9.00098H5ZM7.95215 20H16.001L16 9.00098H7.95117L7.95215 20ZM18.001 20H19C19.5523 20 20 19.5523 20 19V10.001C20 9.44869 19.5523 9.00098 19 9.00098H18L18.001 20ZM9 7.00098H15V5H9V7.00098Z"/>');
  const IC_CREDIT_CARD_CLOCK = cIcon('<path fill="currentColor" d="m17.5 16.078 1.31 1.31-1.413 1.416-1.897-1.897V14.21h2z"/><path fill="currentColor" fill-rule="evenodd" d="M16.5 11a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11m0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7" clip-rule="evenodd"/><path fill="currentColor" fill-rule="evenodd" d="M18 3a3 3 0 0 1 3 3v4.499a7.5 7.5 0 0 0-2-1.072v-.802H4V15a1 1 0 0 0 1 1h4.017a7.6 7.6 0 0 0 .133 2H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zM5 5a1 1 0 0 0-1 1v.625h15V6a1 1 0 0 0-1-1z" clip-rule="evenodd"/>');
  const IC_PIN_PERSON = cIcon('<path fill="currentColor" fill-rule="evenodd" d="M12 2a8 8 0 0 1 8 8c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 0 1 8-8m0 12.281a5.97 5.97 0 0 0-3.55 1.163c.34.45.698.888 1.063 1.31A34 34 0 0 0 12 19.33a34 34 0 0 0 2.487-2.576c.365-.422.723-.86 1.064-1.31A5.97 5.97 0 0 0 12 14.281M12 4a6 6 0 0 0-6 6c0 .912.34 2.011 1.008 3.242q.15.274.314.549a8 8 0 0 1 1.804-.978 4 4 0 1 1 5.748 0 8 8 0 0 1 1.804.978q.165-.274.314-.549C17.66 12.012 18 10.912 18 10a6 6 0 0 0-6-6m0 4.031a2 2 0 1 0 0 4 2 2 0 0 0 0-4" clip-rule="evenodd"/>');
  const IC_SHUTTLE = cIcon('<path fill="currentColor" fill-rule="evenodd" d="M14.583 4A7.417 7.417 0 0 1 22 11.417V17h-2a3 3 0 1 1-6 0h-4a3 3 0 1 1-6 0H2V6.5A2.5 2.5 0 0 1 4.5 4zM7 16a1 1 0 1 0 0 2 1 1 0 0 0 0-2m10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2M4 12v3h.764c.549-.614 1.348-1 2.236-1s1.687.386 2.236 1h5.528c.549-.614 1.348-1 2.236-1s1.687.386 2.236 1H20v-3zm.5-6a.5.5 0 0 0-.5.5V10h4V6zm5.5 4h4V6h-4zm6 0h3.813A5.43 5.43 0 0 0 16 6.188z" clip-rule="evenodd"/>');
  const IC_THUMBS_DOWN = cIcon('<path fill="currentColor" fill-rule="evenodd" d="M16.27 2.003a3.5 3.5 0 0 1 3.395 2.652l1.25 5a3.5 3.5 0 0 1-3.396 4.348H15l.908 2.118c.99 2.31-.704 4.879-3.217 4.879h-.695L7.86 14.003H3v-9h4l1.097-1.096a6.5 6.5 0 0 1 4.595-1.904zm-3.578 2A4.5 4.5 0 0 0 9.511 5.32L9 5.832l.001 6.17 4.103 6.941a1.5 1.5 0 0 0 .965-2.034l-2.102-4.906h5.552a1.5 1.5 0 0 0 1.455-1.863l-1.25-5a1.5 1.5 0 0 0-1.454-1.137zm-7.692 8h2v-5H5z" clip-rule="evenodd"/>');
  const IC_USERS = cIcon('<path fill="currentColor" fill-rule="evenodd" d="M14.5 3a3.5 3.5 0 0 1 2.62 5.821 6.6 6.6 0 0 1 2.248 1.756c1.11 1.327 1.736 3.024 1.878 4.582l.099 1.091h-6.19a10.5 10.5 0 0 1 1.092 3.923l.083 1.077H1.67l.083-1.077c.137-1.782.757-3.726 1.93-5.251.66-.859 1.5-1.587 2.518-2.065A4 4 0 0 1 11 6.535V6.5A3.5 3.5 0 0 1 14.5 3M9 14.25c-1.633 0-2.856.753-3.731 1.89-.678.881-1.138 1.987-1.37 3.11h10.202c-.232-1.123-.692-2.229-1.37-3.11-.875-1.137-2.098-1.89-3.731-1.89m5.5-4c-.6 0-1.106.114-1.538.305a4 4 0 0 1-1.163 2.302c.74.348 1.386.827 1.937 1.393h5.32a6.4 6.4 0 0 0-1.223-2.39c-.808-.967-1.917-1.61-3.333-1.61M9 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4m5.5-3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" clip-rule="evenodd"/>');
  const IC_SHIELD_CHECK = cIcon('<path fill="currentColor" d="M16.487 10.437 11.44 15.82l-3.405-2.905 1.46-1.711 1.772 1.512 3.579-3.818z"/><path fill="currentColor" fill-rule="evenodd" d="M13.539 2.634c1.945 1.281 4.181 2.052 6.502 2.242l1.334.11V9.54c0 5.2-3.069 9.909-7.826 12.008l-1.468.648-1.547-.67C5.733 19.446 2.625 14.713 2.625 9.481V4.974l1.586-.156a15.4 15.4 0 0 0 6.075-2.095L12.012 1.628zM11.492 4.622a17.4 17.4 0 0 1-6.617 2.385v2.474c0 4.335 2.575 8.256 6.553 9.979l.645.279.568-.25c3.94-1.739 6.484-5.641 6.484-9.949V7.042a17.4 17.4 0 0 1-6.823-2.53l-.313-.205z" clip-rule="evenodd"/>');
  const IC_WHEELCHAIR = cIcon('<path fill="currentColor" d="M12.503 4.648a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1.5 1.779a1 1 0 0 1 1 1v1.576h3.004a1 1 0 1 1 0 2h-3.004v1.995h4.965q.099 0 .191.018a1 1 0 0 1 .806.654l1.98 5.533a1 1 0 0 1-1.884.674l-1.745-4.88h-6.313v-7.57a1 1 0 0 1 1-1"/><path fill="currentColor" d="M4 14.943c0-2.972 2.162-5.441 5.005-5.933v2.045A4.03 4.03 0 0 0 6 14.943c0 2.214 1.804 4.022 4.047 4.022a4.044 4.044 0 0 0 3.91-2.977h2.047a6.04 6.04 0 0 1-5.957 4.977C6.707 20.965 4 18.27 4 14.943"/>');
  const IC_TICKET_VOUCHER = cIcon('<path fill="currentColor" d="M14.543 12.957 13 11.414V16h-2v-4.586l-1.543 1.543-1.414-1.414L12 7.586l3.957 3.957z"/><path fill="currentColor" fill-rule="evenodd" d="M4 22h4.875l1.02-1.088a2.885 2.885 0 0 1 4.21 0L15.125 22H20V2h-4.875l-1.02 1.088a2.885 2.885 0 0 1-4.21 0L8.875 2H4zm4.436-2.456L8.009 20H6V4h2.009l.427.456a4.885 4.885 0 0 0 7.128 0L15.992 4H18v16h-2.008l-.428-.456a4.885 4.885 0 0 0-7.128 0" clip-rule="evenodd"/>');
  const IC_DOCUMENT = cIcon('<path fill="currentColor" d="M16 13H8v-2h8zm-8 4h8v-2H8z"/><path fill="currentColor" fill-rule="evenodd" d="M4 2v16a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V6.586L15.414 2zm2 16V4h8v4h4v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2" clip-rule="evenodd"/>');
  const IC_CLOCK_DURATION = cIcon('<path fill="currentColor" d="m3.178 21.04.729-2.723a10.2 10.2 0 0 0 5.417 3.581c5.468 1.465 11.089-1.78 12.554-7.248S20.098 3.562 14.63 2.097A10.2 10.2 0 0 0 9 2.188l.582 1.913a8.25 8.25 0 1 1 .26 15.865 8.2 8.2 0 0 1-4.168-2.645l2.693.722.518-1.932-6.025-1.614-1.614 6.025z"/><path fill="currentColor" d="M11 7v6.819l5.39 1.902.665-1.886L13 12.403V7zm-7.091 4.333a1 1 0 1 1-1.818.834 1 1 0 0 1 1.818-.834M4.324 8.5a1 1 0 1 0-.833-1.819A1 1 0 0 0 4.324 8.5m2.176-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>');
  const IC_LINK_OUT = cIcon('<path fill="currentColor" d="M9.286 8v2h3.3l-4.293 4.293 1.414 1.414L14 11.414v3.3h2V8z"/><path fill="currentColor" fill-rule="evenodd" d="M3 3v14a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V3zm2 14V5h14v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2" clip-rule="evenodd"/>');
  const CHEVRON_UP_INNER = '<path fill="currentColor" fill-rule="evenodd" d="m12 9.826-6.293 6.293-1.414-1.414L12 6.998l7.707 7.707-1.414 1.414z" clip-rule="evenodd"/>';

  const CATEGORY_ICONS = {
    "Activity not as advertised": IC_EXCLAMATION_CIRCLE,
    "Attraction Closed": IC_CROSS_CIRCLE,
    "Audio Guide Problems": IC_HEADPHONES,
    "Communication problems": IC_CHAT_BUBBLE,
    "Missing Items to Bring Info": IC_SUITCASE,
    "Payment problems": IC_CREDIT_CARD_CLOCK,
    "Meeting point problems": IC_PIN_PERSON,
    "Pickup Problems": IC_SHUTTLE,
    "Scam Fraud": IC_THUMBS_DOWN,
    "Too many people": IC_USERS,
    "Trust & Safety Problems": IC_SHIELD_CHECK,
    "Unsuitable for disabled customers": IC_WHEELCHAIR,
    "Voucher problems": IC_TICKET_VOUCHER,
  };
  const ICON_DEFAULT = IC_EXCLAMATION_CIRCLE;
  const categoryIcon = (name) => CATEGORY_ICONS[name] || ICON_DEFAULT;

  // chevron-up (rotated 180° when the card is collapsed, via CSS)
  const ICON_CHEVRON =
    '<svg class="category-card__chevron" width="20" height="20" viewBox="0 0 24 24" ' +
    'fill="currentColor" aria-hidden="true">' + CHEVRON_UP_INNER + "</svg>";
  // link-out (FAQ resource links)
  const ICON_EXTERNAL =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    IC_LINK_OUT.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "") + "</svg>";

  // Rec-action card icons — reuse the compass icons above.
  const ICON_DOC = IC_DOCUMENT;
  const ICON_CLOCK = IC_CLOCK_DURATION;
  const ICON_HEADPHONE = IC_HEADPHONES;
  const ICON_SNEAKERS = IC_SUITCASE;
  const ICON_PIN = IC_PIN_PERSON;
  const ICON_PEOPLE = IC_USERS;

  // Recommended-action copy, keyed by the sheet's REC ACTION (SUPER) value.
  // Title / description / button / icon pulled verbatim from the Figma RA
  // library (node 7136:134582); "X" review counts replaced with sample numbers.
  // A defect whose rec-action is mapped here shows the "Recommended actions" block.
  const RA_COPY = {
    "Booking defect - Not as advertised": {
      title: "Address 8 reviews mentioning the activity was not as advertised",
      description: "Make sure your activity description matches the experience you provide. Include key details to set clear expectations for travelers",
      buttonLabel: "Take action",
      icon: ICON_DOC,
    },
    // NOTE: description below is copied verbatim from the Figma RA library, where
    // it appears to be a copy-paste error (it describes group size, not duration).
    "Booking defect - Duration not as advertised": {
      title: "Address 5 recent reviews that mention duration",
      description: "Review your maximum group size and update it if needed. To prevent overcrowding, ensure participants can not book beyond the maximum group size.",
      buttonLabel: "Take action",
      icon: ICON_CLOCK,
    },
    "Catalog - Update guide details": {
      title: "Add more guide details",
      description: "You can now add more details about staff who lead or assist customers during an activity. Adding guide details helps customers know what to expect and can increase bookings.",
      buttonLabel: "Add details",
      icon: ICON_PEOPLE,
    },
    "Booking defect - Audio or language": {
      title: "Address 3 recent reviews that mention language",
      description: "Ensure the languages listed in your audio guide information match those consistently offered. Consider adding new language options to appeal to a wider customer base.",
      buttonLabel: "Take action",
      icon: ICON_HEADPHONE,
    },
    "Booking defect - Missing items": {
      title: "Address 4 recent reviews that mention items to bring",
      description: "Specify any items travelers should bring, such as raincoats or water bottles.",
      buttonLabel: "Take action",
      icon: ICON_SNEAKERS,
    },
    "Add meeting point picture": {
      title: "Help customers find your meeting point by adding a photo",
      description: "Recent customer feedback shows your meeting point is hard to find. A photo of the exact location will reduce confusion, no-shows, and negative reviews.",
      buttonLabel: "Take action",
      icon: ICON_PIN,
    },
    "Booking defect - Activity overcrowded (oversubscribed)": {
      title: "Address 6 recent reviews that mention capacity",
      description: "Review your maximum group size and update it if needed. To prevent overcrowding, ensure participants can not book beyond the maximum group size.",
      buttonLabel: "Take action",
      icon: ICON_PEOPLE,
    },
  };

  // --- Helpers -------------------------------------------------
  // Turn a raw help-centre URL into a readable link label.
  function faqLabel(url) {
    try {
      const path = new URL(url).pathname;
      let slug = path.split("/").filter(Boolean).pop() || url;
      slug = decodeURIComponent(slug).replace(/^\d+-/, ""); // drop leading article id
      const words = slug.replace(/[-_]+/g, " ").trim();
      return words.charAt(0).toUpperCase() + words.slice(1);
    } catch (e) {
      return url;
    }
  }

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  const escapeHtml = (s) =>
    String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Build the panels for the currently-selected defect.
  function renderPanels(ra, main, faq, defect) {
    // "Recommended actions" (optional — only when the defect maps to one)
    const raCopy = defect.recAction && RA_COPY[defect.recAction];
    if (raCopy) {
      ra.innerHTML =
        '<h4 class="category-panel__heading">Recommended actions</h4>' +
        '<div class="dp-ra-card">' +
          '<div class="dp-ra-card__main">' +
            '<span class="dp-ra-card__icon">' + (raCopy.icon || ICON_DOC) + "</span>" +
            "<div>" +
              '<p class="dp-ra-card__title">' + escapeHtml(raCopy.title) + "</p>" +
              '<p class="dp-ra-card__desc">' + escapeHtml(raCopy.description) + "</p>" +
            "</div>" +
          "</div>" +
          '<button type="button" class="btn-primary dp-ra-card__btn">' +
            escapeHtml(raCopy.buttonLabel || "Take action") + "</button>" +
        "</div>";
      ra.classList.remove("hidden");
    } else {
      ra.innerHTML = "";
      ra.classList.add("hidden");
    }

    // "What you can do"
    let mainHtml = '<h4 class="category-panel__heading">What you can do</h4>';
    if (defect.recommendations && defect.recommendations.length) {
      mainHtml +=
        '<ul class="wycd-list">' +
        defect.recommendations.map((r) => "<li>" + escapeHtml(r) + "</li>").join("") +
        "</ul>";
    } else {
      mainHtml +=
        '<p class="category-panel__empty">Review this defect against your activity details, then update your listing or reach out to affected customers.</p>';
    }
    mainHtml +=
      '<button type="button" class="see-reviews-btn">See related reviews</button>';
    main.innerHTML = mainHtml;

    // "FAQ resources"
    if (defect.faqLinks && defect.faqLinks.length) {
      faq.innerHTML =
        '<h4 class="category-panel__heading">FAQ resources</h4>' +
        '<ul class="faq-list">' +
        defect.faqLinks
          .map(
            (u) =>
              '<li><a href="' +
              escapeHtml(u) +
              '" target="_blank" rel="noopener">' +
              escapeHtml(faqLabel(u)) +
              ICON_EXTERNAL +
              "</a></li>"
          )
          .join("") +
        "</ul>";
      faq.classList.remove("hidden");
    } else {
      faq.innerHTML = "";
      faq.classList.add("hidden");
    }
  }

  // --- Build one category card --------------------------------
  DEFECTS_DATA.forEach((cat, i) => {
    const card = el("section", "category-card");
    const bodyId = "cat-body-" + i;

    // Accordion: only the first card is open by default.
    if (i !== 0) card.classList.add("is-collapsed");

    // Header (collapse toggle)
    const header = el("button", "category-card__header");
    header.type = "button";
    header.setAttribute("aria-expanded", i === 0 ? "true" : "false");
    header.setAttribute("aria-controls", bodyId);
    header.innerHTML =
      '<span class="category-card__icon">' + categoryIcon(cat.category) + "</span>" +
      '<span class="category-card__title">' + escapeHtml(cat.category) + "</span>" +
      ICON_CHEVRON;

    // Body: nav | right-panel( recommended actions + [ what you can do | faq ] )
    const body = el("div", "category-card__body");
    body.id = bodyId;

    const nav = el("div", "defect-nav");
    const rightPanel = el("div", "dp-right");
    const ra = el("div", "dp-ra");
    const cols = el("div", "dp-cols");
    const main = el("div", "category-panel category-panel--main");
    const faq = el("aside", "category-panel category-panel--faq");
    cols.appendChild(main);
    cols.appendChild(faq);
    rightPanel.appendChild(ra);
    rightPanel.appendChild(cols);

    cat.defects.forEach((defect, di) => {
      const item = el("button", "defect-nav-item" + (di === 0 ? " is-active" : ""));
      item.type = "button";
      item.innerHTML =
        '<span class="defect-nav-item__title">' + escapeHtml(defect.name) + "</span>" +
        '<span class="defect-nav-item__desc">' + escapeHtml(defect.description) + "</span>";
      item.addEventListener("click", () => {
        nav.querySelectorAll(".defect-nav-item").forEach((n) => n.classList.remove("is-active"));
        item.classList.add("is-active");
        renderPanels(ra, main, faq, defect);
      });
      nav.appendChild(item);
    });

    renderPanels(ra, main, faq, cat.defects[0]);

    header.addEventListener("click", () => {
      // Accordion: opening one card collapses all the others.
      const willOpen = card.classList.contains("is-collapsed");
      container.querySelectorAll(".category-card").forEach((c) => {
        c.classList.add("is-collapsed");
        const h = c.querySelector(".category-card__header");
        if (h) h.setAttribute("aria-expanded", "false");
      });
      if (willOpen) {
        card.classList.remove("is-collapsed");
        header.setAttribute("aria-expanded", "true");
      }
    });

    body.appendChild(nav);
    body.appendChild(rightPanel);
    card.appendChild(header);
    card.appendChild(body);
    container.appendChild(card);
  });
})();
