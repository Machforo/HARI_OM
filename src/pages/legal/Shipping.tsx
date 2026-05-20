import { LegalLayout } from "./LegalLayout";

const Shipping = () => (
  <LegalLayout title="Shipping & Delivery Policy" description="Delivery terms for Vandan Darshan prasad, photo-proofs and physical items.">
    <p>This policy covers the delivery of prasad, sankalp photos/videos, certificates and any other physical items dispatched by Vandan Darshan.</p>

    <h2>1. Prasad delivery</h2>
    <ul>
      <li>Prasad is dispatched within 3–7 working days after the service is performed at the temple.</li>
      <li>Standard delivery within India: 4–10 business days from dispatch.</li>
      <li>International delivery: 10–25 business days, subject to customs.</li>
      <li>Tracking details are shared via SMS/email/WhatsApp once dispatched.</li>
    </ul>

    <h2>2. Digital deliverables</h2>
    <p>Sankalp video, photos and digital certificates are shared via WhatsApp and email within 24–72 hours of the service.</p>

    <h2>3. Charges</h2>
    <p>Standard shipping within India is included for most prasad packages. Express, international or oversized shipments may carry additional charges, communicated upfront.</p>

    <h2>4. Delays</h2>
    <p>Delays may occur due to courier issues, weather, festivals or customs. We are not liable for delays caused by third-party logistics partners.</p>

    <h2>5. Damage / non-receipt</h2>
    <p>Report any damage or non-delivery within 7 days of expected delivery to <a href="mailto:seva@vandandarshan.com" className="text-primary">seva@vandandarshan.com</a>. We will investigate and re-ship at no cost where applicable.</p>

    <h2>6. Address accuracy</h2>
    <p>Please ensure your shipping address and contact number are accurate. Re-shipping due to incorrect address may incur additional charges.</p>
  </LegalLayout>
);

export default Shipping;
