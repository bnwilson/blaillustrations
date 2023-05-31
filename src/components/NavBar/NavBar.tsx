import React, { useContext } from 'react'
import NavLink from '../NavLink'
import styles from './NavBar.module.css'
import UserContext from '../userContext'
import { BlaLogo, BlaLogoProps } from '../BlaLogo'
import {ExternalLinkIcon} from '@chakra-ui/icons'
import Link from 'next/link'

/* * * Types * * */
export interface NavBarProps {
    backgroundImage?: string
    backgroundSize?: string
}

export interface NavItem {
    title: string
    value: string
    href: string
    isExternal?: boolean
}

enum navBarDefaults {
    backgroundImage = "/slide1.png",
    backgroundSize = "cover"
} 
/* * * * * * * * * */

/* * * Nav Items map * * */
/* - excludes homepage icon, admin */
const navItems: NavItem[] = [
    {
        title: "Gallery",
        value: "gallery",
        href: "/gallery"
    },
    {
        title: "Contact",
        value: "contact",
        href: "/contact"
    },
    {
        title: "Store",
        value: "store",
        href: "/store",
        isExternal: false
    }
]

/* Admin Nav Link - Conditionally renders if user is logged into Netlify CMS */
function AdminLink () {
    return (
        <NavLink href="/admin">
            <span className={styles['nav-item']}>Admin</span>
        </NavLink>
    )
}

/** NavBar - Unordered list containing NextJS-route Link's to various pages
 * 
 * @param {NavBarProps} navBarProps - `{` `backgroundImage`, `backgroundSize` `}`
 * @returns 
 */
export function NavBar (navBarProps: NavBarProps) {
    let {
        backgroundImage=navBarDefaults.backgroundImage, 
        backgroundSize=navBarDefaults.backgroundSize
    } = navBarProps
    backgroundImage  = `url(${backgroundImage})`
    const {isLoggedIn} = useContext(UserContext)
    
    return (
        <div className={styles['nav-header']} style={{backgroundImage, backgroundSize}}>
            <Link href={"/"} title="Back to the landing page...... :)">
                <BlaLogo />
            </Link>
            <label className={styles['nav-title']}>
                <h2>BLA</h2>
                <h2>Illustrations</h2>
            </label>
            <nav className={styles.navbar} >
                <ul className={styles['nav-list']}>
                    {navItems.map((navItem, index) => (
                        <li className={styles['nav-list__item']} key={index}>
                            <NavLink href={navItem.href} className={styles['nav-item']}>
                                <span className={styles['nav-item']}>
                                    {navItem.title} 
                                    { navItem.isExternal ? <ExternalLinkIcon className={'superscript'} /> : null}
                                </span>
                            </NavLink>
                        </li>
                    ))}
                    {isLoggedIn ? (<li className={styles['nav-list__item']}><AdminLink/></li>) : null}
                </ul>
            </nav>
        </div>
    )
}
