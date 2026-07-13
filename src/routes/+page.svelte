<script>
	import { universisFetch } from '$lib/universis_fetch';

	let section = "notes";

	let courses = [];

	async function getGrades(){
		const result = await universisFetch("students/me/courses");
		courses = result.value;

		console.log(courses);

		let tasks = [];
		let newtask; 
	}
</script>

<ion-header>
	<ion-toolbar>
		<ion-title>Universis Neroni</ion-title>
	</ion-toolbar>
	<ion-segment on:ionChange={(event) => section = event.detail.value } >
		<ion-segment-button value="grades">
			<ion-label>Grades</ion-label>
		</ion-segment-button>
		<ion-segment-button value="notes">
			<ion-segment-label>Notes</ion-segment-label>
		</ion-segment-button>
	</ion-segment>
</ion-header>

<ion-content>

	{#if section =="grades"}
		<ion-card>
			<p>Here are my grades:/</p>
			<ion-button on:click={() => getGrades()}>Load my courses</ion-button>
		</ion-card>

		{#if courses.length==0}
			<ion-card>No courses found(lolz)</ion-card>
		{:else}
			<ion-list>
				{#each courses as course}
					<ion-item>
						<ion-label>Titlos: {course.courseTitle}</ion-label>
						{#if course.formattedGrade}
							<ion-text>Vathmos: {course.formattedGrade}</ion-text>
						{:else}
							<ion-text>Vathmos: O negron sou eklepse ton vathmo!</ion-text>
						{/if}
					</ion-item>
				{/each}
			</ion-list>
		{/if}















	{:else if section == "notes"}
		<ion-card>
			<ion-card-header> My ToDo List! </ion-card-header>
			<ion-input 
				placeholder="Write sum"
				label="Negron once said"
				value={newtask}
				on:ionInput={(event) => {newtask = event.detail.value}}
			>
			</ion-input>
			<ion-button on:click = {tasks = [...tasks,newtask];} }>
				Add 
			</ion-button>
			<ion-list>
				{#each tasks as task}
					<ion-item>
						<ion-label>{task.title}</ion-label>
					</ion-item>
				{/each}
			</ion-list>

		</ion-card>
	{/if}
</ion-content>

<ion-footer>
	<ion-toolbar>
		<ion-label>
			This is a footer!
		</ion-label>
	</ion-toolbar>
</ion-footer>