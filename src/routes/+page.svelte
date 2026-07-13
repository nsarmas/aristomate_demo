<script lang="ts">
	import { universisFetch } from '$lib/universis_fetch';

	// ---- Section switcher (demonstrates ion-segment) ----
	let section: 'basics' | 'grades' = 'basics';

	// ================= Basics demo: a tiny todo list =================
	type Todo = { text: string; done: boolean };

	let todos: Todo[] = [
		{ text: 'Learn Ionic components', done: true },
		{ text: 'Bind state with Svelte', done: false },
		{ text: 'Fetch real data from an API', done: false }
	];
	let newTodo = '';
	let toastMessage = '';
	let showToast = false;

	function addTodo() {
		const text = newTodo.trim();
		if (!text) return;
		todos = [...todos, { text, done: false }];
		newTodo = '';
		toastMessage = `Added "${text}"`;
		showToast = true;
	}

	function toggleTodo(index: number) {
		todos = todos.map((t, i) => (i === index ? { ...t, done: !t.done } : t));
	}

	function removeTodo(index: number) {
		toastMessage = `Removed "${todos[index].text}"`;
		todos = todos.filter((_, i) => i !== index);
		showToast = true;
	}

	function onSectionChange(e: CustomEvent) {
		section = e.detail.value;
	}

	$: remaining = todos.filter((t) => !t.done).length;

	// ================= Grades demo: real data via universisFetch =================
	// Shows: ion-spinner, async fetch, ion-list rendering, error state.
	let grades: any[] = [];
	let loadingGrades = false;
	let gradesError = '';
	let gradesLoaded = false;

	function courseTitle(g: any): string {
		return g?.course?.title ?? g?.course?.name ?? g?.courseTitle ?? 'Unknown course';
	}


	function gradeColor(value: number | null): string {
		if (value === null) return 'medium';
		if (value < 5) return 'danger';
		if (value < 6.5) return 'warning';
		return 'success';
	}
	
	$: average = (() => {
		const values = grades.map((g) => g.formattedGrade).filter((v): v is number => v !== null);
		if (!values.length) return null;
		return values.reduce((a, b) => a + b, 0) / values.length;
	})();

	async function loadGrades() {
		loadingGrades = true;
		gradesError = '';
		try {
			const result = await universisFetch('students/me/courses');
			console.log(result.value);
			grades = Array.isArray(result) ? result : (result?.value ?? []);

			grades.forEach((g) => {g.formattedGrade = typeof g.formattedGrade === 'string' ? parseFloat(g.formattedGrade) : g.formattedGrade;});

			gradesLoaded = true;
		} catch (err) {
			gradesError = 'Could not load grades. Please try again.';
		} finally {
			loadingGrades = false;
		}
	}
</script>

<ion-header>
	<ion-toolbar>
		<ion-title>Aristomate Demo</ion-title>
	</ion-toolbar>
	<ion-toolbar>
		<ion-segment value={section} on:ionChange={onSectionChange}>
			<ion-segment-button value="basics">
				<ion-label>Basics</ion-label>
			</ion-segment-button>
			<ion-segment-button value="grades">
				<ion-label>Grades</ion-label>
			</ion-segment-button>
		</ion-segment>
	</ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
	{#if section === 'basics'}
		<ion-card>
			<ion-card-header>
				<ion-card-subtitle>Ionic + Svelte</ion-card-subtitle>
				<ion-card-title>To-do list</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				A small list backed by plain Svelte state. Tap a row to check it off, swipe left to
				delete it.
			</ion-card-content>
		</ion-card>

		<ion-list>
			<ion-item>
				<ion-input
					label="New item"
					label-placement="floating"
					placeholder="e.g. Present the demo"
					value={newTodo}
					on:ionInput={(e) => (newTodo = e.detail.value ?? '')}
					aria-hidden
				></ion-input>
				<ion-button slot="end" fill="clear" on:click={addTodo} aria-hidden>Add</ion-button>
			</ion-item>

			{#each todos as todo, i (todo.text + i)}
				<ion-item-sliding>
					<ion-item button on:click={() => toggleTodo(i)} aria-hidden>
						<ion-checkbox slot="start" checked={todo.done} on:click|stopPropagation on:ionChange={() => toggleTodo(i)} aria-hidden></ion-checkbox>
						<ion-label style={todo.done ? 'text-decoration: line-through; opacity: 0.6' : ''}>
							{todo.text}
						</ion-label>
					</ion-item>
					<ion-item-options side="end">
						<ion-item-option color="danger" on:click={() => removeTodo(i)} aria-hidden>Delete</ion-item-option>
					</ion-item-options>
				</ion-item-sliding>
			{/each}
		</ion-list>

		<ion-item lines="none">
			<ion-label>Remaining</ion-label>
			<ion-badge slot="end" color={remaining ? 'primary' : 'success'}>{remaining}</ion-badge>
		</ion-item>

		<ion-toast
			is-open={showToast}
			message={toastMessage}
			duration={1500}
			on:didDismiss={() => (showToast = false)}
		></ion-toast>
	{:else}
		<ion-card>
			<ion-card-header>
				<ion-card-subtitle>Universis API</ion-card-subtitle>
				<ion-card-title>My grades</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				Fetches real data through <code>universisFetch</code>, using the token configured in
				<code>.env</code>.
			</ion-card-content>
			<ion-item lines="none">
				<ion-button slot="end" on:click={loadGrades} disabled={loadingGrades} aria-hidden>
					{gradesLoaded ? 'Reload' : 'Load my grades'}
				</ion-button>
			</ion-item>
		</ion-card>

		{#if loadingGrades}
			<div class="ion-text-center ion-padding">
				<ion-spinner name="crescent"></ion-spinner>
			</div>
		{:else if gradesError}
			<ion-item lines="none">
				<ion-label color="danger">{gradesError}</ion-label>
			</ion-item>
		{:else if gradesLoaded}
			{#if average !== null}
				<ion-item lines="none">
					<ion-label>Average</ion-label>
					<ion-badge slot="end" color={gradeColor(average)}>{average.toFixed(2)}</ion-badge>
				</ion-item>
			{/if}

			{#if grades.length === 0}
				<ion-item lines="none">
					<ion-label>No grades found.</ion-label>
				</ion-item>
			{:else}
				<ion-list>
					{#each grades as g, i (i)}
						<ion-item aria-hidden>
							<ion-label>
								<h2>{courseTitle(g)}</h2>
							</ion-label>
							<ion-badge slot="end" color={gradeColor(g.formattedGrade)}>
								{g.formattedGrade ?? '-'}
							</ion-badge>
						</ion-item>
					{/each}
				</ion-list>
			{/if}
		{/if}
	{/if}
</ion-content>


<ion-footer>
	<ion-toolbar>
		<ion-title size="small">Made with ❤️ for Nikolas et al.</ion-title>
	</ion-toolbar>
</ion-footer>
