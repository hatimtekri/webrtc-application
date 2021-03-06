import React from "react";
import { HeartTwoTone } from "@ant-design/icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Made with <HeartTwoTone twoToneColor="#eb2f96" /> By{" "} */}
      <a
        className="footer__link"
        href=""
        target="_blank"
        style={{ color: "#fdfdfd" }}
        rel="noreferrer"
      >
       Made By Hatim Tekri
      </a>
      <br />

      {/* Contributed/Improved By{" "}

      <a
        className="footer__link"
        href="https://linkedin.com/in/gautamtiwari003"
        target="_blank"
        style={{ color: "#fdfdfd" }}
        rel="noreferrer"
      >
        Gautam Tiwari
      </a> */}
    </footer>
  );
};

export default Footer;
