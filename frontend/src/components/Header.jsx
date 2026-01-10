import { useState } from "react";

export default function Header() {
  const toggleDark = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <div className="header">
      🍔 NearbyBites
      <button
        onClick={toggleDark}
        style={{ marginLeft: "auto" }}
      >
        🌙
      </button>
    </div>
  );
}

