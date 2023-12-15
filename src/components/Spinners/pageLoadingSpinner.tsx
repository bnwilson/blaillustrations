import { Spinner } from "@chakra-ui/react";

interface PageLoadingSpinnerProps {
    color?: string,
    emptyColor?: string,
    speed?: string, //ex. '0.65s'
    size?: string,
    thickness?: string,
}
export function PageLoadingSpinner ({
    thickness='4px', speed='0.7s', emptyColor="blackAlpha.300", size='xl', color='orange.300'
}: PageLoadingSpinnerProps) {

    return (
        <Spinner  
            {...{thickness, speed, size, emptyColor}}
        />
        
    )
}