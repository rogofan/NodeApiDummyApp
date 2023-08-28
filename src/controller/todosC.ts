import { RequestHandler } from "express";
import { Todo } from "../models/todosM";

const TODOS: Todo[] = [];

//Add new todo POST
export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res
    .status(201)
    .json({ message: "Todo successfully created :)", createTodo: newTodo });
};

//get data
export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ message: "Here is your todos:)", todos: TODOS });
};

//Patch/update
export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Todo not found!");
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.json({ message: "Todo updated!", updatedTodo: TODOS[todoIndex] });
};

// Delete a todo by its ID
export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Todo not found!");
  }

  const deletedTodo = TODOS.splice(todoIndex, 1);

  res.json({ message: "Todo deleted!", todo: deletedTodo[0] });
};
