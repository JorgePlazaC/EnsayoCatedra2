/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  FlatList,
  Modal,
  Image,
  Alert,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Provider as PaperProvider} from 'react-native-paper';
import {
  Button,
  Portal,
  Dialog,
  Paragraph,
  Text,
  TextInput,
  Divider,
} from 'react-native-paper';

import axios from 'axios';
import {Provider} from 'react-native-paper/lib/typescript/core/settings';

const App: () => Node = () => {
  //Vistas modal
  const [productosVisible, setProductosVisible] = React.useState(false);
  const [meseroVisible, setMeseroVisible] = React.useState(false);
  //Inputs
  const [inputNumMesa, setInputNumMesa] = React.useState();
  const [inputNombre, setInputNombre] = React.useState();
  const [inputRUT, setInputRUT] = React.useState();
  const [inputEmail, setInputEmail] = React.useState();
  const [inputFecha, setInputFecha] = React.useState();
  const [inputPedido, setInputPedido] = React.useState();
  //Arrays
  const [arrayPedidos, setArrayPedidos] = React.useState([]);
  const [productos, setProductos] = React.useState([]);

  const url = 'https://dummyjson.com/products';

  useEffect(() => {
    FetchApi();
  }, []);

  let Pedido = {
    estado: 'Sin estado',
    detalle: Detalle,
  };
  let Detalle = {
    numMesa: String,
    nombre: String,
    RUT: String,
    email: String,
    fecha: String,
    pedido: String,
  };

  const EnviarPedido = () => {
    let pedido = Object.create(Pedido);
    let detalle = Object.create(Detalle);
    detalle.numMesa = inputNumMesa;
    detalle.nombre = inputNombre;
    detalle.RUT = inputRUT;
    detalle.email = inputEmail;
    detalle.fecha = inputFecha;
    detalle.pedido = inputPedido;
    pedido.detalle = detalle;

    arrayPedidos.push(pedido);
  };

  const FetchApi = async () => {
    const response = await axios.get(url);
    setProductos(response.data);
  };

  const Entregado = item => {
    item.estado = 'Entregado';
    setMeseroVisible(false);
    alert('Pedido entregado');
  };

  const Cancelado = item => {
    item.estado = 'Cancelado';
    setMeseroVisible(false);
    alert('Pedido cancelado');
  };

  const Eliminar = item => {
    setArrayPedidos(arrayPedidos.filter(item2 => item2 !== item));
    setMeseroVisible(false);
    alert('Pedido eliminado');
  };

  const Item = ({title}) => (
    <View style={styles.item}>
      <Divider />
      <Text style={styles.title}>{title.title}</Text>
      <Image
        source={{uri: title.images[0]}}
        style={{width: 200, height: 200}}
      />
      <Divider />
    </View>
  );
  const renderItem = ({item}) => <Item title={item} />;

  const Item2 = ({title}) => (
    <View style={styles.item}>
      <Divider />
      <Text style={styles.title}>Nombre del cliente: {title.detalle.nombre}</Text>
      <Text style={styles.title}>Estado: {title.estado}</Text>
      <Text style={styles.title}>Detalle del pedido:</Text>
      <Text style={styles.title}>{title.detalle.pedido}</Text>
      <Button
        mode="contained"
        onPress={() => {
          Entregado(title);
        }}>
        Entregar pedido
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          Cancelado(title);
        }}>
        Cancelar pedido
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          Eliminar(title);
        }}>
        Eliminar pedido
      </Button>
      <Divider />
    </View>
  );
  const renderItem2 = ({item}) => <Item2 title={item} />;

  return (
    <PaperProvider>
      <SafeAreaView>
        <Text>Restaurant</Text>
        <Text>Ingrese el número de su mesa</Text>
        <TextInput
          label="Número"
          value={inputNumMesa}
          onChangeText={inputNumMesa => setInputNumMesa(inputNumMesa)}
        />
        <Text>Ingrese su nombre</Text>
        <TextInput
          label="Nombre"
          value={inputNombre}
          onChangeText={inputNombre => setInputNombre(inputNombre)}
        />
        <Text>Ingrese su RUT</Text>
        <TextInput
          label="RUT"
          value={inputRUT}
          onChangeText={inputRUT => setInputRUT(inputRUT)}
        />
        <Text>Ingrese su Email</Text>
        <TextInput
          label="Email"
          value={inputEmail}
          onChangeText={inputEmail => setInputEmail(inputEmail)}
        />
        <Text>Ingrese la fecha de hoy</Text>
        <TextInput
          label="Fecha"
          value={inputFecha}
          onChangeText={inputFecha => setInputFecha(inputFecha)}
        />
        <Text>Ingrese los productos que desea pedir</Text>
        <TextInput
          label="Productos"
          value={inputPedido}
          onChangeText={inputPedido => setInputPedido(inputPedido)}
        />
        <Button mode="contained" onPress={() => EnviarPedido()}>
          Ingresar
        </Button>
        <Button mode="contained" onPress={() => setProductosVisible(true)}>
          Ver productos
        </Button>
        <Button mode="contained" onPress={() => setMeseroVisible(true)}>
          Mesero
        </Button>
        <Modal visible={productosVisible}>
          <FlatList
            data={productos.products}
            renderItem={renderItem}
            keyExtractor={item => item.id}></FlatList>
          <Button mode="contained" onPress={() => setProductosVisible(false)}>
            Volver
          </Button>
        </Modal>
        <Modal visible={meseroVisible}>
          <FlatList
            data={arrayPedidos}
            renderItem={renderItem2}
            keyExtractor={item => item.id}></FlatList>
          <Button mode="contained" onPress={() => setMeseroVisible(false)}>
            Volver
          </Button>
        </Modal>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
