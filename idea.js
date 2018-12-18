class Idea {
	constructor(id, title, body){
		this.id = id;
		this.title = title;
		this.body = body;
		this.quality = 'swill';
	}

	saveToStorage(arrayCards){
		//save to local storage, within a search-able array
		localStorage.setItem("arrayCards", JSON.stringify(arrayCards));
	}

	deleteFromStorage(){
		//delete card from storage
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