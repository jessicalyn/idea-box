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

	updateContent(){
		//update title or body of the idea
		//be able to edit after it has been posted

	}

	updateQuality(){
		//be able to upvote/downvote and keep track
		//do we need an array?

	}
}
