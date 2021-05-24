import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-gray-50 dark:bg-gray-700"
      aria-labelledby="footerHeading"
    >
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="mt-12 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between lg:mt-16">
          <div className="flex items-center">
            <a href="/privacy" target="_blank">
              <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1 mr-5 md:mx-5">
                Privacy
              </p>
            </a>
            <a href="/terms" target="_blank">
              <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1 mx-5">
                Terms
              </p>
            </a>
            <a href="/contact" target="_blank">
              <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1 mx-5">
                Contact
              </p>
            </a>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2021 Talendy, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
