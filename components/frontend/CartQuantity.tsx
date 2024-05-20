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
      <div className={`${className}`}>
        <Button onClick={increaseQuantity} variant="default">+</Button>
        <span>{quantity}</span>
        <Button onClick={decreaseQuantity} variant="default">-</Button>
      </div>
    );
  };
  
  export default CartQuantity;
  