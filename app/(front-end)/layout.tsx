import React from 'react'
import Navbar from '@/components/frontend/Navbar';
import DrawerDemo from '@/components/frontend/DrawerCom';
import DrawerDemoFav from '@/components/frontend/DrawerFavCom';
import DraggableComponent from './../../components/frontend/DraggableComponent';

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div className="w-full relative">
      <Navbar/>
     
      <DraggableComponent>
      <DrawerDemo />
      </DraggableComponent>
      <DraggableComponent>
      <DrawerDemoFav />
      </DraggableComponent>
      {children}
    </div>
  )
}

export default layout
