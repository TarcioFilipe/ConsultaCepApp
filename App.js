import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';

import api from './src/services/api';

export default function App() {

  const [cep, setCep]= useState('')
  const inputRef = useRef(null)
  const [ cepUser, setCepUser] = useState(null)


  function limpar() {
    setCep('')
    inputRef.current.focus()
    setCepUser(null)
  }

  async function buscar() {
    if(cep == ''){
      alert('CEP invalido')
      setCep('')
      return
    }

    try{
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      setCepUser(response.data)

      Keyboard.dismiss();
    }catch(error){
      console.log('ERROR: ' +  error) ;
    }

  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 36, alignItems: 'center'}}>
        <Text style={styles.texto}>DIGETE O CEP</Text>
        <TextInput 
        style={styles.input}
        placeholder='EX: 60830-145'
        value={cep}
        onChangeText={ (texto) => setCep(texto)}
        keyboardType='numeric'
        ref={inputRef}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity 
        style={[styles.Btn, {backgroundColor: '#1d75cd'}]}
        onPress={ buscar }
        >
          <Text style={styles.textBtn}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={[styles.Btn, {backgroundColor: '#cd3e1d'}]}
        onPress={ limpar }
        >
          <Text style={styles.textBtn}>Limpar</Text>
        </TouchableOpacity>
      </View>

      { cepUser && 
        <View style={styles.resultado}>
          <Text style={styles.titulo}>Consulta:</Text>
          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
        </View>
      }
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  texto: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 24,
    fontWeight: '500'
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    height: 56,
    width: '90%',
    padding: 12,
    fontSize: 16
  },
  areaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    justifyContent: 'space-around'
  },
  Btn: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
  },
  textBtn: {
    fontSize: 20,
    color: '#FFF'
  },
  resultado: {
    flex: 1,
    width: '90%',
    marginLeft: 24,
    marginTop: 40
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'normal',
    marginBottom: 12
  },
  itemText: {
    fontSize: 16
  }
  
});
