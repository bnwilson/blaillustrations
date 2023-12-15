import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import { ShopifyCollectionData } from "@/models/shopifyApiCustomTypes";
/* * Types * */
/* CollectionsContext */
export type CollectionsContextState = {
    activeCollectionId?: string,
    collections: {
        collectionId: string,
        collectionTitle: string,
        productCount: number
    }[]
}
/* CollectionsReducer - unused, but does describe the reducer func */
type CollectionsReducerFunc<CollectionsContextState, CollectionsDispatchContextAction> = 
    (prevCollectionsContext: CollectionsContextState, 
        action: CollectionsDispatchContextAction
    ) => CollectionsContextState

/* CollectionsContextDispatch(State|Action) */
export type CollectionsDispatchContextState = Dispatch<CollectionsContextState>
export type CollectionsReducer = typeof collectionsReducer
export type CollectionsDispatchContextAction = 
    | {type: 'clear'}
    | {type: 'init', newCollections: CollectionsContextState['collections']}
    | {type: 'updateActive', newActiveCollectionId: string}
    | {type: 'updateCollections', newCollections: CollectionsContextState['collections']}

export interface CollectionsContextProviderProps {
    children?: ReactNode
}

/* Context - CollectionsContext, CollectionsDispatchContext */
export const CollectionsContext = createContext<CollectionsContextState|null>(null)

export const CollectionsDispatchContext = 
    createContext<Dispatch<CollectionsDispatchContextAction> | null>(null)
/**  
 * `CollectionsContextProvider` - high-order component for store `collections` context
 * 
 * ```jsx 
 *  <CollectionsContextProvider> 
 *      {children} 
 *  </CollectionsContextProvider> 
 * ```
 * @param {CollectionsContextProviderProps} props 
 */
export const CollectionsContextProvider = ({children}: CollectionsContextProviderProps) => {
    const [collectionsContext, collectionsDispatchContext] = useReducer(
        collectionsReducer,
        {
            activeCollectionId: "",
            collections: []
        }
    )
    const collectionsContextMemo = useMemo(()=>collectionsContext,[collectionsContext])
    return (
        <CollectionsContext.Provider value={collectionsContextMemo} >
            <CollectionsDispatchContext.Provider value={collectionsDispatchContext} >
                {children}
            </CollectionsDispatchContext.Provider>
        </CollectionsContext.Provider>
    )

}


/** collectionsReducer - used locally for useReducer hook -> updating CollectionsContext state
 * 
 * @param {CollectionsContextState} prevCollectionsContext 
 * @param {Action} action 
 * @returns {void}
 */
function collectionsReducer (prevCollectionsContext: CollectionsContextState, action: CollectionsDispatchContextAction): CollectionsContextState {
    switch(action.type) {
        case 'clear': {
            return {
                activeCollectionId: "",
                collections: []
            }
        }
        case 'init': {
            return {
                activeCollectionId: prevCollectionsContext?.activeCollectionId || "",
                collections: [...action.newCollections]
            }
        }
        
        case 'updateActive':
            return {
                ...prevCollectionsContext,
                activeCollectionId: action.newActiveCollectionId
            }

        case 'updateCollections':
            return {
                ...prevCollectionsContext,
                collections: [...action.newCollections]
            }

        default: {
            throw Error(`Unknown action or action ommitted:  ${action}`)
        }
    }
}

