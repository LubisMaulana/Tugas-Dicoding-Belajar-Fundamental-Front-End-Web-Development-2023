/* eslint-disable no-async-promise-executor */
class Data{
	static searchRestaurant (keyword) {
		return new Promise(async (resolve, rejected) =>{
			try{
				const response = await fetch(`https://restaurant-api.dicoding.dev/search?q=${keyword}`);
				const responseJSON = await response.json();
				if (responseJSON.restaurants.length){
					resolve(responseJSON.restaurants);
				}else{
					rejected(`${keyword} is not found`);
				}
			}catch(error){
				rejected(error);
			}
		});
	}
}
  
export default Data;