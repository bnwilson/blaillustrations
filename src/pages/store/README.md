# **Store Page** - _Planned implementations_
---------------

## **Phase 1**:

#### Navigate by `collections`
* **Landing Page** -- `/store/index.html` will query and display all Shopify **collections** with **_1 or more_** product(s)
  * selecting (_clicking_) a **collection** will reroute to `store/[collection]` where `collection = collection.id`
    * _Note: this value is also saved to the `data-collection-id` property of the html element, for possible 'onClick' interactions_

--------

## **Phase 2**:

#### Navigate by `collections` or `productType`

* **Landing Page** -- `/store/index.html` will allow you to peruse products by _collections_ **or** _type of products_ (_i.e. 'stickers', 'paintings', etc.)
  * Add `pages/store/[collections]/index.tsx`
    * `pages/store/[collections]/` folder created 
    * nested `index.tsx` file will contain most of the business logic present in the Phase 1 landing page
  * Each collection displayed will navigate to `/pages`
----------

## **Phase 3**:

* **Layout and Styling**
  * **_Sublayout_** - Component / Provider for app in `_app.tsx`
    * Implement `Sublayout.tsx` 
    * build + apply Sublayout to the `pages/store/...` pages
      * **Header** - Static banner for the store, containing Greeting, _Shopping Cart_,  and (possibly) Breadcrumb navigation
      * **Body** - Mutable state of the app, contains the majority of components/logic/modules as completed in the previous phase
      * **Cart** - A toggle-able `Drawer` component that will list the current items in the _Shopping Cart_ -- also displays the "_Checkout_" button
  * **_Styling_**
    * Sync up _colors and themes_ accross app
    * Smooth out inconsistencies
    * Correct any unresponsive mechanics

#### Helpful links
* [NextJS - Dynamic Routes](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes)
* [NextJS - Routing and Links](https://nextjs.org/docs/pages/building-your-application/routing/linking-and-navigating)