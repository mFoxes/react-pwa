import { Content } from './components/main/content/content';
import { Footer } from './components/main/footer/footer';
import './styles/app.scss';

function App(): JSX.Element {
	return (
		<div className='app'>
			<Footer />
			<Content />
		</div>
	);
}

export default App;
