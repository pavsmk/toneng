import { Fragment, useEffect, useState } from "react";
import { DICTIONARY, DictionaryRecord } from "./mock";
import shuffle from 'lodash.shuffle'
import { getRandomInt } from "./utils";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";

export const Eng = () => {
    const [words, setWords] = useState<Array<DictionaryRecord & { ruFake: string }>>([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [points, setPoints] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        const dictionaryMixed = shuffle(DICTIONARY).slice(0, 4);
        const words = dictionaryMixed.map(record => {
            const randomInt = getRandomInt(0, dictionaryMixed.length - 1)
            return { ...record, ruFake: dictionaryMixed[randomInt].ru }
        })
        setWords(words);
    }, []);

    const changeCurrentWordIndex = () => {
        setShowAnswer(true)

        setTimeout(() => {
            setShowAnswer(false)
            setCurrentWordIndex(currentWordIndex => currentWordIndex + 1)
        }, 1000)
    }

    const onCorrentAnswerClick = () => {
        setPoints(points => points + 1)
        changeCurrentWordIndex()
    }

    const onIncorrentAnswerClick = () => {
        changeCurrentWordIndex()
    }

    if (!words.length) return <p>Loading...</p>;

    return (
        <FlexBoxCol style={{ alignItems: 'center' }}>
            <p>Points: {points}</p>

            {currentWordIndex <= words.length-1 ? <Fragment>
                <p>{words[currentWordIndex].en}</p>
                
                <FlexBoxRow style={{ justifyContent: 'center', ...(!!(currentWordIndex % 2) && { flexDirection: 'row-reverse' }) }}>
                    <Button onClick={onIncorrentAnswerClick} disabled={showAnswer}>
                        {showAnswer && <span>❌</span>}
                        {words[currentWordIndex].ruFake}
                    </Button>
                    <Button onClick={onCorrentAnswerClick} disabled={showAnswer}>
                        {showAnswer && <span>✅</span>}
                        {words[currentWordIndex].ru}
                    </Button>
                </FlexBoxRow>
            </Fragment> : <p>На этом все 🥸</p>}
        </FlexBoxCol>
    );
}