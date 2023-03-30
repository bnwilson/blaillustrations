import { rgbColors } from "@/utils/rgbColors"

/* Types */
interface TagsProps {
    tags: string[]
    isUpperCase?: boolean
}

interface TagProps {
    tagText: string
    isUpperCase?: boolean
    tagColor: string
}

/* getNextColor 
    -- Generator -- 
        .next() method will yield the 1st element and move it to end of array 
        .return() marks the generator as 'complete' */
const getNextColor = function*() {
    //const colors = ['blue', 'green', 'grey', 'mintcream', 'violet','slategrey', 'yellow', 'purple']
    const colors = Object.keys(rgbColors)
    while (true) {
        let currentColor = colors.shift()
        if (currentColor) {
            let currentColorRgb = rgbColors[currentColor]
            colors.push(currentColor)
            yield rgbColors[currentColor]
        }
    }
}

/* Local Functions */
function buildTagProps (tagData: TagsProps): TagProps[] {
    const colorGen = getNextColor()
    const tagProps: TagProps[] = tagData.tags.map(tag => {
        return {
            tagText: tag,
            isUpperCase: tagData.isUpperCase || false,
            tagColor: colorGen.next().value
        } as TagProps
    })
    colorGen.return(null!)
    return tagProps
}

/* Components - Tag, Tags */
export function Tag (props:TagProps) {
    const {tagText, tagColor, isUpperCase=false} = props
    // Convert '(0, 255, 0)' to => 'rgba(0, 255, 0, 0.8)'
    const tagFontColor = 'rgba' + tagColor.replace(/ *\)$/, ', 0.8)') 
    return (
        <span className={isUpperCase ? 'tag_item tag_uppercase' : 'tag_item'}>
            {tagText}
            <style jsx>{`
                .tag_item {
                    display: inline-block;
                    white-space: nowrap;
                    padding-inline-start: 0.25rem;
                    padding-inline-end: 0.25rem;
                    font-size: 0.75rem;
                    border-radius: 0.25rem;
                    font-weight: 700;
                    color: ${tagFontColor};
                    box-shadow: ${tagFontColor};
                }    
                .tag_uppercase: {
                    font-transform: uppercase;
                }
            `}</style>
        </span>
    )
}

export function Tags (props:TagsProps) {
    
    return (
        <div className="tag_container">
            {buildTagProps(props).map((tag, index) => (<Tag {...tag} key={index}/>) )}
            <style jsx>{`
                .tag_container {
                    display: flex;
                    flex-direction: row;
                }
            `}</style>
        </div>
    )
}