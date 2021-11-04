export default class {
	#open = false
	#hasWidget = false
	
	isOpen() {
		return this.#open
	}
	
	isClosed() {
		return !this.isOpen()
	}
	
	reveal() {
		this.#open = true
		return this.#hasWidget
	}
	
	placeWidget() {
		this.#hasWidget = true
	}
}