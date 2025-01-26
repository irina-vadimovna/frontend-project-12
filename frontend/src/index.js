import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import init from './init';

const root = ReactDOM.createRoot(document.getElementById('root'));
const vdom = await init();
root.render(
  vdom,
);
