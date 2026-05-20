import { LegalLayout } from "./LegalLayout";

const Cancellation = () => (
  <LegalLayout title="Cancellation & Refund Policy" description="Vandan Darshan cancellation and refund terms for darshan, puja, prasad and yatra bookings.">
    <p>We understand that plans can change. Below are our cancellation and refund terms — designed to be fair to both devotees and our on-ground partners.</p>

    <h2>1. Cancellation by devotee</h2>
    <ul>
      <li><b>72+ hours before service:</b> 90% refund (10% processing fee).</li>
      <li><b>48–72 hours before service:</b> 50% refund.</li>
      <li><b>24–48 hours before service:</b> 25% refund.</li>
      <li><b>Less than 24 hours / no-show:</b> No refund.</li>
    </ul>

    <h2>2. Special service exceptions</h2>
    <ul>
      <li>Festival darshan, helicopter yatra, and special pujas are <b>non-refundable</b> once confirmed, due to advance bookings with temple trusts and operators.</li>
      <li>Prasad delivery is non-refundable once dispatched.</li>
      <li>Chadhava / offerings made on your behalf are non-refundable once performed.</li>
    </ul>

    <h2>3. Cancellation by Vandan Darshan</h2>
    <p>If we are unable to provide a confirmed service (other than due to force majeure), you will receive a 100% refund or an option to reschedule.</p>

    <h2>4. Force majeure</h2>
    <p>Cancellations due to weather, natural disasters, government orders, temple closures, or any event beyond our control are non-refundable. We will, however, do our best to reschedule the service.</p>

    <h2>5. Refund process</h2>
    <ul>
      <li>Approved refunds are initiated within 3 business days.</li>
      <li>Refunds reach the original payment source in 5–10 business days, depending on your bank.</li>
      <li>Bank/gateway charges (if any) may be deducted.</li>
    </ul>

    <h2>6. How to request</h2>
    <p>Email <a href="mailto:seva@vandandarshan.com" className="text-primary">seva@vandandarshan.com</a> with your booking reference and reason. Our team will respond within 24 hours.</p>
  </LegalLayout>
);

export default Cancellation;
