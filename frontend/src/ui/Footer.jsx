// import { Link } from "react-router-dom";

// function Footer() {
//   return (
//     <footer className="bg-orange-100  py-4 mt-10 sm:px-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between  items-center">
//           <div>
//             <p>&copy; 2025 Expenses Tracker. All rights reserved.</p>
//           </div>
//           <div className="space-x-4 flex flex-col md:flex-row">
//             <Link to="/privacy-policy" className=" hover:underline block">
//               Privacy Policy
//             </Link>
//             <Link to="/terms-of-service" className=" hover:underline block">
//               Terms of Service
//             </Link>
//             <Link to="/contact" className=" hover:underline block">
//               Contact
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-orange-100 py-4 mt-10 sm:px-10 md:mb-0 mb-14 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p>&copy; 2025 Expenses Tracker. All rights reserved.</p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Link to="/privacy-policy" className="  hover:underline block">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="  hover:underline block">
              Terms of Service
            </Link>
            <Link to="/contact" className=" hover:underline block">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
