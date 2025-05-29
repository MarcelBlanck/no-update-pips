Hooks.once("init", () => {
  game.settings.register("no-update-pips", "hideUpdatePips", {
    name: "Hide Update Pips",
    hint: "Hides the red exclamation mark indicators for system and core updates.",
    scope: "client",
    config: true,
    default: true,
    type: Boolean,
    onChange: () => location.reload()
  });

  Hooks.once("setup", () => {
    if (game.settings.get("no-update-pips", "hideUpdatePips")) {
      const style = document.createElement("style");
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
  });
});
