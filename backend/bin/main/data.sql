INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');

INSERT INTO user_data (id, email, name, password) VALUES
  ('1', 'diana@mail.pl', 'Diana', 'password'),
  ('2', 'jakub@mail.pl', 'Jakub', 'password'),
  ('3', 'tomasz@mail.pl', 'Tomasz', 'password'),
  ('4', 'michal@mail.pl', 'Michał', 'password'),
  ('5', 'boguslaw@mail.pl', 'Bogusław', 'password'),
  ('6', 'potter@mail.pl', 'Potter', 'password'),
  ('7', 'dambledore@mail.pl', 'Dambledore', 'password'),
  ('8', 'snape@mail.pl', 'Snape', 'password'),
  ('9', 'hagrid@mail.pl', 'Hagrid', 'password'),
  ('10', 'hermione@mail.pl', 'Hermione', 'password'),
  ('11', 'ron@mail.pl', 'Ron', 'password'),
  ('12', 'neville@mail.pl', 'Neville', 'password')
  ;

INSERT INTO PROJECT (ID , NAME , DESCRIPTION , END_DATE ) VALUES
  ('1', 'Afraid to Fly', 'Quidditch: Roughly takes place during Chapter 7, consisting 4 stages', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS')),
  ('2', 'Test of Strength', 'Roughly takes place during Chapter 8, consisting 4 stages:', parsedatetime('17-09-2013 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS')),
  ('3', 'Help Hagrid!', 'Can appear before the completion of the side quest above. Roughly takes place during Chapter 6, consisting 10 stages:', parsedatetime('17-09-2014 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS')),
  ('4', 'Wizarding World Famous', 'Takes place during Chapter 7, consisting 10 stages:', parsedatetime('17-09-2015 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'))
  ;

INSERT INTO TASK (ID, NAME, CATEGORY , DESCRIPTION , END_DATE_ASSUMPTION,  STATUS, PROJECT_ID, USER_ID ) VALUES
  ('1', 'Meet Rowan', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '1', '1'),
  ('2', 'Study with Ben', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '1', '2'),
  ('3', 'Talk to Ben', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '1', '3'),
  ('4', 'Report to Angelica/Chester/Jane/Felix', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '2', '5'),
  ('5', 'Duel Ben', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '2', '5'),
  ('6', 'Study with Rowan', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '2', '6'),
  ('7', 'Talk to Hagrid (Courtyard)', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '3', '1'),
  ('8', 'Talk to Hagrid (Great Hall)', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '3', '2'),
  ('9', 'Meet with Rowan', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '3', '3'),
  ('10', 'Gather Lavender', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '3', '4'),
  ('11', 'Gather Dragon Horns', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '3', '5'),
  ('12', 'Gather Fire Seeds', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '3', '5'),
  ('13', 'Meet Hagrid (Training Grounds)', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '3', '5'),
  ('14', 'Talk to Snape', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '3', '5'),
  ('15', 'Meet Hagrid (Corridor)', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '3', '5'),
  ('16', 'Gather in the Courtyard (I)', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '4', '6'),
  ('17', 'Listen to Speaker', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '4', '7'),
  ('18', 'Gather in the Courtyard (II)', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '4', '8'),
  ('19', 'Impress Rita in Potions Class', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '4', '8'),
  ('20', 'Gather in the Training Grounds', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '4', '7'),
  ('21', 'Talk to Rita', 'task', 'taskDescripton', parsedatetime('17-09-2012 18:47:52.690', 'dd-MM-yyyy hh:mm:ss.SS'), 'ToDo', '4', '5')
  ;

INSERT INTO PROJECT_MEMBERS (ROLE , USER_ID , PROJECT_ID ) VALUES
  ('MEMBER', '1', '1'),
  ('MEMBER', '2', '1'),
  ('MEMBER', '3', '1'),
  ('MEMBER', '4', '1'),
  ('MEMBER', '5', '1'),
  ('MEMBER', '1', '2'),
  ('MEMBER', '2', '2'),
  ('MEMBER', '3', '2'),
  ('MEMBER', '4', '2'),
  ('MEMBER', '5', '2'),
  ('MEMBER', '6', '2'),
  ('MEMBER', '7', '2'),
  ('MEMBER', '8', '2'),
  ('MEMBER', '1', '3'),
  ('MEMBER', '2', '3'),
  ('MEMBER', '3', '3'),
  ('MEMBER', '4', '3'),
  ('MEMBER', '5', '3'),
  ('MEMBER', '6', '3'),
  ('MEMBER', '7', '3'),
  ('MEMBER', '8', '3'),
  ('MEMBER', '1', '4'),
  ('MEMBER', '2', '4'),
  ('MEMBER', '3', '4'),
  ('MEMBER', '4', '4'),
  ('MEMBER', '5', '4'),
  ('MEMBER', '6', '4'),
  ('MEMBER', '7', '4'),
  ('MEMBER', '8', '4')
;

INSERT INTO RATE (ID , RATE , PROJECT_ID, RATED_USER_ID, RATING_USER_ID) VALUES
  ('1', '10', '1', '1', '2'),
  ('2', '10', '1', '1', '3'),
  ('3', '10', '1', '1', '4'),
  ('4', '4', '1', '1', '5'),
  ('5', '10', '1', '4', '2'),
  ('6', '10', '1', '5', '2'),
  ('7', '3', '2', '6', '2'),
  ('8', '10', '2', '7', '2'),
  ('9', '2', '2', '8', '2'),
  ('10', '10', '2', '9', '2'),
  ('11', '4', '2', '2', '3'),
  ('12', '5', '3', '3', '2'),
  ('13', '5', '3', '4', '2'),
  ('14', '5', '3', '5', '2')
;