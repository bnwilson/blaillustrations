import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Modeled after guide @ https://flaviocopes.com/nextjs-active-link/

export default ({href, children}) => {
    const router = useRouter();

    let className = children.props.className || '';
    if (router.pathname === href) {
        className = `${className} nav-selected`
    }

    return <Link href={href}>{React.cloneElement(children, {className})}</Link>
}