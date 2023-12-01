# BLAillustrations website
This site was built for the artist BLAillustrations.  The basic functions will include a store, gallery, and contact form.
---
## Stack / Technologies
Currently, this site leverages the following (_"JAM"_) stack:
* [Next.js](https://nextjs.org/)
  * a static-page React framework, allowing both server-side and client-side rendering
  * project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
* [Netlify](https://www.netlify.com/for/web-applications/)
  * Hosting
  * C/I & C/D with Github integration
    * This provides a dynamic CMS-like service, where the site owner/admin can upload various content (_ex. Gallery pictures_)
  * Function As A Service (FaaS) capability
    * Utilizes a function for the Contact form 
    * Contact service uses [Sendgrid](https://sendgrid.com) API
* Languages & Packages
    * React (_inherent to Next.js_)
      * `react-hook-form`, `yup`
      * [`chakra-ui`](https://chakra-ui.com/docs/components)
      * Typescript (_`.tsx` for components_)
    * `NodeJS`
      `webpack`, `babel`, `eslint`
    * Shopify
      * [Hydrogen.js](https://shopify.dev/docs/api/hydrogen-react) - a Shopify API React-based SDK/component-library
      * [Storefront API](https://shopify.dev/docs/api/storefront)
      * `graphQL` - query language for storefront API interaction
    * Styling
      * `styled-jsx`
      * `*.module.css`
      * styled components / inline-styles
      * Good ol' fashioned `css`, well.. _`css3`_
      ###### _Dev Note: I used this project to play around with different styling approaches... sorry in advance_
* Recommended extensions (VSCode)
  * `CSS Modules` by clinyong
  * `ESLint` by Microsoft
  * `GraphQL: Syntax Highlighting` by GraphQL Foundation
  * `styled-jsx` by niceSprite
  * `YAML` by Red Hat
  * `Iconify IntelliSense` (_optional_) by Anthony Fu
  * `Image preview` (_optional_) by Kiss Tamás
  * `node-readme` (_optional_) bybengreenier

## Getting Started
1. First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Editing
You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

#### API Routes
[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

* The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

> #### Notes
> This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

* You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
* Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

#### Next.js stuff
> ### Deploy on Vercel
> The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

