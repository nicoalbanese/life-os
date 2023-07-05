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
  currentLocation: text("current_location"),
});

export type User = InferModel<typeof users>;

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

export const highlights = pgTable("highlights", {
  id: serial("id").primaryKey(),
  date: date("date").notNull().defaultNow(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  content: text("content").notNull(),
  completed: boolean("completed").default(false).notNull(),
});

export type Highlight = InferModel<typeof highlights>;

export const streaks = pgTable("streaks", {
  id: serial("id").primaryKey(),
  habitId: integer("habit_id")
    .notNull()
    .references(() => habits.id),
  firstDay: date("first_day").notNull().defaultNow(),
  lastDay: date("last_day").notNull().defaultNow(),
});

export type Streak = InferModel<typeof streaks>;
