"use strict";


class Form {
    constructor() {
        this.searchElement = document.getElementById("search_Form");
        this.bindEvents();

    }
    bindEvents() {
        this.searchElement.addEventListener("submit", this.submitType.bind(this));


    }
    submitType(e) {
        e.preventDefault();
        this.mangaElement = document.getElementById("search").value;
        this.getContent(this.mangaElement);


    }
    getContent() {
        this.data = `https://api.jikan.moe/v3/search/manga?q=${this.mangaElement}`;
        fetch(this.data)
            .then(response => {
                return response.json()
                    .then(parsedJson => {
                        refresh(parsedJson);
                    });

            });



    }
}

function refresh(data) {

    const searchElement = document.getElementById('search_Results');

    let HtmlString = data.results.sort((a, b) => a.scores + b.scores).map(manga => {
        return `
        
    <div class="card">
        <div class="card-image">
            <img src="${manga.image_url}">
        </div>
        <div class="card-content">
            <span class="card-title">${manga.title}</span>
            <p>rating = ${manga.score}/10</p>
            <p>${manga.synopsis}</p>
            <p>${manga.type}</p>
        </div>
        <div class="card-action">
            <a href="${manga.url}">Find out more</a></div>
    </div>`;



    }).join("");

    searchElement.innerHTML = `<section><div class="horizontal-row">${HtmlString}</div>
    </section>`;



}

new Form();