CREATE TABLE `expenses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`message_id` integer NOT NULL,
	`amount` real NOT NULL,
	`description` text,
	`date` text DEFAULT CURRENT_DATE,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `expenses_to_hashtags` (
	`expense_id` integer NOT NULL,
	`hashtag_id` integer NOT NULL,
	PRIMARY KEY(`expense_id`, `hashtag_id`),
	FOREIGN KEY (`expense_id`) REFERENCES `expenses`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`hashtag_id`) REFERENCES `hashtags`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `hashtags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`parent_id` integer,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`parent_id`) REFERENCES `hashtags`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `date_idx` ON `expenses` (`date`,`user_id`);--> statement-breakpoint
CREATE INDEX `parent_idx` ON `hashtags` (`parent_id`,`user_id`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `hashtags` (`name`,`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `name_unique_constraint` ON `hashtags` (`name`,`user_id`);