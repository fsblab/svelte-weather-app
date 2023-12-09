import { writable } from "svelte/store";
import { getEmptyData, type data } from "../misc/responseInterface";
import { apiCall } from "../misc/apiCall";


export const boxes = writable([
    {id: Date.now(), place: "", info: getEmptyData()}
]);


export const addBox = (boxes: any, id: number) => {
    boxes.update((boxes: Array<{id: number, place: string, info: data}>) => {
        boxes.push({id: id, place: "", info: getEmptyData()});
        return boxes;
    });
}


export const removeBox = (boxes: any, id: number) => {
    boxes.update((boxes: Array<{id: number, place: string, info: data}>) => {
        return boxes.filter((el) => el.id != id);
    });
}


export const removeLastBox = (boxes: any) => {
    boxes.update((boxes: Array<{id: number, place: string, info: data}>) => {
        boxes.pop();
        return boxes;
    });
}


export const getData = (boxes: any, id: number) => {
    boxes.update((boxes: Array<{id: number, place: string, info: data}>) => {
        boxes.forEach(element => {
            if (element.id == id) {
                console.log("Place: ", element.place);
                apiCall(element.place).then((d) => {
                    element.info = d;
                });
            }
        });
        return boxes;
    });
}