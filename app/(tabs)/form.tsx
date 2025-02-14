import { ThemedText } from '@/components/ThemedText';
import { ThemedInput } from '@/components/ThemedInput';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Snackbar } from 'react-native-paper';

import { postBook } from "../../api/posts";

const BookForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [isbn, setIsbn] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);

  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const handleSubmit = async () => {
    await postBook( {name, isbn, status} );
    onToggleSnackBar()
  };

  const data = [
    { label: 'Prestado', value: 'Prestado' },
    { label: 'Perdido', value: 'Perdido' },
    { label: 'Disponible', value: 'Disponible' },
  ];

  return (
    <View style={styles.container}>
        <ThemedText type="subtitle">Nombre del libro</ThemedText>
        <ThemedInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Escribe el título del libro"
        />

        <ThemedText type="subtitle">ISBN</ThemedText>
        <ThemedInput
            style={styles.input}
            value={isbn}
            onChangeText={setIsbn}
            placeholder="Escribe el título del libro"
        />

        <ThemedText type="subtitle">Título del libro!</ThemedText>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={status}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setStatus(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <IconSymbol size={28} name="add.fill" color={"black"} />
          )}
        />

      <Button title="Guardar" onPress={handleSubmit} />
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      action={{
        label: 'Undo',
        onPress: () => {
          console.log("Undo");
        }
      }}>
      Guardado
    </Snackbar>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default BookForm;
