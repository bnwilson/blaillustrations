import {useForm} from 'react-hook-form'
import type { ShopifyProductVariantData } from '@/models/shopifyApiCustomTypes'
import { Flex, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'
import { useState } from 'react'

interface ProductModalFormProps {
    productVariants?: ShopifyProductVariantData[]
    onVariantSelect?: Function
    onSubmit?: Function
}

export function productModalForm(props: any) {

    return (
        <>

        </>
    )
}


interface ProductModalInputNumberProps {
    minAmount?: number // default is 1
    maxAmount?: number // default is 30 - should be totalInventory of product/variant
}
export function ProductModalInputNumber (props: ProductModalInputNumberProps) {
    const {minAmount=1, maxAmount=30} = props
    const [currentVal, setCurrentVal] = useState(minAmount)
    const handleChange = (newValString: string, newValNum: number) => setCurrentVal(newValNum)
    const handleChangeSlider = (newValNum: number) => setCurrentVal(newValNum)

    return (
        <Flex>
            <NumberInput max={maxAmount} min={minAmount} 
                onChange={handleChange} 
                maxW={"120px"} mr='2rem' 
                value={currentVal} 
                defaultValue={minAmount}
            >
                <NumberInputField />
                <NumberInputStepper >
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Slider 
                flex='1'
                focusThumbOnChange={false}
                value={currentVal}
                onChange={handleChangeSlider}
                max={maxAmount}
                min={minAmount}
            
            >
                <SliderTrack aria-valuemax={maxAmount}>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb fontSize={'sm'} boxSize='32px' >{currentVal}</SliderThumb>
            </Slider>
        </Flex>
    )
}