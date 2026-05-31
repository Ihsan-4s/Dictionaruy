import { useParams, useNavigate } from "react-router-dom";
import SearchBarComp from "../components/SearchBarComp";
import { useEffect, useState } from "react";
import '../App.css';

const SPEECH_TYPES = ["all", "noun", "verb", "adjective", "adverb", "interjection"];

export default function DetailWord() {
    const { word } = useParams();
    const [wordDetails, setWordDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [filteredMeanings, setFilteredMeanings] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");

    const wordData = wordDetails?.[0];
    const phonetic = wordData?.phonetic || wordData?.phonetics?.find(p => p.text)?.text;

    const synonyms = wordData?.meanings?.flatMap(m => [
        ...(m.synonyms || []),
        ...m.definitions.flatMap(d => d.synonyms || [])
    ]);

    const antonyms = wordData?.meanings?.flatMap(m => [
        ...(m.antonyms || []),
        ...m.definitions.flatMap(d => d.antonyms || [])
    ]);

    function filterMeaning(type) {
        setActiveFilter(type);
        const meanings = wordData.meanings;
        setFilteredMeanings(
            type === "all" ? meanings : meanings.filter(m => m.partOfSpeech === type)
        );
    }

    async function fetchWordDetails() {
        setLoading(true);
        setError(false);
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (!Array.isArray(data)) {
                setError(true);
                setWordDetails(null);
            } else {
                setWordDetails(data);
                setError(false);
            }
            setLoading(false);
        } catch (err) {
            console.error("Error fetching word details:", err);
            setError(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (wordData?.meanings) {
            setFilteredMeanings(wordData.meanings);
            setActiveFilter("all");
        }
    }, [wordData]);

    useEffect(() => {
        fetchWordDetails();
    }, [word]);

    if (loading) {
        return (
            <div className="page-container">
                <div className="skeleton-detail animate-fade-in">
                    <div className="detail-search">
                        <SearchBarComp />
                    </div>
                    <div className="skeleton" style={{ width: "30%", height: 40, marginBottom: 8 }}></div>
                    <div className="skeleton" style={{ width: "15%", height: 20, marginBottom: 32 }}></div>
                    <div className="skeleton" style={{ width: "100%", height: 1, marginBottom: 24 }}></div>
                    <div className="skeleton" style={{ width: "12%", height: 14, marginBottom: 16 }}></div>
                    <div className="skeleton" style={{ width: "90%", height: 16, marginBottom: 12 }}></div>
                    <div className="skeleton" style={{ width: "85%", height: 16, marginBottom: 12 }}></div>
                    <div className="skeleton" style={{ width: "70%", height: 16, marginBottom: 12 }}></div>
                </div>
            </div>
        );
    }

    if (error || !wordData) {
        return (
            <div className="page-container">
                <div className="detail-container animate-fade-in">
                    <div className="detail-search">
                        <SearchBarComp />
                    </div>
                    <div className="not-found">
                        <p className="not-found-emoji">🔍</p>
                        <p className="not-found-title">Word not found</p>
                        <p className="not-found-text">
                            We couldn't find a definition for "<strong>{word}</strong>". Try searching for another word.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="detail-container animate-fade-in-up">
                {/* Search */}
                <div className="detail-search">
                    <SearchBarComp />
                </div>

                {/* Filter Pills */}
                <div className="filter-pills">
                    {SPEECH_TYPES.map(type => (
                        <button
                            key={type}
                            className={`filter-pill ${activeFilter === type ? "active" : ""}`}
                            onClick={() => filterMeaning(type)}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Word Header */}
                <div className="word-header" id="word">
                    <h1 className="word-title">{wordData.word}</h1>
                    {phonetic && <p className="word-phonetic">{phonetic}</p>}
                    {wordData.phonetics?.filter(p => p.audio).length > 0 && (
                        <div className="word-audio">
                            {wordData.phonetics
                                .filter(p => p.audio)
                                .map((p, i) => (
                                    <audio key={i} controls>
                                        <source src={p.audio} type="audio/mpeg" />
                                    </audio>
                                ))}
                        </div>
                    )}
                </div>

                {/* Meanings */}
                <div className="stagger-children">
                    {filteredMeanings.map((meaning, i) => (
                        <div key={i} className="meaning-section">
                            <p className="meaning-pos">{meaning.partOfSpeech}</p>
                            <ul className="definition-list">
                                {meaning.definitions.map((def, j) => (
                                    <li key={j} className="definition-item">
                                        <p className="definition-text">{def.definition}</p>
                                        {def.example && (
                                            <p className="definition-example">{def.example}</p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Synonyms */}
                {synonyms?.length > 0 && (
                    <div className="related-section" id="synonyms">
                        <p className="related-label">Synonyms</p>
                        <div className="chips">
                            {synonyms.map((s, i) => (
                                <button
                                    key={i}
                                    className="chip chip-synonym"
                                    onClick={() => navigate(`/word/${s}`)}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Antonyms */}
                {antonyms?.length > 0 && (
                    <div className="related-section" id="antonyms">
                        <p className="related-label">Antonyms</p>
                        <div className="chips">
                            {antonyms.map((a, i) => (
                                <button
                                    key={i}
                                    className="chip chip-antonym"
                                    onClick={() => navigate(`/word/${a}`)}
                                >
                                    {a}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="footer-hint">
                    Powered by Free Dictionary API
                </div>
            </div>
        </div>
    );
}