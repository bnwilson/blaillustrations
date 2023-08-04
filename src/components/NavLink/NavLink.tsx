import React, { ReactElement } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from './NavLink.module.css'

interface LinkProps {
    className?: string | undefined,
    href: string,
    children: ReactElement
}
/**
 * 
 * @summary Modeled after guide {@link https://flaviocopes.com/nextjs-active-link/}
 * * Updated for typescript
 * 
*/
const NavLink = (props: LinkProps) => {
    const {href, children, className} = props
    const router = useRouter()

    let classNameChild = children.props.className
    if (router.pathname === href || router.pathname.includes(href)) {
        classNameChild = styles['nav-selected']
    }

    return <Link 
            href={href} 
            className={className}>
                {React.cloneElement(children, {className: classNameChild})}
            </Link>
}

export {NavLink}