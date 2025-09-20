# Outlook Extension – Minimal Agent

This repository contains a minimal Outlook event-based add-in. The add-in runs whenever an email message is opened, reads the subject, and surfaces a short reply suggestion through Outlook's notification bar. Use the files under `src/` to host the JavaScript and icons, and the manifest under `manifest/` to sideload the add-in.

## Notes for agents
- Keep the solution lightweight and dependency-free aside from the static web server defined in `package.json`.
- Static assets (HTML, JS, icons) live in `src/`.
- When updating functionality, also refresh the sideload/testing guide in `TODO.md`.

No additional formatting or linting tools are configured for this project.
