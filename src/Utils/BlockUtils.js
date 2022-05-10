import { USEFULL , HARMFULL , CONTR } from "../constants/consts";

export function getFillByType (type){
switch(type){
    case USEFULL : return "#53C141";
    case HARMFULL : return "#C14141";  
    case CONTR : return '#D4D81D'; 
    default : return "#53C141"; 
}
}

export function getStrokeByType(type){
switch(type){
    case USEFULL : return "#41CC41";
    case HARMFULL : return "#963232";  
    case CONTR : return '#B9BC18'; 
    default : return "#41CC41"; 
}
}

export const calculateTextSize = (str_len) => {
if (str_len < 10) return 40;
if (str_len > 80) return 11;
if (str_len > 40) return 13;
if (str_len > 20) return 17;

return 300 / str_len;
};