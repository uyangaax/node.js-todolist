"use client";

import { useState } from "react";

export function TodoList() {
  // ajluudiig arrayd hadgalna
  const [todos, setTodos] = useState([]);
  // utga orj irne
  const [input, setInput] = useState("");
  // shine ajil nemeh
  const [filter, setFilter] = useState("all");
  function addTodo() {
    // yuch bicheegui bol butsaana
    if (input.trim() === "") return;

    const newTodo = {
      // datenow() shuud bichsen ued ni id uusgedeg
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    // umnuh baigaa ajil deeree shiniig nemj baigaa
    setTodos([...todos, newTodo]);
    // shine ajil nemegdsnii daraa hoosoldog
    setInput("");
  }
  // hiisen hiigeeguig ylgah
  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        // checkbox darah ued hiigeegui aljiig esergeer ni solih ugui bol todo haruulna
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }
  // ustgah
  function deleteTodo(id) {
    // esergeer ni ustgah gej baigaa id tai tenstuu bish ajluudig uldeene
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;

  const filters = [
    { key: "all", label: "Бүгд" },
    { key: "active", label: "Идэвхтэй" },
    { key: "completed", label: "Дууссан" },
  ];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl text-black font-bold mb-6 text-center">
        ✅ Хийх ажил
      </h1>

      <div className="flex gap-2 mb-5">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
          placeholder="Шинэ ажил бичих..."
          className="border p-3 rounded-lg text-black flex-1 min-w-0"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-gray-white px-4 rounded-lg hover:bg-blue-600"
        >
          Нэмэх
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1 rounded-lg border ${
              filter === f.key
                ? "bg-blue-500 text-whte border-blue-500"
                : "bg-white text-gray-600"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 border p-3 rounded-lg"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              className={`flex-1 text-gray-600 break-words ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-gray-500 text-center">
        Нийт: {todos.length} · Дууссан: {completedCount}
      </p>
    </div>
  );
}
