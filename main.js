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
	`<section class="ideas__container">
			<section class="ideas__card">
				<article class="card__text">
					<h2 class="text--title" contenteditable="true">${title}</h2>
					<p class="text--body" contenteditable="true">${body}
					</p>
				</article>
				<section class="card-btns__container">
					<input class="btn--dwn card-btns" type="image" alt="Down-Vote Idea Button" src="assets/downvote.svg">
					<input class="btn--up card-btns" type="image" alt="Up-Vote Idea Button" src="assets/upvote.svg">
					<h3 class="card-btns__quality">Quality: <span class="card-btns__change-quality">Swill</span></h3>
					<input id="killSwitch" class="btn--kill card-btns" type="image" alt="Delete Idea Button" src="assets/delete.svg">
				</section>
			</section>
		</section>`
	cardField.innerHTML = newCard + cardField.innerHTML;
}

function deleteCard() {
	var killSwitch = document.getElementById(killSwitch)
	console.log('kinda working')
  	killSwitch.parentNode.removeChild(killSwitch);
    console.log('almost there');
}

function searchResults(){
	// e.preventDefault();
	cardField.innerHTML = '';
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
		createCard(filtCard.title, filtCard.body);
	});
}
