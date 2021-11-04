import Compartment from './Compartment'
import getRandomInt from './getRandomInt'

export default class {
	compartments = []

	constructor(numCompartments, widgetInCase) {
		for (let i=0; i<numCompartments; i++) {
			this.compartments.push(new Compartment)
		}
		
		if (widgetInCase) {
			const randomCompartment = getRandomInt(numCompartments)
			this.compartments[randomCompartment].placeWidget()
		}
	}
	
	closedCompartments() {
		return this.compartments.filter(c => c.isClosed())
	}
	
	hasUnopenedCompartments() {
		return this.closedCompartments().length > 0
	}
	
	openRandomCompartment() {
		const closedCompartments = this.closedCompartments()
		const compartmentChoice = getRandomInt(closedCompartments.length)
		return closedCompartments[compartmentChoice].reveal()
	}
}