import React, { useState } from 'react'
import '../CSS/Interface.css'
import { useNavigate } from 'react-router-dom'
const RecentlyViewed = ({ Recentviewdata, setRecentviewdata }) => {
  const navigate = useNavigate()
  function RecentMovieData(item) {
    navigate('/MovieDetails', { state: item })
  }
  const [ForLike, setForLike] = useState(false);
  function AccessLike() {
    setForLike(ForLike => !ForLike)
  }
  function DeleteRecentlyViwedOne(index) {
    const alterdata = Recentviewdata.filter((_, i) => i !== index)
    setRecentviewdata(alterdata)

  }
  return (
    <div>
      <div className="conatiner-fluid overflow-hidden" style={{ minHeight: '100vh' }}>
        <div className="row">
          {!Recentviewdata.length == 0 ? (Recentviewdata.map((recentitems, index) => (
            <div className="image col-5 m-2 col-md-4 col-lg-3 col-xl-2 p-3 d-flex float-start" key={index}>
              <div className="col-4 d-flex flex-column position-relative">
                <span className='bi bi-trash-fill fw-bold fs-5 position-absolute' style={{ left: '175px', cursor: 'pointer' }} onClick={() => { DeleteRecentlyViwedOne(index) }}></span>
                <img src={`https://image.tmdb.org/t/p/w500${recentitems.poster_path}`} alt={recentitems.title} width='200' height='250' id='image' onClick={() => { RecentMovieData(recentitems) }} />
                <span className={`bi bi-heart${ForLike ? '-fill' : ''} position-absolute ms-2 mt-1 text-${ForLike ? 'danger' : ''} `} onClick={AccessLike}></span>


              </div>

            </div>
          )
          )) : (
            <section className='NoitemsAdded d-flex justify-content-center mt-5 ' style={{ minHeight: '100vh' }}>
              <span className=" cotainer-fluid fs-3 fw-bold">Oops! No Recent items Added <span className='bi bi-emoji-frown-fill'></span></span>
            </section>
          )}
        </div>
      </div>

    </div>
  )
}

export default RecentlyViewed
