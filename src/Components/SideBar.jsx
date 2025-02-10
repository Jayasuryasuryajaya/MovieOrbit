import React from 'react';
import '../CSS/Sidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import iconmovieorbit from '../Images/iconmovieorbit.png';
const SideBar = ({ HandleUserValue }) => {
  const navigate = useNavigate();
  function handleNavigation(e) {
    const getNavigatevalue = e.target.value;
    if (getNavigatevalue) {
      navigate(getNavigatevalue);
    }
  }
  function handleSearchInput(e) {
    HandleUserValue(e)
  }
  return (
    <nav className="navbar navbar-expand-md position-sticky top-0" style={{ backgroundColor: '#0A0F1F', zIndex: '1' }}>
      <div className="container-fluid">
        <Link to="/" className="icons text-decoration-none">
          <section className="shadow-lg d-flex gap-2 align-items-center">
            <img src={iconmovieorbit} alt="icon" className="rounded-pill" width="50" height="50" />
            <span className="fw-bold fs-3">MovieOrbit</span>
          </section>
        </Link>
        <button className="btn navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navcollapse">
          <span className="navbar-toggler-icon rounded p-3"></span>
        </button>
        <section className="collapse navbar-collapse" id="navcollapse">
          <ul className="navbar-nav d-flex gap-5 mx-auto m-2 align-items-center">
            <input type="text" className="form-control inputfield" placeholder="Search" onChange={handleSearchInput} />
            <Link to="/" className="text-decoration-none">
              <li className="nav-item">Home</li>
            </Link>
            <Link className="text-decoration-none" to="/RecentlyViewed">
              <li className="nav-item">Recently viewed</li>
            </Link>
            <Link className="text-decoration-none" to="/MovieLiked">
              <li className="nav-item">Liked Movies</li>
            </Link>
            <select className="form-select form-select-sm rounded p-2 text-center" onChange={handleNavigation} defaultValue="">
              <option value="/Popular">Popular</option>
              <option value="/TopRated">Top Rated</option>
              <option value="/Trendy">Trendy Movies</option>
              <option value="/UpComming">Upcoming</option>
            </select>
          </ul>
        </section>
      </div>
    </nav>
  );
};

export default SideBar;
