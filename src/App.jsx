
import { useState } from "react";
import "./App.css";

const colors = [
  { name: "Red", value: "#EF4444" },
  { name: "Green", value: "#22C55E" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Yellow", value: "#FACC15" },
  { name: "Purple", value: "#A855F7" },
  { name: "Orange", value: "#F97316" },
  { name: "Pink", value: "#EC4899" },
  { name: "Black", value: "#111827" },
];

export default function App() {
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  const updateColor = (color) => {
    setSelectedColor(color.toUpperCase());
    setCopied(false);

    setHistory((previous) => [
      color.toUpperCase(),
      ...previous.filter((item) => item !== color.toUpperCase()),
    ].slice(0, 6));
  };

  const selectedName =
    colors.find(
      (color) => color.value === selectedColor
    )?.name || "Custom Color";

  const copyColor = async () => {
    try {
      await navigator.clipboard.writeText(selectedColor);
      setCopied(true);
    } catch {
      setCopied(false);
      window.prompt("Copy your HEX code:", selectedColor);
    }
  };

  const resetColor = () => {
    setSelectedColor("#FFFFFF");
    setCopied(false);
  };

  return (
    <main className="app">
      <header className="header">
        <div className="header-icon">🎨</div>
        <p className="eyebrow">CREATIVE PLAYGROUND</p>
        <h1>Color <span>Studio</span></h1>
        <p className="description">
          Pick a color, explore your creativity, and watch it come alive.
        </p>
      </header>

      <section className="workspace">
        <div className="controls">
          <div className="section-heading">
            <h2>Choose a color</h2>
            <span className="step">01</span>
          </div>

          <p className="label">PRESET COLORS</p>

          <div className="color-options">
            {colors.map((color) => (
              <label className="color-option" key={color.value}>
                <input
                  type="radio"
                  name="color"
                  value={color.value}
                  checked={selectedColor === color.value}
                  onChange={() => updateColor(color.value)}
                />

                <span
                  className="radio-circle"
                  style={{ "--radio-color": color.value }}
                />

                <span className="color-name">{color.name}</span>
              </label>
            ))}
          </div>

          <div className="divider" />

          <div className="section-heading">
            <h2>Custom color</h2>
            <span className="step">02</span>
          </div>

          <p className="helper-text">
            Choose any color using the color picker.
          </p>

          <label className="picker-control">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => updateColor(e.target.value)}
              aria-label="Choose custom color"
            />
            <span className="picker-preview">
              <span
                className="picker-swatch"
                style={{ backgroundColor: selectedColor }}
              />
              <span>Open color picker</span>
            </span>
            <span className="picker-arrow">↗</span>
          </label>

          <div className="divider" />

          <div className="section-heading">
            <h2>Color details</h2>
            <span className="step">03</span>
          </div>

          <div className="hex-card">
            <div>
              <p className="label">HEX CODE</p>
              <strong>{selectedColor}</strong>
            </div>

            <button
              className="copy-button"
              onClick={copyColor}
              aria-label="Copy HEX code"
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>

          <button className="reset-button" onClick={resetColor}>
            ↺ Reset color
          </button>
        </div>

        <div className="preview-panel">
          <div className="section-heading">
            <h2>Live preview</h2>
            <span className="live-indicator">
              <span /> LIVE
            </span>
          </div>

          <div className="circle-stage">
            <div
              key={selectedColor}
              className="color-circle"
              style={{
                backgroundColor: selectedColor,
                borderColor:
                  selectedColor === "#FFFFFF"
                    ? "#E5E7EB"
                    : selectedColor,
              }}
            />
          </div>

          <div className="preview-info">
            <p className="label">CURRENT SELECTION</p>
            <h3>{selectedName}</h3>
            <p className="hex-subtitle">{selectedColor}</p>

            <div
              className="wide-swatch"
              style={{ backgroundColor: selectedColor }}
            />
          </div>

          <div className="history-section">
            <h3>Recently selected</h3>

            {history.length > 0 ? (
              <div className="history-colors">
                {history.map((color) => (
                  <button
                    key={color}
                    className="history-swatch"
                    style={{ backgroundColor: color }}
                    title={color}
                    aria-label={`Select ${color}`}
                    onClick={() => updateColor(color)}
                  />
                ))}
              </div>
            ) : (
              <p className="helper-text">
                Your selected colors will appear here.
              </p>
            )}
          </div>
        </div>
      </section>

      <footer>MADE WITH ♥ IN REACT</footer>
    </main>
  );
}