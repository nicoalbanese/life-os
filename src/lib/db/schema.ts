import { InferModel } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  password: text("password").notNull(),
});

export const habits = pgTable("habits", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  active: boolean("active").default(true),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});
export type Habit = InferModel<typeof habits>;

export const completions = pgTable("completions", {
  id: serial("id").primaryKey(),
  time: timestamp("time").notNull().defaultNow(),
  date: date("date").notNull().defaultNow(),
  habitId: integer("habit_id")
    .notNull()
    .references(() => habits.id),
});
export type Completion = InferModel<typeof completions>;
