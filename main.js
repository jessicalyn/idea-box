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
btnSearch.addEventListener('click', searchResults);
inputBody.addEventListener('input', enableSave);
btnSave.addEventListener('click', saveIdea);

// ============Functions========================
// *********************************************************

window.onload = function (){
	var parseArray = JSON.parse(localStorage.getItem("arrayCards"));
	parseArray.forEach(function(storedIdea){
		var id = storedIdea.id;
		var title = storedIdea.title;
		var body = storedIdea.body;
		var quality = storedIdea.quality;
		var pageIdea = new Idea(id, title, body, quality);
		arrayCards.push(pageIdea);
		// add quality to createCard
		createCard(title, body)
	})
}

function enableSave(){
	if (inputBody.value !== ""){
		// console.log('is this thing on?');
		btnSave.disabled = false;
	}
}

function saveIdea(e){
	e.preventDefault();
	var newIdeaInstance = new Idea(Date.now(), inputTitle.value, inputBody.value);
	arrayCards.push(newIdeaInstance);
	newIdeaInstance.saveToStorage(arrayCards);
	createCard(inputTitle.value, inputBody.value);
}
// add quality to createCard
function createCard(title, body) {
	var newCard = 
	`<section class="ideas__card">
	<article class="card__text">
	<h2 class="text--title">${title}</h2>
	<p class="text--body">${body}</p>
	</article>
	<section class="card__btn">
	<button class="btn--up"></button>
	<button class="btn--dwn"></button>
	<button class="btn--kill"></button>
	</section>
	</section>`
	cardField.innerHTML = newCard + cardField.innerHTML;
}

function createSearchCard(name, content){
	var searchCard =
	`<section class="ideas__card">
	<article class="card__text">
	<h2 class="text--title">${name}</h2>
	<p class="text--body">${content}</p>
	</article>
	<section class="card__btn">
	<button class="btn--up"></button>
	<button class="btn--dwn"></button>
	<button class="btn--kill"></button>
	</section>
	</section>`
	cardField.innerHTML = searchCard + cardField.innerHTML;
}

function searchResults(e){
	e.preventDefault();
	var inputSrch = inputSearch.value;
	// arrayCards.forEach(function(arrayCard){
	// 	if (arrayCard.title.includes(inputSrch) || arrayCard.body.includes(inputSrch)){
	// 		createSearchCard(arrayCard.title, arrayCard.body)
	// 	}
	// });
	var filtered = arrayCards.filter(function(arrayCard){
		return (arrayCard.title.includes(inputSrch) || arrayCard.body.includes(inputSrch));
	});
	filtered.forEach(function(filtCard){
		createSearchCard(filtCard.title, filtCard.body);
	});
}