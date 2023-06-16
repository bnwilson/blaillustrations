import { useCart } from "@shopify/hydrogen-react";
import { CSSProperties } from "react";

const cartBadgeColorTheme = {
    "dark": {
        color: "black",
        backgroundColor: "white"
    } as CSSProperties,
    "light": {
        color: "pearl",
        backgroundColor: "black"
    } as CSSProperties,
}

interface CartBadgeProps {
    colorTheme?: "dark" | "light"
}

export function CartBadge(props: CartBadgeProps) {
    const { totalQuantity } = useCart();
    const {colorTheme="light"} = props;
  
    if (totalQuantity && totalQuantity < 1) {
      return null;
    }

    return (
        // Note:  Below is copied from an example using tailwind, 
        //        need to convert this to standard css and plug into the CartIcon
      <div className={`cart_icon_badge`} >
          <span>{totalQuantity}</span>
      </div>
    );
}

/* Note: Below is copied from an example using tailwind

  <div
  className={`
      absolute 
      bottom-1 right-1 
      text-[0.625rem] 
      font-medium subpixel-antialiased h-3 
      min-w-[0.75rem] 
      flex items-center justify-center 
      leading-none text-center rounded-full 
      w-auto px-[0.125rem] pb-px`}
  > 
*/