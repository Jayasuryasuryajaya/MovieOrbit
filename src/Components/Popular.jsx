import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Popular = ({ GetRecentViewData, GetLikedMovieData }) => {
    const navigate = useNavigate()
    const [PopularData, setPopularData] = useState([])
    useEffect(() => {
        async function getPopulardata() {
            try {
                const getresponse = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=1e4ec7fcd6a5e3897fbaba58f12bbf48')
                const data = await getresponse.data.results;
                setPopularData(data)
            } catch (err) {
                console.log(err)
            }
        }
        getPopulardata()
    }, [])
    function PopularMovieDatas(item) {
        GetRecentViewData(item)
        navigate('/MovieDetails', { state: item })
    }
    const [ForLike, setForLike] = useState(Array(PopularData.length).fill(false));
    function AccessLike(index, Popuitems) {
        const copyData = [...ForLike];
        copyData[index] = !copyData[index];
        setForLike(copyData);
        GetLikedMovieData(Popuitems)
    }
    return (
        <div>
            <div className="container-fluid" style={{ miHeight: '100vh' }}>
                <div className="row">
                    {PopularData.map((Popuitems, index) => (
                        <div className="image col-5 col-md-4 mx-auto col-lg-3 col-xl-2 p-3" key={index}>
                            <div className="col-4 d-flex flex-column">
                                <img src={`https://image.tmdb.org/t/p/w500${Popuitems.poster_path}`} alt={Popuitems.title} width='200' height='250' id='image' onClick={() => { PopularMovieDatas(Popuitems) }} style={{ cursor: 'pointer' }} />
                                <span className={`bi bi-heart${ForLike[index] ? '-fill' : ''} position-absolute ms-2 mt-1 text-${ForLike[index] ? 'danger' : ''} `} onClick={() => { AccessLike(index, Popuitems) }}></span>
                            </div>
                        </div>

                    ))}

                </div>
            </div>
        </div>
    )
}

export default Popular
