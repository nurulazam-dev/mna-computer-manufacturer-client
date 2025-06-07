import {
  faClock,
  faEnvelope,
  faGlobe,
  faLocationDot,
  faPhone,
  faShopSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const socialLinks = [
  {
    href: "https://www.facebook.com/nurulazam.dev",
    src: "https://i.ibb.co/SBMtMC1/facebook.png",
    alt: "Facebook",
  },
  {
    href: "https://www.twitter.com/nurulazam_dev",
    src: "https://i.ibb.co/j4T8qbd/twitter.png",
    alt: "Twitter",
  },
  {
    href: "https://www.instagram.com/nurulazam_dev",
    src: "https://i.ibb.co/DkFxTMF/instagram.png",
    alt: "Instagram",
  },
  {
    href: "https://nurulazam-dev.web.app/",
    src: "https://i.ibb.co/JqhBJYJ/google.png",
    alt: "Google",
  },
  {
    href: "https://www.github.com//nurulazam-dev",
    src: "https://i.ibb.co/3Wjh3wv/github.png",
    alt: "GitHub",
    extraClass: "bg-white rounded-lg",
  },
];

const InfoFooter = () => {
  return (
    <footer
      style={{
        background: `linear-gradient(rgba(20,20,40,0.95),rgba(20,20,40,0.95)), url(https://i.ibb.co/MVHdJ1d/bg-2.png) center/cover no-repeat`,
      }}
      className="py-12 px-4 md:px-16 text-white"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Contact Info */}
        <div>
          <h3 className="font-bold text-2xl mb-4 tracking-wide border-b-2 border-primary pb-2 w-fit">
            Contact Info
          </h3>
          <ul className="space-y-3 text-base">
            <li>
              <FontAwesomeIcon
                className="mr-3 text-primary"
                icon={faLocationDot}
              />
              Raozan, Chittagong, Bangladesh.
            </li>
            <li>
              <FontAwesomeIcon
                className="mr-3 text-primary"
                icon={faEnvelope}
              />
              <a
                href="mailto:nurulazam.dev@gmail.com"
                className="hover:underline"
              >
                nurulazam.dev@gmail.com
              </a>
            </li>
            <li>
              <FontAwesomeIcon className="mr-3 text-primary" icon={faPhone} />
              <a href="tel:+8801888000000" className="hover:underline">
                +8801888-000000
              </a>
            </li>
            <li>
              <FontAwesomeIcon className="mr-3 text-primary" icon={faGlobe} />
              <a
                href="https://mnacomputermanuf.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                mnacomputermanuf.com
              </a>
            </li>
          </ul>
        </div>
        {/* Open Hours */}
        <div>
          <h3 className="font-bold text-2xl mb-4 tracking-wide border-b-2 border-primary pb-2 w-fit">
            Open Hours
          </h3>
          <ul className="space-y-3 text-base">
            <li>
              <FontAwesomeIcon
                className="mr-3 text-primary"
                icon={faShopSlash}
              />
              Monday - Saturday
            </li>
            <li>
              <FontAwesomeIcon className="mr-3 text-primary" icon={faClock} />
              8:00am - 5:00pm
            </li>
            <li>
              <FontAwesomeIcon
                className="mr-3 text-primary"
                icon={faShopSlash}
              />
              Sunday is closed
            </li>
          </ul>
        </div>
        {/* Social Links */}
        <div>
          <h3 className="font-bold text-2xl mb-4 tracking-wide border-b-2 border-primary pb-2 w-fit">
            Follow Us
          </h3>
          <div className="flex flex-wrap gap-4 mt-2">
            {socialLinks.map(({ href, src, alt, extraClass }, idx) => (
              <a
                key={alt}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={alt}
                className="transition-transform transform hover:scale-110"
              >
                <img
                  className={`h-10 w-10 ${
                    extraClass || ""
                  } shadow-lg hover:shadow-primary/50 rounded-full`}
                  src={src}
                  alt={alt}
                />
              </a>
            ))}
          </div>
        </div>
        {/* Payment Methods */}
        <div>
          <h3 className="font-bold text-2xl mb-4 tracking-wide border-b-2 border-primary pb-2 w-fit">
            Pay With
          </h3>
          <img
            className="h-24 w-auto mt-4 rounded-lg shadow-lg"
            src="https://i.ibb.co/cYd6mBQ/paymentmethod.png"
            alt="Payment Methods"
          />
        </div>
      </div>
    </footer>
  );
};

export default InfoFooter;
