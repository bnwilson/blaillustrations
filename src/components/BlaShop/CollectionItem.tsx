import { Image as ChakraImage, Card, CardBody, Stack, Heading, HStack, Text, Divider, Tag, Wrap } from '@chakra-ui/react';
import {ShopifyImageType} from '../../models/shopifyApiCustomTypes'

export interface CollectionItemProps {
    onclick: React.MouseEventHandler<HTMLDivElement> | undefined;
    id?: string;
    title?: string;
    description?: string;
    imageData?: ShopifyImageType | null;
    tags?: string[];
}

function CollectionItemHeading (props: {collectionTitle?: string}) {

    return (
        <Heading 
            /* Center text */
            top={"50%"} left={"50%"} position={"absolute"} transform={"translate(-50%, -50%)"}
            /* Font Color */
            // color={"blackAlpha.800"} textShadow={"2px 2px 2px ghostwhite, 0 0 1em white, 0 0 0.2em gray"}
            color={"whiteAlpha.900"} textShadow={"2px 2px 5px black, 0 0 1em white, 0 0 0.3em darkblue"}
            /* Font Style & Size */
            fontStyle={"normal"} fontFamily={"sans-serif"} 
            size={"xl"} textAlign={"center"}
        >
                {props?.collectionTitle}
        </Heading>
    )
}

export function CollectionItem (props: CollectionItemProps) {
    const {
        imageData,
        id, 
        title,
        description,
        onclick,
        tags
    } = props

    const hasImageData = Boolean(imageData && Object.keys(imageData).length)

    return (
        <div className='store_item_wrapper'>
            <Card 
                bg={"white"} 
                borderRadius={"full"}
                className={"store_item_card"}
                data-collection-id={id}
                onClick={onclick} 
                textAlign={"center"} 
                >
                {hasImageData ?
                    (<CardBody  padding="0.5rem">
                        <ChakraImage
                            borderRadius={"full"}
                            src={imageData?.url || imageData?.src || ""}
                            alt={imageData?.altText || title}
                        />
                        <CollectionItemHeading collectionTitle={props.title} />
                        {/* <Stack mt={"1.25"} spacing={".5"}>
                            <Heading fontStyle={"italic"} fontFamily={"sans-serif"} size="md" textAlign={"center"} color="darkgoldenrod">
                                {title}
                            </Heading>
                            <Text>
                                {description || ""}
                            </Text>
                        </Stack> */}
                    </CardBody>) :
                    (<label  className='store_collection_title_text'>
                        {title}
                        {description && description || ""}
                    </label>)
                }
                
                {/* <Divider margin="-2px 3px 5px 4px" variant={"solid"}  size="md" alignContent={"center"} opacity="0.8" />
                {tags && tags?.length ?
                    <Wrap spacing={"1.5"} direction="row" margin="0px auto" overflow="hidden" maxBlockSize={"min-content"} padding={"0 1px 2px 0"}>
                        {tags.map((t,i) => <Tag key={i} textTransform="lowercase" size="sm" colorScheme="red" variant="outline">{t}</Tag>).slice(0,4)} 
                    </Wrap> :
                    (<Tag/>)
                } */}
            </Card>
            
        </div>
    )

   
}