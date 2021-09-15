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





INSERT INTO DailyReport (UserProfileId, [Date])
VALUES ( 1, '20210505 12:00:00 AM');

INSERT INTO DailyReportSymptom ( DailyReportId, SymptomId, Comment, Urgency)
VALUES ( 1, 1, 'comment', 2)

 SELECT d.Id AS DailyReportSymptomId, d.DailyReportId, d.SymptomId AS ForeignKeySymptomId, d.Comment, d.Urgency,
                        s.Id AS SymptomId, s.Name
                        FROM DailyReportSymptom d
                        LEFT JOIN Symptom s ON s.Id = d.SymptomId;


SELECT dr.Id, dr.UserProfileId, dr.[Date],
        drs.Id AS drsId, drs.DailyReportId, drs.SymptomId AS drsSymptomId, drs.Comment, drs.Urgency,
        s.Id as SymptomId, s.[Name],
        sd.Id as SymptomDetailId, sd.SymptomId AS SymptomDetailSymptomId, sd.UrgencyLevel, sd.Severity
                      
                        FROM DailyReport dr
                        LEFT JOIN DailyReportSymptom drs ON dr.Id = drs.DailyReportId

                        LEFT JOIN Symptom s ON drs.SymptomId = s.Id
                        LEFT JOIN SymptomDetail sd ON s.Id = sd.SymptomId
                        WHERE dr.Id = 59;



SELECT drs.Id, drs.DailyReportId, drs.SymptomId, drs.Comment, drs.Urgency,
                        s.Name
                        FROM DailyReportSymptom drs
                        LEFT JOIN Symptom s ON s.Id = drs.SymptomId
                        WHERE drs.Id = 82;