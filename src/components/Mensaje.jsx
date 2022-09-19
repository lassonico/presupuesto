import React from 'react'

const Mensaje = ({children, tipo}) => {
  return (
    <div className={`alerta ${tipo} animar`}>{children}</div>
  )
}

export default Mensaje