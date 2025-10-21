import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black  text-white px-6 sm:px-12 md:px-20 py-16 font-poppins">
      <div className="max-w-5xl mx-auto bg-purple-700/90 rounded-2xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Free Trial</h2>
          <p className="text-gray-200">
            We offer a one-month free trial for our app. During this trial period, you can explore the features and services of our platform. No charges will be applied during the free trial.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Refund Policy</h2>
          <p className="text-gray-200">
            Please note that we do not provide refunds for any subscription plans purchased after the trial period. By subscribing to any of our plans, you agree to our no-refund policy.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. Website Creation for Gym Clients</h2>
          <p className="text-gray-200">
            If you purchase the app plan and request a website for your gym, we will create the website for you. However, the domain and hosting costs will be your responsibility. We provide the development and design services only.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Data Privacy</h2>
          <p className="text-gray-200">
            We value your privacy and ensure that your personal information is protected. We do not share your data with third parties without your consent, except as required by law.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Changes to This Policy</h2>
          <p className="text-gray-200">
            We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with an updated date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Contact Us</h2>
          <p className="text-gray-200">
            For any questions regarding this Privacy Policy, please contact us at <span className="font-semibold">xyntechinfo@gmail.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
