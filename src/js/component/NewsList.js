import './NewsItem.js';
import css from 'bootstrap/dist/css/bootstrap.min.css';
class NewsList extends HTMLElement{
	constructor(){
		super();
		this.shadowDOM = this.attachShadow({mode : 'open'});
	}

	set restaurants(restaurants){
		this._restaurants = restaurants;
		this.render();
	}

	set eventNewsItem(event){
		this._eventNewsItem = event;
	}

	renderError(message){
		this.shadowDOM.innerHTML = `
            <style>
                *{
                    font-family: 'Ubuntu', sans-serif;
                }
                club-list > .placeholder {
                    font-weight: lighter;
                    color: rgba(0,0,0,0.5);
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
            </style>
        `;
		this.shadowDOM.innerHTML += `<h2 class="placeholder">${message}</h2>`;
	}
    
	render(){
		this.shadowDOM.innerHTML = `
            <style>
                ${css}
            </style>
            <div class="container mt-4 mb-5">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                </div>
            </div>
        `;

		this._restaurants.forEach(restaurant => {
			const newsItemElement = document.createElement('news-item');
			newsItemElement.restaurant = restaurant;
			newsItemElement.eventShowDetail = this._eventNewsItem;
			this.shadowDOM.querySelector('.container .row').append(newsItemElement); 
		});
	}
}

customElements.define('news-list', NewsList);