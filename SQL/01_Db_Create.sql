USE [master]
GO
IF db_id('back-end-capstone') IS NULL
  CREATE DATABASE [back-end-capstone]
GO

USE [back-end-capstone]
GO

DROP TABLE IF EXISTS [DailyReportSymptom];
DROP TABLE IF EXISTS [DailyReport];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Symptom];
GO


CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [FirebaseId] nvarchar(28) NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [Address] nvarchar(255) NOT NULL,
  [CreateDateTime] datetime NOT NULL
)
GO

CREATE TABLE [Symptom] (
  [Id] integer PRIMARY KEY NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [SystemId] integer NOT NULL
)
GO

CREATE TABLE [DailyReport] (
  [Id] integer PRIMARY KEY NOT NULL,
  [UserProfileId] integer NOT NULL,
  [Date] datetime NOT NULL
)
GO

CREATE TABLE [DailyReportSymptom] (
  [Id] integer PRIMARY KEY NOT NULL,
  [DailyReportId] integer NOT NULL,
  [SymptomId] integer NOT NULL,
  [Comment] nvarchar(255) NOT NULL,
  [Urgency] integer NOT NULL
)
GO

ALTER TABLE [DailyReport] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [DailyReportSymptom] ADD FOREIGN KEY ([SymptomId]) REFERENCES [Symptom] ([Id])
GO

ALTER TABLE [DailyReportSymptom] ADD FOREIGN KEY ([DailyReportId]) REFERENCES [DailyReport] ([Id])
GO