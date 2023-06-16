import { SimpleGrid } from "@chakra-ui/react"

export function Products (props: any) {
    let {children} = props
    return (
        <SimpleGrid 
            minChildWidth={["400px", "350px", "380px"]}
            
            spacing="2rem" 
            margin={"0px auto"} 
            padding={["2px .15rem", "2px 1.25rem", "2px 2rem"]} 
            
        >
            {/* ...<CollectionItem {prop[index]} */}
            {...children}
        </SimpleGrid>
    )
}