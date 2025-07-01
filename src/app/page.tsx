"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Todo = {
  id: number;
  todo: string;
  isCompleted: boolean;
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  // Fetch todos from API
  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add Todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;

    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({
        todo: newTodo,
        isCompleted: false,
      }),
    });

    setNewTodo("");
    fetchTodos();
  };

  // Delete Todo
  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos?id=${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  };

  // Update Todo
  const updateTodo = async () => {
    if (!editTodo?.todo.trim()) return;

    await fetch("/api/todos", {
      method: "PUT",
      body: JSON.stringify({
        id: editTodo.id,
        todo: editTodo.todo,
        isCompleted: editTodo.isCompleted,
      }),
    });

    setEditTodo(null);
    fetchTodos();
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editTodo) {
      setEditTodo({ ...editTodo, todo: e.target.value });
    }
  };

  return (
    <div className="max-w-2xl m-auto p-8">
      <h1 className="text-center mb-4 text-2xl font-bold">Todo App</h1>

      <div className="mb-4">
        <Label htmlFor="newTodo" className="mb-3">
          Add a New Todo
        </Label>
        <Input
          id="newTodo"
          placeholder="Enter a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button onClick={addTodo} className="mt-2">
          Add Todo
        </Button>
      </div>

      {editTodo && (
        <div className="mb-4">
          <Label htmlFor="editTodo" className="mb-3">Edit Todo</Label>
          <Input
            id="editTodo"
            value={editTodo.todo}
            onChange={handleEditChange}
            className="mb-2"
          />
          <Button onClick={updateTodo} className="mt-2">
            Update Todo
          </Button>
        </div>
      )}

      {todos.length > 0 && (
        <Table className="w-full mt-4 text-center">
          <TableHeader>
            <TableRow>
              <TableCell className="font-bold">Todo</TableCell>
              <TableCell className="font-bold">Completed</TableCell>
              <TableCell className="font-bold">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.todo}</TableCell>
                <TableCell>
                  <Input
                    className="w-auto m-auto"
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => {
                      setTodos((prevTodos) =>
                        prevTodos.map((t) =>
                          t.id === todo.id
                            ? { ...t, isCompleted: !t.isCompleted }
                            : t
                        )
                      );
                    }}
                  />
                </TableCell>
                <TableCell className="flex gap-3 justify-center">
                  <Button
                    onClick={() => setEditTodo(todo)}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
