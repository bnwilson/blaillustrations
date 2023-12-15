import { SkeletonCircle, Skeleton, SimpleGrid } from "@chakra-ui/react";

export interface CollectionsSkeletonProps {
    isLoading?:      boolean, // default: true
    circleCount?:    number,  // default: 4
    fadeInMs?:       number,  // default: 0.5
    animationSpeed?: number   // default: 1.0
}

/**
 * @param {BlaCollectionsSkeletonProps} props `isLoading`, `circleCount`, `fadeInMs`, `animationSpeed`
 *  
 * **`isLoading?`:**     _`default =`_`true`  
 * **`circleCount?`:**   _`default =`_`4`   
 * **`fadeInMs?`:**      _`default =`_`0.5`   
 * **`animationSpeed?`:**_`default =`_`1.0` 
 * @returns {JSX.Element} `CollectionsSkeleton`::`JSX.Element`
 */
export function CollectionsSkeleton (
    {isLoading=true, circleCount=8, fadeInMs=0.5, animationSpeed=1.0}: CollectionsSkeletonProps) {

    return (
        <>
        {isLoading && 
            <SimpleGrid 
                alignItems={"center"}
                width="100%"  
                columns={[1, 2, 4, 4]}
                justifyItems={"center"}
                gap={"4rem"}
                margin={"1rem auto"}
                padding={"2rem 4rem"}

            >
                {[...Array(circleCount)].map((nil, i) => 
                    <SkeletonCircle 
                        key={i} 
                        justifySelf="center" 
                        
                        size='40' 
                        fadeDuration={fadeInMs} 
                        speed={animationSpeed}  
                        // startColor={'orange.500'}
                        // endColor={'gray.500'}
                    />
                )}
            </SimpleGrid>
        }
        </>
    )
}