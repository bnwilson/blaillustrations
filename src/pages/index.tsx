import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <div className={styles['app-wrapper']}>
        <section className={styles['home-wrapper']}>
          <div className={styles['home-body']}>
            <h3 className={styles['home-body__title']}>March 2023 - BLAIllustrations store is up!</h3>
            <br/>
            Check out the <Link href="https://blaillustrations.myshopify.com">
              BLAIllustrations store on Shopify
            </Link>!
            <br/>
            <strong>Coming soon:&emsp;</strong> Store will embedded in the <strong>store</strong> page.
          </div>
          <h4 className={styles["home-body"]}>
              The site is currently still a work in progress, 
              but feel free to check out the <Link href="/gallery">Gallery</Link><br/>
              Or drop Brittany a line in the <Link href="/contact">Contact Page</Link>!
          </h4>
          <h2 className={styles["home-title"]}>
              Thank you for visiting BLAIllustrations!
          </h2>
        </section>
      </div>
    </div>
  )
}
