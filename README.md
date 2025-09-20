# PhishLookCodex Reply Helper

This repository contains a minimal Outlook event-based add-in that demonstrates how to read an incoming email's subject and surface a placeholder reply suggestion. When the add-in is sideloaded and running, opening any email in Outlook will trigger the add-in automatically. The script captures the subject and posts an informational notification suggesting a simple reply, confirming that the add-in has executed.

## Project structure

```
manifest/            Outlook add-in manifest (XML)
src/                 Function file, JavaScript logic, and generated static assets (icons)
certs/               Folder for locally generated HTTPS certificates (created during setup)
scripts/             Utility scripts (asset preparation)
package.json         Minimal tooling configuration to host the add-in locally
```

## Getting started

1. Install dependencies once using `npm install`.
2. Generate the placeholder icons and ensure the local certificate folder exists with `npm run setup`.
3. Create a self-signed certificate for `localhost` and place the resulting `.pem` files inside `certs/` (see [TODO.md](TODO.md) for exact commands).
4. Start the local HTTPS server with `npm start`. This serves the files referenced by the manifest at `https://localhost:3000`.
5. Sideload `manifest/manifest.xml` into Outlook (desktop or web). Detailed instructions live in [TODO.md](TODO.md).
6. Open any email. A notification will appear with a placeholder reply suggestion derived from the email subject.

For more detailed sideloading and validation steps, see [TODO.md](TODO.md).
