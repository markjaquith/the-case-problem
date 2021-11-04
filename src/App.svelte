<script>
	import Case from './Case'

	$: iterations = 100000
	let caseProbabilityInt = 80
	$: caseProbability = caseProbabilityInt/100
	$: nonCaseProbability = 1 - caseProbability
	let numCompartments = 4
	let result = ''
	$: if (caseProbabilityInt || numCompartments) {
		result = ''
	}
	
	function percentFormat(n) {
		return (n * 100).toFixed(2) + '%'
	}
	
	function numberFormat(n) {
		return parseFloat(n).toLocaleString('en-US')
	}
	
	function simulate() {
		let casePlacements = 0
		const results = []
		for (let i=0; i<iterations; i++) {
			results.push(simulateOnce())
		}
		
		const timesOpenedAllCompartments = results.filter(r => r.openedAllCompartments).length
		const timesFoundWidgetInLastCompartment = results.filter(r => r.openedAllCompartments && r.found).length
		const timesWidgetWasInCase = results.filter(r => r.found).length

		result = `In ${numberFormat(iterations)} simulations, ${numberFormat(timesWidgetWasInCase)} iterations (${percentFormat(timesWidgetWasInCase/iterations)}) had the widget in the case. ${numberFormat(timesOpenedAllCompartments)} attempts had to open all the compartments. And of those, ${numberFormat(timesFoundWidgetInLastCompartment)} found the widget in the last compartment. So there was a ${percentFormat(timesFoundWidgetInLastCompartment/timesOpenedAllCompartments)} chance that opening the last compartment would reveal the widget.`
	}
	
	function simulateOnce() {
		const caseHasWidget = Math.random() < caseProbability
		const ourCase = new Case(numCompartments, caseHasWidget)
		let attempt = -1
		const results = []
		let found = false
		
		while(ourCase.hasUnopenedCompartments() && !found) {
			attempt++
			found = ourCase.openRandomCompartment()
			results.push(found)
		}
		
		const openedAllCompartments = !ourCase.hasUnopenedCompartments()
		
		return {
			found,
			attempts: results,
			openedAllCompartments,
		}
	}
</script>

<aside>
	<label>Case probability: <input type="number" min=5 max=100 step=5 bind:value={caseProbabilityInt} size=4/> %</label>
	<label>Compartments: <input type="number" min=1 max=1000 step=1 size=5 bind:value={numCompartments} /></label>
	<p>Simulations: {numberFormat(iterations)}</p>
</aside>
<ul>
	<li>It is {caseProbabilityInt}% likely that a widget is in a briefcase.</li>
	<li>The case has {numCompartments} compartments.</li>
	<li>If you open {numCompartments - 1} compartments without finding the widget, what are the chances that the widget is in the last compartment?</li>
</ul>

<button on:click|preventDefault={simulate}>
	Simulate
</button>

<p>
	{result}
</p>

<style>
label {
	display: block
}
ul {
	padding-left: 1rem
}
li {
	margin: 1rem 0;
	padding: 0;
}
aside {
	background: #eee;
	padding: 1rem;
	border-radius: 5px;
}
</style>