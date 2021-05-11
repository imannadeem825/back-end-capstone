use [back-end-capstone]
GO


INSERT INTO [UserProfile] (FirebaseId, FirstName, LastName, Email, [Address], CreateDateTime)
VALUES ('hDsIMIUhlQSsEry3YjDm4R6eXtg2', 'Iman', 'Nadeem', 'iman@iman.com', '123 CodeLand USA', '20210505 12:00:00 AM');



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

UPDATE SymptomDetail 
SET Severity = 'Some pain'
WHERE Id = 1

UPDATE SymptomDetail 
SET Severity = 'Pain with infection or bleeding'
WHERE Id = 2

UPDATE SymptomDetail 
SET Severity = 'Difficulty eating and swallowing'
WHERE Id = 3

UPDATE SymptomDetail 
SET Severity = '1-2 episodes'
WHERE Id = 4

UPDATE SymptomDetail 
SET Severity = '3-5 episodes'
WHERE Id = 5

UPDATE SymptomDetail 
SET Severity = 'Over 6 episodes'
WHERE Id = 6

UPDATE SymptomDetail 
SET Severity = 'Half an hour to an hour'
WHERE Id = 7

UPDATE SymptomDetail 
SET Severity = 'One to four hours'
WHERE Id = 8

UPDATE SymptomDetail 
SET Severity = 'Most or all of the day'
WHERE Id = 9

UPDATE SymptomDetail 
SET Severity = '100.5-102.1'
WHERE Id = 10

UPDATE SymptomDetail 
SET Severity = '102.2-104.0'
WHERE Id =11

UPDATE SymptomDetail 
SET Severity = '104.1-106.0'
WHERE Id = 12

UPDATE SymptomDetail 
SET Severity = '1-4 stools'
WHERE Id = 13

UPDATE SymptomDetail 
SET Severity = '4-9 stools'
WHERE Id =14

UPDATE SymptomDetail 
SET Severity = '10 or more stools'
WHERE Id = 15

UPDATE SymptomDetail 
SET Severity = '1-3 out of 10'
WHERE Id = 16

UPDATE SymptomDetail 
SET Severity = '4-6 out of 10'
WHERE Id =17

UPDATE SymptomDetail 
SET Severity = '7-10 out of 10'
WHERE Id = 18



(13, 1, 1, 'Some pain'), (14, 1, 2, 'Pain with infection or bleeding'), (15, 1, 3, 'Difficulty eating and swallowing'),
(7, 2, 1, '1-2 episodes'), (8, 2, 2, '3-5 episodes'), (9, 2, 3, 'Over 6 episodes'),
(4, 3, 1, 'Half an hour to an hour'), (5, 3, 2, 'One to four hours'), (6, 3, 3, 'Most or all of the day'),
(10, 4, 1, '100.5-102.1'), (11, 4, 2, '102.2-104.0'), (12, 4, 3, '104.1-106.0'),
(1, 5, 1, '1-4 stools'), (2, 5, 2, '4-9 stools'), (3, 5, 3, '10 or more stools'),
(16, 6, 1, '1-3 out of 10'), (17, 6, 2, '4-6 out of 10'), (18, 6, 3, '7-10 out of 10');


INSERT INTO DailyReport (UserProfileId, [Date])
VALUES ( 1, '20210505 12:00:00 AM');

INSERT INTO DailyReportSymptom ( DailyReportId, SymptomId, Comment, Urgency)
VALUES ( 1, 1, 'comment', 2)

