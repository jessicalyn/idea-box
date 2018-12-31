class Idea {
	constructor(id, title, body, quality){
		this.id = id;
		this.title = title;
		this.body = body;
		this.quality = quality;
	}

	saveToStorage(arrayCards){
		//save to local storage, within a search-able array
		localStorage.setItem("arrayCards", JSON.stringify(arrayCards));
	}

	deleteFromStorage(arrayCards, index){
		//delete card from storage
    arrayCards.splice(index, 1)
    this.saveToStorage(arrayCards);
	}

	updateContent(text, type){
		//update title or body of the idea
		//be able to edit after it has been posted
		if (type === 'title') {
			this.title = text;
		}
		if (type === 'body') {
			this.body = text;
		}
		this.setToStorage();
	}

	updateQuality(arrayCards, newQuality){
		this.quality = newQuality;
		this.saveToStorage(arrayCards);
	}
}
