export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto my-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-semibold mb-4">Terms and Conditions</h2>
      <p className="mb-4">
        By accessing and using Exclusive, you agree to be bound by the following
        terms and conditions:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>You must be at least 18 years old to make a purchase.</li>
        <li>All content on Exclusive is for informational purposes only.</li>
        <li>
          We reserve the right to modify or terminate our services at any time
          without notice.
        </li>
      </ul>
      <p>
        These terms and conditions constitute a legally binding agreement
        between you and Exclusive.
      </p>
    </div>
  );
}
