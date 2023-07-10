import { useCart, useCartLine } from "@shopify/hydrogen-react";
import { CSSProperties } from "react";

const cartBadgeColorTheme = {
    "dark": {
        color: "black",
        backgroundColor: "white"
    } as CSSProperties,
    "light": {
        color: "white",
        backgroundColor: "rgba(0,0,200,0.6)"
    } as CSSProperties,
}

interface CartBadgeProps {
    colorTheme?: "dark" | "light"
}

/**
 * 
 * @param props 
 * @returns null
 */
export function CartBadge(props: CartBadgeProps) {
    const { totalQuantity, lines } = useCart();
    const {colorTheme="light"} = props;
    const lineCount = lines?.length

    return (

      <div className={`cart_icon_badge`} >
          <span style={cartBadgeColorTheme[colorTheme]}>{lineCount || totalQuantity || 0}</span>
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