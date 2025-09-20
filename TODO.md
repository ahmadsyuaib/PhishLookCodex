# TODO / Verification Guide

Follow the steps below to build, sideload, and verify the PhishLookCodex Reply Helper Outlook add-in.

## 1. Install dependencies

```bash
npm install
```

This installs the lightweight HTTP server used to host the add-in files during development.

## 2. Prepare local assets

```bash
npm run setup
```

This script creates placeholder PNG icons inside `src/assets/` (needed by the manifest) and ensures the `certs/` directory exists.

## 3. Generate and trust a local development certificate (first-time only)

The add-in files must be hosted over HTTPS at `https://localhost:3000`. Create and trust a certificate so Outlook allows the connection.

1. Generate a self-signed certificate for `localhost`:

   ```bash
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
     -keyout certs/localhost-key.pem \
     -out certs/localhost.pem \
     -subj "/CN=localhost"
   ```

2. **Windows**: double-click `certs/localhost.pem`, choose *Install Certificate*, select *Local Machine*, and place it in the *Trusted Root Certification Authorities* store.
3. **macOS**: open *Keychain Access*, drag `certs/localhost.pem` into the *System* keychain, and set the certificate to *Always Trust*.
4. Restart Outlook if it was running.

## 4. Start the local HTTPS server

```bash
npm start
```

This serves the `src/` folder (function file and JavaScript) at `https://localhost:3000` using the trusted certificate.

Leave this command running while Outlook is open.

## 5. Sideload the add-in

### Outlook on the web

1. Sign in to Outlook on the web using your Microsoft 365 account.
2. Open any message.
3. Select the ellipsis (`...`) ➜ **Get Add-ins** ➜ **My add-ins**.
4. Under *Custom add-ins*, choose **Add from file** and upload `manifest/manifest.xml` from this repository.
5. Confirm the warning about unverified add-ins if prompted.

### Outlook on Windows (desktop)

1. Open Outlook for Windows.
2. Go to **File** ➜ **Manage Add-ins**. Outlook opens the *Manage add-ins* page in your browser.
3. Follow the same steps as Outlook on the web (Add from file ➜ choose `manifest/manifest.xml`).

## 6. Test the functionality

1. With the add-in sideloaded and the local server running, open or preview any email message.
2. Within a couple of seconds, an informational notification appears at the top of the message. It contains text similar to:

   > Suggested reply: Thanks for the update about "Subject line". I'll follow up soon.

3. The subject inside the quotes reflects the currently opened email. This confirms the add-in intercepted the message and generated the placeholder reply suggestion.

## 7. Re-deploy or update the add-in

- If you change any file in `src/`, simply refresh Outlook or reopen the message—the event handler is reloaded from the running local server.
- If you change `manifest/manifest.xml`, remove the existing sideloaded add-in from Outlook (My add-ins ➜ **...** ➜ **Remove**) and repeat the sideload steps with the updated manifest.
- Ensure `npm start` is running whenever you expect Outlook to call into the add-in.

## 8. Stop the local server

Press `Ctrl+C` in the terminal that is running `npm start` when you finish testing.
