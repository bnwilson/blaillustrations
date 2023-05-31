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
                maxHeight={"13.25rem"}
                textAlign={"center"} 
                bg={"blackAlpha.500"} 
                onClick={onclick} 
                data-collection-id={id}
                className={"store_item_card"}
            >
                {hasImageData ?
                    (<CardBody padding="0.5rem">
                        <ChakraImage
                            src={imageData?.url || imageData?.src || ""}
                            alt={imageData?.altText || title}
                            borderRadius={"md"}
                        />
                        <Stack mt={"1.25"} spacing={".5"}>
                            <Heading fontStyle={"italic"} fontFamily={"sans-serif"} size="md" textAlign={"center"} color="darkgoldenrod">
                                {title}
                            </Heading>
                            <Text>
                                {description || ""}
                            </Text>
                        </Stack>
                    </CardBody>) :
                    (<label  className='store_collection_title_text'>
                        {title}
                        {description && description || ""}
                    </label>)
                }
                
                <Divider margin="-2px 3px 5px 4px" variant={"solid"}  size="md" alignContent={"center"} opacity="0.8" />
                {tags && tags?.length ?
                    <Wrap spacing={"1.5"} direction="row" margin="0px auto" overflow="hidden" maxBlockSize={"min-content"} padding={"0 1px 2px 0"}>
                        {tags.map((t,i) => <Tag key={i} textTransform="lowercase" size="sm" colorScheme="red" variant="outline">{t}</Tag>).slice(0,4)} 
                    </Wrap> :
                    (<Tag/>)
                }
            </Card>
            
        </div>
    )

   
}