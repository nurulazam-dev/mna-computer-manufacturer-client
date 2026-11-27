// import {
//   faClock,
//   faEnvelope,
//   faGlobe,
//   faLocationDot,
//   faPhone,
//   faShopSlash,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const socialLinks = [
//   {
//     href: "https://www.facebook.com/nurulazam.dev",
//     src: "https://i.ibb.co/SBMtMC1/facebook.png",
//     alt: "Facebook",
//   },
//   {
//     href: "https://www.twitter.com/nurulazam_dev",
//     src: "https://i.ibb.co/j4T8qbd/twitter.png",
//     alt: "Twitter",
//   },
//   {
//     href: "https://www.instagram.com/nurulazam_dev",
//     src: "https://i.ibb.co/DkFxTMF/instagram.png",
//     alt: "Instagram",
//   },
//   {
//     href: "https://nurulazam-dev.web.app/",
//     src: "https://i.ibb.co/JqhBJYJ/google.png",
//     alt: "Google",
//   },
//   {
//     href: "https://www.github.com//nurulazam-dev",
//     src: "https://i.ibb.co/3Wjh3wv/github.png",
//     alt: "GitHub",
//     extraClass: "bg-white rounded-lg",
//   },
// ];

// const Footer = () => {
//   const today = new Date();
//   const year = today.getFullYear();

//   return (
//     <footer className="py-12 bg-slate-950 px-4 md:px-16 text-white">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
//         {/* Contact Info */}
//         <div>
//           <h3 className="font-bold text-2xl mb-4 tracking-wide border-b-2 border-primary pb-2 w-fit">
//             Contact Info
//           </h3>
//           <ul className="space-y-3 text-base">
//             <li>
//               <FontAwesomeIcon
//                 className="mr-3 text-primary"
//                 icon={faLocationDot}
//               />
//               Raozan, Chittagong, Bangladesh.
//             </li>
//             <li>
//               <FontAwesomeIcon
//                 className="mr-3 text-primary"
//                 icon={faEnvelope}
//               />
//               <a
//                 href="mailto:nurulazam.dev@gmail.com"
//                 className="hover:underline"
//               >
//                 nurulazam.dev@gmail.com
//               </a>
//             </li>
//             <li>
//               <FontAwesomeIcon className="mr-3 text-primary" icon={faPhone} />
//               <a href="tel:+8801888000000" className="hover:underline">
//                 +8801888-000000
//               </a>
//             </li>
//             <li>
//               <FontAwesomeIcon className="mr-3 text-primary" icon={faGlobe} />
//               <a
//                 href="https://mnacomputermanuf.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:underline"
//               >
//                 mnacomputermanuf.com
//               </a>
//             </li>
//           </ul>
//         </div>
//         {/* Open Hours */}
//         <div>
//           <h3 className="font-bold text-2xl mb-4 tracking-wide border-b-2 border-primary pb-2 w-fit">
//             Open Hours
//           </h3>
//           <ul className="space-y-3 text-base">
//             <li>
//               <FontAwesomeIcon
//                 className="mr-3 text-primary"
//                 icon={faShopSlash}
//               />
//               Monday - Saturday
//             </li>
//             <li>
//               <FontAwesomeIcon className="mr-3 text-primary" icon={faClock} />
//               8:00am - 5:00pm
//             </li>
//             <li>
//               <FontAwesomeIcon
//                 className="mr-3 text-primary"
//                 icon={faShopSlash}
//               />
//               Sunday is closed
//             </li>
//           </ul>
//         </div>
//         {/* Social Links */}
//         <div>
//           <h3 className="font-bold text-2xl mb-4 tracking-wide border-b-2 border-primary pb-2 w-fit">
//             Follow Us
//           </h3>
//           <div className="flex flex-wrap gap-4 mt-2">
//             {socialLinks.map(({ href, src, alt, extraClass }, idx) => (
//               <a
//                 key={alt}
//                 href={href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label={alt}
//                 className="transition-transform transform hover:scale-110"
//               >
//                 <img
//                   className={`h-10 w-10 ${
//                     extraClass || ""
//                   } shadow-lg hover:shadow-primary/50 rounded-full`}
//                   src={src}
//                   alt={alt}
//                 />
//               </a>
//             ))}
//           </div>
//         </div>
//         {/* Payment Methods */}
//         <div>
//           <h3 className="font-bold text-2xl mb-4 tracking-wide border-b-2 border-primary pb-2 w-fit">
//             Pay With
//           </h3>
//           <img
//             className="h-36 w-full mt-4 rounded-md shadow-lg"
//             src="https://www.eit.com.bd/public/images/paymeent.jpg"
//             alt="Payment Methods"
//           />
//         </div>
//       </div>
//       <footer className="py-5 bg-black opacity-100">
//         <div className="lg:flex justify-around items-center text-white text-center text-[13px] md:text-[14px] lg:text-[15px]">
//           <p>MNA COMPUTER MANUFACTURER</p>
//           <p> All Rights Reserved . Copyright © {year} </p>
//           <p> Designed by @nurulazam-dev </p>
//         </div>
//       </footer>
//     </footer>
//   );
// };

