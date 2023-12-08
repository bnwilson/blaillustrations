import { SimpleGrid } from "@chakra-ui/react"

export function Products (props: any) {
    let {children} = props
    return (
        <SimpleGrid 
            minChildWidth={["350px", "375px", "380px"]}
            // alignItems="baseline"
            spacing={["1rem", "1.25rem", "2rem"]}
            margin={"0px auto"} 
            padding={["2px", "2px 10px", "2px 30px"]} 
            // alignItems="center"
            justifyItems={"center"}
            
        >
            {/* ...<CollectionItem {prop[index]} */}
            {...children}
        </SimpleGrid>
    )
}