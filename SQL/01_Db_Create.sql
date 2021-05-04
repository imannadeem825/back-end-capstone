USE [master]
GO
IF db_id('BackEndCapstone') IS NULL
  CREATE DATABASE [back-end-capstone]
GO



DROP TABLE IF EXISTS [Symptom];
DROP TABLE IF EXISTS [DailyReport];
DROP TABLE IF EXISTS [DailyReportSymptoms];
DROP TABLE IF EXISTS [User];



CREATE TABLE [User] (
  [Id] integer PRIMARY KEY NOT NULL,
  [FirebaseId] nvarchar NOT NULL,
  [FirstName] nvarchar NOT NULL,
  [LastName] nvarchar NOT NULL,
  [Email] nvarchar NOT NULL,
  [Address] nvarchar NOT NULL,
  [CreateDateTime] datetime NOT NULL
)
GO

CREATE TABLE [Symptom] (
  [Id] integer PRIMARY KEY NOT NULL,
  [Name] nvarchar NOT NULL,
  [SystemId] integer NOT NULL
)
GO

CREATE TABLE [DailyReport] (
  [Id] integer PRIMARY KEY NOT NULL,
  [UserId] integer NOT NULL,
  [Date] datetime NOT NULL,
  [Comment] nvarchar NOT NULL
)
GO

CREATE TABLE [DailyReportSymptom] (
  [Id] integer PRIMARY KEY NOT NULL,
  [DailyReportId] integer NOT NULL,
  [SymptomId] integer NOT NULL,
  [Comment] nvarchar NOT NULL,
  [Urgency] integer NOT NULL
)
GO

ALTER TABLE [DailyReport] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [DailyReportSymptom] ADD FOREIGN KEY ([SymptomId]) REFERENCES [Symptom] ([Id])
GO

ALTER TABLE [DailyReportSymptom] ADD FOREIGN KEY ([DailyReportId]) REFERENCES [DailyReport] ([Id])
GO