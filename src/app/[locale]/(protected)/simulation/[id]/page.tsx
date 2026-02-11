"use client";

import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

type Item = {
  id: string;
  label: string;
};

const initialItems: Item[] = [
  { id: "1", label: "item 1" },
  { id: "2", label: "item 2" },
  { id: "3", label: "item 3" },
  { id: "4", label: "item 4" },
  { id: "5", label: "item 5" },
];

const correctOrder = ["1", "2", "3", "4", "5"];

export default function SimPage() {
  const [sourceItems, setSourceItems] = useState<Item[]>([...initialItems]);
  const [targetItems, setTargetItems] = useState<Item[]>([]);
  const [activeItem, setActiveItem] = useState<Item | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const isFull = targetItems.length === initialItems.length;
  const isAllCorrect =
    isFull &&
    targetItems.every((item, index) => item.id === correctOrder[index]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const item =
      sourceItems.find((i) => i.id === active.id) ||
      targetItems.find((i) => i.id === active.id);

    if (item) setActiveItem(item);
  };

  const findContainer = (id: string) => {
    if (sourceItems.find((i) => i.id === id)) return "source";
    if (targetItems.find((i) => i.id === id)) return "target";

    if (id === "target-droppable") return "target";
    return null;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || active.id === over?.id) return;

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over?.id as string);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    if (activeContainer === "source" && overContainer === "target") {
      setSourceItems((items) => items.filter((i) => i.id !== active.id));
      setTargetItems((items) => {
        const activeItem = sourceItems.find((i) => i.id === active.id);
        if (!activeItem) return items;

        const overIndex = items.findIndex((i) => i.id === over.id);

        let newIndex;
        if (over.id === "target-droppable") {
          newIndex = items.length + 1;
        } else {
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height;

          const modifier = isBelowOverItem ? 1 : 0;
          newIndex = overIndex >= 0 ? overIndex + modifier : items.length + 1;
        }

        return [
          ...items.slice(0, newIndex),
          activeItem,
          ...items.slice(newIndex, items.length),
        ];
      });
    }
    if (activeContainer === "target" && overContainer === "source") {
      setTargetItems((items) => items.filter((i) => i.id !== active.id));
      setSourceItems((items) => {
        const activeItem = targetItems.find((i) => i.id === active.id);
        if (!activeItem) return items;
        return [...items, activeItem];
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);

    if (!over) return;

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over?.id as string);

    if (activeContainer === overContainer && activeContainer === "target") {
      const activeIndex = targetItems.findIndex((i) => i.id === active.id);
      const overIndex = targetItems.findIndex((i) => i.id === over?.id);

      if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
        setTargetItems((items) => arrayMove(items, activeIndex, overIndex));
      }
    }
  };

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: { opacity: "0.5" },
      },
    }),
  };
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white min-h-screen min-w-screen text-black">
      <h1 className="text-2xl font-bold mb-6">Simulation: Reorder Items</h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-8">
          <div className="w-1/2 p-4 bg-gray-50 rounded-lg border min-h-100">
            <h2 className="font-bold mb-4">ตัวเลือก ({sourceItems.length})</h2>
            <SortableContext
              items={sourceItems}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {sourceItems.map((item) => (
                  <SortableItem key={item.id} id={item.id} item={item} />
                ))}
                {sourceItems.length === 0 && (
                  <div className="text-gray-400 text-center mt-10">
                    ไม่เหลือตัวเลือกแล้ว
                  </div>
                )}
              </div>
            </SortableContext>
          </div>

          <div className="w-1/2 p-4 bg-blue-50 rounded-lg border min-h-100">
            <h2 className="font-bold mb-4">
              ลำดับคำตอบ ({targetItems.length}/5)
            </h2>

            <SortableContext
              items={targetItems}
              strategy={verticalListSortingStrategy}
            >
              <TargetDroppableArea>
                {targetItems.map((item, index) => {
                  let statusColor = "bg-white border-gray-300";
                  if (isFull) {
                    const isCorrect = item.id === correctOrder[index];
                    statusColor = isCorrect
                      ? "bg-green-100 border-green-500 text-green-800"
                      : "bg-red-100 border-red-500 text-red-800";
                  }
                  return (
                    <div key={item.id} className="flex items-center gap-2">
                      <span className="font-bold w-6 text-gray-500">
                        {index + 1}.
                      </span>
                      <SortableItem
                        id={item.id}
                        item={item}
                        className={`w-full ${statusColor}`}
                      />
                    </div>
                  );
                })}

                {Array.from({ length: 5 - targetItems.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="flex items-center gap-2 opacity-50"
                  >
                    <span className="font-bold w-6 text-gray-300">
                      {targetItems.length + i + 1}.
                    </span>
                    <div className="w-full p-4 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 text-gray-300 text-center text-sm">
                      ลากคำตอบมาวาง
                    </div>
                  </div>
                ))}
              </TargetDroppableArea>
            </SortableContext>
          </div>
        </div>

        <DragOverlay dropAnimation={dropAnimation}>
          {activeItem ? (
            <div className="p-4 bg-blue-500 text-white rounded shadow-xl cursor-grabbing opacity-90 w-75">
              {activeItem.label}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className="mt-8 text-center">
        <button
          disabled={!isAllCorrect}
          className={`px-6 py-2 rounded font-bold text-white transition-all ${
            isAllCorrect
              ? "bg-green-600 hover:bg-green-700 shadow-lg"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isAllCorrect ? "ส่งคำตอบเรียบร้อย!" : "กรุณาเรียงให้ถูกต้องครบถ้วน"}
        </button>
      </div>
    </div>
  );
}

function TargetDroppableArea({ children }: { children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({
    id: "target-droppable",
  });

  return (
    <div ref={setNodeRef} className="space-y-3 min-h-75">
      {children}
    </div>
  );
}

function SortableItem({
  id,
  item,
  className,
}: {
  id: string;
  item: Item;
  className?: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 rounded shadow-sm border cursor-grab touch-none ${
        className || "bg-white border-gray-200 hover:border-blue-400"
      }`}
    >
      {item.label}
    </div>
  );
}
