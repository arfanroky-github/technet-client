import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  HiMinus,
  HiOutlinePlus,
  HiOutlineShoppingCart,
  HiOutlineTrash,
} from 'react-icons/hi';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  addToCart,
  decrecingQuantity,
  removeFromCart,
} from '@/redux/features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { products, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()


  return (
    <Sheet>
      <SheetTrigger className="flex items-center">
        <HiOutlineShoppingCart size="25" />
        <span className="ml-2 bg-primary px-2 rounded-full text-white">
          {products.length}
        </span>
      </SheetTrigger>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <h1>Total: {total.toFixed(2)}</h1>
        </SheetHeader>
        <div className="">
          {products.map((product) => (
            <div
              className="border h-44 p-4 gap-2 flex items-center justify-between rounded-md"
              key={product.id}
            >
              <SheetClose asChild>
              <div
                onClick={() => navigate(`/product-details/${product.id}`)}
                className="border-r p-2"
              >
                <img
                  src={product.image}
                  alt={product.model}
                  className="w-20 h-20 object-cover"
                />
              </div>
              </SheetClose>
              <div className="px-2 flex flex-col gap-y-1 text-sm">
                <h1 className=" self-center  font-bold text-primary">
                  {product?.model}
                </h1>
                <p className="flex items-center gap-2">
                  <span className="font-bold text-xs ">Quantity :</span>
                  <span className="text-orange-500">{product.quantity}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-bold text-xs">Total Price :</span>
                  <span className="text-pink-600">
                    {(product.price * product.quantity).toFixed(2)}$
                  </span>
                </p>
              </div>
              <div className="border-l p-2 flex flex-col gap-2 justify-between">
                <Button onClick={() => dispatch(addToCart(product))}>
                  <HiOutlinePlus size="20" />
                </Button>
                <Button onClick={() => dispatch(decrecingQuantity(product))}>
                  <HiMinus size="20" />
                </Button>
                <Button
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-400"
                  onClick={() => dispatch(removeFromCart(product))}
                >
                  <HiOutlineTrash size="20" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
