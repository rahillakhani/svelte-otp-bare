<script>
    export let value = ''; // Bind value from the parent component
    export let onInput = () => {}; // Callback to handle input in parent
    export let onKeyUp = () => {};
    export const tabindex = 0;
    let inputElement; // Local reference to the <input> DOM element
    
    function handleInput(event) {
        const newValue = event.target.value.slice(-1); // Restrict input to a single character
        onInput(newValue); // Notify parent of the change
    }
</script>

<input
    ref={el => inputElement = el}
    type="text"
    bind:this={inputElement}
    bind:value
    maxlength="1"
    on:input={handleInput}
    on:keyup={onKeyUp}
    tabindex={tabindex}
/>

<style>
    input {
        width: 50px;
        height: 50px;
        margin: 0 5px;
        text-align: center;
        font-size: 1.5rem;
        border: 2px solid #ccc;
        border-radius: 5px;
        outline: none;
        transition: border-color 0.2s;
    }
    
    input:focus {
        border-color: #007BFF;
    }
</style>
