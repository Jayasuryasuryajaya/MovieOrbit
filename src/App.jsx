import { useEffect, useState } from 'react'
import React, { Suspense } from 'react'
import './CSS/IntroText.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'
import SideBar from './Components/SideBar';
import { Routes, Route } from 'react-router-dom'
const MovieDetails = React.lazy(() => import('./Components/MovieDetails.jsx'))
const Interface = React.lazy(() => import('./Components/Interface.jsx'))
const Popular = React.lazy(() => import('./Components/Popular.jsx'))
const TopRated = React.lazy(() => import('./Components/TopRated.jsx'))
const Trendy = React.lazy(() => import('./Components/Trendy.jsx'))
const UpComming = React.lazy(() => import('./Components/UpComming.jsx'));
const RecentlyViewed = React.lazy(() => import('./Components/RecentlyViewed.jsx'))
const MovieLiked = React.lazy(() => import('./Components/MovieLiked.jsx'))
const App = () => {
  const [MovieData, setMovieData] = useState([])
  const [Recentviewdata, setRecentviewdata] = useState([])
  const [getLikedList, setgetLikedList] = useState([])
  const [Search, setSearch] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  async function SearchMovie(userdata = "") {
    try {
      let response = userdata === '' ? await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=1e4ec7fcd6a5e3897fbaba58f12bbf48') : await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${Search}&api_key=1e4ec7fcd6a5e3897fbaba58f12bbf48`
      );
      let updateData = await response.data.results
      setMovieData(updateData)
    } catch (error) {
      console.log(error)
    }
  }
  function HandleUserValue(e) {
    const userdata = e.target.value.trim()
    setSearch(userdata);
    SearchMovie(userdata)
  }
  useEffect(() => {
    const settime = setTimeout(() => {
      setShowIntro(false)
    }, 4000)
    SearchMovie()
    return () => clearTimeout(settime);

  }, [])
  function GetRecentViewData(item) {
    setRecentviewdata([...Recentviewdata, item])
  }
  function GetLikedMovieData(item) {
    setgetLikedList([...getLikedList, item])
  }
  return (
    <div>
      {showIntro ? (
        <div className="introtext fs-2 fw-bold" >
          <span className="roll"> Roll... <span className='bi bi-film'></span></span>
          <span className="camera"> Camera... <span className='bi-camera-reels-fill'></span> </span>
          <span className="action"> Action! <span className='bi-lightbulb-fill'></span></span>
        </div>
      ) : (
        <Suspense fallback={
          <div className="container-fluid " >
            <section className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
              <b className='fs-4 fw-bold'>Loading...</b>
            </section>
          </div>
        }>
          <SideBar HandleUserValue={HandleUserValue} />
          <Routes>
            <Route path='/' element={<Interface MovieData={MovieData} GetLikedMovieData={GetLikedMovieData} GetRecentViewData={GetRecentViewData} />} />
            <Route path='/MovieDetails' element={<MovieDetails />} />
            <Route path='/Popular' element={<Popular GetRecentViewData={GetRecentViewData} GetLikedMovieData={GetLikedMovieData} />} />
            <Route path='/TopRated' element={<TopRated GetRecentViewData={GetRecentViewData} GetLikedMovieData={GetLikedMovieData} />} />
            <Route path='/Trendy' element={<Trendy GetRecentViewData={GetRecentViewData} GetLikedMovieData={GetLikedMovieData} />} />
            <Route path='/UpComming' element={<UpComming GetRecentViewData={GetRecentViewData} GetLikedMovieData={GetLikedMovieData} />} />
            <Route path='/RecentlyViewed' element={<RecentlyViewed Recentviewdata={Recentviewdata} setRecentviewdata={setRecentviewdata} />} />
            <Route path='/MovieLiked' element={<MovieLiked getLikedList={getLikedList} setgetLikedList={setgetLikedList} />} />
          </Routes>

        </Suspense>
      )}
    </div>
  )
}
export default App
