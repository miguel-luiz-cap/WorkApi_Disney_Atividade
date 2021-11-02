import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';

const request = async (callback) => {
  const response = await fetch('https://api.disneyapi.dev/characters');
  const parsed = await response.json();
  callback(parsed.data);
};

export default function App() {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    request(setRegistros);
  }, []);
  return (
    <View style={estilo.container}>
      <View>
        <Text style={estilo.titulo}>Personagens da disney</Text>
      </View>
      <FlatList
        data={registros}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={estilo.itens}>
            <View style={estilo.imgView}>
            <Image
              source={{ uri: item.imageUrl }}
              style={estilo.img}
              resizeMode="stretch"
            />
            </View>
            <View style={estilo.textView}>
              <Text style={estilo.textTitle}>{'Nome\n'}</Text>
              <Text style={estilo.text}>{item.name}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0AF',
  },
  titulo: {
    fontSize: 25,
    color: '#FFF',
    marginTop: 50,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'monospace',
    textDecorationLine: 'underline',
  },
  itens: {
    backgroundColor: '#F00',
    //flex: 1,
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 10,
    textAlignVertical: 'center',
    justifyContent: "center",
    flexDirection: 'row',
    borderRadius: 50,
  },
  textView: {
    width: 150,
  },  
  textTitle: {
    color: '#FFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    fontFamily: 'monospace',
    textDecorationLine: 'underline',
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
    fontFamily: 'monospace',
    textDecorationLine: 'none',
  },
  imgView: {
    backgroundColor: "#555",
    //marginEnd: 5,
    marginStart: 30,
    justifyContent: 'center',
    borderColor: '#FF0',
    borderRadius: 10,
    borderWidth: 5,
    padding: 4,
  },
  img: {
    height: 125,
    width: 125,
    borderRadius: 10,
  },
});
