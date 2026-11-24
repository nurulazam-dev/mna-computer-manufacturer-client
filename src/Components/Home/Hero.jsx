import React from "react";
import { Link } from "react-router-dom";
import { faArrowRight, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Your Trusted Technology Partner
            </div>

            <h1 className="text-4xl font-extrabold  tracking-tight sm:text-5xl lg:text-6xl">
              Power Your World
              <span className="mt-2 block bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                With Better Technology.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              Discover quality computer hardware, essential components, and
              reliable technology solutions designed to power your work,
              creativity, and everyday performance.
            </p>

            {/* CTA Buttons */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-3 rounded-lg bg-green-600 px-7 py-4 font-semibold text-white shadow-lg shadow-green-600/20 transition duration-300 hover:-translate-y-1 hover:bg-green-500"
              >
                Explore Products
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-7 py-4 font-semibold text-white transition duration-300 hover:border-blue-400 hover:bg-white/5"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Product Showcase */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute inset-5 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 p-3 shadow-2xl shadow-blue-950/40">
              <img
                src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=85"
                alt="Modern computer workstation"
                className="h-[300px] w-full rounded-xl object-cover sm:h-[420px]"
              />

              <div className="absolute bottom-7 left-7 right-7 rounded-xl border border-white/10 bg-slate-950/85 p-5 shadow-xl backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  Technology & Innovation
                </p>

                <h3 className="mt-2 text-xl font-bold sm:text-2xl">
                  Built for Performance
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Find the right technology for your next big idea.
                </p>
              </div>
            </div>

            {/* Floating Feature Card */}
            <div className="absolute -left-4 top-8 hidden rounded-xl border border-white/10 bg-slate-900/95 p-4 shadow-xl sm:block lg:-left-10">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
                  <FontAwesomeIcon icon={faTruckFast} className="text-xl" />
                </div>
                <div>
                  <p className="text-sm font-bold">Easy Shopping</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Convenient experience
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Floating Badge */}
            <div className="absolute -right-3 top-1/2 hidden rounded-xl border border-cyan-400/20 bg-slate-900 px-4 py-3 shadow-xl sm:block lg:-right-8">
              <p className="text-xs text-slate-400">Your Technology</p>
              <p className="mt-1 font-bold text-cyan-400">Your Way</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
