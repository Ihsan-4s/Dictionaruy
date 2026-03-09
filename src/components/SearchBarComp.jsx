import { FcSearch } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBarComp() {

    const [word, setWord] = useState("")
    const navigate = useNavigate()

    const handleSub = (e) => {
        e.preventDefault();

        if (!word.trim()) return;
        navigate(`/word/${word}`)
    }

    return (
        <>
            <div className="w-full max-w-3xl mx-auto">
                <div className="flex items-center bg-gray-100 rounded-2xl p-2 shadow-sm px-5">
                    <FcSearch className="text-gray-400 ml-3" size={20} />
                    <form onSubmit={handleSub} className="flex justify-between w-full">
                        <input
                            type="text"
                            placeholder="Search a word or phrase"
                            className="flex-1 bg-transparent px-3 py-2 outline-none text-gray-700 placeholder-gray-400"
                            value={word}
                            onChange={(e) => setWord(e.target.value)}
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}