import { useState, useContext } from "react";
import { McToolsContext } from "../../store/mcTools_context";

export default function Navigation() {
  const { view, handleNavClick } = useContext(McToolsContext);
  const [isNavOpen, setIsNavOpen] = useState(false);

  function handleOpenMobileNavClick() {
    setIsNavOpen((prevState) => {
      return !prevState;
    });
  }

  const handleClick = (nav) => {
    if (isNavOpen) {
      setIsNavOpen((prevState) => {
        return !prevState;
      });
    }
    handleNavClick(nav);
  };

  const navigation = (
    <ul>
      <li>
        <button
          onClick={() => handleClick("home")}
          className={view === "home" ? `active` : undefined}
        >
          Background
        </button>
      </li>
      <li>
        <button
          onClick={() => handleClick("localeList")}
          className={view === "localeList" ? `active` : undefined}
        >
          Compare Locale Lists
        </button>
      </li>
      <li>
        <button
          onClick={() => handleClick("localeListGenerator")}
          className={view === "localeListGenerator" ? `active` : undefined}
        >
          Locale List Generator
        </button>
      </li>
      <li>
        <button
          onClick={() => handleClick("countryCode")}
          className={view === "countryCode" ? `active` : undefined}
        >
          Get a Country Code
        </button>
      </li>
      <li>
        <button
          onClick={() => handleClick("urlGenerator")}
          className={view === "urlGenerator" ? `active` : undefined}
        >
          Testing URL Generator
        </button>
      </li>
      <li>
        <button
          onClick={() => handleClick("tokenGenerator")}
          className={view === "tokenGenerator" ? `active` : undefined}
        >
          Token Generator
        </button>
      </li>
    </ul>
  );

  return (
    <nav>
      {/* <div className="function-selector"> */}
      <div className="nav-mobile">
        <button
          className={isNavOpen ? `open` : undefined}
          onClick={handleOpenMobileNavClick}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
      </div>
      <div className="nav-wrap">{navigation}</div>
      {isNavOpen && (
        <div className="nav-wrap__mobile slide-in">{navigation}</div>
      )}
    </nav>
  );
}
