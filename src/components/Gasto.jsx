import React from 'react'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"

import { formatearFecha, formatearMoneda } from '../helpers'

import IconoAhorro from '../img/icono_ahorro.svg'
import IconoAlimentacion from '../img/icono_alimentacion.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'
import IconoVarios from '../img/icono_varios.svg'

const diccionarioIconos = {
    ahorro: IconoAhorro,
    casa: IconoCasa,
    alimentacion: IconoAlimentacion,
    varios: IconoVarios,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
}


const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {

    const { categoria, nombre, valor, fecha, id } = gasto;

    // Editar
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    
    // Eliminar
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => eliminarGasto(id)} destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

  return (
    <SwipeableList>
        <SwipeableListItem
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
            <div className='gasto sombra'>
                <div className='contenido-gasto'>
                    <img
                        // src={IconoCasa}
                        src={diccionarioIconos[categoria]}
                        alt="Icono gasto"
                    />
                    <div className='descripcion-gasto'>
                        <p className='categoria'>{categoria}</p>
                        <p className='nombre-gasto'>{nombre}</p>
                        <p className='fecha-gasto'>Agregado {''}
                            <span>{formatearFecha(fecha)}</span>
                        </p>
                    </div>
                </div>
                <p className='cantidad-gasto'>{formatearMoneda(valor)}</p>
            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto