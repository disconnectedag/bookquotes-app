import QuotesApi from '../services/quotesApi';

class QuoteList {
  constructor() {
    this._quoteListEl = document.querySelector('#quote-list');
    this._quotes = [];
    this.getQuotes();
    this._validGenres = new Set();
    this._validGenres.add('self-help');
    this._validGenres.add('health');
    this._validGenres.add('business');
    this._validGenres.add('education');
    this._validGenres.add('fiction');
    this._validGenres.add('technology');
    this._validGenres.add('non-fiction');
    this._validGenres.add('philosophy');
    this._validGenres.add('sports');
    this._validGenres.add('life-design');
    this._validGenres.add('science-fiction');
    this._validGenres.add('spiritual');
  }

  addEventListeners() {
    this._quoteListEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-times')) {
        e.stopImmediatePropagation();
        const quoteId = e.target.parentElement.parentElement.dataset.id;
        this.deleteQuote(quoteId);
      }
    });
  }

  async getQuotes() {
    try {
      const res = await QuotesApi.getQuotes();
      this._quotes = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteQuote(quoteId) {
    try {
      //Delete from server
      const res = await QuotesApi.deleteQuote(quoteId);
      this._quotes.filter((quote) => quote._id !== quoteId);
      this.getQuotes();
    } catch (error) {
      console.log(error);
      alert("You can't delete this resouce");
    }
  }

  addQuoteToList(quote) {
    this._quotes.push(quote);
    this.render();
  }

  getGenreClass(genre) {
    genre = genre.toLowerCase();
    let genreClass = '';
    if (this._validGenres.has(genre)) {
      genreClass = `genre-${genre}`;
    } else {
      genreClass = '';
    }
    return genreClass;
  }

  render() {
    this._quoteListEl.innerHTML = this._quotes
      .map((quote) => {
        const genreClass = this.getGenreClass(quote.genre);
        const deleteBtn =
          '<button class="delete"><i class="fas fa-times"></i></button>';

        return `
      <div class="card" data-id="${quote._id}">
          ${deleteBtn}
          <h3>
            "${quote.quote}"
          </h3>
          <p class="genre ${genreClass}">${quote.genre.toUpperCase()}</p>
          <p>
           Quote by <span class="author">${quote.author}</span> in <span>${
          quote.book
        }</span>
          </p>
        </div>
      `;
      })
      .join('');

    this.addEventListeners();
  }
}

export default QuoteList;
