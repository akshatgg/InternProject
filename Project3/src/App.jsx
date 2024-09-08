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
        isBold: false,
        isItalic: false,
        isUnderline: false,
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

  const toggleBold = () => {
    if (selectedId === null) return;
    const updatedItems = textItems.map((item) =>
      item.id === selectedId ? { ...item, isBold: !item.isBold } : item
    );
    setTextItems(updatedItems);
  };

  const toggleItalic = () => {
    if (selectedId === null) return;
    const updatedItems = textItems.map((item) =>
      item.id === selectedId ? { ...item, isItalic: !item.isItalic } : item
    );
    setTextItems(updatedItems);
  };

  const toggleUnderline = () => {
    if (selectedId === null) return;
    const updatedItems = textItems.map((item) =>
      item.id === selectedId ? { ...item, isUnderline: !item.isUnderline } : item
    );
    setTextItems(updatedItems);
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const getStyle = (item) => {
    let style = {};
    if (item.isBold) style.fontWeight = 'bold';
    if (item.isItalic) style.fontStyle = 'italic';
    if (item.isUnderline) style.textDecoration = 'underline';
    style.fontFamily = fontStyles[item.id];
    return style;
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
              style={getStyle(item)}
              onClick={() => handleSelect(item.id)}
            >
              {item.text}
            </div>
          </Draggable>
        ))}
      </div>
      <div className="w-full flex justify-center bg-gray-300 py-4 space-x-4">
        <button
          onClick={addText}
          className="bg-black text-white px-2 py-1 rounded-md text-sm hover:bg-slate-700"
        >
          Add Text
        </button>
        <button
          onClick={undo}
          disabled={history.length === 0}
          className={`px-2 py-1 rounded-md  hover:bg-slate-700 text-sm ${history.length === 0 ? 'bg-gray-400' : 'bg-black text-white'}`}
        >
          Undo
        </button>
        <button
          onClick={redo}
          disabled={future.length === 0}
          className={`px-2 py-1 rounded-md  hover:bg-slate-700 text-sm ${future.length === 0 ? 'bg-gray-400' : 'bg-black text-white'}`}
        >
          Redo
        </button>
        <button
          onClick={selectFont}
          disabled={selectedId === null}
          className={`px-2 py-1 rounded-md  hover:bg-slate-700 text-sm ${selectedId === null ? 'bg-gray-400' : 'bg-black text-white'}`}
        >
          Change Font
        </button>
      </div>
      <div className="w-full flex justify-center  bg-gray-300 py-4 space-x-4">
        <button
          onClick={toggleBold}
          disabled={selectedId === null}
          className={`px-2 py-1 rounded-md  hover:bg-slate-700 text-sm ${selectedId === null ? 'bg-gray-400' : 'bg-black text-white'}`}
        >
          Bold
        </button>
        <button
          onClick={toggleItalic}
          disabled={selectedId === null}
          className={`px-2 py-1 rounded-md  hover:bg-slate-700 text-sm ${selectedId === null ? 'bg-gray-400' : 'bg-black text-white'}`}
        >
          Italic
        </button>
        <button
          onClick={toggleUnderline}
          disabled={selectedId === null}
          className={`px-2 py-1 rounded-md  hover:bg-slate-700 text-sm ${selectedId === null ? 'bg-gray-400' : 'bg-black text-white'}`}
        >
          Underline
        </button>
      </div>
    </div>
  );
}

export default App;
