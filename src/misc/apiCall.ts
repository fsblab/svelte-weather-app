import * as fs from 'fs';
import { getEmptyData, type data } from "./responseInterface";
import { Convert } from './responseInterface';


const base: string = "https://api.weatherapi.com/v1";
const current: string = "/current.json";
//const key: string = "?key=" + fs.readFileSync("weatherAPIKey.txt", "utf-8");
const key:string = "?key=10b7eef5baaa434584f184138232511";
const query: string = "&q=";
const aqi: string = "&aqi=no";


export async function apiCall(place: string): Promise<data> {
    const url = base + current + key + query + place + aqi;

    const response = await fetch(url);
    const promise = await response.json();
    const converted = Convert.toData(JSON.stringify(promise));

    console.log("Response status: ", response.status);
    console.log("Response ok: ", response.ok);

    if (response.ok) {
        return converted as data;
    } else {
        return getEmptyData();
    }
}