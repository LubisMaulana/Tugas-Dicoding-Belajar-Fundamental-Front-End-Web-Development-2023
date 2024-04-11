class NavBar extends HTMLElement{
	connectedCallback(){
		this.render();
	}

	set eventSearch(event){
		this._eventSearch = event;
		this.render();
	}

	get keyword(){
		return this.querySelector('input').value;
	}

	render(){
		this.innerHTML = `
            <nav class="navbar bg-dark" data-bs-theme="dark">
                <div class="container-fluid">
                    <a class="navbar-brand">Makan-U</a>
                    <div class="d-flex">
                        <input class="form-control me-2"placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-light" id="btn-event-search">Search</button>
                    </div>
                </div>
            </nav>
        `;
		this.querySelector('#btn-event-search').addEventListener('click', this._eventSearch);
	}
}

customElements.define('nav-bar', NavBar);