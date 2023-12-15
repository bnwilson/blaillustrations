import { Router } from "next/router";
import { useEffect, useState } from "react";

/**
 * **`isRouterLoading`**::_`boolean`_ - Is a navigation and/or server-side event happening   
 * **`urlToBeLoaded`**::_`string`_ - will only have an **empty-string** value when `isRouterLoading` === _false_
 *  * `""` === _no events_
 *  * `"/"`=== _root page is being loaded_
 * 
 * 
 * @returns {{isRouterLoading: boolean, urlToBeLoaded: string}} `{isRouterLoading: boolean, urlToBeLoaded: string}`
 */
export function useRouterEventState () {
    const [isRouterLoading, setIsRouterLoading] = useState(false)
    const [urlToBeLoaded, setUrlToBeLoaded] = useState("")
    
    useEffect(() => {
        // start = (url, {shallow}) => {}
        const start = (url: any, options: {shallow: boolean}) => {
            setUrlToBeLoaded(url)
            setIsRouterLoading(true)
        }
        const end = (event:any) => {
            setUrlToBeLoaded("")
            setIsRouterLoading(false)
        }
        Router.events.on("routeChangeStart", start)
        Router.events.on("routeChangeComplete", end)
        Router.events.on("routeChangeError", end)
        return () => {
            Router.events.off("routeChangeStart", start)
            Router.events.off("routeChangeComplete", end)
            Router.events.off("routeChangeError", end)
        }
    },[])

    return {isRouterLoading, urlToBeLoaded}

}