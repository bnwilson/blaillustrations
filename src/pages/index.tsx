import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
// import { ReactElement } from 'react'
// import { Layout } from '@/components/Layout'


export default function Home() {
  return (
    <div>
      <div className={styles['app-wrapper']}>
        <section className={styles['home-wrapper']}>
          <div className={styles['home-body']}>
            <h3 className={styles['home-body__title']}>November 2023 - BLAillustrations store is up!</h3>
            <br/>
            Check out the <Link href="https://blaillustrations.myshopify.com">
              BLAillustrations store {"(powered by Shopify)"}
            </Link>!
            <br/>
            <strong>Coming soon:&emsp;</strong> Store will embedded in the <strong>store</strong> page.
          </div>
          <h4 className={styles["home-body"]}>
              The site is currently still a work in progress, 
              but feel free to check out the <Link href="/gallery">Gallery</Link>,  
              or drop Brittany a line in the <Link href="/contact">Contact Page</Link>!
          </h4>
          <h2 className={styles["home-title"]}>
              Thank you for visiting BLAIllustrations!
          </h2>
        </section>
      </div>
    </div>
  )
}

/* Note: The below template has been implemented in '_app.tsx' instead */

/* TODO -- implement 'reconciliation' 
   (https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts)
--------------------------------------------------------------------------------------
Home.getLayout = function getLayout(page:any) {
  return (
    <Layout>
      // { If a nested layout were to be implemented: <NestedLayout>{page}</NestedLayout>}
      {page}
    </Layout>
  )
}
 */