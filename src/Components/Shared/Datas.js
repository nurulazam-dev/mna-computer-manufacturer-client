import customersP from '../../assets/BusinessSummary/customers.png';
import revenueP from '../../assets/BusinessSummary/revenue.png';
import partsP from '../../assets/BusinessSummary/parts.png';
import reviewsP from '../../assets/BusinessSummary/reviews.png';

const faqsData=[
    {id:1, title: 'What is the MNA Computer Manufacturer?', ans: 'This website is about a Computer Manufacturer parts selling website ( MNA Computer Manufacturer ). MNA_Computer_Manufacturer basically all new products are available.'},
    {id:2, title: `Are MNA_Computer_Manufacturer's products sold in installments?`, ans: 'Check the product details page to know about installment or EMI or any special offer benefits. The details of the products on which these benefits are provided are mentioned on the Special Offers page.'},
    {id:3, title: `Are MNA_Computer_Manufacturer's products original?`, ans: `MNA_Computer_Manufacturer's all products are original. There is no opportunity to display any brand clone or fake product under the brand name. So you will find here the original product of any brand.`},
]

// export default faqsData;

const summarydata = [
    { id: 1, img: customersP, count: '10K', title: 'Served Customers' },
    { id: 2, img: revenueP, count: '150M', title: 'Annual Revenue' },
    { id: 3, img: partsP, count: '50K', title: 'Parts/Tools' },
    { id: 4, img: reviewsP, count: '80K', title: 'Reviews' }
]
export {faqsData, summarydata};