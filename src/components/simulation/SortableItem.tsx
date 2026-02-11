import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface SortableItemProps {
  id: string;
  label: string;
  isCorrect: boolean;
}
const SortableItem: React.FC<SortableItemProps> = ({
  id,
  label,
  isCorrect,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-3 rounded border cursor-grab text-white ${isCorrect ? "bg-green-500" : "bg-red-500"}`}
    >
      {label}
    </div>
  );
};

export default SortableItem;
