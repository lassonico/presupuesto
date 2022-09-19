import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const [ mensaje, setMensaje ] = useState('')
    const [ nombre, setNombre ] = useState('')
    const [ valor, setValor ] = useState(0)
    const [ categoria, setCategoria ] = useState('')
    const [ fecha, setFecha ] = useState('')
    const [ id, setId ] = useState('')

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setValor(gastoEditar.valor)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [])

    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 300)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const valorNombre = document.getElementById('nombre');
        if([nombre, valor, categoria].includes('')){
            setMensaje('Todos los campos son oblifatorios!')
            valorNombre.focus();
            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return
        }
        guardarGasto({nombre, valor, categoria, id, fecha});
    }

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img 
                src={CerrarBtn}
                onClick={ocultarModal}
                alt="boton para cerrar el modal"
            />
        </div>
        <form onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar" : "cerrar" }`}>
            <legend>{ gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
            { mensaje && <Mensaje tipo="error">{mensaje}</Mensaje> }
            <div className='campo'>
                <label htmlFor='nombre'>Nombre del gasto</label>
                <input 
                    type="text"
                    placeholder="Agrega el nombre del gasto"
                    id="nombre"
                    value={nombre}
                    onChange={ e => setNombre(e.target.value) }
                />
            </div>
            <div className='campo'>
                <label htmlFor='cantidad'>Cantidad</label>
                <input 
                    type="number"
                    placeholder="Agrega el valor del gasto"
                    id="cantidad"
                    value={valor}
                    onChange={e => setValor(Number(e.target.value))}
                />
            </div>
            <div className='campo'>
                <label htmlFor='cantidad'>Categoría</label>
                <select
                    id="categoria"
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                >
                    <option value="">-- Selecciona --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="alimentacion">Alimentación</option>
                    <option value="varios">Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
            <input
                type="submit"
                value={ gastoEditar.nombre ? "Guardar Cambios" : "Agregar"}
            />
        </form>
    </div>
  )
}

export default Modal