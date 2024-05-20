import React, { ReactNode } from 'react';

const ContainerBox = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <div className={`w-full container-fluid md:container lg:container !mx-auto md:mx-0 lg:mx-0 px-3 md:px-0 lg:px-0 ${className}`}>
      {children}
    </div>
  );
};

export default ContainerBox;
