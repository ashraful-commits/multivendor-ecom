import Image from "next/image";
import  Link  from 'next/link';

import { getServerSession } from 'next-auth';
import Hero from '@/components/frontend/Hero';
import CategoriesSlider from '@/components/frontend/CategoriesSlider';
import BrandSlider from '@/components/frontend/BrandSlider';
import MasonryGallery from '@/components/frontend/MasonryGallery';
import TagSlider from '@/components/frontend/TagSlider';
import Footer from './../../components/frontend/Footer';
import ScrollToTop from './../../components/frontend/ScrollToTop';

export default async function Home() {
  const session =await getServerSession()
  
  return (
    <main className="flex items-center  flex-col min-h-screen md:container lg:container container-fluid">
     <Hero/>
     <CategoriesSlider/>
     <BrandSlider/>
    
        <TagSlider />
 
     <MasonryGallery/>
     <Footer/>
     <ScrollToTop/>
    </main>
  );
}
