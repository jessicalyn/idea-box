// ====================Variables============================
// *********************************************************
var inputSearch = document.querySelector('.search--input');
var inputTitle = document.querySelector('.input-form__title');
var inputBody = document.querySelector('.input-form__body');
var btnSave = document.querySelector('.input-form__save');
var cardField = document.querySelector('.ideas');
var arrayCards = JSON.parse(localStorage.getItem("arrayCards")) || [];



// ====================Event Listeners======================
// *********************************************************
// inputSearch.addEventListener('keyup', ____);
inputBody.addEventListener('input', enableSave);
btnSave.addEventListener('click', saveIdea);

// ============Functions========================
// *********************************************************
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
	createCard();
}

function createCard(title, body) {
  var title = inputTitle.value;
  var body = inputBody.value;
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