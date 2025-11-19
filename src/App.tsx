import { useState } from "react";
import { motion } from "framer-motion";
import MobileBoardGridSVG from "./MobileBoardGridSVG";
import boardGridWebp from "./assets/mobile-board-grid.webp";
import "./App.css";

const shareVariants = {};

const gridBoardVariants = {
  ...shareVariants,
  flat: {
    transform: [
      "translate3d(-0.15%, -8.4%, 0) perspective(8rem) rotate3d(1, 0, 0, 4.7deg) scale(1.024, 0.745)",
      "translate3d(0, 0, 0) perspective(8.5rem) rotate3d(1, 0, 0, 0deg) scale(1, 1)",
    ],
    transition: {
      duration: 1,
      ease: [0.47, 0, 0.05, 1] as const,
    },
  },
  slope: {
    transform: [
      "translate3d(0, 0, 0) perspective(8.5rem) rotate3d(1, 0, 0, 0deg) scale(1, 1)",
      "translate3d(-0.15%, -8.4%, 0) perspective(8rem) rotate3d(1, 0, 0, 4.7deg) scale(1.024, 0.745)",
    ],
    transition: {
      duration: 1,
      ease: [0.47, 0, 0.05, 1] as const,
    },
  },
};

function App() {
  const [boardFormat, setBoardFormat] = useState<"webp" | "svg">("webp");
  const [boardState, setBoardState] = useState<"flat" | "slope">("flat");

  const toggleBoardFormat = () => {
    setBoardFormat((prev) => (prev === "webp" ? "svg" : "webp"));
  };

  const toggleBoardState = () => {
    setBoardState((prev) => (prev === "flat" ? "slope" : "flat"));
  };

  return (
    <div className="app-container">
      <div className="controls">
        <button onClick={toggleBoardFormat}>
          Switch to {boardFormat === "webp" ? "SVG" : "WebP"}
        </button>
        <button onClick={toggleBoardState}>
          Switch to {boardState === "flat" ? "Slope" : "Flat"}
        </button>
      </div>

      <motion.div
        className="board-container"
        variants={gridBoardVariants}
        animate={boardState}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="board-grid">
            {boardFormat === "svg" ? (
              <MobileBoardGridSVG />
            ) : (
              <img
                src={boardGridWebp}
                alt={`Roulette Board Grid ${index + 1}`}
              />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default App;
