import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4">
      <div className="container">
        <p>&copy; 2025 Ujjwal Dresses. All rights reserved.</p>
        <div>
          <a href="https://www.facebook.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="https://www.twitter.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="https://www.instagram.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
