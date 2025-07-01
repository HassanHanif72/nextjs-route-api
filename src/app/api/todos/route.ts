import { NextRequest, NextResponse } from "next/server";

type iTodos = {
  id: number;
  todo: string;
  isCompleted: boolean;
};

let todoId = 1;
const todos: iTodos[] = [];

// GET
export async function GET() {
  return NextResponse.json(todos); 
}

// POST
export async function POST(request: NextRequest) {
  const { todo, isCompleted } = await request.json(); 
  try {
    todos.push({
      id: todoId++,
      todo: todo, 
      isCompleted: isCompleted, 
    });

    return NextResponse.json({
      status: "Success",
      message: "Todo Added Successfully",
      data: todos,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: "Failed",
      message: "Todo Not Added",
    });
  }
}

// DELETE
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url); 
  const id = parseInt(searchParams.get("id") || "", 10);

  if (isNaN(id)) {
    return NextResponse.json({
      status: "Failed",
      message: "Invalid ID", 
    });
  }

  const index = todos.findIndex((todo) => todo.id === id); 

  if (index === -1) {
    return NextResponse.json({
      status: "Failed",
      message: "Todo not found", 
    });
  }

  todos.splice(index, 1); 

  return NextResponse.json({
    status: "Success",
    message: `Todo with ID ${id} deleted successfully`,
    data: todos,
  });
}

// PUT
export async function PUT(request: NextRequest) {
  const { id, todo, isCompleted } = await request.json(); 
  const index = todos.findIndex((t) => t.id === id); 

  if (index === -1) {
    return NextResponse.json({
      status: "Failed",
      message: "Todo not found",
    });
  }

  todos[index] = { ...todos[index], todo, isCompleted }; 

  return NextResponse.json({
    status: "Success",
    message: "Todo updated successfully",
    data: todos,
  });
}
