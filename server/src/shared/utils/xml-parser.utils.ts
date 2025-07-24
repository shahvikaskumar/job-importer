import {parseStringPromise, ParserOptions} from 'xml2js';


const defaultOptions: ParserOptions = {
    explicitArray:false,
    mergeAttrs:true,
    trim:true,
};

export async function parseXmlToJson(xmlData:string):Promise<any>{
    try{
        const result = await parseStringPromise(xmlData, defaultOptions);
        return result
    }
    catch(error){
        console.error('Error parsing XML:', error)
        throw new Error('Failed to parse XML');
    }
}