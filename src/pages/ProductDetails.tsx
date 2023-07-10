import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { ProductCart } from '@/redux/features/cart/cartInterface';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { useGetSingleProductQuery } from '@/redux/features/product/productApi';
import { useAppDispatch } from '@/redux/hook';
import { ReactNode } from 'react';

import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: product } = useGetSingleProductQuery(id);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (product) {
      const payload: ProductCart = {
        id: product._id,
        model: product.model,
        price: product.price,
        quantity: 1,
        image: product.image,
      };
      dispatch(addToCart(payload));
    }
  };


  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={product?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.model}</h1>
          <p className="text-xl">Rating: {product?.rating}</p>
          <ul className="space-y-1 text-lg">
            {product?.spec.map((item: { [s: string]: unknown }) => {
              return Object.entries(item).map(
                ([key, value]: [string, unknown]) => (
                  <li key={key} className="flex items-center gap-2">
                    <span className="font-bold text-xs capitalize">{key}:</span>
                    <small>{value as ReactNode}</small>
                  </li>
                )
              );
            })}
          </ul>

          <Button onClick={handleAddToCart}>Add to cart</Button>
        </div>
      </div>
      <ProductReview id={id as string} />
    </>
  );
}
