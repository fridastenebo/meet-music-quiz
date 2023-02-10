<script>
	export let name;

	const urlParams = new URLSearchParams(window.location.search);
	const encodedState = urlParams.get("state");
	let state;
	if (encodedState === null) {
		state = null;
	} else {
		state = JSON.parse(atob(decodeURI(encodedState) || "") || null);
		console.log(state);
	}

	let newYTid = "";
	let newStart = "";
	let newEnd = "";
	let newName = "";

	let defaultList = [
		{ id: "dQw4w9WgXcQ", name: "Song 1", start: 0, end: 10 },
	];
	let playerList = state || defaultList;

	function addToList() {
		let newPlayer = {
			id: newYTid,
			name: newName,
			start: newStart,
			end: newEnd,
		};
		playerList = [...playerList, newPlayer];
		saveState();
		resetForm();
	}

	function saveState() {
		let newState = encodeURI(btoa(JSON.stringify(playerList)));
		console.log(newState);
		urlParams.set("state", newState);
		window.location.href = `${location.pathname}?${urlParams}`;
	}

	function resetForm() {
		newYTid = "";
		newStart = "";
		newEnd = "";
	}

	function removeFromList(index) {
		playerList.splice(index, 1);
		playerList = playerList;
		saveState();
	}
</script>

<main>
	<h1>{name}'s amazing Music Quiz!</h1>

	<!-- Input -->
	<label>
		Add a youtube id
		<input name="ytid" placeholder="dQw4w9WgXcQ" bind:value={newYTid} />
	</label>
	<label>
		Title
		<input name="name" bind:value={newName} />
	</label>
	<label>
		Start (sec)
		<input name="start" type="number" bind:value={newStart} />
	</label>
	<label>
		End (sec)
		<input name="end" type="number" bind:value={newEnd} />
	</label>
	<button on:click={addToList}>Add</button>

	<br />
	<!-- PlayerList -->
	{#each playerList as item, index}
		<h2>{item.name}</h2>
		{#if item.id !== ""}
			<div class="wrapper">
				<div class="window">
					<div class="player">
						<iframe
							width="300"
							height="400"
							src="https://www.youtube.com/embed/{item.id}?start={item.start}&end={item.end}&modestbranding=1&fs=0"
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
						/>
					</div>
				</div>
				<span on:click={() => removeFromList(index)}>❌</span>
			</div>
		{/if}
		<br />
	{/each}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	h2 {
		text-align: left;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	.wrapper {
		display: grid;
		grid-gap: 0 2rem;
		grid-template-columns: repeat(12, 1fr);
		margin: 0 auto;
		width: 100%;
	}

	.window {
		position: relative;
		width: 300px;
		height: 55px;
		overflow: hidden;
	}

	.player {
		position: absolute;
		top: -355px;
		left: -5px;
	}
</style>
