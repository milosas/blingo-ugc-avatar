export default function Privacy() {
  return (
    <div className="page-enter py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8 border border-[#E5E5E3]">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-8">Privacy Policy</h1>

          <div className="prose max-w-none">
            <p className="text-[#666666] mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2 className="text-xl font-semibold text-[#1A1A1A] mt-8 mb-4">1. Introduction</h2>
            <p className="text-[#666666] mb-4">
              Welcome to Re Edit Me ("we," "our," or "us"). We are committed to protecting your privacy
              and personal information. This Privacy Policy explains how we collect, use, and safeguard
              your information when you use our AI photo generation service at reeditme.com.
            </p>

            <h2 className="text-xl font-semibold text-[#1A1A1A] mt-8 mb-4">2. Information We Collect</h2>
            <h3 className="text-lg font-medium text-[#1A1A1A] mt-6 mb-3">2.1 Account Information</h3>
            <p className="text-[#666666] mb-4">When you create an account, we collect:</p>
            <ul className="list-disc list-inside text-[#666666] mb-4 space-y-2">
              <li>Email address</li>
              <li>Password (securely hashed)</li>
            </ul>

            <h3 className="text-lg font-medium text-[#1A1A1A] mt-6 mb-3">2.2 Images and Content</h3>
            <p className="text-[#666666] mb-4">When you use our service, we process:</p>
            <ul className="list-disc list-inside text-[#666666] mb-4 space-y-2">
              <li>Photos you upload for AI generation</li>
              <li>Generated images created by our AI</li>
              <li>Notes and annotations you add to images</li>
              <li>Generation settings and preferences</li>
            </ul>

            <h3 className="text-lg font-medium text-[#1A1A1A] mt-6 mb-3">2.3 Automatically Collected Information</h3>
            <p className="text-[#666666] mb-4">We automatically collect certain information when you use our service:</p>
            <ul className="list-disc list-inside text-[#666666] mb-4 space-y-2">
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Usage data and interaction logs</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#1A1A1A] mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="text-[#666666] mb-4">We use your information to:</p>
            <ul className="list-disc list-inside text-[#666666] mb-4 space-y-2">
              <li>Provide and improve our AI photo generation service</li>
              <li>Process your uploaded images and generate new images</li>
              <li>Store your generated images in your personal gallery</li>
              <li>Authenticate and secure your account</li>
              <li>Communicate with you about your account or service updates</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#1A1A1A] mt-8 mb-4">4. Data Storage and Security</h2>
            <p className="text-[#666666] mb-4">Your data is stored securely using Supabase infrastructure. We implement:</p>
            <ul className="list-disc list-inside text-[#666666] mb-4 space-y-2">
              <li>Encrypted data transmission (HTTPS/TLS)</li>
              <li>Row-level security (RLS) to ensure you can only access your own data</li>
              <li>Secure authentication with password hashing</li>
              <li>Private storage buckets for your images</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#1A1A1A] mt-8 mb-4">5. Your Rights</h2>
            <p className="text-[#666666] mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-[#666666] mb-4 space-y-2">
              <li>Access your personal data</li>
              <li>Delete your images from our service</li>
              <li>Delete your account and all associated data</li>
              <li>Export your data</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#1A1A1A] mt-8 mb-4">6. Third-Party Services</h2>
            <p className="text-[#666666] mb-4">We use the following third-party services:</p>
            <ul className="list-disc list-inside text-[#666666] mb-4 space-y-2">
              <li><strong>Supabase</strong> - Authentication, database, and file storage</li>
              <li><strong>AI Image Generation API</strong> - For generating images based on your inputs</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#1A1A1A] mt-8 mb-4">7. Guest Mode</h2>
            <p className="text-[#666666] mb-4">You can use Re Edit Me without creating an account. In guest mode:</p>
            <ul className="list-disc list-inside text-[#666666] mb-4 space-y-2">
              <li>Generated images are temporary and not saved to our servers</li>
              <li>No personal data is collected beyond what's necessary for image generation</li>
              <li>Images are only available during your session</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#1A1A1A] mt-8 mb-4">8. Children's Privacy</h2>
            <p className="text-[#666666] mb-4">
              Our service is not intended for children under 13 years of age. We do not knowingly
              collect personal information from children under 13.
            </p>

            <h2 className="text-xl font-semibold text-[#1A1A1A] mt-8 mb-4">9. Changes to This Policy</h2>
            <p className="text-[#666666] mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any
              significant changes by posting the new Privacy Policy on this page.
            </p>

            <h2 className="text-xl font-semibold text-[#1A1A1A] mt-8 mb-4">10. Contact Us</h2>
            <p className="text-[#666666] mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-[#FF6B35] font-medium">
              support@reeditme.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
