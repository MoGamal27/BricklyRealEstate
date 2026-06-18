import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const Privacy = () => {
    return (<div className="bg-background text-foreground">

      <Navbar />

      {/* 🔴 HEADER */}
      <div className="bg-primary text-white text-center py-28">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
      </div>

      {/* 📄 CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">

        {/* Intro */}
        <section className="space-y-4 leading-loose">
          <h2 className="text-2xl font-semibold text-primary">
            Privacy Policy
          </h2>
          <p>
            Brickly operates a real estate platform that provides property listings,
            sales, and related services. This page is designed to inform users about
            our policies regarding the collection, use, and disclosure of personal
            information.
          </p>

          <p>
            By using our Service, you agree to the collection and use of information
            in accordance with this policy. The personal information we collect is
            used to provide and improve our Service.
          </p>

          <p>
            We will not use or share your information with anyone except as described
            in this Privacy Policy.
          </p>
        </section>

        {/* Information Collection */}
        <section className="space-y-4 leading-loose">
          <h2 className="text-2xl font-semibold text-primary">
            Information Collection and Use
          </h2>

          <p>
            To improve your experience, we may request personally identifiable
            information such as your name, email address, phone number, and address.
          </p>

          <p>
            This information is used to contact you, assist with property inquiries,
            facilitate transactions, and provide updates on listings or services.
          </p>
        </section>

        {/* Log Data */}
        <section className="space-y-4 leading-loose">
          <h2 className="text-2xl font-semibold text-primary">
            Log Data
          </h2>

          <p>
            When you access our Service, we collect information your browser sends
            known as Log Data.
          </p>

          <p>
            This may include your IP address, browser type, pages visited, time and
            date of visit, duration, and other statistics.
          </p>

          <p>
            This data helps us analyze and improve performance.
          </p>
        </section>

        {/* Cookies */}
        <section className="space-y-4 leading-loose">
          <h2 className="text-2xl font-semibold text-primary">
            Cookies
          </h2>

          <p>
            Cookies are small data files stored on your device used as identifiers.
          </p>

          <p>
            We use cookies to improve your experience. You can accept or refuse them,
            but some features may not work properly without them.
          </p>
        </section>

        {/* Service Providers */}
        <section className="space-y-4 leading-loose">
          <h2 className="text-2xl font-semibold text-primary">
            Service Providers
          </h2>

          <p>
            We may employ third-party companies for the following:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>To facilitate our Service</li>
            <li>To provide the Service on our behalf</li>
            <li>To perform service-related functions</li>
            <li>To analyze usage</li>
          </ul>

          <p>
            These third parties have access to your Personal Information only to
            perform tasks on our behalf and are obligated not to disclose it.
          </p>
        </section>

        {/* Links */}
        <section className="space-y-4 leading-loose">
          <h2 className="text-2xl font-semibold text-primary">
            Links to Other Sites
          </h2>

          <p>
            Our Service may contain links to external sites. If you click on a
            third-party link, you will be directed to that site.
          </p>

          <p>
            We strongly advise you to review the Privacy Policy of these websites.
            We have no control over their content or practices.
          </p>
        </section>

      </div>

      <Footer />
    </div>);
};
export default Privacy;
