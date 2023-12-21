// https://dev.to/franciscomendes10866/getting-started-with-drizzle-orm-a-beginners-tutorial-4782
// https://orm.drizzle.team/docs/migrations/#declare-your-schema
// https://github.com/drizzle-team/drizzle-orm/blob/main/examples/cloudflare-d1/src/schema.ts
// https://orm.drizzle.team/docs/indexes-constraints/#foreign-key
// https://orm.drizzle.team/docs/rqb/#one-to-many
import { relations, sql } from "drizzle-orm";
import { AnySQLiteColumn, index, integer, primaryKey, real, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
    hashtags: many(hashtags),
    expenses: many(expenses),
}));
  
export const hashtags = sqliteTable("hashtags", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
    parentId: integer("parent_id").references((): AnySQLiteColumn => hashtags.id, { onDelete: "set null" }),
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
}, (hashtags) => ({
    parentIdx: index("parent_idx").on(hashtags.parentId, hashtags.userId),
    nameIdx: index("name_idx").on(hashtags.name, hashtags.userId),
    nameUniqueConstraint: unique("name_unique_constraint").on(
        hashtags.name,
        hashtags.userId
      ),
}));

export const hashtagsRelations = relations(hashtags, ({ one, many }) => ({
    users: one(users, {
      fields: [hashtags.userId],
      references: [users.id],
    }),
    expensesToHashtags: many(expensesToHashtags),
}));

export const expenses = sqliteTable("expenses", {
    id: integer("id").primaryKey({autoIncrement: true}),
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    messageId: integer("message_id").notNull(),
    amount: real("amount").notNull(),
    description: text("description"),
    date: text("date").default(sql`CURRENT_DATE`),     
}, (expenses) => ({
    dateIdx: index("date_idx").on(expenses.date, expenses.userId),        
}));

export const expensesRelations = relations(expenses, ({ one, many }) => ({
    users: one(users, {
        fields: [expenses.userId],
        references: [users.id],
    }),
    expensesToHashtags: many(expensesToHashtags),
}));

export const expensesToHashtags = sqliteTable("expenses_to_hashtags", {
    expenseId: integer("expense_id").notNull().references(() => expenses.id, { onDelete: "cascade" }),
    hashtagId: integer("hashtag_id").notNull().references(() => hashtags.id, { onDelete: "cascade" }),
  }, (expensesToHashtags) => ({
    pk: primaryKey({columns: [expensesToHashtags.expenseId, expensesToHashtags.hashtagId]}),
  }),
);

export const expensesToHashtagsRelations = relations(expensesToHashtags, ({ one }) => ({
    expenses: one(expenses, {
        fields: [expensesToHashtags.expenseId],
        references: [expenses.id],
    }),
    hashtags: one(hashtags, {
        fields: [expensesToHashtags.hashtagId],
        references: [hashtags.id],
    }),
}));