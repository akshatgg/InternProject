import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './index.css';

function App() {
  const [textItems, setTextItems] = useState([]); 
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [fontStyles, setFontStyles] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  const addText = () => {
    const newText = prompt('Enter your text:');
    if (newText) {
      const newItem = {
        id: Date.now(),
        text: newText,
        position: { x: 100, y: 100 },
        font: 'Arial',
      };
      setHistory([...history, textItems]);
      setFuture([]);
      setTextItems([...textItems, newItem]);
      setFontStyles({
        ...fontStyles,
        [newItem.id]: newItem.font,
      });
    }
  };

  const updatePosition = (e, data, id) => {
    const updatedItems = textItems.map((item) =>
      item.id === id ? { ...item, position: { x: data.x, y: data.y } } : item
    );
    setHistory([...history, textItems]);
    setFuture([]);
    setTextItems(updatedItems);
  };

  const undo = () => {
    if (history.length === 0) return;
    const lastState = history[history.length - 1];
    setFuture([textItems, ...future]);
    setHistory(history.slice(0, -1));
    setTextItems(lastState);
  };

  const redo = () => {
    if (future.length === 0) return;
    const nextState = future[0];
    setHistory([...history, textItems]);
    setFuture(future.slice(1));
    setTextItems(nextState);
  };

  const selectFont = () => {
    if (selectedId === null) return;
    const newFont = prompt('Enter the font family (e.g., Arial, Times New Roman):');
    if (newFont) {
      setFontStyles({
        ...fontStyles,
        [selectedId]: newFont,
      });
    }
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      <div className="relative border-2 w-full h-full" style={{ height: '85vh' }}>
        {textItems.map((item) => (
          <Draggable
            key={item.id}
            position={item.position}
            onStop={(e, data) => updatePosition(e, data, item.id)}
          >
            <div
              className="absolute p-2 rounded-md cursor-move"
              style={{ fontFamily: fontStyles[item.id] }}
              onClick={() => handleSelect(item.id)}
            >
              {item.text}
            </div>
          </Draggable>
        ))}
      </div>
      <div className="w-full flex justify-center bg-gray-200 py-4 space-x-4">
        <button
          onClick={addText}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Text
        </button>
        <button
          onClick={undo}
          disabled={history.length === 0}
          className={`px-4 py-2 rounded-md ${history.length === 0 ? 'bg-gray-400' : 'bg-red-500 text-white'}`}
        >
          Undo
        </button>
        <button
          onClick={redo}
          disabled={future.length === 0}
          className={`px-4 py-2 rounded-md ${future.length === 0 ? 'bg-gray-400' : 'bg-green-500 text-white'}`}
        >
          Redo
        </button>
        <button
          onClick={selectFont}
          disabled={selectedId === null}
          className={`px-4 py-2 rounded-md ${selectedId === null ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
        >
          Change Font
        </button>
      </div>
    </div>
  );
}

export default App;
