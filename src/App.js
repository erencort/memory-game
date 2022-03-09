import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card/Card";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((item) => {
            if (item.src === choiceOne.src) {
              return { ...item, matched: true };
            } else {
              return item;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ ...item, id: Math.random() }));
    setCards(shuffledCards);
    setTurn(0);
  };

  const handleChoice = (item) => {
    choiceOne ? setChoiceTwo(item) : setChoiceOne(item);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn(turn + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match ({turn})</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-gird">
        {cards.map((item) => (
          <Card
            item={item}
            key={item.id}
            handleChoice={handleChoice}
            flipped={
              item === choiceOne || item === choiceTwo || item.matched
                ? "yes"
                : "no"
            }
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
