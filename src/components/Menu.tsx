import React from "react";
import { categories } from "../utils/constants/categories";

type Props = {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  setCategory: React.Dispatch<React.SetStateAction<number>>;
  activeCategory: number;
};

const Menu: React.FC<Props> = ({ setIsAdding, setCategory, activeCategory }) => {
  return (
    <div className="flex gap-1">
      <button
        onClick={() => setIsAdding(true)}
        className="text-violet-600 border-none menu-item"
      >
        + New task
      </button>
      {categories.map((categoryName, i) => {
        return (
          <button
            className={`menu-item ${
              activeCategory == i ? "bg-white border-none drop-shadow-[0_1px_5px_rgba(0,0,0,0.20)]" : ""
            }`}
            key={i}
            onClick={() => setCategory(i)}
          >
            {categoryName}
          </button>
        );
      })}
    </div>
  );
};

export default Menu;
