import { Button, Card, Spinner } from "flowbite-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CardDayComp() {
    const [word, setWord] = useState("");
    const [partOfSpeech, setPartOfSpeech] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    function handleNavigate() {
        navigate(`/word/${word}`)
    }

    async function wordOfDay() {
        const urlRand = "https://random-word-api.herokuapp.com/word?number=1"
        try {
            const randRes = await fetch(urlRand)
            const randData = await randRes.json()
            const randWord = randData[0]

            const dicRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randWord}`)
            const dictData = await dicRes.json()
            if (!Array.isArray(dictData)) {
                wordOfDay()
                return
            }
            const response = dictData[0]

            setWord(response.word)
            setPartOfSpeech(response.meanings[0].partOfSpeech)
            setLoading(false)
        } catch (err) {
            console.error("Error fetching word of the day:", err);
            setLoading(false)
        }
    }

    useEffect(() => {
        wordOfDay()
    }, [])

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
        <Card className="w-full max-w-4xl mx-auto bg-gradient-to-r from-white to-blue-300">
            <h5 className="text-2xl font-bold tracking-tight text-blue-600 dark:text-white">
                Get Random Word
            </h5>
                <div>
                    <h1 className="text-4xl font-bold text-blue-700 dark:text-gray-400 underline">
                        {word}
                    </h1>
                    <h1 className="text-lg text-gray-500 dark:text-gray-400">
                        {partOfSpeech}
                    </h1>
                    <div className="flex justify-between">
                        <Button onClick={wordOfDay}>
                            Random Again
                        </Button>
                        <Button onClick={handleNavigate}>
                            Go get the random word →
                        </Button>
                    </div>
                </div>
        </Card>
    );
}
