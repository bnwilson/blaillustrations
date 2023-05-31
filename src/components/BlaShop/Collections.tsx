import { SimpleGrid } from "@chakra-ui/react";
import { Collection, Product } from "@shopify/hydrogen-react/storefront-api-types";
import { CollectionItem, CollectionItemProps } from "./CollectionItem";

type CollectionsProps = CollectionItemProps[]

export function Collections (props: any) {
   const {children} = props

    return (
        <SimpleGrid minChildWidth="200px" spacing="35px" margin={"0px auto"} padding={"0px 4rem"}  >
            {/* ...<CollectionItem {prop[index]} */}
            {...children}
        </SimpleGrid>
    )
}