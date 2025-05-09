// src/services/Database.js
import SQLite from 'react-native-sqlite-storage';

// Bật gỡ lỗi SQL trong console (hữu ích khi phát triển)
SQLite.DEBUG(true);
// Kích hoạt hỗ trợ Promise cho các thao tác DB (RẤT QUAN TRỌNG)
SQLite.enablePromise(true);

const DATABASE_NAME = 'StudyScheduleApp.db';
const DATABASE_LOCATION = 'default'; // Hoặc 'Library'/'Documents' cho iOS nếu cần

let db; // Biến toàn cục để giữ đối tượng database

/**
 * Mở hoặc tạo cơ sở dữ liệu.
 * @returns {Promise<SQLite.SQLiteDatabase>} Đối tượng database.
 */
export const getDBConnection = async () => {
  if (db) return db;
  try {
    db = await SQLite.openDatabase({ name: DATABASE_NAME, location: DATABASE_LOCATION });
    console.log('Cơ sở dữ liệu đã được mở/tạo thành công!');
    return db;
  } catch (error) {
    console.error('Lỗi mở cơ sở dữ liệu: ', error);
    throw error;
  }
};

/**
 * Đóng kết nối database.
 */
export const closeDBConnection = async () => {
  if (db) {
    try {
      await db.close();
      console.log('Đã đóng kết nối đến database.');
      db = null;
    } catch (error) {
      console.error('Lỗi đóng database: ', error);
      throw error;
    }
  }
};

/**
 * Xoá file database (chỉ dùng cho môi trường dev/test).
 */
export const deleteDatabase = async () => {
  try {
    await SQLite.deleteDatabase({ name: DATABASE_NAME, location: DATABASE_LOCATION });
    console.log('Đã xoá database thành công.');
    db = null;
  } catch (error) {
    console.error('Lỗi xoá database: ', error);
    throw error;
  }
};

/**
 * Tạo các bảng cần thiết nếu chúng chưa tồn tại.
 * @param {SQLite.SQLiteDatabase} dbInstance - Đối tượng database.
 */
