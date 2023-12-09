<script>
    import { apiCall } from "../misc/apiCall";
    import { getEmptyData } from "../misc/responseInterface";
    import { boxes, removeBox } from "../store/store";
    import WeatherBoxBody from "./WeatherBoxBody.svelte";

    
    const id = $boxes[$boxes.length - 1].id;

    let info = getEmptyData();
    let place = "";


    const handleInputChange = (event) => {
        place = event.target.value;
    };


    const updatePlace = () => {
        boxes.update((boxes) => {
            boxes.forEach(box => {
                if (box.id == id) {
                    box.place = place;
                }
            });
            return boxes;
        });
    };


    const updateInfo = () => {
        boxes.update((boxes) => {
            boxes.forEach(box => {
                if (box.id == id) {
                    info = box.info;
                }
            });
            return boxes;
        });
    }


    export const getData = (id) => {
        boxes.update((boxes) => {
            updatePlace();

            boxes.forEach(element => {
                if (element.id == id) {
                    console.log("Place: ", element.place);
                    apiCall(element.place).then((d) => {
                        element.info = d;
                        updateInfo();
                    });
                }
            });
            return boxes;
        });
    }
</script>



{#if id}
<div class="WeatherBox">
    <div class="topOfBox">
        <button class="close" on:click={() => removeBox(boxes, id)}> X </button>
        <input type="text" value={place} on:input={handleInputChange}/>
        <button class="getData" on:click={() => {getData(id)}}> Get </button>
    </div>
    <WeatherBoxBody param={info} />
</div>
{/if}



<style>
    .close {
        color: red;
    }

    .getData {
        width: 15%;
    }

    .WeatherBox {
        margin: 5px;
        width: 22%;
        background-color: #262626;
        border-style: solid;
        border-color: #222222;
        height: 220px;
        float: left;
        color: white;
    }

    input {
        width: 75%;
        background-color: #202020;
        border-style: solid;
        border-color: #222222;
        color: white;
    }

    .topOfBox {
        margin: 2px;
        padding-top: 5px;
    }
</style>