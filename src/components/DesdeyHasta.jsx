import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import YouTube from 'react-youtube';

function getYoutubeVideoId(url) {
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return videoIdMatch ? videoIdMatch[1] : null;
}

function MiniCard({ data }) {
    return (
        <div className="col-sm-4 mb-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{data.date}</h5>
                    {data.media_type === 'image' ? (
                        <img src={data.url} alt="Imagen del día" className="img-fluid" />
                    ) : (
                        <YouTube videoId={getYoutubeVideoId(data.url)} className="embed-responsive embed-responsive-16by9" />
                    )}
                    <p className="card-text">{data.title}</p>
                </div>
            </div>
        </div>
    );
}

function DesdeyHasta() {
    const [datos, setDatos] = useState([]);
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (fechaDesde && fechaHasta) {
                    const url = `https://api.nasa.gov/planetary/apod?api_key=HzNYPfZVN2Qwyi50EmvmT0fUalz1CRdekv3nWyH2&start_date=${fechaDesde}&end_date=${fechaHasta}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    setDatos(data);
                }
            } catch (error) {
                console.error('Error', error);
            }
        };

        fetchData();
    }, [fechaDesde, fechaHasta]);

    const handleFechaDesdeChange = (event) => {
        setFechaDesde(event.target.value);
    };

    const handleFechaHastaChange = (event) => {
        setFechaHasta(event.target.value);
    };

    const handleSortByDate = () => {
        const sortedData = [...datos].sort((a, b) => a.date.localeCompare(b.date));
        setDatos(sortedData);
    };

    const handleReverseOrder = () => {
        const reversedData = [...datos].reverse();
        setDatos(reversedData);
    };

    return (
        <div className="container py-4">
            <div className="row mb-4">
                <div className="col">
                    <input type="date" value={fechaDesde} onChange={handleFechaDesdeChange} className="form-control" />
                </div>
                <div className="col">
                    <input type="date" value={fechaHasta} onChange={handleFechaHastaChange} className="form-control" />
                </div>
                <div className="col">
                    <button onClick={handleSortByDate} className="btn btn-primary">Ordenar por fecha</button>
                </div>
                <div className="col">
                    <button onClick={handleReverseOrder} className="btn btn-primary">Invertir orden</button>
                </div>
            </div>
            <div className="row">
                {datos.map((item) => (
                    <MiniCard key={item.date} data={item} />
                ))}
            </div>
        </div>
    );
}


export default DesdeyHasta;
