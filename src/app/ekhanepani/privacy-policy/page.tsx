/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — eKhanepani | PSI Technologies",
  description: "Privacy Policy for the eKhanepani mobile application by PSI Technologies.",
};

const bulletItems = [
  ["Bill lookup and display", "Customer ID and sanstha selection are sent to the water supply sanstha's server to retrieve your bill."],
  ["Payment QR generation", "Bill amount and customer reference are forwarded to FonePay to produce a one-time dynamic QR code."],
  ["Payment status polling", "The App checks payment status after a QR is displayed until payment is confirmed or the dialog is closed."],
  ["Meter reading workflow", "Route data is downloaded for offline use; meter readings are stored locally and uploaded when a staff user starts a sync."],
  ["Session management", "Staff login sessions are stored locally to avoid repeated logins during a field session."],
];

export default function EKhanepaniPrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#06476d] text-white py-4 px-6">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="text-white/80 hover:text-white text-sm transition-colors">
            ← Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0" aria-hidden="true">
              <img src="/logo-01.png" alt="" className="h-full w-full object-contain" />
            </div>
            <span className="text-sm text-white/80">eKhanepani</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-12">
        <article className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:p-12">
          <div className="mb-8 flex items-start gap-4 border-b border-gray-100 pb-8">
            <div className="hidden h-16 w-16 shrink-0 sm:block" aria-hidden="true">
              <img src="/logo-01.png" alt="" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#2e8bc5]">eKhanepani · PSI Technologies</p>
              <h1 className="text-3xl font-bold text-[#06476d] md:text-4xl">Privacy Policy</h1>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                <span><strong className="text-gray-700">Effective Date:</strong> November 22, 2026</span>
                <span><strong className="text-gray-700">Last Updated:</strong> November 22, 2026</span>
              </div>
            </div>
          </div>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold text-[#06476d]">1. Introduction</h2>
            <p className="mb-4 leading-relaxed text-gray-600">
              eKhanepani ("the App", "we", "our") is a mobile application developed by <strong>PSI</strong> for water supply sansthas and their customers in Nepal. The App supports two user groups:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-gray-600">
              <li><strong>Customers</strong> — who look up water bills and pay online through the FonePay QR-based payment gateway.</li>
              <li><strong>Sanstha staff and administrators</strong> — who manage customer accounts, conduct field meter readings, generate invoices, and record payments.</li>
            </ul>
            <p className="mt-4 leading-relaxed text-gray-600">
              This Privacy Policy explains what information we collect, how we use it, who we share it with, and your rights regarding your data.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-[#06476d]">2. Information We Collect</h2>
            <h3 className="mb-3 text-base font-semibold text-gray-800">2.1 Customer Users</h3>
            <div className="mb-6 overflow-x-auto">
              <table className="w-full overflow-hidden rounded-lg border border-gray-200 text-left text-sm">
                <thead className="bg-[#06476d]/10 text-gray-700"><tr><th className="w-1/3 px-4 py-3 font-semibold">Data</th><th className="px-4 py-3 font-semibold">Purpose</th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-3 font-medium text-gray-700">Water supply sanstha selection</td><td className="px-4 py-3 text-gray-600">Identify the billing entity to query</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-gray-700">Customer ID / Account Number</td><td className="px-4 py-3 text-gray-600">Fetch your specific water bill from the sanstha's server</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-gray-700">Bill details</td><td className="px-4 py-3 text-gray-600">Display payment information; fetched from the sanstha's system and not stored by the App</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-gray-700">Payment transaction details</td><td className="px-4 py-3 text-gray-600">Passed to FonePay to generate a payment QR; we do not store card or wallet credentials</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mb-6 rounded-r-lg border-l-4 border-[#2e8bc5] bg-blue-50 p-4 text-sm text-gray-600">
              Customers do not create an account in the App. No passwords, emails, or personal contact details are collected from customer users by the App.
            </div>

            <h3 className="mb-3 text-base font-semibold text-gray-800">2.2 Sanstha Staff and Administrator Users</h3>
            <div className="mb-6 overflow-x-auto">
              <table className="w-full overflow-hidden rounded-lg border border-gray-200 text-left text-sm">
                <thead className="bg-[#06476d]/10 text-gray-700"><tr><th className="w-1/3 px-4 py-3 font-semibold">Data</th><th className="px-4 py-3 font-semibold">Purpose</th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-3 font-medium text-gray-700">Login credentials</td><td className="px-4 py-3 text-gray-600">Authenticate with the sanstha's server; session token is stored locally on the device</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-gray-700">Profile information</td><td className="px-4 py-3 text-gray-600">Display the staff profile in the App; fetched from the server</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-gray-700">Downloaded route data</td><td className="px-4 py-3 text-gray-600">List of customers and water meters assigned for a billing cycle; stored locally in an encrypted on-device database</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-gray-700">Meter readings</td><td className="px-4 py-3 text-gray-600">Readings captured during field visits; stored locally until uploaded to the sanstha's server</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-gray-700">Device storage access</td><td className="px-4 py-3 text-gray-600">Save QR payment card images to the device gallery only when the user explicitly requests a download</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="mb-3 text-base font-semibold text-gray-800">2.3 Automatically Collected Technical Data</h3>
            <p className="leading-relaxed text-gray-600">
              The App does <strong>not</strong> collect analytics, crash telemetry, advertising identifiers, or device fingerprints. Standard Android network requests may carry your device IP address to the sanstha's API server.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-[#06476d]">3. How We Use Your Information</h2>
            <ul className="space-y-3 text-gray-600">
              {bulletItems.map(([title, description]) => <li key={title} className="flex gap-3"><span className="mt-1 h-2 w-2 min-w-[8px] rounded-full bg-[#06476d]" /><span><strong className="text-gray-800">{title}</strong> — {description}</span></li>)}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-[#06476d]">4. Data Storage and Retention</h2>
            <div className="mb-4 overflow-x-auto">
              <table className="w-full overflow-hidden rounded-lg border border-gray-200 text-left text-sm">
                <thead className="bg-[#06476d]/10 text-gray-700"><tr><th className="px-4 py-3 font-semibold">Data type</th><th className="px-4 py-3 font-semibold">Where stored</th><th className="px-4 py-3 font-semibold">How long</th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-3 font-medium text-gray-700">Customer bill data</td><td className="px-4 py-3 text-gray-600">In memory only</td><td className="px-4 py-3 text-gray-600">Cleared when the App is closed or a new search is made</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-gray-700">QR payment card image</td><td className="px-4 py-3 text-gray-600">Device gallery, only if saved by the user</td><td className="px-4 py-3 text-gray-600">Until the user manually deletes it</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-gray-700">Staff route and reading data</td><td className="px-4 py-3 text-gray-600">On-device SQLite database</td><td className="px-4 py-3 text-gray-600">Replaced on a new download; deleted on upload</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-gray-700">Staff session token</td><td className="px-4 py-3 text-gray-600">Device SharedPreferences</td><td className="px-4 py-3 text-gray-600">Until the staff user logs out</td></tr>
                </tbody>
              </table>
            </div>
            <p className="leading-relaxed text-gray-600">We do <strong>not</strong> maintain a separate database of customer or staff data within the App itself. Authoritative billing and account data lives on the relevant water supply sanstha's server.</p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-[#06476d]">5. Third-Party Services</h2>
            <p className="mb-4 text-gray-600">The App integrates with FonePay for QR payment processing. FonePay has its own privacy policy at <a className="text-[#06476d] hover:underline" href="https://fonepay.com/privacy-policy" target="_blank" rel="noopener noreferrer">fonepay.com/privacy-policy</a>.</p>
            <p className="leading-relaxed text-gray-600">The water supply sanstha's server API receives customer IDs, bill queries, meter readings, and payment confirmations. Data handling on that server is governed by the respective sanstha's policies.</p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-[#06476d]">6. Data Sharing</h2>
            <p className="mb-4 text-gray-600">We do <strong>not</strong> sell, trade, or rent personal information to third parties. Data is shared only:</p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 min-w-[8px] rounded-full bg-[#06476d]" /><span>With the water supply sanstha's API server to provide bill lookup, route download, and meter-reading upload features.</span></li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 min-w-[8px] rounded-full bg-[#06476d]" /><span>With FonePay solely to generate and verify a payment QR code.</span></li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 min-w-[8px] rounded-full bg-[#06476d]" /><span>If required by law, in response to a lawful request from government or regulatory authorities.</span></li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-[#06476d]">7. Permissions Used</h2>
            <div className="overflow-x-auto">
              <table className="w-full overflow-hidden rounded-lg border border-gray-200 text-left text-sm">
                <thead className="bg-[#06476d]/10 text-gray-700"><tr><th className="px-4 py-3 font-semibold">Android permission</th><th className="px-4 py-3 font-semibold">Reason</th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-3 font-mono text-gray-700">INTERNET</td><td className="px-4 py-3 text-gray-600">Communicate with the sanstha's server and payment gateway</td></tr>
                  <tr><td className="px-4 py-3 font-mono text-gray-700">READ_EXTERNAL_STORAGE / WRITE_EXTERNAL_STORAGE <span className="font-sans text-gray-500">(Android ≤ 9)</span></td><td className="px-4 py-3 text-gray-600">Save QR payment card images to the gallery</td></tr>
                  <tr><td className="px-4 py-3 font-mono text-gray-700">READ_MEDIA_IMAGES <span className="font-sans text-gray-500">(Android 13+)</span></td><td className="px-4 py-3 text-gray-600">Save QR payment card images to the gallery</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-gray-600">No location, microphone, camera, or contacts permissions are requested.</p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-[#06476d]">8. Security</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 min-w-[8px] rounded-full bg-[#06476d]" /><span>Staff session tokens are stored in Android SharedPreferences with MODE_PRIVATE.</span></li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 min-w-[8px] rounded-full bg-[#06476d]" /><span>On-device route and reading data is stored in a Room (SQLite) database accessible only to the App.</span></li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 min-w-[8px] rounded-full bg-[#06476d]" /><span>All API communication uses HTTPS (TLS).</span></li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 min-w-[8px] rounded-full bg-[#06476d]" /><span>We do not log or transmit meter-reading images or customer signatures.</span></li>
            </ul>
            <p className="mt-4 text-gray-600">Despite these measures, no transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.</p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-[#06476d]">9. Children's Privacy</h2>
            <p className="leading-relaxed text-gray-600">The App is intended for water supply sanstha customers and trained staff. We do not knowingly collect information from children under 13. If you believe a child has inadvertently used the App and provided personal data, please contact us to have it removed.</p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-[#06476d]">10. Your Rights</h2>
            <p className="mb-4 text-gray-600">Depending on applicable law, you may have the right to:</p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 min-w-[8px] rounded-full bg-[#06476d]" /><span><strong className="text-gray-800">Access</strong> the personal data the sanstha holds about you by contacting the sanstha directly.</span></li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 min-w-[8px] rounded-full bg-[#06476d]" /><span><strong className="text-gray-800">Correct</strong> inaccurate bill or account information by contacting the sanstha directly.</span></li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 min-w-[8px] rounded-full bg-[#06476d]" /><span><strong className="text-gray-800">Delete</strong> locally saved QR payment card images through your device's gallery.</span></li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 min-w-[8px] rounded-full bg-[#06476d]" /><span><strong className="text-gray-800">Withdraw</strong> a staff session at any time through the in-app logout option.</span></li>
            </ul>
            <p className="mt-4 text-gray-600">Because the App acts as a client to the sanstha's server, requests for correction or deletion of billing records must be directed to the relevant water supply sanstha.</p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-[#06476d]">11. Changes to This Policy</h2>
            <p className="leading-relaxed text-gray-600">We may update this Privacy Policy from time to time. When we do, we will update the "Last Updated" date at the top. For significant changes, we will notify users through an in-app notice or via the water supply sanstha. Continued use of the App after an update constitutes acceptance of the revised policy.</p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-[#06476d]">12. Contact Us</h2>
            <p className="mb-4 text-gray-600">If you have questions or concerns about this Privacy Policy or the App's data practices, please contact:</p>
            <div className="rounded-xl border border-[#06476d]/20 bg-[#06476d]/5 p-5">
              <p className="mb-1 font-semibold text-gray-800">PSI — eKhanepani Support</p>
              <p className="text-sm text-gray-600">Email: <a href="mailto:sushilawasthi2999@gmail.com" className="text-[#06476d] hover:underline">sushilawasthi2999@gmail.com</a></p>
            </div>
          </section>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <p className="text-sm italic text-gray-400">This policy applies to the eKhanepani Android application. It does not cover websites, other PSI products, or the internal systems of partner water supply sansthas.</p>
          </div>
        </article>
      </main>

      <footer className="mt-8 bg-[#06476d] py-6 text-center text-sm text-white/60">
        <p>© {new Date().getFullYear()} PSI Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
}
