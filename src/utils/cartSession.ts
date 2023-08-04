import jsCookie from 'js-cookie'

/*
 * Notes:
 *   - The cartId may mutate through multiple interactions with the storefront, 
 *     so the 'setCartId()' func may need to be utilized frequently
 */
 
const CART_SESSION_COOKIE_NAME   = "blaCartId"
const CART_SESSION_COOKIE_EXPIRE = 1 // expire in 1 day

/** Get - Cart ID
 * @description Attempts to read cart id saved to browser cookie (_expires after **1 day**_)
 * @returns `currentCartId`
 */
export function getCartId () {
    const currentCartId = jsCookie.get(CART_SESSION_COOKIE_NAME)
    return currentCartId
}

/** Set - Cart ID
 * @description  saves cart id to browser cookie (_overrides previous cart id if there is one_)
 * @param newCartId _**string**_; new cart ID 
 *  - _ex. "gid://shopify/Cart/AbcDefgHij1L2MN34O"_
 */
export function setCartId (newCartId: string) {
    if (!newCartId || typeof newCartId !== 'string') {
        console.error(`Error occurred setting the cart id cookie. The cart id "${newCartId}" is not a valid cookie id`)
    } else {
        jsCookie.set(CART_SESSION_COOKIE_NAME, newCartId, {expires: CART_SESSION_COOKIE_EXPIRE})
    }
}

/** Delete - CartID
 * @description deletes cart id from cookie, if it exists
 */
export function removeCartId () {
    try {
        jsCookie.remove(CART_SESSION_COOKIE_NAME)
    } catch (removeCookieError) {
        console.error(`An error occurred attempting to remove the cart id from session: \n  ${removeCookieError || ''}`)
    }
}