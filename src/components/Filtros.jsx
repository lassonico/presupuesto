import { useState, useEffect } from 'react'

const Filtros = ({filtro, setFiltro}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className='campo'>
              <label>Filtrar gastos</label>
                <select
                  filtro={filtro}
                  onChange={ e => setFiltro(e.target.value)}
                >
                  <option value="">Todas las categorías</option>
                  <option value="ahorro">Ahorro</option>
                  <option value="alimentacion">Alimentación</option>
                  <option value="varios">Varios</option>
                  <option value="ocio">Ocio</option>
                  <option value="salud">Salud</option>
                  <option value="suscripciones">Suscripciones</option>
                </select>     
            </div>
        </form>
    </div>
  )
}

export default Filtros