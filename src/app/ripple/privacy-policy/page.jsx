import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Ripple",
  description: "Privacy Policy for the Ripple hospitality management platform by PSI Technologies.",
};

const sections = [
  ["01", "Who we are", "who-we-are"],
  ["02", "Information we handle", "information"],
  ["03", "How we use information", "use"],
  ["04", "How information is shared", "sharing"],
  ["05", "Local printer connections", "printers"],
  ["06", "Cookies and similar technologies", "cookies"],
  ["07", "Security", "security"],
  ["08", "Retention", "retention"],
  ["09", "Account and data deletion", "deletion"],
  ["10", "Children's privacy", "children"],
  ["11", "International processing", "international"],
  ["12", "Changes to this policy", "changes"],
  ["13", "Contact us", "contact"],
];

function Section({ number, id, title, children }) {
  return (
    <section className="policy-section" id={id}>
      <div className="section-number">{number}</div>
      <div className="section-content">
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function RipplePrivacyPolicyPage() {
  return (
    <main className="ripple-policy-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .ripple-policy-page, .ripple-policy-page * { box-sizing: border-box; }
        .ripple-policy-page { --red: #d12128; --red-dark: #a9181e; --ink: #171719; --muted: #68656a; --line: #e9e6e2; --cream: #fbfaf7; --soft: #f3efea; min-height: 100vh; background: var(--cream); color: var(--ink); font-family: 'Plus Jakarta Sans', Arial, sans-serif; }
        .ripple-policy-page a { color: inherit; }
        .policy-topbar { display: flex; align-items: center; justify-content: space-between; gap: 24px; max-width: 1240px; min-height: 82px; margin: auto; padding: 0 32px; }
        .policy-brand { display: inline-flex; align-items: center; gap: 10px; color: var(--ink); text-decoration: none; font-size: 24px; font-weight: 800; letter-spacing: -.07em; }
        .policy-brand img { width: 28px; height: 28px; object-fit: contain; border-radius: 50%; }
        .policy-back { color: var(--muted); font-size: 13px; font-weight: 600; text-decoration: none; transition: color .2s; }
        .policy-back:hover, .policy-topbar a:hover { color: var(--red); }
        .policy-hero { position: relative; overflow: hidden; padding: 82px 24px 78px; border-top: 1px solid rgba(233,230,226,.75); border-bottom: 1px solid var(--line); text-align: center; background: radial-gradient(circle at 50% 0%, rgba(209,33,40,.11), transparent 34%), repeating-linear-gradient(0deg, transparent 0, transparent 89px, rgba(24,24,30,.035) 90px), repeating-linear-gradient(90deg, transparent 0, transparent 89px, rgba(24,24,30,.035) 90px); }
        .policy-hero:after { content: ''; position: absolute; width: 310px; height: 310px; right: -155px; bottom: -190px; border: 1px solid rgba(209,33,40,.2); border-radius: 50%; }
        .policy-eyebrow { position: relative; z-index: 1; color: var(--red); font-size: 11px; letter-spacing: .17em; text-transform: uppercase; font-weight: 800; }
        .policy-hero h1 { position: relative; z-index: 1; max-width: 760px; margin: 18px auto 0; font-size: clamp(40px, 6vw, 68px); line-height: 1.03; letter-spacing: -.075em; }
        .policy-hero p { position: relative; z-index: 1; max-width: 630px; margin: 20px auto 0; color: var(--muted); font-size: 15px; line-height: 1.7; }
        .policy-meta { display: flex; justify-content: center; flex-wrap: wrap; gap: 9px 24px; margin-top: 26px; color: #888286; font-size: 12px; }
        .policy-meta strong { color: var(--ink); }
        .policy-layout { display: grid; grid-template-columns: 220px minmax(0, 790px); gap: 72px; max-width: 1100px; margin: auto; padding: 76px 24px 110px; }
        .policy-nav { position: sticky; top: 28px; align-self: start; }
        .policy-nav-label { margin-bottom: 15px; color: #a29b98; font-size: 10px; letter-spacing: .15em; text-transform: uppercase; font-weight: 800; }
        .policy-nav a { display: block; padding: 6px 0 6px 13px; border-left: 1px solid var(--line); color: #7c7675; font-size: 11px; line-height: 1.35; text-decoration: none; transition: color .2s, border-color .2s; }
        .policy-nav a:hover { border-color: var(--red); color: var(--red); }
        .policy-article { min-width: 0; }
        .policy-intro { margin-bottom: 48px; padding: 23px 25px; border: 1px solid #eed5d5; border-radius: 12px; background: #fff7f6; color: #685e5e; font-size: 13px; line-height: 1.75; }
        .policy-intro strong { color: var(--red-dark); }
        .policy-section { display: grid; grid-template-columns: 42px 1fr; gap: 18px; padding: 0 0 47px; margin-bottom: 47px; border-bottom: 1px solid var(--line); scroll-margin-top: 30px; }
        .section-number { display: flex; align-items: center; justify-content: center; width: 37px; height: 37px; border-radius: 10px; background: #fbe9e9; color: var(--red); font-size: 11px; font-weight: 800; }
        .section-content h2 { margin: 1px 0 18px; font-size: 25px; line-height: 1.2; letter-spacing: -.055em; }
        .section-content p { margin: 0 0 15px; color: var(--muted); font-size: 13px; line-height: 1.8; }
        .section-content p:last-child { margin-bottom: 0; }
        .policy-list { display: flex; flex-direction: column; gap: 12px; margin: 0; padding: 0; color: var(--muted); list-style: none; font-size: 13px; line-height: 1.75; }
        .policy-list li { position: relative; padding-left: 19px; }
        .policy-list li:before { content: ''; position: absolute; top: .75em; left: 0; width: 6px; height: 6px; border-radius: 50%; background: var(--red); }
        .policy-list strong, .section-content strong { color: #373337; }
        .policy-steps { counter-reset: deletion-step; }
        .policy-steps li { counter-increment: deletion-step; padding-left: 31px; }
        .policy-steps li:before { content: counter(deletion-step); top: .2em; width: 20px; height: 20px; color: var(--red); background: #fbe9e9; font-size: 10px; line-height: 20px; text-align: center; }
        .policy-contact { margin-top: 22px; padding: 21px 23px; border: 1px solid #ead5d5; border-radius: 12px; background: #fff7f6; }
        .policy-contact p { margin: 0; }
        .policy-contact a { color: var(--red); font-weight: 700; text-decoration: none; }
        .policy-contact a:hover { text-decoration: underline; }
        .policy-code { display: inline-block; padding: 2px 6px; border-radius: 4px; background: #f0ece8; color: #4d4647; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; }
        .policy-footer { display: flex; justify-content: space-between; gap: 24px; padding: 36px max(24px, calc((100% - 1100px) / 2)); background: var(--ink); color: #8c898d; font-size: 11px; line-height: 1.6; }
        .policy-footer a { color: white; text-decoration: none; }
        .policy-footer a:hover { color: #ffb9ba; }
        @media (max-width: 800px) { .policy-layout { display: block; padding-top: 48px; }.policy-nav { display: none; }.policy-topbar { padding: 0 24px; }.policy-hero { padding-top: 64px; padding-bottom: 60px; } }
        @media (max-width: 560px) { .policy-topbar { min-height: 70px; }.policy-brand { font-size: 21px; }.policy-back { font-size: 11px; }.policy-hero h1 { font-size: 42px; }.policy-layout { padding-left: 18px; padding-right: 18px; }.policy-section { grid-template-columns: 1fr; gap: 14px; }.section-number { width: 34px; height: 34px; }.section-content h2 { font-size: 23px; }.policy-footer { flex-direction: column; } }
      `}</style>

      <header className="policy-topbar">
        <Link className="policy-brand" href="/ripple" aria-label="Ripple home">
          <img src="/restroelite/ripplehmsicon-01.png" alt="" aria-hidden="true" />
          <span>ripple</span>
        </Link>
        <Link className="policy-back" href="/ripple">← Back to Ripple</Link>
      </header>

      <section className="policy-hero">
        <div className="policy-eyebrow">Ripple · PSI Technologies</div>
        <h1>Privacy Policy</h1>
        <p>
          A clear look at the information Ripple handles, why it is needed, and the choices available to you
          when using the Ripple app and service.
        </p>
        <div className="policy-meta">
          <span><strong>Effective date:</strong> October 27, 2026</span>
          <span><strong>Last updated:</strong> October 27, 2026</span>
        </div>
      </section>

      <div className="policy-layout">
        <nav className="policy-nav" aria-label="Privacy policy sections">
          <div className="policy-nav-label">On this page</div>
          {sections.map(([number, title, id]) => <a href={`#${id}`} key={id}>{number} &nbsp; {title}</a>)}
        </nav>

        <article className="policy-article">
          <div className="policy-intro">
            This Privacy Policy explains how <strong>PSI Technologies</strong> ("we," "us," or "our") handles
            information in the Ripple Android application (the "App") and the Ripple service available at
            <strong> ripple.psinepal.com.np</strong> (the "Service"). Ripple is a native Android wrapper for the
            Service and is intended for business users, not children.
          </div>

          <Section number="01" id="who-we-are" title="Who we are">
            <p><strong>Developer/company:</strong> PSI Technologies</p>
            <p><strong>Address:</strong> H01 Mahendra Highway, Krishnapur, Kanchanpur District, Sudurpaschim Province, Nepal, PO Box 10400</p>
            <p><strong>Privacy contact:</strong> <a href="mailto:m.info.psi@gmail.com">m.info.psi@gmail.com</a></p>
            <p><strong>Support contact:</strong> <a href="mailto:m.info.psi@gmail.com">m.info.psi@gmail.com</a></p>
          </Section>

          <Section number="02" id="information" title="Information the App and Service handle">
            <p>The information handled depends on how an organization and its users use Ripple. This may include:</p>
            <ul className="policy-list">
              <li><strong>Account and contact information:</strong> name, email address, phone number, login credentials, organization, and role when provided during registration or use of the Service.</li>
              <li><strong>Business and transaction information:</strong> restaurant, inventory, order, sales, staff, customer, product, payment, and reporting data entered or uploaded by users.</li>
              <li><strong>Printer configuration:</strong> printer IP addresses and port numbers entered in the App. These settings are stored locally in the App&apos;s private Android storage and are used to send print jobs to printers selected by the user on the local network.</li>
              <li><strong>WebView storage:</strong> cookies, authentication sessions, cached content, and web storage used by the Service so users can remain signed in and the Service can function correctly.</li>
              <li><strong>Technical and usage information:</strong> IP address, device and browser type, operating system, timestamps, requested pages, and error or security logs received by the Service or its hosting providers.</li>
            </ul>
            <p style={{ marginTop: 15 }}>The native Android App requests only the <span className="policy-code">INTERNET</span> and <span className="policy-code">ACCESS_NETWORK_STATE</span> permissions. It does not request access to contacts, SMS, call logs, precise location, camera, microphone, or installed-app information.</p>
          </Section>

          <Section number="03" id="use" title="How we use information">
            <p>We may use information to:</p>
            <ul className="policy-list">
              <li>provide, operate, authenticate, and maintain the App and Service;</li>
              <li>save user preferences and maintain login sessions;</li>
              <li>process business records and reports at the user&apos;s direction;</li>
              <li>send print jobs to configured local printers;</li>
              <li>protect the App and Service, detect misuse, prevent fraud, and troubleshoot errors;</li>
              <li>respond to support requests and communicate about the Service; and</li>
              <li>comply with legal obligations and enforce our agreements.</li>
            </ul>
          </Section>

          <Section number="04" id="sharing" title="How information is shared">
            <p>We may share information only as needed to operate the Service, including with:</p>
            <ul className="policy-list">
              <li><strong>Service providers:</strong> hosting, database, infrastructure, security, email, support, and other providers that process information on our behalf;</li>
              <li><strong>Organization administrators:</strong> users who administer the relevant Ripple organization or account;</li>
              <li><strong>Other parties at the user&apos;s direction:</strong> for example, when a user chooses to export, print, or otherwise share information through the Service; and</li>
              <li><strong>Authorities or other parties when required:</strong> where required by law, legal process, or to protect rights, safety, and security.</li>
            </ul>
            <p style={{ marginTop: 15 }}>The native Android wrapper does not include advertising or analytics SDKs. The connected web Service may use additional providers or technologies needed to operate it. We do not sell personal information.</p>
          </Section>

          <Section number="05" id="printers" title="Local printer connections">
            <p>When a user configures a printer, the App may connect directly to the IP address and port supplied by the user over the local network and transmit the print content requested by the user.</p>
            <p>The App does not discover printers automatically. Users should configure only printers and networks they are authorized to use.</p>
          </Section>

          <Section number="06" id="cookies" title="Cookies and similar technologies">
            <p>The Service may use cookies, local storage, session storage, and similar technologies for authentication, security, preferences, and core functionality.</p>
            <p>Disabling these technologies may prevent login or other features from working. The App does not clear the Service&apos;s session automatically between launches.</p>
          </Section>

          <Section number="07" id="security" title="Security">
            <p>The App connects to the Service over HTTPS. We use reasonable technical and organizational safeguards appropriate to the information we process.</p>
            <p>No method of transmission or storage is completely secure, so we cannot guarantee absolute security.</p>
          </Section>

          <Section number="08" id="retention" title="Retention">
            <p>We retain information for as long as necessary to provide the Service, maintain business and security records, resolve disputes, comply with legal obligations, and enforce agreements. Retention periods may vary by information type and organization configuration.</p>
            <p>Printer settings stored locally remain on the device until the user changes or removes them, clears the App&apos;s storage, or uninstalls the App.</p>
          </Section>

          <Section number="09" id="deletion" title="Account and data deletion">
            <p>If the Service allows users to create an account, users may request account deletion and deletion of associated personal data by:</p>
            <ol className="policy-list policy-steps">
              <li>using the account deletion controls provided in the Service, where available; or</li>
              <li>emailing <a href="mailto:m.info.psi@gmail.com">m.info.psi@gmail.com</a> from the account email address and requesting account deletion.</li>
            </ol>
            <p style={{ marginTop: 15 }}>We will verify the request, delete the account and associated data that we are required to delete, and retain only information that we must keep for legal, security, accounting, or dispute-resolution purposes.</p>
            <p>Deleting the App removes locally stored printer settings and local App data only. It does not by itself delete a Ripple account or data stored by the Service.</p>
          </Section>

          <Section number="10" id="children" title="Children&apos;s privacy">
            <p>The App and Service are intended for business users and are not directed to children under 13 (or the applicable minimum age in the user&apos;s location). We do not knowingly collect personal information from children.</p>
            <p>If you believe a child has provided personal information, contact us at <a href="mailto:m.info.psi@gmail.com">m.info.psi@gmail.com</a>.</p>
          </Section>

          <Section number="11" id="international" title="International processing">
            <p>Information may be processed in countries other than the country where the user lives. Where required by law, we use appropriate safeguards for international transfers.</p>
          </Section>

          <Section number="12" id="changes" title="Changes to this policy">
            <p>We may update this Privacy Policy when the App, Service, or applicable legal requirements change. We will post the updated version at the public URL where this policy is hosted and update the effective date.</p>
            <p>Material changes may also be communicated through the App or Service where appropriate.</p>
          </Section>

          <Section number="13" id="contact" title="Contact us">
            <p>For privacy questions, requests, or complaints, contact:</p>
            <div className="policy-contact">
              <p><strong>PSI Technologies</strong><br />
                <a href="mailto:m.info.psi@gmail.com">m.info.psi@gmail.com</a><br />
                H01 Mahendra Highway, Krishnapur, Kanchanpur District, Sudurpaschim Province, Nepal, PO Box 10400
              </p>
            </div>
          </Section>

          <p style={{ color: "#938d8b", fontSize: 11, lineHeight: 1.7 }}>
            This policy applies to the Ripple Android application and the Ripple Service. It does not cover other PSI products or third-party services that may be linked from Ripple.
          </p>
        </article>
      </div>

      <footer className="policy-footer">
        <span>© {new Date().getFullYear()} PSI Technologies. A PSI Technologies product.</span>
        <Link href="/ripple">Return to Ripple →</Link>
      </footer>
    </main>
  );
}
