import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import BaseScreen from '@/view/BaseScreen';
import DefaultButton from '@/view/components/DefaultButton';
import DefaultTitle from '@/view/components/DefaultTitle';
import DefaultTextInput from '@/view/components/DefaultTextInput';
import DefaultSelect from '@/view/components/DefaultSelect';
import UserController from '@/controller/UserController';
import DefaultText from './components/DefaultText';
import FlatButton from './components/FlatButton';

const styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  wrap: {
    width: 300,
  },
  title: {
    marginBottom: 30,
    fontSize: 20
  },
  inputContainer: {
    flexDirection: "row"
  },
  textInput: {
    marginBottom: 5,
    minWidth: "50%"
  },
  qrContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  qr: {
    width: 250,
    height: 250,
    borderColor: "#099070",
    borderWidth: 2
  },
  selectFile: {
    marginBottom: 25
  },
  adjuntText: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    width: "100%",
    fontSize: 16
  }
});

export default class TopUpScreen extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      params: {
        name: "",
        lastname: "",
        nit: "",
        phone: "",
        value: "",
        method: "nequi",
        file: null
      },
      
    };
    
    this.controller = new UserController(); 
  }

  render() {
    return (
      <BaseScreen style={styles.mainView}>
        <ScrollView style={styles.wrap}>
          <DefaultTitle style={styles.title}>Formulario de Recarga</DefaultTitle>
          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <DefaultTextInput placeholder="Nombre*" style={styles.textInput} onChangeText={ (t) => this.setState({params:{...this.state.params, name:t}}) } />
              <DefaultTextInput placeholder="Apellido*" style={styles.textInput} onChangeText={ (t) => this.setState({params:{...this.state.params, lastname:t}}) } />
            </View>
            <View style={styles.inputContainer}>
              <DefaultTextInput placeholder="Telefono*" style={styles.textInput} onChangeText={ (t) => this.setState({params:{...this.state.params, name:t}}) } />
              <DefaultTextInput placeholder="N° documento*" style={styles.textInput} onChangeText={ (t) => this.setState({params:{...this.state.params, lastname:t}}) } />
            </View>
            <DefaultTextInput placeholder="Valor a recargar*" style={styles.textInput} onChangeText={ (t) => this.setState({params:{...this.state.params, email:t}}) } keyboardType="email-address" />
            <DefaultSelect 
              placeholder="Metodo de pago*" 
              style={styles.textInput} 
              items={[
                {label: "Nequi", value: "nequi"},
                {label: "Bancolombia", value: "bancolombia"},
                {label: "Efectivo", value: "efectivo"}
              ]}
              selectedValue={ this.state.params.method }
              onValueChange={ (v) => {this.setState({params: {...this.state.params, method: v}}); } } 
            />
          </View>
          <View style={styles.qrContainer}>
            <Image
              source={require('@/assets/img/qr.png')} 
              style={styles.qr}
            />
          </View>
          <DefaultText style={styles.adjuntText}>Adjunte comprobante del pago*</DefaultText>
          <FlatButton 
            style={styles.selectFile} 
            title="Seleccionar archivo..."
            onPress={() => {
              DocumentPicker.
                pickSingle().
                then((v) => this.setState({params: {...this.state.params, file: v}})).
                catch( (err) => console.log(err) );
            }}
          ></FlatButton>
          <DefaultButton
            title="Recargar"
            onPress={ () => 
              this.controller.topup(
               this.state.params,
               r => this.props.navigation.navigate('Home'),
               err => UserController.showError("No se ha podido hacer la recarga", JSON.stringify(err.data).replace(/[\[\]\{\}\"]+/g, ''))
              )
            }
          />
        </ScrollView>
      </BaseScreen>
    );
  }

}