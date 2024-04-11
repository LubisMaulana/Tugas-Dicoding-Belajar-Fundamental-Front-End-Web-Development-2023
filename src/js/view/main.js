import Data from '../data/data.js';
import '../component/navBar.js';
import '../component/NewsList.js';
import '../component/DetailResto.js';

const main = () =>{
	const url = 'https://notes-api.dicoding.dev/v2';

	const newsListElement = document.querySelector('news-list');
	const navBarElement = document.querySelector('nav-bar');
    
	const onButtonClickSearch = async () =>{
		try{
			const dataSource = await Data.searchRestaurant(navBarElement.keyword);
			newsListElement.restaurants = dataSource;
		}catch(rejectedRespon){
			newsListElement.renderError(rejectedRespon);
		}
	};

	const getRestaurant = async () => {
		try{
			const response = await fetch(`${url}/notes`);
			const responseJSON = await response.json();
			if(responseJSON.error){
				showResponseMessage(responseJSON.message);
			}else{
				newsListElement.eventNewsItem = getDetailResto;
				newsListElement.restaurants = responseJSON.restaurants;
				document.body.append(newsListElement);
			}
		} catch(error){
			showResponseMessage(error.stack);
		}
	};

	const getDetailResto = async (idResto) => {
		try{
			const response = await fetch(`${url}/detail/${idResto}`);
			const responseJSON = await response.json();
			if(responseJSON.error){
				showResponseMessage(responseJSON.message);
			}else{
				console.log(responseJSON);
				if (document.querySelector('detail-resto')){
					document.querySelector('detail-resto').remove();
					document.querySelector('.modal-backdrop').remove();
					document.body.style.cssText = '';
				}
				const detailRestoElemen = document.createElement('detail-resto');
				detailRestoElemen.eventButtonBack = onClickButtonBack;
				detailRestoElemen.eventButtonReview = onClickButtonReview;
				detailRestoElemen.restaurant = responseJSON.restaurant;
				document.querySelector('#btn-event-search').disabled = true;
				newsListElement.style.display = 'none';
				document.body.appendChild(detailRestoElemen);
			}
		} catch(error){
			showResponseMessage(error.stack);
		}
	};

	const onClickButtonBack = () => {
		newsListElement.style.display = 'flex';
		document.querySelector('detail-resto').remove();
		document.querySelector('#btn-event-search').disabled = false;
		getRestaurant();
	};

	const onClickButtonReview = (id) => {
		const detailRestoElement = document.querySelector('detail-resto');
		const name = detailRestoElement.nameCustomer;
		const review = detailRestoElement.review;
		addReview({id, name, review});
	}; 

	const addReview = async (review) => {
		try {
			console.log(JSON.stringify(review));
			const response = await fetch(`${url}/review`, {
				method: 'POST',
				headers: {
					'Content-Type':'application/json'
				},
				body: JSON.stringify(review)
			});
			console.log(response);
			const responseJSON = await response.json();
			showResponseMessage(responseJSON.message);
			getDetailResto(review.id);
		}catch(error){
			showResponseMessage(error.message);
		}
	};

	const showResponseMessage = (message = 'Check your internet connection') => {
		alert(message);
	};

	getRestaurant();
	navBarElement.eventSearch = onButtonClickSearch;
};
  
export default main;