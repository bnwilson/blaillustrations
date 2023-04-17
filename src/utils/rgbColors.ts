interface RGBColors {
    blue: string;
    green: string;
    grey: string;
    mintcream: string;
    violet: string;
    slategrey: string;
    yellow: string;
    purple: string;
    [key:string]: any;
}

export const rgbColors: RGBColors = {
    'blue'     : '(0, 0, 255)',
    'green'    : '(0, 255, 0)', 
    'grey'     : '(128, 128, 128)', 
    'mintcream': '(245,  255, 250)', 
    'violet'   : '(238, 130, 238)',
    'slategrey': '(112, 128, 144)', 
    'yellow'   : '(255, 255, 0)', 
    'purple'   : '(128, 0, 128)'
}