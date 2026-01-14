export default function WelcomeView({
  myCircles,
  onCreate,
  onJoin,
  onSelectCircle,
  show,
}) {
  return (
    <div className={`circles-content ${show ? "show" : ""}`}>
      <h1 className="circles-title">
        {myCircles.length ? "My Circles" : "Circles"}
      </h1>

      {myCircles.length === 0 && (
        <p className="circles-description">
          Create intimate spaces where gratitude flows freely...
        </p>
      )}

      {myCircles.length > 0 && (
        <div className="circles-grid">
          {myCircles.map((circle) => (
            <button
              key={circle.key}
              className="circle-bubble"
              onClick={() => onSelectCircle(circle)}
            >
              <div className="circle-bubble-name">{circle.name}</div>
            </button>
          ))}
        </div>
      )}

      <button className="btn btn-primary" onClick={onCreate}>
        Create Circle
      </button>

      <button className="btn btn-secondary" onClick={onJoin}>
        Join a Circle
      </button>
    </div>
  );
}
