# Privacy Policy — eBijuli

**Effective Date:** June 14, 2026
**Last Updated:** June 14, 2026

---

## 1. Introduction

eBijuli ("the App", "we", "our") is a mobile application developed by **PSI** for electricity cooperatives and their customers in Nepal. The App serves two distinct user groups:

- **Customers** — who look up their electricity bill and pay online via QR-based payment gateways (FonePay, NepalPay).
- **Administrators (Meter Readers)** — cooperative staff who conduct field meter readings, generate invoices, and collect payments.

This Privacy Policy explains what information we collect, how we use it, who we share it with, and your rights regarding your data.

---

## 2. Information We Collect

### 2.1 Customer Users

| Data | Purpose |
|---|---|
| **Cooperative selection** (e.g., office name) | Identify the billing entity to query |
| **Customer ID / Account Number** | Fetch your specific bill from the cooperative's server |
| **Bill details** (name, address, meter number, amount due) | Display payment information; these are fetched from the cooperative's system, not stored by the App |
| **Payment transaction details** | Passed to FonePay / NepalPay to generate a payment QR; we do not store card or wallet credentials |

> Customers do not create an account in the App. No passwords, emails, or personal contact details are collected from customer users.

### 2.2 Administrator Users

| Data | Purpose |
|---|---|
| **Login credentials** (username / password) | Authenticate with the cooperative's server; the session token is stored locally on the device |
| **Profile information** (name, title, profile photo URL) | Displayed in the in-app menu; fetched from the server |
| **Downloaded route data** | List of customers and meters assigned to the reader for a billing cycle; stored locally in an encrypted on-device database |
| **Meter readings entered in the field** | Readings captured during field visits; stored locally until uploaded to the cooperative's server |
| **Device storage access** | Required to save QR card images to the device gallery (only when the user explicitly taps "QR Download") |

### 2.3 Automatically Collected Technical Data

The App does **not** collect analytics, crash telemetry, advertising identifiers, or device fingerprints. Standard Android network requests may carry your device IP address to the cooperative's API server.

---

## 3. How We Use Your Information

- **Bill lookup and display** — Customer ID and cooperative selection are sent to the cooperative's server to retrieve your outstanding bill.
- **Payment QR generation** — Bill amount and customer reference are forwarded to FonePay or NepalPay (whichever the cooperative has configured) to produce a one-time dynamic QR code.
- **Payment status polling** — The App automatically checks payment status every 5 seconds after a QR is displayed, until payment is confirmed or the dialog is closed.
- **Meter reading workflow** — Route data is downloaded to the device for offline use; meter readings are stored locally and uploaded when the administrator initiates a sync.
- **Session management** — Administrator login sessions are stored locally to avoid repeated logins during a field session.

---

## 4. Data Storage and Retention

| Data type | Where stored | How long |
|---|---|---|
| Customer bill data | In memory only (not persisted) | Cleared when the App is closed or a new search is made |
| QR card image | Device gallery (only if user saves it) | Until the user manually deletes it |
| Administrator route & reading data | On-device SQLite database | Replaced on every new download; deleted on upload |
| Administrator session token | Device SharedPreferences | Until the administrator logs out |

We do **not** maintain a separate database of customer or administrator data within the App itself. All authoritative data lives on the cooperative's server.

---

## 5. Third-Party Services

The App integrates with the following third-party payment gateways. Each has its own privacy policy:

| Service | Role | Privacy Policy |
|---|---|---|
| **FonePay** | QR payment processing | https://fonepay.com/privacy-policy |
| **NepalPay** | QR payment processing | (refer to your cooperative or NepalPay's published policy) |

The cooperative's own server API receives customer IDs, bill queries, meter readings, and payment confirmations. Data handling on the server side is governed by the respective cooperative's data policies.

---

## 6. Data Sharing

We do **not** sell, trade, or rent personal information to third parties. Data is shared only:

- With the **cooperative's API server** to provide bill lookup, route data download, and reading upload features.
- With **FonePay or NepalPay** (the active gateway) solely to generate and verify a payment QR code.
- If **required by law** — in response to a lawful request from government or regulatory authorities.

---

## 7. Permissions Used

| Android Permission | Reason |
|---|---|
| `INTERNET` | Communicate with the cooperative's server and payment gateways |
| `READ_EXTERNAL_STORAGE` / `WRITE_EXTERNAL_STORAGE` (Android ≤ 9) | Save QR card images to the gallery |
| `READ_MEDIA_IMAGES` (Android 13+) | Save QR card images to the gallery |

No location, microphone, camera, or contacts permissions are requested.

---

## 8. Security

- Administrator session tokens are stored in Android SharedPreferences with `MODE_PRIVATE`.
- On-device route and reading data is stored in a Room (SQLite) database accessible only to the App.
- All API communication uses HTTPS (TLS).
- We do not log or transmit meter reading images or customer signatures.

Despite these measures, no transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.

---

## 9. Children's Privacy

The App is intended for use by electricity cooperative customers (adults) and trained administrative staff. We do not knowingly collect information from children under 13. If you believe a child has inadvertently used the App and provided personal data, please contact us to have it removed.

---

## 10. Your Rights

Depending on applicable law, you may have the right to:

- **Access** the personal data the cooperative holds about you (contact your cooperative directly).
- **Correct** inaccurate bill or account information (contact your cooperative directly).
- **Delete** locally saved QR card images at any time through your device's gallery app.
- **Withdraw** administrator session at any time via the in-app logout option.

Because the App acts as a client to the cooperative's server, requests for data correction or deletion of billing records must be directed to the respective cooperative.

---

## 11. Changes to This Policy

We may update this Privacy Policy from time to time. When we do, we will update the "Last Updated" date at the top. For significant changes, we will notify users through an in-app notice or via the cooperative. Continued use of the App after any update constitutes acceptance of the revised policy.

---

## 12. Contact Us

If you have questions or concerns about this Privacy Policy or the App's data practices, please contact:

**PSI — eBijuli Support**
Email: sushilawasthi2999@gmail.com

---

*This policy applies to the eBijuli Android application. It does not cover websites, other PSI products, or the internal systems of partner electricity cooperatives.*
