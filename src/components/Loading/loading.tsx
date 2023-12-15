import { CollectionsSkeleton } from "@/components/BlaShop/Skeleton";
import { PageLoadingSpinner } from "../Spinners";
import styles from './loading.module.css'

const loadingTemplateAssignments = {
    storeCollections:  <CollectionsSkeleton />,
    storeProducts:     <CollectionsSkeleton />,
    gallery:           <PageLoadingSpinner  />,
    contact:           <PageLoadingSpinner />,
    misc:              <PageLoadingSpinner />,
    root:              <PageLoadingSpinner />,

}

interface LoadingProps {
    routeToBeLoaded?: string
}

export function Loading({routeToBeLoaded=""}: LoadingProps) {
    return (
        
        <div className={styles['loading-container']}>
            {loadingTemplateAssignments[parseLoadingPage(routeToBeLoaded)]}
        </div>
    )
}

const parseLoadingPage = (route: string): keyof typeof loadingTemplateAssignments => {
    switch(route.length) {
        case 0:
            return 'misc'
        case 1: 
            return 'root'
        default:
            break;
    }
    if (/^\/store$/.test(route)) {
        return 'storeCollections'
    } 
    else if(/^\/store\/*?/.test(route)) {
        return 'storeProducts'
    }
    else if(/^\/gallery*?/.test(route)) {
        return 'gallery'
    }
    else if(/^\/contact*?/.test(route)) {
        return 'contact'
    }
    else {
        return 'misc'
    }
}

