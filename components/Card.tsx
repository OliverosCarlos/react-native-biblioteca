import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface CardProps {
  name: string;
  isbn: string;
  status: string;
  onPress: () => void;
}

export function Card({
//   style,
//   lightColor,
//   darkColor,
  ...rest
}: CardProps) {
    // const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
        <TouchableOpacity onPress={rest.onPress}>

        <View style={styles.card}>
          <Text style={styles.title}>{rest.name}</Text>
          <Text style={styles.author}>{rest.isbn}</Text>
          {rest.status == "Perdido" && ( 
            <Text style={styles.st1}>{rest.status}</Text>
          )}
          {rest.status == "Disponible" && ( 
            <Text style={styles.st2}>{rest.status}</Text>
          )}
          {rest.status == "Prestado" && ( 
            <Text style={styles.st3}>{rest.status}</Text>
          )}
          
        </View>
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 16,
    color: '#555',
  },
  st1: {
    fontSize: 14,
    color: '#f00',
  },
  st2: {
    fontSize: 14,
    color: '#0f0',
  },
  st3: {
    fontSize: 14,
    color: '#00f',
  },
});

export default Card;