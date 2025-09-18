import React from "react";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className="bg-white text-gray-800 font-['Public_Sans','Noto_Sans',sans-serif]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-20 md:py-32">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl">
              Empowering{" "}
              <span className="text-green-600">Communities</span>, Protecting{" "}
              <span className="text-green-600">Forests</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 md:text-xl">
              The FRA Atlas & Decision Support System is a pioneering initiative
              to enhance the implementation of the Forest Rights Act in India,
              ensuring justice for forest-dwelling communities and safeguarding
              our vital ecosystems.
            </p>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-5xl px-6 space-y-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                The <span className="text-green-600">Challenge</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Despite the FRA's potential to secure rights for millions and
                protect vital ecosystems, its implementation faces significant
                hurdles. These include a lack of comprehensive data, limited
                access to information, and challenges in monitoring progress
                effectively. This often leads to delays, inconsistencies, and
                inequities in the recognition of forest rights.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                alt="Illustration of a lush green forest"
                className="w-full max-w-md rounded-lg shadow-lg"
                src="src/assets/forest.png"
              />
            </div>
          </div>
          
          {/* Objectives Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our <span className="text-green-600">Objectives</span>
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Centralized Data",
                  desc: "Provide a centralized, accessible platform for all FRA-related data.",
                  icon: "dataset",
                },
                {
                  title: "Advanced Analytics",
                  desc: "Utilize WebGIS and AI to analyze and visualize implementation progress.",
                  icon: "analytics",
                },
                {
                  title: "Evidence-based Policy",
                  desc: "Support decision-making through a robust Decision Support System.",
                  icon: "policy",
                },
                {
                  title: "Transparency",
                  desc: "Promote transparency and accountability in FRA implementation.",
                  icon: "verified",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg bg-green-50/70 p-6 shadow-sm ring-1 ring-green-100"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <span className="material-symbols-outlined">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Components Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Key <span className="text-green-600">Components</span>
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  title: "WebGIS",
                  desc: "A user-friendly, interactive map-based interface for visualizing FRA implementation data across India.",
                },
                {
                  title: "AI-Powered Analytics",
                  desc: "Leveraging artificial intelligence to analyze trends, identify patterns, and assess the impact of FRA implementation.",
                },
                {
                  title: "Decision Support System (DSS)",
                  desc: "A sophisticated tool to support policymakers and administrators in making informed decisions.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-green-200 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-green-600">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team & Impact */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Team & <span className="text-green-600">Partners</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Our team comprises experts in forestry, technology, data
                science, and social justice. We collaborate closely with key
                stakeholders, including the Ministry of Tribal Affairs, state
                forest departments, research institutions, and civil society
                organizations.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                <span className="text-green-600">Impact</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                By providing a comprehensive and transparent view of FRA
                implementation, our project aims to contribute to increased
                recognition of forest rights, improved forest governance, and
                enhanced equity in the management of forest resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 text-gray-800">
        <div className="container mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Logo + Description */}
            <div>
              <Link
                to="/"
                className="flex items-center space-x-2 text-green-600 font-bold text-lg"
              >
                <span
                  className="material-symbols-outlined text-green-600"
                  style={{ fontSize: "32px" }}
                >
                  forest
                </span>
                <span>FRA Atlas & DSS</span>
              </Link>
              <p className="mt-4 text-gray-500">
                Ensuring justice for forest-dwelling communities and protecting forests.
              </p>
            </div>

            {/* Right Sections */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
              <div>
                <h3 className="font-semibold tracking-wider uppercase text-gray-900">
                  Navigation
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link className="text-gray-500 hover:text-green-600" to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-500 hover:text-green-600" to="/map">
                      Map
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-500 hover:text-green-600" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-500 hover:text-green-600" to="/about">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold tracking-wider uppercase text-gray-900">
                  Legal
                </h3>
                <ul className="mt-4 space-y-2">
                  <li><a className="text-gray-500 hover:text-green-600" href="#">Privacy Policy</a></li>
                  <li><a className="text-gray-500 hover:text-green-600" href="#">Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold tracking-wider uppercase text-gray-900">
                  Contact
                </h3>
                <ul className="mt-4 space-y-2">
                  <li><a className="text-gray-500 hover:text-green-600" href="#">Contact Us</a></li>
                  <li><a className="text-gray-500 hover:text-green-600" href="#">Support</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom copyright */}
          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
            <p>© 2025 FRA Atlas & DSS. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
