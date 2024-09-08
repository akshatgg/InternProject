import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './index.css';

function App() {
  const [textItems, setTextItems] = useState([]); // Text items to display on the screen
  const [history, setHistory] = useState([]); // History stack for undo/redo
  const [future, setFuture] = useState([]); // Future stack for redo

  // Function to add new text
  const addText = () => {
    const newText = prompt('Enter your text:');
    if (newText) {
      const newItem = {
        id: Date.now(),
        text: newText,
        position: { x: 100, y: 100 },
      };
      setHistory([...history, textItems]); // Save current state to history for undo
      setFuture([]); // Clear future on new action
      setTextItems([...textItems, newItem]);
    }
  };

  // Function to update the position of the dragged text
  const updatePosition = (e, data, id) => {
    const updatedItems = textItems.map((item) =>
      item.id === id ? { ...item, position: { x: data.x, y: data.y } } : item
    );
    setHistory([...history, textItems]); // Save current state to history for undo
    setFuture([]); // Clear future on new action
    setTextItems(updatedItems);
  };

  // Undo function
  const undo = () => {
    if (history.length === 0) return;
    const lastState = history[history.length - 1];
    setFuture([textItems, ...future]);
    setHistory(history.slice(0, -1));
    setTextItems(lastState);
  };

  // Redo function
  const redo = () => {
    if (future.length === 0) return;
    const nextState = future[0];
    setHistory([...history, textItems]);
    setFuture(future.slice(1));
    setTextItems(nextState);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      {/* Main drawing area */}
      <div className="relative border-2 border-gray-400 bg-white w-full h-full" style={{ height: '85vh' }}>
        {textItems.map((item) => (
          <Draggable
            key={item.id}
            position={item.position}
            onStop={(e, data) => updatePosition(e, data, item.id)}
          >
            <div className="absolute bg-blue-500 text-white p-2 rounded-md cursor-move">
              {item.text}
            </div>
          </Draggable>
        ))}
      </div>

      {/* Buttons for adding text, undo, redo */}
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
      </div>
    </div>
  );
}

export default App;
