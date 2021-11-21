import "./structure.css";
import "./mini.css";

function Header() {
  return (
    <div id="uw-container">
      <div id="uw-container-inner">
        <header className="uw-thinstrip">
          <nav className="uw-thin-strip-nav">
            {/*<ul className="uw-thin-links">
              <li>
                <a href="http://myuw.washington.edu" title="MyUW">
                  MyUW
                </a>
              </li>

              <li>
                <a href="http://uw.edu/calendar" title="UW Calendar">
                  Calendar
                </a>
              </li>

              <li>
                <a href="http://uw.edu/maps" title="UW Maps">
                  Maps
                </a>
              </li>

              <li>
                <a href="http://uw.edu/directory" title="UW Directories">
                  Directories
                </a>
              </li>
            </ul>*/}
          </nav>

          <div className="container">
            <a
              className="uw-patch"
              href=""
              tabindex="-1"
              title="University of Washington Home"
            >
              Home
            </a>
            <a
              className="uw-wordmark"
              href=""
              title="University of Washington Home"
            >
              Home
            </a>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
