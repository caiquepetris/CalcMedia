import { FaLinkedin } from "react-icons/fa";

const Footer = () => (
  <footer>

    <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
      Feito por<b>Caique Petris!</b>
      <a
        href="https://www.linkedin.com/in/caiquepetris/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          color: "#0077b5",
          display: "inline-flex",
          alignItems: "center",
          transition: "transform 0.2s ease, color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.2)";
          e.currentTarget.style.color = "#005a87";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "#0077b5";
        }}
      >
        <FaLinkedin size={24} />
      </a>
    </p>
  </footer>
);

export default Footer;