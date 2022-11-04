import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const [navBlack, setNavBlack] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    //test chrome element.style height: 150vw
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        handleScroll(true);
      } else {
        handleScroll(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);
  const handleScroll = (bScroll) => {
    setNavBlack(bScroll);
  };
  const handleSearchTxtChange = (event) => {
    setSearchTxt(event.target.value);
    navigate(`/search?q=${event.target.value}`);
  };
  return (
    <nav className={`nav ${navBlack && "nav__black"}`}>
      <img
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1980px-Netflix_2015_logo.svg.png"
        className="nav__logo"
        onClick={() => window.location.reload}
      />
      <input
        value={searchTxt}
        onChange={(e) => handleSearchTxtChange(e)}
        className="nav__input"
        type="text"
        placeholder="영화를 검색해 주세요."
      />
      <img
        alt="User logged"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        className="nav__avatar"
      />
    </nav>
  );
};

export default Nav;
