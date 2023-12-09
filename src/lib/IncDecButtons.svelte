<script>
    import { boxes, addBox, removeLastBox } from "../store/store";


    const inc = () => {
        addBox(boxes, Date.now());
    }


    const dec = () => {
        if ($boxes.length > 0) {
            removeLastBox(boxes);
        }
    }
</script>



<div class="IncDec">
    <button on:click={dec}> - </button>
    <button on:click={inc}> + </button>
    {$boxes.length}
</div>



<style>
    button {
        margin: 5px;
        width: 32px;
        height: 32px;
        font-size: 24px;
    }

    .IncDec {
        font-size: 24px;
        color: whitesmoke;
        width: 100%;
    }
</style>