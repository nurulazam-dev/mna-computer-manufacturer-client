import {
  faAward,
  faComments,
  faSackDollar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import blog2 from "../blogs-img/demand_web_development.jpeg";
import blog3 from "../blogs-img/different_web_&_software_developer.jfif";
import blog1 from "../blogs-img/learn_react.jpeg";
import blog4 from "../blogs-img/mobile_app_vs_web_dev.jpeg";
import bannerImg1 from "../banner/banner-1.webp";
import bannerImg2 from "../banner/banner-2.webp";

const heroSlidesData = [
  {
    image: bannerImg1,
    subtitle: "Welcome to MNA Computer Manufacturer",
    title: "Technology That Powers Your Future.",
    description:
      "Discover reliable computer products and technology solutions designed to make your digital life easier.",
  },
  {
    image: bannerImg2,
    subtitle: "Upgrade Your Experience",
    title: "Build Your Perfect Computer Setup.",
    description:
      "Find the right computer components and accessories to match your performance needs.",
  },
  {
    image: bannerImg1,
    subtitle: "Quality You Can Trust",
    title: "Better Hardware. Better Performance.",
    description:
      "Explore quality products that bring performance, reliability, and value together.",
  },
  {
    image: bannerImg2,
    subtitle: "Technology for Everyone",
    title: "Everything You Need, In One Place.",
    description:
      "From essential accessories to powerful computer components, discover your next upgrade.",
  },
];

const faqsData = [
  {
    id: 1,
    title: `What is the "MNA Computer Manufacturer"?`,
    ans: `This website is about a Computer Manufacturer parts selling website ( MNA Computer Manufacturer ). "MNA Computer Manufacturer" basically all new products are available.`,
  },
  {
    id: 2,
    title: `Are "MNA Computer Manufacturer"s products sold in installments?`,
    ans: "Check the product details page to know about installment or EMI or any special offer benefits. The details of the products on which these benefits are provided are mentioned on the Special Offers page.",
  },
  {
    id: 3,
    title: `Are "MNA Computer Manufacturer"s products original?`,
    ans: `"MNA Computer Manufacturer"'s all products are original. There is no opportunity to display any brand clone or fake product under the brand name. So you will find here the original product of any brand.`,
  },
];

// export default faqsData;

const summaryData = [
  { id: 1, icon: faUsers, count: "26345", title: "Happy Clients" },
  { id: 2, icon: faSackDollar, count: "10316200", title: "Annual Revenue" },
  { id: 3, icon: faAward, count: "103", title: "Awards Winning" },
  { id: 4, icon: faComments, count: "1982", title: "Reviews" },
];

const blogData = [
  {
    id: 1,
    img: blog1,
    date: "26 December, 2024",
    title: "Six reasons why you should learn React.js in 2023!",
  },
  {
    id: 2,
    img: blog2,
    date: "22 December, 2024",
    title:
      "Will the demand for web development increase or decrease in the future?",
  },
  {
    id: 3,
    img: blog3,
    date: "20 December, 2024",
    title:
      "What is the relationship between web development and software development?",
  },
  {
    id: 4,
    img: blog4,
    date: "16 December, 2024",
    title:
      "Mobile Apps Development or Web Development!! Which should be learned?",
  },
];
export { heroSlidesData, blogData, faqsData, summaryData };
