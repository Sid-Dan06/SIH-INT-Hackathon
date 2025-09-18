import React, { useState } from "react";

// ✅ Correct relative paths (because Landing.jsx is inside src/pages/)
import WebGIS from "../assets/WebGIS.png";
import DSS from "../assets/DSS.png";
import aiImg from "../assets/aiImg.png";

export default function Landing() {
  const slides = [
    {
      title: "Interactive WebGIS Map",
      step: "Step 1 of 3",
      desc:
        "Visualize Forest Rights Act implementation data across India. Explore claims, track progress, and identify areas needing attention with our dynamic and user-friendly map interface.",
      img: WebGIS,
    },
    {
      title: "DSS Dashboard",
      step: "Step 2 of 3",
      desc:
        "Analyze key metrics and trends to support better decisions across FRA implementation.",
      img: DSS,
    },
    {
      title: "AI Asset Mapping",
      step: "Step 3 of 3",
      desc:
        "Leverage AI to identify and map natural and community assets for better planning and protection.",
      img: aiImg,
    },
  ];

  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow pt-16">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12">
            {/* Headline */}
            <div className="w-full max-w-4xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
                Discover the Power of{" "}
                <span className="text-green-600">FRA Atlas &amp; DSS</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-stone-600">
                Take a quick tour to see how our platform empowers communities
                and protects forests through data-driven insights and
                interactive tools.
              </p>
            </div>

            {/* Carousel */}
            <div className="relative w-full max-w-5xl">
              <div className="absolute inset-0 -skew-y-3 rounded-xl bg-gradient-to-br from-green-100 to-lime-200" />
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                {/* Slides */}
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${index * 100}%)` }}
                  aria-live="polite"
                >
                  {slides.map((s, i) => (
                    <div key={i} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 items-center gap-8 p-8 md:grid-cols-2 md:p-12">
                        <div className="flex flex-col gap-4">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                            {s.step}
                          </span>
                          <h3 className="text-2xl font-bold text-stone-900 sm:text-3xl">
                            {s.title}
                          </h3>
                          <p className="text-stone-600">{s.desc}</p>
                        </div>
                        <div className="h-64 w-full overflow-hidden rounded-lg">
                          <img
                            alt={s.title}
                            className="h-full w-full object-cover"
                            src={s.img}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-4">
                <button
                  onClick={prev}
                  aria-label="Previous slide"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 text-stone-600 shadow-md backdrop-blur-sm transition hover:bg-white"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <div className="flex items-center gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-3 w-3 rounded-full ${
                        i === index ? "bg-green-600" : "bg-white"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  aria-label="Next slide"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 text-stone-600 shadow-md backdrop-blur-sm transition hover:bg-white"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="flex w-full max-w-5xl justify-between rounded-xl bg-white p-6 shadow-lg">
              <div className="flex flex-col gap-4 rounded-lg p-4 transition-all duration-300 hover:bg-stone-50 md:w-1/3">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                    <span className="material-symbols-outlined text-3xl">map</span>
                  </div>
                  <h4 className="text-lg font-bold text-stone-800">WebGIS Map</h4>
                </div>
                <p className="text-sm text-stone-600">
                  Visualize FRA data on an interactive map.
                </p>
              </div>
              <div className="flex flex-col gap-4 rounded-lg p-4 transition-all duration-300 hover:bg-stone-50 md:w-1/3">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                    <span className="material-symbols-outlined text-3xl">dashboard</span>
                  </div>
                  <h4 className="text-lg font-bold text-stone-800">DSS Dashboard</h4>
                </div>
                <p className="text-sm text-stone-600">Analyze key metrics and trends.</p>
              </div>
              <div className="flex flex-col gap-4 rounded-lg p-4 transition-all duration-300 hover:bg-stone-50 md:w-1/3">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                    <span className="material-symbols-outlined text-3xl">aod</span>
                  </div>
                  <h4 className="text-lg font-bold text-stone-800">AI Asset Mapping</h4>
                </div>
                <p className="text-sm text-stone-600">
                  Leverage AI to identify and map assets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer (unchanged) */}
      <footer className="w-full border-t pt-6 text-gray-600 text-sm bg-white">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto px-6 py-6">
          <p>© 2025 FRA Atlas & DSS. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-green-600 hover:text-green-800 text-xl"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-green-600 hover:text-green-800 text-xl"
            >
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
