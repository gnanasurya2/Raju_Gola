import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("data.db");

const queryHelper = (query, args) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        args,
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const init = () =>
  queryHelper(
    "CREATE TABLE IF NOT EXISTS course (id INTEGER PRIMARY KEY NOT NULL,type TEXT NOT NULL,title TEXT NOT NULL,courseId INTEGER NOT NULL,percentageCompleted INTEGER NOT NULL)",
    []
  );
export const contentInit = () =>
  queryHelper(
    "CREATE TABLE IF NOT EXISTS content (id INTEGER PRIMARY KEY NOT NULL,courseId INTEGER NOT NULL,videoId INTEGER NOT NULL,name INTEGER NOT NULL,timeRemaining INTEGER,completed INTEGER NOT NULL)",
    []
  );
export const webinarInit = () =>
  queryHelper(
    "CREATE TABLE IF NOT EXISTS webinar (id INTEGER PRIMARY KEY NOT NULL,courseId INTEGER NOT NULL,data TEXT NOT NULL,time INTEGER NOT NULL,date TEXT NOT NULL,description TEXT NOT NULL, url TEXT NOT NULL)"
  );

export const addWebinar = (courseId, data, time, date, description, url) =>
  queryHelper(
    "INSERT INTO webinar (courseId,data,time,date,description,url) VALUES(?,?,?,?,?,?)",
    [courseId, data, time, date, description, url]
  );
export const fetchWebinar = (id) =>
  queryHelper(`SELECT * FROM webinar WHERE courseId = ${id} `, []);

export const blogInit = () =>
  queryHelper(
    "CREATE TABLE IF NOT EXISTS blog (id INTEGER PRIMARY KEY NOT NULL,courseId INTEGER NOT NULL,title TEXT NOT NULL,data TEXT NOT NULL)",
    []
  );

export const addCourse = (type, title, courseId) =>
  queryHelper(
    "INSERT INTO course (type,title,courseId,percentageCompleted) VALUES(?,?,?,?)",
    [type, title, courseId, 0]
  );

export const FetchCourse = () => queryHelper("SELECT * FROM course", []);

export const FetchContent = (courseId) =>
  queryHelper(`SELECT * FROM content where courseId = ${courseId} `, []);

export const AddContent = (courseId, videoId, name, timeRemaining, completed) =>
  queryHelper(
    "INSERT INTO content (courseId,videoId,name,timeRemaining,completed) VALUES(?,?,?,?,?)",
    [courseId, videoId, name, timeRemaining, completed]
  );
export const updateCourse = (percentage, id) =>
  queryHelper(
    `UPDATE course SET percentageCompleted = ${percentage} WHERE courseId = ${id}`
  );
export const updateContent = (id, timeRemaining, completed) =>
  queryHelper(
    `UPDATE content SET timeRemaining = ${timeRemaining},completed = ${completed} WHERE id = ${id}`
  );

export const dropTable = (name) => queryHelper(`DROP TABLE ${name}`, []);

export const addBlog = (courseId, title, data) =>
  queryHelper(`INSERT INTO blog (courseId,title,data) VALUES(?,?,?)`, [
    courseId,
    title,
    data,
  ]);
