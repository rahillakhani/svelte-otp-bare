<script>
	import { onMount } from "svelte";
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	
	let otpData = ["", "", "", "", "", ""];
	let isValid = false;
	
	// Array to store refs for input fields
	$: inputsRefs = [];
	$: buttonRef = null
	
	// Function to handle input in OTP fields
	function handleInput(index, value, event) {
		otpData[index] = value.slice(-1); // Restrict to a single character
		validateOtp();
		if(event.keyCode == "8") {
			const prevInput = inputsRefs[index - 1];
			prevInput?.focus();
		}
		// Focus the next field if not the last one
		if (value && index < otpData.length - 1) {
			const nextInput = inputsRefs[index + 1];

			nextInput?.focus();
		} 
		if(index == otpData.length - 1) {
			buttonRef.focus()
		}
	}
	
	// Validate OTP: all fields must be filled
	function validateOtp() {
		isValid = otpData.every((digit) => digit.length === 1);
	}
	
	// Handle OTP submission
	function submitOTP() {
		if (isValid) {
			console.log("Submitted OTP:", otpData.join(""));
			alert("OTP Verified Successfully!");
		} else {
			alert("Please complete all OTP fields!");
		}
	}
	
</script>

<main>
	<Header />
	<div class="otp-container">
		{#each otpData as _, index}
		<input
		type="text"
		class="otp-action"
		maxlength="1"
		bind:value={otpData[index]}
		on:keyup={(e) => handleInput(index, e.target.value, e)}
		bind:this={inputsRefs[index]} 
		/>
		{/each}
	</div>
	<div class="verify-button">
		<button bind:this={buttonRef}  on:click={submitOTP} disabled={!isValid}>
			Verify
		</button>
	</div>
	<Footer />
</main>

<style>
	.otp-container {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}
	
	.otp-action {
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
	
	.otp-input:focus {
		border-color: #007BFF;
	}
	.verify-button {
		display: flex;
		justify-content: center;
	}
	
	button {
		padding: 10px 20px;
		font-size: 1rem;
		background-color: #007BFF;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}
	
	button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
</style>
