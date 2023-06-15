import { useState, useEffect } from "react";
import YouTube from 'react-youtube';
import 'bootstrap/dist/css/bootstrap.min.css'

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };
  function getYoutubeVideoId(url) {
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return videoIdMatch ? videoIdMatch[1] : null;
  }

function MiApi() {
    const [datosHoy, setDatosHoy] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://api.nasa.gov/planetary/apod?api_key=HzNYPfZVN2Qwyi50EmvmT0fUalz1CRdekv3nWyH2`;
                const response = await fetch(url);
                const data = await response.json();
                setDatosHoy(data);
            } catch (error) {
                console.error('Error', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container py-4">
            {datosHoy && (
                <div className="card mp-5">
                    <div className="card-body">
                    <h2 className="text-center mb-4">Te presentamos la imágen astronómica del día de hoy</h2>
                    <h4 className="text-center mb-4">{formatDate(datosHoy.date)}</h4>
                    {datosHoy.media_type === 'image' ? (
                            <img src={datosHoy.url} alt="Imagen del día" className="img-fluid"/>
                        ) : (
                            <YouTube videoId={getYoutubeVideoId(datosHoy.url)} className="embed-responsive embed-responsive-16by9" />
                        )}
                        <h3 className="card-text">{datosHoy.title}</h3>
                        <p className="card-text">{datosHoy.explanation}</p>
                        
                    </div>
                </div>
            )}
        </div>
    );
}

export default MiApi;
