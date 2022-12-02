import "./App.css";

function StartScreen(props) {
  return (
    <div className="start-screen">
      <div className="start-quiz">
        <img
          className="start-image"
          src="kyoko.webp"
          alt="Kyoko Kirigiri from Danganronpa"
        />
        <div className="start-block">
          <p className="start-description">
            Find out if you are an expert video-game player
          </p>
          <button className="main-button" onClick={props.startQuiz}>
            Start quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
