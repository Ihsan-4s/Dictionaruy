import './App.css'
import SearchBarComp from './components/SearchBarComp'
import CardDayComp from './components/CardDayComp'

function App() {
    return (
        <div className="page-container">
            <section className="hero animate-fade-in-up">
                <h1 className="hero-title">
                    Build a Better <span className="highlight">Vocabulary</span>
                </h1>
                <p className="hero-subtitle">
                    Explore definitions, synonyms, antonyms, and pronunciation for any English word.
                </p>
                <SearchBarComp />
            </section>
            <CardDayComp />
            <div className="footer-hint">
                Powered by Free Dictionary API
            </div>
        </div>
    );
}

export default App
