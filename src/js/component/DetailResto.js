import './ReviewItem.js';
class DetailResto extends HTMLElement{
	set restaurant(restaurant){
		this._restaurant = restaurant;
		this.render();
	}

	set eventButtonBack(event){
		this._eventButtonBack = event;
	}

	set eventButtonReview(event){
		this._eventButtonReview = event;
	}

	get nameCustomer(){
		return this.querySelector('#reviewer-name').value;
	}

	get review(){
		return this.querySelector('#review-text').value;
	}

	render(){
		this.innerHTML = `
            <div class="row g-5 mb-5 mt-4" style="width: 90%; margin: 0 auto;">
                <div class="col-md-4 mt-3">
                    <div class="position-sticky" style="top: 2rem;">
                        <div class="pb-4 mb-3 bg-body-tertiary rounded">
                            <h2 class="fw-bold">${this._restaurant.name}</h2>
                            <p class="mb-0 fw-bold">${this._restaurant.city}, ${this._restaurant.address}</p>
                        </div>
                
                        <div>
                            <img src="https://restaurant-api.dicoding.dev/images/medium/${this._restaurant.pictureId}" alt="Foto Restaurant ${this._restaurant.name}" style="width: 100%;">
                        </div>
                
                        <div class="pt-3 mb-4">
                            <h4 class="fst-italic">Category</h4>
                            <ol id="category-list" class="list-unstyled mb-0 d-flex flex-wrap column-gap-3 ps-2">
                            </ol>
                        </div>

                        <div class="bg-secondary-subtle w-100 d-flex" style="height: 50px;">
                            <div class="w-50 border-3 border-dark border-start d-flex justify-content-center align-items-center gap-2" style="height: 100%;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <p class="fs-4 m-0">${this._restaurant.rating}</p>
                            </div>
                            <div class="w-50 border-3 border-dark border-end border-start d-flex justify-content-center align-items-center gap-2" style="height: 100%;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                </svg>
                                <p class="fs-4 m-0">${this._restaurant.customerReviews.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-8 mt-3">
                    <hr class="m-0"> 
                    <article class="blog-post mt-2 mb-4">
                        <p style="text-align: justify;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.</p>
                        <h3>Restaurant Menu</h3>
                        <p class="fw-bold">Makanan:</p>
                        <ol id="food-list">
                        </ol>
                        <p class="fw-bold">Minuman:</p>
                        <ol id="drink-list">
                        </ol>
                    </article>
            
                    <article class="blog-post mb-4">
                        <h3 class="mb-3">Customer Review</h3>
                        <div class="w-100 overflow-x-auto d-flex align-items-center border border-5 border-dark" style="height: 250px; border-top-left-radius: 20px; border-top-right-radius: 20px;">
                            <div class="d-flex gap-3 ms-4 me-4" id="review-container">
                            </div>
                        </div>
                    </article>
            
                    <div class="d-flex gap-4">
                        <a class="btn btn-outline-dark rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal" style="width: 80px;">Review</a>
                        <a class="btn btn-outline-danger rounded-pill" id="button-back" style="width: 80px;">Back</a>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Form Add Review</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="reviewer-name" class="col-form-label">Nama:</label>
                                <input type="text" class="form-control" id="reviewer-name">
                            </div>
                            <div class="mb-3">
                                <label for="review-text" class="col-form-label">Review:</label>
                                <textarea class="form-control" id="review-text"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer d-flex w-100">
                            <button class="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                            <button class="btn btn-outline-dark" id="button-review">Send Review</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

		const categoryListElement = this.querySelector('#category-list');
		const foodListElement = this.querySelector('#food-list');
		const drinkListElement = this.querySelector('#drink-list');
		const reviewListElement = this.querySelector('#review-container');
        
		this._restaurant.categories.forEach(category => {
			const li = document.createElement('li');
			li.innerText = `${category.name}`;
			categoryListElement.appendChild(li);
		});
		this._restaurant.menus.foods.forEach(food => {
			const li = document.createElement('li');
			li.innerText = `${food.name}`;
			foodListElement.appendChild(li);
		});
		this._restaurant.menus.drinks.forEach(drink => {
			const li = document.createElement('li');
			li.innerText = `${drink.name}`;
			drinkListElement.appendChild(li);
		});
		this._restaurant.customerReviews.forEach(review => {
			const reviewElement = document.createElement('review-item');
			reviewElement.reviewCust = review;
			reviewListElement.appendChild(reviewElement);
		});

		this.querySelector('#button-back').addEventListener('click', this._eventButtonBack);
		this.querySelector('#button-review').addEventListener('click', () => {
			this._eventButtonReview(this._restaurant.id);
		});
	}
}

customElements.define('detail-resto', DetailResto);