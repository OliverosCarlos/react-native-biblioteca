import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, StyleSheet, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { BookModal } from '@/components/Modal'
import { Card } from '@/components/Card'

import { getBooks } from "../../api/gets";

const BookList: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [isbn, setIsbn] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);

  const [books, setBooks] = useState([]);
  const [booksFiltered, setBooksFiltered] = useState([]);

  const [searchText, setSearchText] = useState('');

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
		setBooksFiltered(
      books.filter((book:any) =>
      book.name.toLowerCase().includes(searchText.toLowerCase())
    )
  )
	}, [searchText]);

  interface Book {
    _id: string;
    name: string;
    isbn: string;
    status: string;
  }
  
  async function fetchData() {
    setBooks(await getBooks());
    setBooksFiltered(await getBooks());
  }

  const handleCardPress = (book: Book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedBook(null);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a book"
        value={searchText}
        onChangeText={text => setSearchText(text)}
        />
      <FlatList
        data={booksFiltered}
        renderItem={({ item }) => (
          <Card key={item._id} name={item.name} isbn={item.isbn} status={item.status} id={item._id} onPress={() => handleCardPress(item)} />
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />
      {selectedBook && (
        <BookModal
          visible={modalVisible}
          onClose={handleCloseModal}
          name={selectedBook.name}
          isbn={selectedBook.isbn}
          status={selectedBook.status}
          id={selectedBook._id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  list: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 10,
  },
});

export default BookList;
