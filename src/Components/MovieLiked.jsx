import React from 'react'
import '../CSS/Interface.css'
const MovieLiked = ({ getLikedList, setgetLikedList }) => {
  function DeleteLikedOne(index) {
    const getfiltval = getLikedList.filter((_, i) => i !== index)
    setgetLikedList(getfiltval)
    console.log(getfiltval)
  }
  return (
    <div>
      <div className="container-fluid" style={{ minHeight: '100vh' }}>
        <div className="row">
          {getLikedList.length === 0 ? (
            <section className=' d-flex justify-content-center mt-5 ' style={{ minHeight: '100vh' }}>
              <span className=" cotainer-fluid fs-3 fw-bold">Oops! No Liked Items Yet! <span className='bi bi-heartbreak'></span></span>
            </section>
          ) : (
            getLikedList.map((likeditem, index) => (
              <div className="image col-5 col-md-4 col-lg-3 col-xl-2 p-3" key={index}>
                <div className="col-4 d-flex flex-column position-relative">
                  <span className='bi bi-trash-fill position-absolute mt-1 fw-bold shadow-lg' style={{ left: '175px', cursor: 'pointer' }} onClick={() => { DeleteLikedOne(index) }}></span>
                  <img src={`https://image.tmdb.org/t/p/w500${likeditem.poster_path}`} alt={likeditem.title} width='200' height='250' id='image' />
                </div>
              </div>
            ))
          )}

        </div>
      </div>

    </div>
  )
}

export default MovieLiked
