import css from 'bootstrap/dist/css/bootstrap.min.css';

class NewsItem extends HTMLElement{
	constructor(){
		super();
		this.shadowDOM = this.attachShadow({mode : 'open'});
	}

	set restaurant(restaurant){
		this._restaurant = restaurant;
		this.render();
	}

	set eventShowDetail(event){
		this._eventShowDetail = event;
		this.render();
	}

	render(){
		this.shadowDOM.innerHTML = `
            <style>
                ${css}
                *{
                    font-family: 'Ubuntu', sans-serif;
                }
                p {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            </style>
            <div class="col">
                <div class="card shadow-sm">
                    <img src="https://restaurant-api.dicoding.dev/images/medium/${this._restaurant.pictureId}" style="width: 100%; height: 150px;"></img>
                    <div class="card-body">
                        <p class="card-text fw-bold fs-3" style="-webkit-line-clamp:1">${this._restaurant.name}</p>
                        <p class="card-text fw-bold fs-6" style="-webkit-line-clamp:1">${this._restaurant.city}</p>
                        <p class="card-text fs-6" style="-webkit-line-clamp:5">${this._restaurant.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

		this.shadowDOM.querySelector('button').addEventListener('click', ()=>{
			this._eventShowDetail(this._restaurant.id);
		});
	}
}

customElements.define('news-item', NewsItem);