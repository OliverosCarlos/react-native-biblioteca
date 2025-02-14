import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

import { updateBook } from "../api/updates";

import { Dropdown } from 'react-native-element-dropdown';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedInput } from '@/components/ThemedInput';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  name: string;
  isbn: string;
  status: string;
  id: string;
}

export function BookModal({
  ...rest
}: ModalProps) {

    const [name, setName] = useState<string>('');
    const [isbn, setIsbn] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [isFocus, setIsFocus] = useState(false);  
  
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const handleUpdate = () => {
      setName(rest.name)
      setIsbn(rest.isbn)
      setStatus(rest.status)

      setIsUpdating(true);
    };

    const handleSubmit = async () => {
      await updateBook( {name, isbn, status}, rest.id );
      rest.onClose()
    };


    const data = [
      { label: 'Prestado', value: 'Prestado' },
      { label: 'Perdido', value: 'Perdido' },
      { label: 'Disponible', value: 'Disponible' },
    ];

  return (
    <Modal visible={rest.visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
      {!isUpdating && (
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{rest.name}</Text>
          <Text style={styles.modalAuthor}>{rest.isbn}</Text>
          <Text style={styles.modalSynopsis}>{rest.status}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Cerrar" onPress={rest.onClose} />
            <Button title="Actualizar" color="#00ff00" onPress={() => handleUpdate()} />
          </View>
        </View>
          )}
        
        {isUpdating && (
          <View style={[styles.modalContent, styles.container]}>
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
          <View style={styles.buttonContainer}>
            <Button title="Cancelar" onPress={rest.onClose} />
            <Button title="Guardar" onPress={() => handleSubmit()} />
          </View>
  {/* <Button title="Guardar" onPress={handleSubmit} /> */}
</View>
        )}

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalAuthor: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },
  modalSynopsis: {
    fontSize: 16,
    color: '#777',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },


  container: {
    padding: 20,
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

export default BookModal;
