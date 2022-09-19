import React from 'react'
import { useState } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const ModalSaldo = ({setModalSaldo, animarModalSaldo, setAnimarModalSaldo, presupuesto, setPresupuesto }) => {

  const [ agregaSaldo, setAgregaSaldo ] = useState('');
  const [ mensaje, setMensaje ] = useState('');

  const ocultarModalSaldo = () => {
    setAnimarModalSaldo(false)
    setTimeout(() => {
      setModalSaldo(false)
  }, 400)
  }

  const handleAgregarSlado = (e) => {
    e.preventDefault()
    const valorIngresado = document.getElementById('presupuesto');
    const saldoActualizado = presupuesto + agregaSaldo;
    
    if(agregaSaldo <= 0){
      setMensaje('El valor que ingresas debe ser un numero entero mayor a 0')
      valorIngresado.focus();
      setTimeout(() => {
        setMensaje('')
      }, 3000);
      return
    }
    setPresupuesto(saldoActualizado);
    setTimeout(() => {
      setModalSaldo(false)
    }, 400)
  }

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img 
          src={CerrarBtn}
          onClick={ocultarModalSaldo}
          alt="boton para cerrar el modal"
        />
      </div>
      <form onSubmit={handleAgregarSlado} className={`formulario ${animarModalSaldo ? "animar" : "cerrar" }`}>
        <legend>Agraga saldo al presupuesto</legend>
        { mensaje && <Mensaje tipo="error">{mensaje}</Mensaje> }
        <div className='campo'>
          <label htmlFor='presupuesto'>Agregar presupuesto</label>
          <input 
            type="number"
            placeholder="Agrega saldo a tu presupuesto"
            id="presupuesto"
            value={agregaSaldo}
            onChange={ e => setAgregaSaldo(Number(e.target.value)) }
          />
        </div>
        <input
          type="submit"
          value="Sumar al saldo"
        />
      </form>
    </div>
  )
}

export default ModalSaldo