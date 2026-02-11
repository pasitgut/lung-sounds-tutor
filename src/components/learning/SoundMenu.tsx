interface SoundMenuProps {
  items: string[];
  activeItem: string;
  onSelect: (item: string) => void;
}

const SoundMenu: React.FC<SoundMenuProps> = ({
  items,
  activeItem,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      {items.map((item) => {
        const isActive = activeItem === item;
        return (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className={`
                  w-full py-3 px-6 rounded-full text-left font-semibold text-lg transition-all duration-200 border-2
                  ${
                    isActive
                      ? "bg-[#008CC9] border-[#008CC9] text-white shadow-lg scale-105"
                      : "bg-white border-[#008CC9] text-[#008CC9] hover:bg-blue-50"
                  }
                `}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default SoundMenu;
