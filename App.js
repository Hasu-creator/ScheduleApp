// App.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { initializeDatabase, getAllEvents, getAllNotes, addEvent, addNote } from './src/services/Database'; // Đường dẫn tới file Database.js

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dbInstance, setDbInstance] = useState(null);
  const [events, setEvents] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const initDB = async () => {
      try {
        const db = await initializeDatabase(); // Khởi tạo DB và nhận lại instance
        setDbInstance(db); // Lưu instance để sử dụng cho các thao tác khác
        
        // Sau khi DB sẵn sàng, có thể tải dữ liệu ban đầu
        if (db) {
          const currentEvents = await getAllEvents(db);
          setEvents(currentEvents);

          const currentNotes = await getAllNotes(db);
          setNotes(currentNotes);
        }

      } catch (error) {
        console.error("Lỗi nghiêm trọng khi khởi tạo ứng dụng:", error);
        // Hiển thị thông báo lỗi cho người dùng nếu cần
      } finally {
        setIsLoading(false);
      }
    };

    initDB();
  }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy một lần khi component mount

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Đang khởi tạo dữ liệu...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sự kiện ({events.length})</Text>
        <FlatList
          data={events}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.title} ({item.date} {item.time || ''})</Text>
              <Text>{item.location}</Text>
              <Text>{item.notes}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>Không có sự kiện nào.</Text>}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ghi chú ({notes.length})</Text>
        <FlatList
          data={notes}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>ID: {item.id} (Ngày tạo: {item.created_date})</Text>
              <Text>{item.content}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>Không có ghi chú nào.</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
