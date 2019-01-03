// ====================Variables============================
// *********************************************************
var btnSearch = document.querySelector('.header__search--btn')
var inputSearch = document.querySelector('.header__search--input');
var inputTitle = document.querySelector('.input-form__title');
var inputBody = document.querySelector('.input-form__body');
var btnSave = document.querySelector('.input-form__save');
var btnSwill = document.getElementById('swill');
var btnPlausible = document.getElementById('plausible');
var btnGenius = document.getElementById('genius');
var cardField = document.querySelector('.ideas');
var cardTitle = document.querySelector(".text--title")
var cardTitle = document.querySelector(".text--title")
var arrayCards = [];

// ====================Event Listeners======================
// *********************************************************
inputSearch.addEventListener('input', searchResults);
inputBody.addEventListener('input', enableSave);
btnSave.addEventListener('click', saveIdea);
btnSwill.addEventListener('click', filterSwill);
btnPlausible.addEventListener('click', filterPlausible);
btnGenius.addEventListener('click', filterGenius);
cardField.addEventListener('click', deleteCard);
cardField.addEventListener('click', ideaEvents);
cardField.addEventListener('focusout', changeContent);

// ============Functions========================
// *********************************************************
window.onload = function (){
	if(localStorage.getItem("arrayCards")){
		var parseArray = JSON.parse(localStorage.getItem("arrayCards"));
		parseArray.forEach(function(storedIdea){
			var id = storedIdea.id;
			var title = storedIdea.title;
			var body = storedIdea.body;
			var quality = storedIdea.quality;
			var pageIdea = new Idea(id, title, body, quality);
			arrayCards.push(pageIdea);
			createCard(id, title, body, quality)
		})
	}
}

function enableSave(){
	if (inputBody.value !== ""){
		btnSave.disabled = false;
	}
}

function saveIdea(e){
	e.preventDefault();
	var id = Date.now();
	var title = inputTitle.value;
	var body = inputBody.value;
	var quality = 'swill';
	var newIdeaInstance = new Idea(id, title, body, quality);
	arrayCards.push(newIdeaInstance);
	newIdeaInstance.saveToStorage(arrayCards);
	createCard(id, title, body, quality);
	inputTitle.value = '';
	inputBody.value = '';
}

function createCard(id, title, body, quality) {
	var newCard =
	`<section id=${id} class="ideas__container">
	<section class="ideas__card">
	<article class="card__text">
	<h2 class="text--title" contenteditable="true">${title}</h2>
	<p class="text--body" contenteditable="true">${body}
	</p>
	</article>
	<section class="card-btns__container">
	<input class="btn--dwn card-btns" type="image" alt="Down-Vote Idea Button" src="assets/downvote.svg">
	<input class="btn--up card-btns" type="image" alt="Up-Vote Idea Button" src="assets/upvote.svg">
	<h3 class="card-btns__quality">Quality: <span class="card-btns__change-quality">${quality}</span></h3>
	<input id=${id} class="btn--kill card-btns" type="image" alt="Delete Idea Button" src="assets/delete.svg">
	</section>
	</section>
	</section>`
	cardField.innerHTML = newCard + cardField.innerHTML;
}

function ideaEvents(event) {
	if (event.target.classList.contains('btn--kill')){
		deleteCard(event);
	} else if (event.target.classList.contains('btn--dwn')) {
		changeQuality(event);
	} else if (event.target.classList.contains('btn--up')) {
		changeQuality(event);
	}
}

function changeQuality(event) {
	var cardId = event.target.parentElement.parentElement.parentElement.id;
	var qualityArray = ['swill', 'plausible', 'genius'];
	var qualityOnCard = event.target.parentElement.childNodes[5].childNodes[1];
	var currentQualityIndex = qualityArray.indexOf(qualityOnCard.innerText);
	if (event.target.classList.contains('btn--dwn') && qualityOnCard.innerText != 'swill') {
		qualityOnCard.innerText = qualityArray[currentQualityIndex -1]
	}
	if (event.target.classList.contains('btn--up') && qualityOnCard.innerText != 'genius') {
		qualityOnCard.innerText = qualityArray[currentQualityIndex +1];
	}
	var indexToChange = arrayCards.find(function(idea) {
		return idea.id === parseInt(cardId);
	})
	indexToChange.updateQuality(arrayCards, qualityOnCard.innerText);
}