export const createTables = async (dbInstance) => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS Events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT,
      location TEXT,
      type TEXT,
      notes TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS Notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      created_date TEXT NOT NULL
    );`,
  ];

  try {
    await dbInstance.transaction(async (tx) => {
      for (const query of queries) await tx.executeSql(query);
    });
    console.log('Tất cả các bảng đã được tạo thành công (hoặc đã tồn tại).');
  } catch (error) {
    console.error('Lỗi tạo bảng: ', error);
    throw error;
  }
};

/**
 * Chèn dữ liệu mẫu vào các bảng (chạy một lần hoặc khi phát triển).
 * @param {SQLite.SQLiteDatabase} dbInstance - Đối tượng database.
 */
export const insertSampleData = async (dbInstance) => {
  try {
    await dbInstance.transaction(async (tx) => {
      // Events
      const [resE] = await tx.executeSql('SELECT COUNT(*) as count FROM Events');
      if (resE.rows.item(0).count === 0) {
        await tx.executeSql(
          `INSERT INTO Events (title, date, time, location, type, notes)
           VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?);`,
          [
            'Lịch ôn tập môn Thuật toán', '2025-05-15', '10:00', 'Phòng họp 101', 'Công việc', 'Chuẩn bị slide thuyết trình.',
            'Nộp báo cáo môn Cấu trúc dữ liệu', '2025-05-20', '14:30', 'Bệnh viện ABC', 'Cá nhân', 'Nhớ mang kết quả xét nghiệm.'
          ]
        );
      }

      // Notes
      const [resN] = await tx.executeSql('SELECT COUNT(*) as count FROM Notes');
      if (resN.rows.item(0).count === 0) {
        await tx.executeSql(
          `INSERT INTO Notes (content, created_date)
           VALUES (?, ?), (?, ?);`,
          [
            'Chuẩn bị đề cương cho bài thuyết trình môn Lập trình di động', '2025-05-10 09:30:00',
            'Danh sách thuật toán cần ôn: Dijkstra, Floyd, BFS/DFS', '2025-05-09 15:45:12'
          ]
        );
      }
    });
    console.log('Chèn dữ liệu mẫu hoàn tất.');
  } catch (error) {
    console.error('Lỗi chèn dữ liệu mẫu: ', error);
    throw error;
  }
};

/**
 * Khởi tạo database: mở kết nối, tạo bảng, và chèn mẫu.
 */
export const initializeDatabase = async () => {
  try {
    const dbInstance = await getDBConnection();
    await createTables(dbInstance);
    await insertSampleData(dbInstance);
    console.log('Khởi tạo cơ sở dữ liệu hoàn tất.');
    return dbInstance;
  } catch (error) {
    console.error('Lỗi khởi tạo DB: ', error);
  }
};

// ===== CRUD cho Events =====
/** Lấy tất cả sự kiện */
export const getAllEvents = async (dbInstance) => {
  try {
    const events = [];
    const [results] = await dbInstance.executeSql('SELECT * FROM Events ORDER BY date, time;');
    results.rows.raw().forEach(row => events.push(row));
    return events;
  } catch (error) {
    console.error('Lỗi lấy tất cả sự kiện:', error);
    throw error;
  }
};

/** Lấy 1 sự kiện theo ID */
export const getEventById = async (dbInstance, id) => {
  try {
    const [results] = await dbInstance.executeSql('SELECT * FROM Events WHERE id = ?;', [id]);
    return results.rows.length > 0 ? results.rows.item(0) : null;
  } catch (error) {
    console.error('Lỗi lấy sự kiện theo ID:', error);
    throw error;
  }
};

/** Thêm sự kiện mới */
export const addEvent = async (dbInstance, { title, date, time, location, type, notes }) => {
  try {
    const [result] = await dbInstance.executeSql(
      `INSERT INTO Events (title, date, time, location, type, notes) VALUES (?, ?, ?, ?, ?, ?);`,
      [title, date, time, location, type, notes]
    );
    return result.insertId;
  } catch (error) {
    console.error('Lỗi thêm sự kiện:', error);
    throw error;
  }
};

/** Cập nhật sự kiện */
export const updateEvent = async (dbInstance, { id, title, date, time, location, type, notes }) => {
  try {
    await dbInstance.executeSql(
      `UPDATE Events SET title = ?, date = ?, time = ?, location = ?, type = ?, notes = ? WHERE id = ?;`,
      [title, date, time, location, type, notes, id]
    );
  } catch (error) {
    console.error('Lỗi cập nhật sự kiện:', error);
    throw error;
  }
};

/** Xoá sự kiện */
export const deleteEvent = async (dbInstance, id) => {
  try {
    await dbInstance.executeSql('DELETE FROM Events WHERE id = ?;', [id]);
  } catch (error) {
    console.error('Lỗi xoá sự kiện:', error);
    throw error;
  }
};

// ===== CRUD cho Notes =====
/** Lấy tất cả ghi chú */
export const getAllNotes = async (dbInstance) => {
  try {
    const notes = [];
    const [results] = await dbInstance.executeSql('SELECT * FROM Notes ORDER BY created_date DESC;');
    results.rows.raw().forEach(row => notes.push(row));
    return notes;
  } catch (error) {
    console.error('Lỗi lấy ghi chú:', error);
    throw error;
  }
};

/** Lấy 1 ghi chú theo ID */
export const getNoteById = async (dbInstance, id) => {
  try {
    const [results] = await dbInstance.executeSql('SELECT * FROM Notes WHERE id = ?;', [id]);
    return results.rows.length > 0 ? results.rows.item(0) : null;
  } catch (error) {
    console.error('Lỗi lấy ghi chú theo ID:', error);
    throw error;
  }
};

/** Thêm ghi chú */
export const addNote = async (dbInstance, { content, created_date }) => {
  try {
    const [result] = await dbInstance.executeSql(
      `INSERT INTO Notes (content, created_date) VALUES (?, ?);`,
      [content, created_date]
    );
    return result.insertId;
  } catch (error) {
    console.error('Lỗi thêm ghi chú:', error);
    throw error;
  }
};

/** Cập nhật ghi chú */
export const updateNote = async (dbInstance, { id, content, created_date }) => {
  try {
    await dbInstance.executeSql(
      `UPDATE Notes SET content = ?, created_date = ? WHERE id = ?;`,
      [content, created_date, id]
    );
  } catch (error) {
    console.error('Lỗi cập nhật ghi chú:', error);
    throw error;
  }
};

/** Xoá ghi chú */
export const deleteNote = async (dbInstance, id) => {
  try {
    await dbInstance.executeSql('DELETE FROM Notes WHERE id = ?;', [id]);
  } catch (error) {
    console.error('Lỗi xoá ghi chú:', error);
    throw error;
  }
};
