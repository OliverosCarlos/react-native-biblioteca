import { TextInput, type TextInputProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <TextInput
      style={[
        { color },
        styles.input
      ]}
      {...rest}
    />
    // <Text
    //   style={[
    //     { color },
    //     type === 'default' ? styles.default : undefined,
    //     type === 'title' ? styles.title : undefined,
    //     type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
    //     type === 'subtitle' ? styles.subtitle : undefined,
    //     type === 'link' ? styles.link : undefined,
    //     style,
    //   ]}
    //   {...rest}
    // />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
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
  }
});