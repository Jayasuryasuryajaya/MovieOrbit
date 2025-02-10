import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../CSS/Interface.css'
import { useNavigate } from 'react-router-dom'
const TopRated = ({ GetRecentViewData }) => {
    const navigate = useNavigate()
    const [TopRatedMovie, setTopRatedMovie] = useState([])
    useEffect(() => {
        async function TopRated() {
            try {
                const TopRatedMovieresponse = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=1e4ec7fcd6a5e3897fbaba58f12bbf48')
                const getData = await TopRatedMovieresponse.data.results
                setTopRatedMovie(getData)
            } catch (err) { console.log(err) }
        }
        TopRated()
    }, [])
    const DetailedData = (item) => {
        GetRecentViewData(item)
        navigate('/MovieDetails', { state: item })

    }
    return (
        <div>

            <div className="container-fluid" style={{ minHeight: '100vh' }}>
                <div className="row">

                    {TopRatedMovie.map((topratitems, index) => (
                        <div className="image col-5 col-md-4 col-lg-3 col-xl-2 p-3" key={index}>

                            <img src={`https://image.tmdb.org/t/p/w500${topratitems.poster_path}`} alt={topratitems.title} width='200' height='250' id='image' onClick={() => { DetailedData(topratitems) }} style={{ cursor: 'pointer' }} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default TopRated
