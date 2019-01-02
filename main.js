// ====================Variables============================
// *********************************************************
var btnSearch = document.querySelector('.header__search--btn')
var inputSearch = document.querySelector('.header__search--input');
var inputTitle = document.querySelector('.input-form__title');
var inputBody = document.querySelector('.input-form__body');
var btnSave = document.querySelector('.input-form__save');
var cardField = document.querySelector('.ideas');
var arrayCards = [];

// ====================Event Listeners======================
// *********************************************************
inputSearch.addEventListener('input', searchResults);
inputBody.addEventListener('input', enableSave);
btnSave.addEventListener('click', saveIdea);
cardField.addEventListener('click', deleteCard);

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

function changeQuality(event) {
	var cardId = event.target.parentElement.parentElement.parentElement.id;
	var qualityOnCard = event.target.parentElement.childNodes[5].childNodes[1];
	var qualityArray = ['swill', 'plausible', 'genius'];
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
	var titleToChange = idea.title;
	var bodyToChange = idea.body;
	if (event.target.className === 'idea-title') {
		idea.updateContent(e.target.innerText, 'title');
	}
	if (event.target.className === 'idea-body') {
		idea.updateContent(e.target.innerText, 'body');
	}
}

function deleteCard(event) {
	// var killSwitch = document.getElementById(killSwitch)
	// console.log('kinda working')
  // 	// killSwitch.parentNode.removeChild(killSwitch);
  //   console.log('almost there');
  if (event.target.classList.contains('btn--kill')){
  	var indexToDelete = arrayCards.findIndex(function(idea) {
  		return idea.id === parseInt(event.target.id)
  	})
  	arrayCards[indexToDelete].deleteFromStorage(arrayCards, indexToDelete);
  	event.target.closest('.ideas__container').remove();
  }
  changeQuality(event);
  updateContent("works", 'title');
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

var btnSwill = document.getElementById('swill');
var btnPlausible = document.getElementById('plausible');
var btnGenius = document.getElementById('genius');

btnSwill.addEventListener('click', filterQuality);
btnPlausible.addEventListener('click', filterQuality);
btnGenius.addEventListener('click', filterQuality);

function filterQuality() {
		cardField.innerHTML = '';
	console.log('beginning');
	if (btnSwill) {
		console.log('Its a long road ahead');
		var filtered = arrayCards.filter(function(arrayCard){
		var qualitySearch = arrayCard.quality;
		console.log("almost there")
		return qualitySearch.includes('swill');
	});
	} else if (btnPlausible) {
		console.log('Its a long road ahead');
		var filtered = arrayCards.filter(function(arrayCard){
		var qualitySearch = arrayCard.quality;
		console.log("almost there")
		return qualitySearch.includes('plausible');
	});
	} else if (btnGenius) {
		console.log('Its a long road ahead');
		var filtered = arrayCards.filter(function(arrayCard){
		var qualitySearch = arrayCard.quality;
		console.log("almost there")
		return qualitySearch.includes('genius');
	});
	}
	filtered.forEach(function(filtCard){
		createCard(filtCard.id, filtCard.title, filtCard.body, filtCard.quality);
	});
}
