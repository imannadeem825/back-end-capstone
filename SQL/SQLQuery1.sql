use [back-end-capstone]
GO


INSERT INTO [UserProfile] (FirebaseId, FirstName, LastName, Email, [Address], CreateDateTime)
VALUES ('hDsIMIUhlQSsEry3YjDm4R6eXtg2', 'Iman', 'Nadeem', 'iman@iman.com', '123 CodeLand USA', '20210505 12:00:00 AM');


ALTER TABLE Symptom
DROP COLUMN SystemId;


INSERT INTO Symptom ([Name])
VALUES ('Mouth Sores')

INSERT INTO Symptom ([Name])
VALUES ('Vomiting')

INSERT INTO Symptom ([Name])
VALUES ('Nausea')

INSERT INTO Symptom ([Name])
VALUES ('Fever')

INSERT INTO Symptom ([Name])
VALUES ('Diarrhea')

INSERT INTO Symptom ([Name])
VALUES ('Pain')

ALTER TABLE SymptomDetail
ALTER COLUMN Severity nvarchar(255);


INSERT INTO SymptomDetail (Id, SymptomId, UrgencyLevel, Severity)
VALUES (1, 1, 1, '1-4 stools'), (2, 1, 2, '4-9 stools'), (3, 1, 3, '10 or more stools'),
(4, 2, 1, 'Half an hour to an hour'), (5, 2, 2, 'One to four hours'), (6, 2, 3, 'Most or all of the day'),
(7, 3, 1, '1-2 episodes'), (8, 3, 2, '3-5 episodes'), (9, 3, 3, 'Over 6 episodes'),
(10, 4, 1, '100.5-102.1'), (11, 4, 2, '102.2-104.0'), (12, 4, 3, '104.1-106.0'),
(13, 5, 1, 'Some pain'), (14, 5, 2, 'Pain with infection or bleeding'), (15, 5, 3, 'Difficulty eating and swallowing'),
(16, 6, 1, '1-3 out of 10'), (17, 6, 2, '4-6 out of 10'), (18, 6, 3, '7-10 out of 10');



SELECT s.Id AS SymptomId, s.Name,
                              sd.Id AS SymptomDetailId, sd.SymptomId AS ForeignKeySymptomId, sd.UrgencyLevel, sd.Severity
                         FROM Symptom s
                         LEFT JOIN SymptomDetail sd on s.Id = sd.SymptomId


INSERT INTO DailyReport (Id, UserProfileId, [Date])
VALUES (1, 1, '20210505 12:00:00 AM');

INSERT INTO DailyReportSymptom (Id, DailyReportId, SymptomId, Comment, Urgency)
VALUES (1, 1, 1, 'comment', 2)

