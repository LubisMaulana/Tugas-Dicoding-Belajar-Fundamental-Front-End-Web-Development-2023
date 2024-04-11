import css from 'bootstrap/dist/css/bootstrap.min.css';
class ReviewItem extends HTMLElement{
	constructor(){
		super();
		this.shadowDOM = this.attachShadow({mode : 'open'});
	}

	set reviewCust(reviewCust){
		this._reviewCust = reviewCust;
		this.render();
	}

	render(){
		this.shadowDOM.innerHTML = `
            <style>
                ${css}
                *{
                    font-family: 'Ubuntu', sans-serif;
                }
                .card-title, .card-text{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            </style>
            <div class="card" style="min-width: 300px; max-width: 300px;">
                <div class="card-body">
                    <h5 class="card-title" style="-webkit-line-clamp:1">${this._reviewCust.name}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${this._reviewCust.date}</h6>
                    <p class="card-text" style="-webkit-line-clamp:3">${this._reviewCust.review}</p>
                </div>
            </div>
        `;
	}
}

customElements.define('review-item', ReviewItem);