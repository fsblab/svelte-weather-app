import { it, expect } from "vitest";
import { apiCall } from "../misc/apiCall";
import * as fs from "fs";
import { getEmptyData } from "../misc/responseInterface";


it("checks whether the api call is successfull", () => {
    let d = getEmptyData();

    return apiCall("Hamburg")
    .then(data => {
		console.log("DATA OUTPUT: ", data);
		if (data.location.name !== "Hamburg") {
			throw new Error('Test failed: Data mismatch');
		}

		d = data;
		console.log("DATA OUTPUT: ", d);
    });
});