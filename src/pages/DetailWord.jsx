import { Button, Dropdown, DropdownItem, ButtonGroup, Spinner } from "flowbite-react";
import { useParams } from "react-router-dom"
import SearchBarComp from "../components/SearchBarComp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DetailWord() {
    const { word } = useParams();
    const [wordDetails, setWordDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const [filteredMeanings, setFilteredMeanings] = useState([]);
    const wordData = wordDetails?.[0];
    const phonetic = wordData?.phonetic || wordData?.phonetics?.find(p => p.text)?.text;
    
    const synonyms = wordData?.meanings
        ?.flatMap(m => [
            ...(m.synonyms || []),
            ...m.definitions.flatMap(d => d.synonyms || [])
        ]);

    const antonyms = wordData?.meanings
        ?.flatMap(m => [
            ...(m.antonyms || []),
            ...m.definitions.flatMap(d => d.antonyms || [])
        ]);

    function filterMeaning(type) {
        const meanings = wordData.meanings;
        setFilteredMeanings(
            type === "all" ? meanings : meanings.filter(m => m.partOfSpeech === type)
        );
    }

    async function fetchWordDetails() {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setWordDetails(data)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching word details:", error);
            setLoading(false)
        }
    }

    useEffect(() => {
        if (wordData?.meanings) {
            setFilteredMeanings(wordData.meanings);
        }
    }, [wordData]);

    useEffect(() => {
        fetchWordDetails()
    }, [word])

    if (loading) {
        return (
            <div className="flex flex-col gap-2">
                <div className="text-center mt-50 mx-auto">
                    <Spinner aria-label="Center-aligned spinner example" size="xl" />
                </div>
            </div>
        )
    }
    return (
        <>
            <div style={{
                minHeight: "100vh",
                background: "linear-gradient(to bottom, #013fba, #ffffff)",
            }}>
                <div className="w-full max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-white mb-10">English Dictionary for Better Vocabulary</h1>
                    <SearchBarComp />
                    <div className="mt-20 p-5 bg-white rounded-2xl">
                        <div className="sticky top-0 z-10">
                            <ButtonGroup>
                                <Button href="#word" color="alternative">
                                    Word
                                </Button>
                                <Button href="#interjection" color="alternative">
                                    Interjection
                                </Button>
                                <Button href="#synonyms" color="alternative">
                                    Synonims and Antonyms
                                </Button>
                            </ButtonGroup>
                        </div>
                        <Dropdown label="Filter Part of Speech" className="my-5">
                                <DropdownItem onClick={() => filterMeaning("all")}>All</DropdownItem>
                                <DropdownItem onClick={() => filterMeaning("noun")}>Noun</DropdownItem>
                                <DropdownItem onClick={() => filterMeaning("verb")}>Verb</DropdownItem>
                                <DropdownItem onClick={() => filterMeaning("adjective")}>Adjective</DropdownItem>
                                <DropdownItem onClick={() => filterMeaning("adverb")}>Adverb</DropdownItem>
                            </Dropdown>
                        <div className="flex justify-center my-2">
                            <div className="w-full max-w-5xl p-5 bg-white shadow-2xl shadow-blue-500 rounded-2xl">
                                <p id="word" className="text-4xl font-bold text-blue-600">{wordData ? wordData.word : "Word not found"}</p>
                                <p className="text-xl text-gray-400">
                                    {phonetic}
                                </p>
                                {wordData?.phonetics
                                    ?.filter(p => p.audio)
                                    .map((p, i) => (
                                        <audio key={i} controls className="mt-2">
                                            <source src={p.audio} type="audio/mpeg" />
                                        </audio>
                                    ))}
                                <hr className="my-5" />
                                {filteredMeanings?.map((meaning, i) => (
                                    <div key={i} className="mt-5">
                                        <p className="text-lg font-semibold text-gray-500">
                                            {meaning.partOfSpeech}
                                        </p>
                                        <ul id="interjection" className="list-disc ml-6 mt-2">
                                            {meaning.definitions.map((def, j) => (
                                                <li key={j} className="text-gray-700 mb-2">
                                                    <p>{def.definition}</p>
                                                    {def.example && (
                                                        <p className="text-sm text-gray-400 italic">
                                                            Example: {def.example}
                                                        </p>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                                {/* <pre>{JSON.stringify(wordDetails, null, 2)}</pre> */}
                                {synonyms?.length > 0 && (
                                    <>
                                        <hr id="synonyms" className="my-5" />
                                        <p className="text-lg font-semibold text-gray-500">Synonyms</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {synonyms.map((s, i) => (
                                                <span
                                                    key={i} onClick={() => navigate(`/word/${s}`)} className="cursor-pointer px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{s}</span>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {antonyms?.length > 0 && (
                                    <>
                                        <hr className="my-5" />
                                        <p className="text-lg font-semibold text-gray-500">Antonyms</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {antonyms.map((a, i) => (
                                                <span key={i} onClick={() => navigate(`/word/${a}`)} className="cursor-pointer px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">{a}</span>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}