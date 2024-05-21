import {
  faAward,
  faComments,
  faSackDollar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import blog2 from "../../assets/blogs-img/demand_web_development.jpeg";
import blog3 from "../../assets/blogs-img/different_web_&_software_developer.jfif";
import blog1 from "../../assets/blogs-img/learn_react.jpeg";
import blog4 from "../../assets/blogs-img/mobile_app_vs_web_dev.jpeg";

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
    date: "26 December, 2022",
    title: "Six reasons why you should learn React.js in 2023!",
  },
  {
    id: 2,
    img: blog2,
    date: "22 December, 2022",
    title:
      "Will the demand for web development increase or decrease in the future?",
  },
  {
    id: 3,
    img: blog3,
    date: "20 December, 2022",
    title:
      "What is the relationship between web development and software development?",
  },
  {
    id: 4,
    img: blog4,
    date: "16 December, 2022",
    title:
      "Mobile Apps Development or Web Development!! Which should be learned?",
  },
];
export { blogData, faqsData, summaryData };
