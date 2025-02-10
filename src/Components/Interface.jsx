import React, { useState } from 'react'
import '../CSS/Interface.css'
import { useNavigate } from 'react-router-dom'
const Interface = ({ MovieData, GetRecentViewData, GetLikedMovieData }) => {
    const navigate = useNavigate()
    function DetailedData(item) {
        GetRecentViewData(item)
        navigate('/MovieDetails', { state: item })
    }
    const [ForLike, setForLike] = useState(Array(MovieData.length).fill(false));
    function AccessLike(index, item) {
        const copyData = [...ForLike];
        copyData[index] = !copyData[index];
        setForLike(copyData);
        GetLikedMovieData(item)
    }
    return (
        <div>
            <div className="container-fluid pt-3 overflow-hidden" style={{ minHeight: '100vh' }}>
                <div className="row d-flex justify-content-center align-items-center">
                    {MovieData.map((item, index) => (
                        <div className="image col-5 mx-auto col-md-4 col-lg-4 col-xl-2 p-3" key={index}>
                            <div className="col-4 d-flex flex-column ">
                                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" width='200' height='250' id='image' onClick={() => { DetailedData(item) }} />
                                <span className={`like bi bi-heart${ForLike[index] ? '-fill' : ''} position-absolute ms-2 mt-1 text-${ForLike[index] ? 'danger' : ''} `} onClick={() => { AccessLike(index, item) }}></span>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Interface
