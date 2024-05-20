import React from 'react'
import Navbar from './../../components/frontend/Navbar';

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div className="w-full">
      <Navbar/>
      {children}
    </div>
  )
}

export default layout