// export default Footer;

import {
  faClock,
  faEnvelope,
  faGlobe,
  faLocationDot,
  faPhone,
  faShopSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950 text-white">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-sky-600/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-blue-600/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="mb-6 w-fit border-b-2 border-sky-500 pb-3 text-xl font-bold tracking-wide text-white sm:text-2xl">
              Contact Info
            </h3>

            <ul className="space-y-5 text-sm leading-6 text-slate-400">
              <li className="flex items-start gap-3">
                <FontAwesomeIcon
                  className="mt-1 shrink-0 text-sky-500"
                  icon={faLocationDot}
                />
                <span>Raozan, Chittagong, Bangladesh.</span>
              </li>

              <li className="flex items-start gap-3">
                <FontAwesomeIcon
                  className="mt-1 shrink-0 text-sky-500"
                  icon={faEnvelope}
                />
                <a
                  href="mailto:nurulazam.dev@gmail.com"
                  className="break-all transition-colors duration-300 hover:text-sky-400"
                >
                  nurulazam.dev@gmail.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <FontAwesomeIcon
                  className="mt-1 shrink-0 text-sky-500"
                  icon={faPhone}
                />
                <a
                  href="tel:+8801888000000"
                  className="transition-colors duration-300 hover:text-sky-400"
                >
                  +8801888-000000
                </a>
              </li>

              <li className="flex items-start gap-3">
                <FontAwesomeIcon
                  className="mt-1 shrink-0 text-sky-500"
                  icon={faGlobe}
                />
                <a
                  href="https://mnacomputermanuf.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all transition-colors duration-300 hover:text-sky-400"
                >
                  mnacomputermanuf.com
                </a>
              </li>
            </ul>
          </div>

          {/* Open Hours */}
          <div>
            <h3 className="mb-6 w-fit border-b-2 border-sky-500 pb-3 text-xl font-bold tracking-wide text-white sm:text-2xl">
              Open Hours
            </h3>

            <ul className="space-y-5 text-sm leading-6 text-slate-400">
              <li className="flex items-center gap-3">
                <FontAwesomeIcon
                  className="shrink-0 text-sky-500"
                  icon={faShopSlash}
                />
                <span>Monday - Saturday</span>
              </li>

              <li className="flex items-center gap-3">
                <FontAwesomeIcon
                  className="shrink-0 text-sky-500"
                  icon={faClock}
                />
                <span>8:00am - 5:00pm</span>
              </li>

              <li className="flex items-center gap-3">
                <FontAwesomeIcon
                  className="shrink-0 text-sky-500"
                  icon={faShopSlash}
                />
                <span>Sunday is closed</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-6 w-fit border-b-2 border-sky-500 pb-3 text-xl font-bold tracking-wide text-white sm:text-2xl">
              Follow Us
            </h3>

            <div className="mt-2 flex flex-wrap gap-4">
              {socialLinks.map(({ href, src, alt, extraClass }) => (
                <a
                  key={alt}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={alt}
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500 hover:bg-sky-500/10 hover:shadow-lg hover:shadow-sky-500/10"
                >
                  <img
                    className={`h-8 w-8 rounded-full object-contain transition-transform duration-300 group-hover:scale-110 ${
                      extraClass || ""
                    }`}
                    src={src}
                    alt={alt}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="mb-6 w-fit border-b-2 border-sky-500 pb-3 text-xl font-bold tracking-wide text-white sm:text-2xl">
              Pay With
            </h3>

            <div className="overflow-hidden rounded-xl border border-slate-800 bg-white p-2 shadow-lg shadow-black/20">
              <img
                className="h-36 w-full rounded-lg object-contain"
                src="https://www.eit.com.bd/public/images/paymeent.jpg"
                alt="Payment Methods"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="relative border-t border-slate-800 bg-black/60 px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-xs text-slate-400 sm:text-sm lg:flex-row">
          <p className="font-semibold tracking-wider text-slate-300">
            MNA COMPUTER MANUFACTURER
          </p>

          <p>All Rights Reserved. Copyright © {year}</p>

          <p>
            Designed by{" "}
            <span className="font-semibold text-sky-400">@nurulazam-dev</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
