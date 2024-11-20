const Footer = () => {
  return (
    <footer className="relative z-40 bg-gray-800 text-white py-4 border-t border-gray-600">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">Benefit Connect</h2>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">
              About
            </a>
            <a href="#" className="hover:text-gray-400">
              Services
            </a>
            <a href="#" className="hover:text-gray-400">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm">
            &copy; 2024 Benefit Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
