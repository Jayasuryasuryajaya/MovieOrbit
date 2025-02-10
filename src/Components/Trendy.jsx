import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../CSS/Interface.css'
const Trendy = ({ GetRecentViewData, GetLikedMovieData }) => {
    const navigate = useNavigate()
    const [TrendyData, setTrendyData] = useState([])
    useEffect(() => {
        async function getTrendydata() {
            try {
                const responses = await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=1e4ec7fcd6a5e3897fbaba58f12bbf48')
                const data = await responses.data.results;
                setTrendyData(data)
            } catch (err) {
                console.log(err)
            }
        }
        getTrendydata()
    }, [])
    function TrendyMovieDatas(item) {
        GetRecentViewData(item)


        navigate('/MovieDetails', { state: item })
    }
    const [ForLike, setForLike] = useState(Array(TrendyData.length).fill(false));
    function AccessLike(index, Trenditems) {
        const copyData = [...ForLike];
        copyData[index] = !copyData[index];
        GetLikedMovieData(Trenditems)
        setForLike(copyData);
    }
    return (
        <div>

            <div className="container-fluid d-flex justify-content-start align-items-center" style={{ miHeight: '100vh', backgroundColor: '#0A0F1F' }}>
                <div className="row">
                    {TrendyData.map((Trenditems, index) => (
                        <div className="image col-5 mx-auto col-md-4 col-lg-3 col-xl-2 p-3 " key={index}>
                            <div className="col-4 d-flex flex-column">
                                <img src={`https://image.tmdb.org/t/p/w500${Trenditems.poster_path}`} alt={Trenditems.title} width='200' height='250' id='image' onClick={() => { TrendyMovieDatas(Trenditems) }} style={{ cursor: 'pointer' }} />
                                <span className={`bi bi-heart${ForLike[index] ? '-fill' : ''} position-absolute ms-2 mt-1  text-${ForLike[index] ? 'danger' : ''} `} onClick={() => { AccessLike(index, Trenditems) }}></span>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Trendy
