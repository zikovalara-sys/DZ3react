
import {Link} from "react-router";

const MainNavbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
                <div className="container">
                    <Link to={"/"} className="navbar-brand">
                        <i className="fas fa-globe"></i> МійСайт
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Перемкнути навігацію">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/"} className="nav-link active" aria-current="page">
                                    <i className="fas fa-home"></i> Головна
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/qr">
                                    <i className="fas fa-qrcode"></i> QR Генерація
                                </Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    <i className="fas fa-sign-in-alt"></i> Вхід
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link btn btn-outline-light btn-sm px-3 mx-1"
                                      to="/register" style={{borderRadius: "20px"}}>
                                    <i className="fas fa-user-plus"></i> Реєстрація
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default MainNavbar;
