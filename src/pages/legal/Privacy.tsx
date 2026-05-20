import { LegalLayout } from "./LegalLayout";

const Privacy = () => (
  <LegalLayout title="Privacy Policy" description="How Vandan Darshan collects, uses and protects your personal information.">
    <p>Vandan Darshan respects your privacy. This policy explains what we collect, how we use it, and your rights.</p>

    <h2>1. Information we collect</h2>
    <ul>
      <li><b>Personal details:</b> name, phone, email, address, age, ID for temple bookings.</li>
      <li><b>Booking details:</b> temple, service, date, number of devotees and special requests.</li>
      <li><b>Payment details:</b> processed by secure third-party gateways; we do not store full card information.</li>
      <li><b>Technical data:</b> device, browser, IP, anonymised analytics.</li>
    </ul>

    <h2>2. How we use it</h2>
    <ul>
      <li>To process your booking and coordinate with temple authorities.</li>
      <li>To contact you regarding your request, updates or related services.</li>
      <li>To improve our website, services and customer support.</li>
      <li>To meet legal and regulatory obligations.</li>
    </ul>

    <h2>3. Sharing</h2>
    <p>We share information only with: temple authorities (where required for darshan/puja), verified on-ground partners, payment processors, and government bodies when legally required. We do not sell your data to third parties.</p>

    <h2>4. Data retention</h2>
    <p>We retain personal data only as long as necessary to fulfil the booking and meet legal requirements.</p>

    <h2>5. Security</h2>
    <p>We use industry-standard encryption and access controls. However, no method of transmission over the internet is 100% secure.</p>

    <h2>6. Your rights</h2>
    <ul>
      <li>Access, correct or delete your personal data.</li>
      <li>Opt out of marketing communications at any time.</li>
      <li>Lodge a complaint with the relevant data protection authority.</li>
    </ul>

    <h2>7. Cookies</h2>
    <p>Our site uses essential cookies for functionality and analytics cookies to improve user experience. You may disable cookies in your browser.</p>

    <h2>8. Contact</h2>
    <p>For privacy queries, write to <a href="mailto:seva@vandandarshan.com" className="text-primary">seva@vandandarshan.com</a>.</p>
  </LegalLayout>
);

export default Privacy;
