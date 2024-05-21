import React from "react";
import "./home.scss";

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="container">
        <a href="https://bogatimahesh.com.np" target="_blank">
          <button>Explore about me</button>
        </a>
        <div className="contact">
          <a href="mailto: bogati.mahesh.299.792.458@gmail.com" target="_blank">
            bogati.mahesh.299.792.458@gmail.com
          </a>
        </div>
        <div className="thanks">
          <p>
            Thank you! Blys Team<br /> For giving me chance to grow !
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
