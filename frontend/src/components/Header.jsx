export default function Header({
  sortBy,
  onSortChange,
  radius,
  onRadiusChange
}) {
  const toggleDark = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <div className="header">
      <span>🍔 NearbyBites</span>

      <div className="header-actions">
        {/* Radius Control */}
        <div className="radius-control">
          <button
            onClick={() => onRadiusChange(Math.max(1, radius - 5))}
          >
            −
          </button>

          <input
            type="number"
            min="1"
            value={radius}
            onChange={(e) =>
              onRadiusChange(
                Math.max(1, Number(e.target.value) || 1)
              )
            }
          />

          <span>km</span>

          <button
            onClick={() => onRadiusChange(radius + 5)}
          >
            +
          </button>
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
        >
          <option value="distance">Distance</option>
          <option value="rating">Rating</option>
        </select>

        {/* Dark mode */}
        <button onClick={toggleDark} className="dark-btn">
          🌙
        </button>
      </div>
    </div>
  );
}
