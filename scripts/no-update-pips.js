const updateStyle = function (hideUpdatePips) {
  let style = document.getElementById("no-update-pips-style");
  if (style) {
    style.remove();
  }

  if (hideUpdatePips) {
    style = document.createElement("style");
    style.id = "no-update-pips-style";
    style.innerHTML = `
      .notification-pip.update[data-action="core-update"],
      .notification-pip.update[data-action="system-update"],
      a[data-tab="settings"] .notification-pip {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }
};

Hooks.once("i18nInit", () => {
  game.settings.register("no-update-pips", "hideUpdatePips", {
    name: game.i18n.localize("NO_UPDATE_PIPS.settings.name"),
    hint: game.i18n.localize("NO_UPDATE_PIPS.settings.hint"),
    scope: "client",
    config: true,
    default: true,
    type: Boolean,
    onChange: (hideUpdatePips) => {
      updateStyle(hideUpdatePips);
    }
  });

  Hooks.once("setup", () => {
    updateStyle(game.settings.get("no-update-pips", "hideUpdatePips"));
  });
});
