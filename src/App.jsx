import { useState, useEffect } from 'react'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import IconoAgrgarPresupuesto from './img/agrega-presupuesto.svg'
import CerrarBtn from './img/cerrar.svg'
import Header from './components/Header'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import Mensaje from './components/Mensaje'
import ListadoGastos from './components/ListadoGastos'

import { generarId } from './helpers'

function App() {

  const [ gastos, setGastos ] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [] 
  );
  const [ presupuesto, setPresupuesto ] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false);

  const [ modal, setModal ] = useState(false);
  const [ modalSaldo, setModalSaldo ] = useState(false)
  const [ animarModal, setAnimarModal ] = useState(false);
  const [ animarModalSaldo, setAnimarModalSaldo ] = useState(false);

  const [ gastoEditar, setGastoEditar ] = useState({})
  const [ filtro, setFiltro ] = useState('')
  const [ gastosFiltrados, setGastosFiltrados ] = useState([])
  const [ agregaSaldo, setAgregaSaldo ] = useState('');
  const [ mensaje, setMensaje ] = useState('');

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 300)
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto) ?? 0;
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []); 
  }, [gastos])

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, [])

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({});
    setTimeout(() => {
      setAnimarModal(true)
    }, 300)
  }
  const handleModalSaldo = () => {
    setModalSaldo(true)
    setTimeout(() => {
      setAnimarModalSaldo(true);
    }, 400)
  }

  const guardarGasto = gasto => {
    if(gasto.id){
      // Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else{
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    
    setAnimarModal(false)
      setTimeout(() => {
        setModal(false)
    }, 300)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  const ocultarModalSaldo = () => {
    setAnimarModalSaldo(false)
    setAgregaSaldo('')
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
    setAgregaSaldo('')
    setTimeout(() => {
      setModalSaldo(false)
    }, 400)
  }

  return (
    <div className={ modal || modalSaldo ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
              gastos={gastos}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt="Icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
          
          <div className='agrega-presupuesto'>
          <img
              src={IconoAgrgarPresupuesto}
              alt="Icono nuevo gasto"
              onClick={handleModalSaldo}
            />
          </div>
        </>
      )}

      { modal &&
        <Modal 
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      }

      {
        modalSaldo &&
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
      }
    </div>
  )
}

export default App
