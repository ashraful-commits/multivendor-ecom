"use client"
  import React from 'react';
import  {MoveUp} from "lucide-react"
import { Button } from '@/components/ui/button';

const ScrollToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth" 
        });
      };
  return (
    <Button className="scroll-to-top-button !p-3 w-10 h-10 rounded-full fixed bottom-5 left-5 z-[99999999]" onClick={scrollToTop}>
      <MoveUp className="size-10"/>
    </Button>
  );
};

export default ScrollToTop
