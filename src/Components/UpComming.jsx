import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../CSS/Interface.css'
import { useNavigate } from 'react-router-dom'
const UpComming = ({ GetRecentViewData, GetLikedMovieData }) => {
    const navigate = useNavigate()
    const [Upcommingdata, setUpcommingdata] = useState([])
    useEffect(() => {
        async function getUpcommingdata() {
            try {
                const getresponse = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=1e4ec7fcd6a5e3897fbaba58f12bbf48')
                const data = await getresponse.data.results;
                setUpcommingdata(data)
            } catch (err) {
                console.log(err)
            }
        }
        getUpcommingdata()
    }, [])
    function UpcommingMoviesData(item) {
        GetRecentViewData(item)
        navigate('/MovieDetails', { state: item })
    }
    const [ForLike, setForLike] = useState(Array(Upcommingdata.length).fill(false));
    function AccessLike(index, upcommingitems) {
        const copyData = [...ForLike];
        copyData[index] = !copyData[index];
        setForLike(copyData);
        GetLikedMovieData(upcommingitems)
    }
    return (
        <div>
            <div className="container-fluid" style={{ miHeight: '100vh' }}>
                <div className="row">
                    {Upcommingdata.map((upcommingitems, index) => (
                        <div className="image col-5 mx-auto col-md-4 col-lg-3 col-xl-2 p-3" key={index}>
                            <div className="col-4 d-flex flex-column">
                                <img src={`https://image.tmdb.org/t/p/w500${upcommingitems.poster_path}`} alt={upcommingitems.title} width='200' height='250' id='image' onClick={() => { UpcommingMoviesData(upcommingitems) }} style={{ cursor: 'pointer' }} />
                                <span className={`bi bi-heart${ForLike[index] ? '-fill' : ''} position-absolute ms-2 mt-1 text-${ForLike[index] ? 'danger' : ''} `} onClick={() => { AccessLike(index, upcommingitems) }}></span>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default UpComming
