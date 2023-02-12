<script>
	export let name;

	const urlParams = new URLSearchParams(window.location.search);
	const encodedState = urlParams.get("state");
	let state;
	if (encodedState === null) {
		state = null;
	} else {
		state = JSON.parse(atob(decodeURI(encodedState) || "") || null);
	}

	let newYTid = "";
	let newStart = "";
	let newEnd = "";
	let newName = "";

	let defaultList = [];
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

	$: {
		let lastInput = document.getElementById("end");
		if (lastInput) {
			lastInput.addEventListener("keyup", function (e) {
				if (e.code === "Enter") {
					document.getElementById("submit").click();
				}
			});
		}
	}
</script>

<main>
	<h1>
		<i class="bi bi-music-player-fill" />
		The Amazing Meet Music Quiz!
	</h1>

	<!-- Input -->
	<div class="card">
		<div class="card-header">Add items</div>
		<div class="card-body">
			<div class="mb-3 row">
				<label for="ytid" class="col-sm-5 col-form-label"
					>YouTube id</label
				>
				<div class="col-sm-4">
					<input
						id="ytid"
						name="ytid"
						class="form-control"
						placeholder="dQw4w9WgXcQ"
						bind:value={newYTid}
					/>
				</div>
			</div>
			<div class="mb-3 row">
				<label for="name" class="col-sm-5 col-form-label">Title</label>
				<div class="col-sm-4">
					<input
						id="name"
						name="name"
						class="form-control"
						bind:value={newName}
					/>
				</div>
			</div>
			<div class="mb-3 row">
				<label for="start" class="col-sm-5 col-form-label"
					>Start sec</label
				>
				<div class="col-sm-4">
					<input
						id="start"
						name="start"
						class="form-control"
						bind:value={newStart}
					/>
				</div>
			</div>
			<div class="mb-3 row">
				<label for="end" class="col-sm-5 col-form-label">End sec</label>
				<div class="col-sm-4">
					<input
						id="end"
						name="end"
						class="form-control"
						bind:value={newEnd}
					/>
				</div>
			</div>
			<div class="col auto">
				<button
					id="submit"
					class="btn btn-primary"
					on:click={addToList}
				>
					<i class="bi bi-plus-circle" />
					Add</button
				>
			</div>
		</div>
	</div>
	<br />
	<!-- PlayerList -->
	{#if playerList.length > 0}
		{#each playerList as item, index}
			<h2>{item.name}</h2>
			<div class="wrapper">
				{#if item.id !== ""}
					<div class="window">
						<div class="player">
							<iframe
								width="300"
								height="400"
								src="https://www.youtube.com/embed/{item.id}?start={item.start}&end={item.end}"
								title="YouTube video player"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
								allowfullscreen
							/>
						</div>
					</div>
				{/if}
				<button class="btn btn-danger btn">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<i
						class="bi bi-x-circle"
						on:click={() => removeFromList(index)}
					/>
				</button>
			</div>
			<br />
		{/each}
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		margin-bottom: 1em;
		color: blue;
	}

	h2 {
		text-align: left;
	}

	label {
		text-align: right;
	}

	button {
		max-height: 45px;
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
		height: 45px;
		overflow: hidden;
	}

	.player {
		position: absolute;
		top: -355px;
		left: -5px;
	}
</style>
