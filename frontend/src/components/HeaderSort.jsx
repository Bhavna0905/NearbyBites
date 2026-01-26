export default function HeaderSort({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="header-sort"
    >
      <option value="distance">Distance</option>
      <option value="rating">Rating</option>
    </select>
  );
}
