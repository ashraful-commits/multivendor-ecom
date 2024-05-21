import React from 'react'
import Navbar from '@/components/frontend/Navbar';
import DrawerDemo from '@/components/frontend/DrawerCom';
import DrawerDemoFav from '@/components/frontend/DrawerFavCom';
const layout = ({children}:{children:ReactNode}) => {
  return (
    <div className="w-full relative">
      <Navbar/>
      <DrawerDemo />
      <DrawerDemoFav />
      {children}
    </div>
  )
}

export default layout
