import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowRight, HiArrowPath } from "react-icons/hi2";

export default function CardDayComp() {
    const [word, setWord] = useState("");
    const [partOfSpeech, setPartOfSpeech] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    function handleNavigate() {
        navigate(`/word/${word}`);
    }

    async function wordOfDay() {
        setLoading(true);
        const urlRand = "https://random-word-api.herokuapp.com/word?number=1";
        try {
            const randRes = await fetch(urlRand);
            const randData = await randRes.json();
            const randWord = randData[0];

            const dicRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randWord}`);
            const dictData = await dicRes.json();
            if (!Array.isArray(dictData)) {
                wordOfDay();
                return;
            }
            const response = dictData[0];
            setWord(response.word);
            setPartOfSpeech(response.meanings[0].partOfSpeech);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching word of the day:", err);
            setLoading(false);
        }
    }

    useEffect(() => {
        wordOfDay();
    }, []);

    if (loading) {
        return (
            <div className="wotd-section animate-fade-in">
                <p className="wotd-label">Random Word</p>
                <div className="wotd-card">
                    <div className="skeleton" style={{ width: "45%", height: 32, marginBottom: 12 }}></div>
                    <div className="skeleton" style={{ width: "20%", height: 18, marginBottom: 28 }}></div>
                    <div style={{ display: "flex", gap: 12 }}>
                        <div className="skeleton" style={{ width: 120, height: 40 }}></div>
                        <div className="skeleton" style={{ width: 160, height: 40 }}></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="wotd-section animate-fade-in-up">
            <p className="wotd-label">Random Word</p>
            <div className="wotd-card">
                <p className="wotd-word">{word}</p>
                <p className="wotd-pos">{partOfSpeech}</p>
                <div className="wotd-actions">
                    <button className="btn btn-ghost" onClick={wordOfDay}>
                        <HiArrowPath size={16} />
                        Randomize
                    </button>
                    <button className="btn btn-primary" onClick={handleNavigate}>
                        View Definition
                        <HiArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
