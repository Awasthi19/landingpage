import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — eBijuli | PSI Technologies",
  description: "Privacy Policy for the eBijuli mobile application by PSI Technologies.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header bar */}
      <div className="bg-[#06476d] text-white py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-white/80 hover:text-white text-sm transition-colors">
            ← Back to Home
          </Link>
          <span className="text-sm text-white/60">PSI Technologies</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#06476d] mb-2">
            Privacy Policy — eBijuli
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
            <span><strong className="text-gray-700">Effective Date:</strong> June 14, 2026</span>
            <span><strong className="text-gray-700">Last Updated:</strong> June 14, 2026</span>
          </div>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#06476d] mb-3">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              eBijuli ("the App", "we", "our") is a mobile application developed by <strong>PSI</strong> for
              electricity cooperatives and their customers in Nepal. The App serves two distinct user groups:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 pl-2">
              <li>
                <strong>Customers</strong> — who look up their electricity bill and pay online via QR-based
                payment gateways (FonePay, NepalPay).
              </li>
              <li>
                <strong>Administrators (Meter Readers)</strong> — cooperative staff who conduct field meter
                readings, generate invoices, and collect payments.
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              This Privacy Policy explains what information we collect, how we use it, who we share it with,
              and your rights regarding your data.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#06476d] mb-4">2. Information We Collect</h2>

            <h3 className="text-base font-semibold text-gray-800 mb-3">2.1 Customer Users</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-[#06476d]/10 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold w-1/3">Data</th>
                    <th className="px-4 py-3 font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">Cooperative selection</td>
                    <td className="px-4 py-3 text-gray-600">Identify the billing entity to query</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">Customer ID / Account Number</td>
                    <td className="px-4 py-3 text-gray-600">Fetch your specific bill from the cooperative's server</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">Bill details</td>
                    <td className="px-4 py-3 text-gray-600">Display payment information; fetched from the cooperative's system, not stored by the App</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">Payment transaction details</td>
                    <td className="px-4 py-3 text-gray-600">Passed to FonePay / NepalPay to generate a payment QR; we do not store card or wallet credentials</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-blue-50 border-l-4 border-[#06476d] text-gray-600 text-sm p-4 rounded-r-lg mb-6">
              Customers do not create an account in the App. No passwords, emails, or personal contact details
              are collected from customer users.
            </div>

            <h3 className="text-base font-semibold text-gray-800 mb-3">2.2 Administrator Users</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-[#06476d]/10 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold w-1/3">Data</th>
                    <th className="px-4 py-3 font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">Login credentials</td>
                    <td className="px-4 py-3 text-gray-600">Authenticate with the cooperative's server; session token stored locally on device</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">Profile information</td>
                    <td className="px-4 py-3 text-gray-600">Displayed in the in-app menu; fetched from the server</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">Downloaded route data</td>
                    <td className="px-4 py-3 text-gray-600">List of customers and meters assigned to the reader for a billing cycle; stored locally in an encrypted on-device database</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">Meter readings</td>
                    <td className="px-4 py-3 text-gray-600">Readings captured during field visits; stored locally until uploaded to the cooperative's server</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">Device storage access</td>
                    <td className="px-4 py-3 text-gray-600">Required to save QR card images to the device gallery (only when the user explicitly taps "QR Download")</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-base font-semibold text-gray-800 mb-3">2.3 Automatically Collected Technical Data</h3>
            <p className="text-gray-600 leading-relaxed">
              The App does <strong>not</strong> collect analytics, crash telemetry, advertising identifiers, or
              device fingerprints. Standard Android network requests may carry your device IP address to the
              cooperative's API server.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#06476d] mb-4">3. How We Use Your Information</h2>
            <ul className="space-y-3 text-gray-600">
              {[
                ["Bill lookup and display", "Customer ID and cooperative selection are sent to the cooperative's server to retrieve your outstanding bill."],
                ["Payment QR generation", "Bill amount and customer reference are forwarded to FonePay or NepalPay to produce a one-time dynamic QR code."],
                ["Payment status polling", "The App automatically checks payment status every 5 seconds after a QR is displayed, until payment is confirmed or the dialog is closed."],
                ["Meter reading workflow", "Route data is downloaded to the device for offline use; meter readings are stored locally and uploaded when the administrator initiates a sync."],
                ["Session management", "Administrator login sessions are stored locally to avoid repeated logins during a field session."],
              ].map(([title, desc]) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 min-w-[8px] rounded-full bg-[#06476d]" />
                  <span><strong className="text-gray-800">{title}</strong> — {desc}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#06476d] mb-4">4. Data Storage and Retention</h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-[#06476d]/10 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Data type</th>
                    <th className="px-4 py-3 font-semibold">Where stored</th>
                    <th className="px-4 py-3 font-semibold">How long</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">Customer bill data</td>
                    <td className="px-4 py-3 text-gray-600">In memory only (not persisted)</td>
                    <td className="px-4 py-3 text-gray-600">Cleared when the App is closed or a new search is made</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">QR card image</td>
                    <td className="px-4 py-3 text-gray-600">Device gallery (only if user saves it)</td>
                    <td className="px-4 py-3 text-gray-600">Until the user manually deletes it</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">Administrator route & reading data</td>
                    <td className="px-4 py-3 text-gray-600">On-device SQLite database</td>
                    <td className="px-4 py-3 text-gray-600">Replaced on every new download; deleted on upload</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">Administrator session token</td>
                    <td className="px-4 py-3 text-gray-600">Device SharedPreferences</td>
                    <td className="px-4 py-3 text-gray-600">Until the administrator logs out</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We do <strong>not</strong> maintain a separate database of customer or administrator data within
              the App itself. All authoritative data lives on the cooperative's server.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#06476d] mb-4">5. Third-Party Services</h2>
            <p className="text-gray-600 mb-4">
              The App integrates with the following third-party payment gateways. Each has its own privacy policy:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-[#06476d]/10 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Service</th>
                    <th className="px-4 py-3 font-semibold">Role</th>
                    <th className="px-4 py-3 font-semibold">Privacy Policy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">FonePay</td>
                    <td className="px-4 py-3 text-gray-600">QR payment processing</td>
                    <td className="px-4 py-3">
                      <a
                        href="https://fonepay.com/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#06476d] hover:underline"
                      >
                        fonepay.com/privacy-policy
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">NepalPay</td>
                    <td className="px-4 py-3 text-gray-600">QR payment processing</td>
                    <td className="px-4 py-3 text-gray-600">Refer to your cooperative or NepalPay's published policy</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 leading-relaxed">
              The cooperative's own server API receives customer IDs, bill queries, meter readings, and payment
              confirmations. Data handling on the server side is governed by the respective cooperative's data
              policies.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#06476d] mb-4">6. Data Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do <strong>not</strong> sell, trade, or rent personal information to third parties. Data is
              shared only:
            </p>
            <ul className="space-y-3 text-gray-600">
              {[
                "With the cooperative's API server to provide bill lookup, route data download, and reading upload features.",
                "With FonePay or NepalPay (the active gateway) solely to generate and verify a payment QR code.",
                "If required by law — in response to a lawful request from government or regulatory authorities.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 min-w-[8px] rounded-full bg-[#06476d]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#06476d] mb-4">7. Permissions Used</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-[#06476d]/10 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Android Permission</th>
                    <th className="px-4 py-3 font-semibold">Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-sm text-gray-700">INTERNET</td>
                    <td className="px-4 py-3 text-gray-600">Communicate with the cooperative's server and payment gateways</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-sm text-gray-700">READ_EXTERNAL_STORAGE / WRITE_EXTERNAL_STORAGE <span className="font-sans text-gray-500">(Android ≤ 9)</span></td>
                    <td className="px-4 py-3 text-gray-600">Save QR card images to the gallery</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-sm text-gray-700">READ_MEDIA_IMAGES <span className="font-sans text-gray-500">(Android 13+)</span></td>
                    <td className="px-4 py-3 text-gray-600">Save QR card images to the gallery</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 mt-4">
              No location, microphone, camera, or contacts permissions are requested.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#06476d] mb-4">8. Security</h2>
            <ul className="space-y-3 text-gray-600">
              {[
                "Administrator session tokens are stored in Android SharedPreferences with MODE_PRIVATE.",
                "On-device route and reading data is stored in a Room (SQLite) database accessible only to the App.",
                "All API communication uses HTTPS (TLS).",
                "We do not log or transmit meter reading images or customer signatures.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 min-w-[8px] rounded-full bg-[#06476d]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-600 mt-4">
              Despite these measures, no transmission over the internet or electronic storage is 100% secure.
              We cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#06476d] mb-4">9. Children's Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              The App is intended for use by electricity cooperative customers (adults) and trained
              administrative staff. We do not knowingly collect information from children under 13. If you
              believe a child has inadvertently used the App and provided personal data, please contact us to
              have it removed.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#06476d] mb-4">10. Your Rights</h2>
            <p className="text-gray-600 mb-4">
              Depending on applicable law, you may have the right to:
            </p>
            <ul className="space-y-3 text-gray-600">
              {[
                ["Access", "the personal data the cooperative holds about you (contact your cooperative directly)."],
                ["Correct", "inaccurate bill or account information (contact your cooperative directly)."],
                ["Delete", "locally saved QR card images at any time through your device's gallery app."],
                ["Withdraw", "administrator session at any time via the in-app logout option."],
              ].map(([bold, rest]) => (
                <li key={bold} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 min-w-[8px] rounded-full bg-[#06476d]" />
                  <span><strong className="text-gray-800">{bold}</strong> {rest}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-600 mt-4">
              Because the App acts as a client to the cooperative's server, requests for data correction or
              deletion of billing records must be directed to the respective cooperative.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#06476d] mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. When we do, we will update the "Last
              Updated" date at the top. For significant changes, we will notify users through an in-app notice
              or via the cooperative. Continued use of the App after any update constitutes acceptance of the
              revised policy.
            </p>
          </section>

          {/* Section 12 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#06476d] mb-4">12. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have questions or concerns about this Privacy Policy or the App's data practices, please
              contact:
            </p>
            <div className="bg-[#06476d]/5 border border-[#06476d]/20 rounded-xl p-5">
              <p className="font-semibold text-gray-800 mb-1">PSI — eBijuli Support</p>
              <p className="text-gray-600 text-sm">
                Email:{" "}
                <a
                  href="mailto:sushilawasthi2999@gmail.com"
                  className="text-[#06476d] hover:underline"
                >
                  sushilawasthi2999@gmail.com
                </a>
              </p>
            </div>
          </section>

          {/* Footer note */}
          <div className="border-t border-gray-100 pt-6 mt-6">
            <p className="text-sm text-gray-400 italic">
              This policy applies to the eBijuli Android application. It does not cover websites, other PSI
              products, or the internal systems of partner electricity cooperatives.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="bg-[#06476d] text-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} PSI Technologies. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
