import Modal from './components/Modal';
import QuoteForm from './components/QuoteForm';
import QuoteList from './components/QuoteList';
import './css/style.css';
import '@fortawesome/fontawesome-free/css/all.css';

new Modal();
const quoteForm = new QuoteForm();
quoteForm.render();
new QuoteList();
