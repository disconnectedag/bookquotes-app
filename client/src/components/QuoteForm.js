import QuotesApi from '../services/quotesApi';
import QuoteList from './QuoteList';

class QuoteForm {
  constructor() {
    this._formModal = document.querySelector('#form-modal');
    this._quoteList = new QuoteList();
  }

  addEventListeners() {
    this._form.addEventListener('submit', this.handleFormSubmit.bind(this));
  }
  async handleFormSubmit(event) {
    event.preventDefault();

    if (
      !this._form.elements.quote.value ||
      !this._form.elements.book.value ||
      !this._form.elements.author.value
    ) {
      alert('Please enter all fields');
    }

    const quote = {
      quote: this._form.elements['quote'].value,
      book: this._form.elements['book'].value,
      author: this._form.elements['author'].value,
      genre: this._form.elements['genre'].value,
    };

    // add idea to server
    const newQuote = await QuotesApi.createQuote(quote);

    //add idea to list
    this._quoteList.addQuoteToList(newQuote.data.data);

    //clear fields
    this._form.elements['quote'].value = '';
    this._form.elements['book'].value = '';
    this._form.elements['author'].value = '';
    this._form.elements['genre'].value = '';

    this.render();

    document.dispatchEvent(new Event('closemodal'));
  }
  render() {
    this._formModal.innerHTML = `
    <form id="quote-form">
    <div class="form-control">
      <label for="author">Enter the Author's Name</label>
      <input type="text" name="author" id="author" />
    </div>
    <div class="form-control">
      <label for="quote-text">What's The Quote?</label>
      <textarea name="quote" id="quote-text"></textarea>
    </div>
    <div class="form-control">
      <label for="book">Book Name</label>
      <input type="text" name="book" id="book" />
    </div>
    <div class="form-control">
      <label for="genre">Book Genre</label>
      <input type="text" name="genre" id="genre" />
    </div>
    <button class="btn" type="submit" id="submit">Submit</button>
  </form>`;
    this._form = document.querySelector('#quote-form');
    this.addEventListeners();
  }
}

export default QuoteForm;
