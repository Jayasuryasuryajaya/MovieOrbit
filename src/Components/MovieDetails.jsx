import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../CSS/MovieDetails.css'
const MovieDetails = () => {
  const location = useLocation()
  const item = location.state || {};
  const [IncVoteCount, setIncVoteCount] = useState(item.vote_count)
  function IncreaseVoteCount() {
    setIncVoteCount(prevCount => prevCount + 1)
  }
  return (
    <div>
      <div className="container-fluid d-flex pt-5 justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="row">
          <div className="card p-3 d-flex gap-3 flex-column flex-md-row">

            <div className="col-md-5 d-flex justify-content-center">
              <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="cover-image" alt={item.title} width='300' />
            </div>
            <div className="col-md-7">
              <section className='mt-4'>
                <p><strong>Language:</strong> {item.original_language === 'en' ? 'English' : item.original_language}</p>
                <p><strong>Movie Name:</strong> {item.title}</p>
                <p><strong>Release Date:</strong> {item.release_date}</p>
                <p><strong>Popularity:</strong> {item.popularity}</p>
                <p><strong>Ratings :</strong> {item.vote_average} <span className='bi-star-fill'></span></p>
                <section >
                  <p><strong>Vote Count:</strong> {IncVoteCount} <span className='bi-people-fill'></span>
                    <button className='btn ms-3 bordered shadow' onClick={IncreaseVoteCount}>Vote</button>
                  </p>
                </section>
                <p><strong>Overview:</strong> {item.overview}</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