// If I click into the title or body section of a card,
// I should be able to edit the text,
// Once I edit the text and click outside of the text field,
// It should then be updated to the localStorage array.
function updateContent(event) {
	var cardId = event.target.parentElement.parentElement.parentElement.id;
	console.log('this is: updateContent');
	var titleToChange = idea.title;
	var bodyToChange = idea.body;
	if (event.target.className === 'idea--title') {
		idea.updateContent(e.target.innerText, 'title');
	}
	if (event.target.className === 'idea--body') {
		idea.updateContent(e.target.innerText, 'body');
	}
}

function changeContent(event) {
	console.log('this is: changeContent');
	var cardId = event.target.parentElement.parentElement.parentElement.id;
	var changeTitleContent = event.target.parentElement.childNodes[1];
	var titleText = document.querySelector('.text--title');
	var indexToChange = arrayCards.findIndex(function(idea) {
			return idea.id === parseInt(event.target.id)
			console.log("Look Over Here", idea)
		});
	// var changeBodyContent = event.target.parentElement.childNodes[3];
	console.log(titleText.innerText, event.target.classList);
	if (event.target.classList.contains("text--title")) {
		console.log('PLEASE');

		indexToChange.updateContent(titleText.innerText, 'title')
	}
	// if (event.target.classList.contains('text--body') {

	// }
}

// ================================================================
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ================================================================
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

function deleteCard(event) {
	if (event.target.classList.contains('btn--kill')){
		var indexToDelete = arrayCards.findIndex(function(idea) {
			return idea.id === parseInt(event.target.id)
		})
		arrayCards[indexToDelete].deleteFromStorage(arrayCards, indexToDelete);
		event.target.closest('.ideas__container').remove();
	}
}

function searchResults(){
	// e.preventDefault();
	cardField.innerHTML = '';
	var inputSrch = inputSearch.value.toUpperCase();
	// arrayCards.forEach(function(arrayCard){
	// 	if (arrayCard.title.includes(inputSrch) || arrayCard.body.includes(inputSrch)){
	// 		createSearchCard(arrayCard.title, arrayCard.body)
	// 	}
	// });
	// ///////////////////////////////////////////////////////
	// if(localStorage.getItem("arrayCards")){
	// 	var parseArray = JSON.parse(localStorage.getItem("arrayCards"));
	// 	parseArray.forEach(function(storedIdea){
	// 		var id = storedIdea.id;
	// 		var title = storedIdea.title;
	// 		var body = storedIdea.body;
	// 		var quality = storedIdea.quality;
	// 		var pageIdea = new Idea(id, title, body, quality);
	// 		arrayCards.push(pageIdea);
	// 		// createCard(id, title, body, quality)
	// 	})
	// }
	// ///////////////////////////////////////////////////////
	var filtered = arrayCards.filter(function(arrayCard){
		var titleSearch = arrayCard.title.toUpperCase();
		var bodySearch = arrayCard.body.toUpperCase();
		console.log("almost there")
		return titleSearch.includes(inputSrch) || bodySearch.includes(inputSrch);
	});

	filtered.forEach(function(filtCard){
		createCard(filtCard.id, filtCard.title, filtCard.body, filtCard.quality);
	});
}

function filterSwill() {
	cardField.innerHTML = '';
	if (btnSwill) {
		var filtered = arrayCards.filter(function(arrayCard){
			var qualitySearch = arrayCard.quality;
			return qualitySearch.includes('swill');
		});
	}
	filtered.forEach(function(filtCard){
		createCard(filtCard.id, filtCard.title, filtCard.body, filtCard.quality);
	});
}
function filterPlausible() {
	cardField.innerHTML = '';
	if (btnPlausible) {
		var filtered = arrayCards.filter(function(arrayCard){
			var qualitySearch = arrayCard.quality;
			return qualitySearch.includes('plausible');
		});
	}
	filtered.forEach(function(filtCard){
		createCard(filtCard.id, filtCard.title, filtCard.body, filtCard.quality);
	});
}
function filterGenius() {
	cardField.innerHTML = '';
	if (btnGenius) {
		var filtered = arrayCards.filter(function(arrayCard){
			var qualitySearch = arrayCard.quality;
			return qualitySearch.includes('genius');
		});
	}
	filtered.forEach(function(filtCard){
		createCard(filtCard.id, filtCard.title, filtCard.body, filtCard.quality);
	});
}
