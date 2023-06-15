import { useState, useEffect } from "react";
import YouTube from 'react-youtube';
import 'bootstrap/dist/css/bootstrap.min.css'

function getYoutubeVideoId(url) {
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return videoIdMatch ? videoIdMatch[1] : null;
  }

function Input() {
    const [datosSeleccionados, setDatosSeleccionados] = useState([]);
    const [fecha, setFecha] = useState('');
    

    useEffect(() => {
        const fetchDatosSeleccionados = async () => {
            try {
                const url = `https://api.nasa.gov/planetary/apod?api_key=HzNYPfZVN2Qwyi50EmvmT0fUalz1CRdekv3nWyH2&date=${fecha}`;
                const response = await fetch(url);
                const data = await response.json();
                setDatosSeleccionados([data]);
            } catch (error) {
                console.error('Error', error);
            }
        };
        if (fecha) {
            fetchDatosSeleccionados();
        }
        
    }, [fecha]);

    const handleFechaChange = (event) => {
        setFecha(event.target.value);
    };

    return (
        <div className="container py-4">
            <div className="card mb-3">
                <div className="card-body">
                    <h2 className="text-center mb-4">Revisa los acontecimientos astronómicos de la fecha que tu quieras, diviértete!!</h2>
                    <input type="date" value={fecha} onChange={handleFechaChange} className="form-control mb-3" />
                    {fecha && datosSeleccionados.length > 0 && (
                        <div>
                            {datosSeleccionados.map((item) => (
                                <div key={item.date} className="card mb-3">
                                    <div className="card-body">
                                    {item.media_type === 'image' ? (
                                            <img src={item.url} alt="Imagen del día" className="img-fluid"/>
                                        ) : (
                                            <YouTube videoId={getYoutubeVideoId(item.url)} className="embed-responsive embed-responsive-16by9" />
                                        )}
                                        <h3 className="card-text">{item.title}</h3>
                                        <p className="card-text">{item.explanation}</p>
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Input;
