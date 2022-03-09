import "./style.css";

function Card({ item, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(item);
    }
  };

  return (
    <div className="card">
      {flipped === "yes" ? (
        <img className="front" src={item.src} alt="card-front" />
      ) : (
        <img
          onClick={handleClick}
          className="back"
          src="/img/cover.png"
          alt="card-back"
        />
      )}
    </div>
  );
}

export default Card;
