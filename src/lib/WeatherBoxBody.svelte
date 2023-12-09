<script>
    import { getEmptyData } from "../misc/responseInterface";

    export let param = getEmptyData();
    let tempInC = true;


    const switchCF = () => {
        tempInC = !tempInC;
    }
</script>



{#if param.location.name != "[name]"}
<div>
    <p>
        Location: {param.location.region}, {param.location.country}
    </p>
    <p>
        Local time: {param.location.localtime}
    </p>
    <p>
        Temperature:
        {#if tempInC}
            {param.current.temp_c}
            <button on:click={switchCF}> °C </button>
        {:else}
            {param.current.temp_f}
            <button on:click={switchCF}> °F </button>
        {/if}

        Feels like:
        {#if tempInC}
            {param.current.feelslike_c}
            <button on:click={switchCF}> °C </button>
        {:else}
            {param.current.feelslike_f}
            <button on:click={switchCF}> °F </button>
        {/if}

        Humidity:
        {param.current.humidity} %
    </p>
    <p>
        UV-Index: {param.current.uv}
    </p>
    <p style="margin-top: -47px">
        Weather condition: {param.current.condition.text}
        <img src={param.current.condition.icon} alt=""/>
    </p>
</div>
{/if}



<style>
    div {
        color: white;
        margin: 5px;
    }

    button {
        width: 30px;
    }
</style>