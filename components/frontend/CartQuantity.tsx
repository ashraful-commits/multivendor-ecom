import {Plus,Minus} from "lucide-react"
import { Button } from '@/components/ui/button';
const CartQuantity = ({ className, setQuantity, quantity }: { className?: string; setQuantity: (quantity: number) => void; quantity: number; }) => {
    const increaseQuantity = () => {
      if(quantity>=1){
          setQuantity(quantity + 1);
      }
    };
  
    const decreaseQuantity = () => {
      if(quantity>1){
          setQuantity(quantity - 1);
      }
    };
  
    return (
      <div className={` border-none rounded-none ${className}`}>
        <Button size="sm" className=" rounded-none" onClick={increaseQuantity} variant="default"><Plus/></Button>
        <span className="block text-slate-900 dark:text-slate-100 px-2">{quantity}</span>
        <Button size="sm"  className=" rounded-none" onClick={decreaseQuantity} variant="default"><Minus/></Button>
      </div>
    );
  };
  
  export default CartQuantity;
  