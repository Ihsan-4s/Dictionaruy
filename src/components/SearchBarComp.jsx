import { HiMagnifyingGlass } from "react-icons/hi2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBarComp() {
    const [word, setWord] = useState("");
    const navigate = useNavigate();

    const handleSub = (e) => {
        e.preventDefault();
        if (!word.trim()) return;
        navigate(`/word/${word}`);
    };

    return (
        <div className="search-wrapper">
            <form onSubmit={handleSub} className="search-bar">
                <HiMagnifyingGlass className="search-icon" size={20} />
                <input
                    type="text"
                    placeholder="Search any English word…"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    id="search-input"
                />
                <button type="submit" className="search-btn" aria-label="Search">
                    <HiMagnifyingGlass size={18} />
                </button>
            </form>
        </div>
    );
}