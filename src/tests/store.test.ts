import { it, expect} from "vitest";
import { writable } from "svelte/store";
import { addBox, removeBox, removeLastBox } from "../store/store";
import { getEmptyData, type data } from "../misc/responseInterface";


const emptyData = getEmptyData();


const testAddBox = writable([
    {id: 0, place: "", info: emptyData}
]);


const testRemoveBox = writable([
    {id: 0, place: "", info: emptyData}, 
    {id: 1, place: "", info: emptyData},
    {id: 2, place: "", info: emptyData}
]);


const testRemoveLastBox = writable([
    {id: 0, place: "", info: emptyData},
    {id: 1, place: "", info: emptyData},
    {id: 2, place: "", info: emptyData}
]);


const testAddThenRemoveLastBox = writable([
    {id: 0, place: "", info: emptyData}
]);


const testAddThenRemoveBox = writable([
    {id: 0, place: "", info: emptyData}
]);


it("adds an element at the end of the Array inside the writable", () => {
    let id1 = Date.now();
    addBox(testAddBox, id1);

    //let result: Array<{id: number, place: string}>;
    let result = [{}];

    //get the Array from inside the readable and put it into the result variable
    testAddBox.update((boxes: Array<{id: number, place: string, info: data}>) => {
        result = boxes;
        return boxes;
    });

    expect(result).toStrictEqual([{id: 0, place: "", info: emptyData}, {id: id1, place: "", info: emptyData}]);

    let id2 = Date.now();
    addBox(testAddBox, id2);

    testAddBox.update((boxes: Array<{id: number, place: string, info: data}>) => {
        result = boxes;
        return boxes;
    });

    expect(result).toStrictEqual([{id: 0, place: "", info: emptyData}, {id: id1, place: "", info: emptyData}, {id: id2, place: "", info: emptyData}]);
});


it("removes an element with the specified ID from the Array", () => {
    removeBox(testRemoveBox, 1);

    let result = [{}];

    testRemoveBox.update((boxes: Array<{id: number, place: string, info: data}>) => {
        result = boxes;
        return boxes;
    });

    expect(result).toStrictEqual([{id: 0, place: "", info: emptyData}, {id: 2, place: "", info: emptyData}]);

    
    removeBox(testRemoveBox, 0);

    testRemoveBox.update((boxes: Array<{id: number, place: string, info: data}>) => {
        result = boxes;
        return boxes;
    });

    expect(result).toStrictEqual([{id: 2, place: "", info: emptyData}]);
});


it("removes the last element from the Array", () => {
    removeLastBox(testRemoveLastBox);

    let result = [{}];

    testRemoveLastBox.update((boxes: Array<{id: number, place: string, info: data}>) => {
        result = boxes;
        return boxes;
    });

    expect(result).toStrictEqual([{id: 0, place: "", info: emptyData}, {id: 1, place: "", info: emptyData}]);

    
    removeLastBox(testRemoveLastBox);

    testRemoveLastBox.update((boxes: Array<{id: number, place: string, info: data}>) => {
        result = boxes;
        return boxes;
    });

    expect(result).toStrictEqual([{id: 0, place: "", info: emptyData}]);
});


it("adds two elements then pops two elements from the Array", () => {
    addBox(testAddThenRemoveLastBox, 1);

    let result = [{}];

    testAddThenRemoveLastBox.update((boxes: Array<{id: number, place: string, info: data}>) => {
        result = boxes;
        return boxes;
    });

    expect(result).toStrictEqual([{id: 0, place: "", info: emptyData}, {id: 1, place: "", info: emptyData}]);

    let id2 = Date.now();
    addBox(testAddThenRemoveLastBox, 2);

    testAddThenRemoveLastBox.update((boxes: Array<{id: number, place: string, info: data}>) => {
        result = boxes;
        return boxes;
    });

    expect(result).toStrictEqual([{id: 0, place: "", info: emptyData}, {id: 1, place: "", info: emptyData}, {id: 2, place: "", info: emptyData}]);


    removeLastBox(testAddThenRemoveLastBox);

    testAddThenRemoveLastBox.update((boxes: Array<{id: number, place: string, info: data}>) => {
        result = boxes;
        return boxes;
    });

    expect(result).toStrictEqual([{id: 0, place: "", info: emptyData}, {id: 1, place: "", info: emptyData}]);

    
    removeLastBox(testAddThenRemoveLastBox);

    testAddThenRemoveLastBox.update((boxes: Array<{id: number, place: string, info: data}>) => {
        result = boxes;
        return boxes;
    });

    expect(result).toStrictEqual([{id: 0, place: "", info: emptyData}]);
});


it("adds two elements then removes two elements specified by ID", () => {
    addBox(testAddThenRemoveBox, 1);

    let result = [{}];

    testAddThenRemoveBox.update((boxes: Array<{id: number, place: string, info: data}>) => {
        result = boxes;
        return boxes;
    });

    expect(result.length).toBe(2);
    expect(result).toStrictEqual([{id: 0, place: "", info: emptyData}, {id: 1, place: "", info: emptyData}]);

    addBox(testAddThenRemoveBox, 2);

    testAddThenRemoveBox.update((boxes: Array<{id: number, place: string, info: data}>) => {
        result = boxes;
        return boxes;
    });

    expect(result.length).toBe(3);
    expect(result).toStrictEqual([{id: 0, place: "", info: emptyData}, {id: 1, place: "", info: emptyData}, {id: 2, place: "", info: emptyData}]);


    removeBox(testAddThenRemoveBox, 1);

    testAddThenRemoveBox.update((boxes: Array<{id: number, place: string, info: data}>) => {
        result = boxes;
        return boxes;
    });

    expect(result.length).toBe(2);
    expect(result).toStrictEqual([{id: 0, place: "", info: emptyData}, {id: 2, place: "", info: emptyData}]);

    
    removeBox(testAddThenRemoveBox, 0);

    testAddThenRemoveBox.update((boxes: Array<{id: number, place: string, info: data}>) => {
        result = boxes;
        return boxes;
    });

    expect(result.length).toBe(1);
    expect(result).toStrictEqual([{id: 2, place: "", info: emptyData}]);
});