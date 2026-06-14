

function Navbar() {
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <h1 className="navbar-brand fw-bold fs-3">
            PortfolioGenie
          </h1>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarText" 
            aria-controls="navbarText" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarText">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-5">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  How It Works
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Get Started 
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

