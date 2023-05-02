import { useState, useEffect } from 'react'
import { formatearMoneda } from '../helpers'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"


const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() =>{
        const totalgastado = gastos.reduce((total, gasto) => gasto.valor + total, 0 );
        const totalDisponible = presupuesto - totalgastado;

        setGastado(totalgastado)
        setDisponible(totalDisponible)

        let porcentajeSaldo = ( 100 - ((totalgastado / presupuesto) * 100) ).toFixed(2);
        setTimeout(() =>{
            setPorcentaje(porcentajeSaldo)
        }, 2000)
    },[gastos, presupuesto])


    const handleResetApp = () => {
        const reiniciarApp = confirm('Deseas iniciar un nuevo presupuesto?')
        if(reiniciarApp){
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false);
        }
    }
    
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
                styles={buildStyles({
                    pathColor: porcentaje < 0 ? "#e74c3c" : "#32ce03" && porcentaje < 20 ? "#e67e22" : "#32ce03",
                    trailColor: porcentaje < 0 ? "#e74c3c" : "#f5f5f5",
                    textColor: porcentaje < 0 ? "#e74c3c" : "#0c6c8e" && porcentaje < 20 ? "#e67e22" : "#29bbef"
                })}
                value={porcentaje}
                text={`${porcentaje}% Dsp`}
            />
        </div>
        <div className='contenido-presupuesto'>
            <div className='contenedor-btn'>
                <button
                    className='reset-app'
                    onClick={handleResetApp}
                >
                    Reiniciar App
                </button>
            </div>
            <div className='contenido'>
                <p className='texto'>Presupuesto:</p>
                <p className='resaltado'>{formatearMoneda(presupuesto)}</p>
            </div>
            <div className='contenido'>
                <p className={`${disponible < 0 ? 'negativo' : '' || porcentaje < 20 ? 'colormedio' : '' }`}>Disponible:</p>
                <p className='resaltado'>{formatearMoneda(disponible)}</p>
            </div>
            <div className='contenido'>
                <p>Gastado:</p>
                <p className='resaltado'>{formatearMoneda(gastado)}</p>
            </div>
        </div>
    </div>
  )
}

export default ControlPresupuesto