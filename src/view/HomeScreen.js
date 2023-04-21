import React, { Component } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import BaseScreen from '@/view/BaseScreen';
import DefaultTitle from '@/view/components/DefaultTitle';
import DefaultSubtitle from '@/view/components/DefaultSubtitle';
import RatingController from '@/controller/RatingController';
import DefaultText from './components/DefaultText';

const styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  wrap: {
    marginTop: 0,
    width: 320,
    marginBottom: 260
  },
  title: {
    marginBottom: 20
  },
  subtitle: {
    marginBottom: 35
  },
  switchContainer: {
    width: 320,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  switch: {
    transform: [{scale: 1.5}],
    marginRight: 30
  },
  switchText: {
    fontSize: 24
  },
  textActive: {
    color: "#259474"
  },
  textInactive: {
    color: "#A82A5F"
  }
});

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isEnabled: true,
      toggle: () => this.setState({isEnabled: !this.state.isEnabled})
    }

    this.controller = new RatingController();
  }

  render() {

    return (
      <BaseScreen style={styles.mainView}>
        <View style={styles.wrap}>
          <DefaultTitle style={styles.title}>Bienvenido</DefaultTitle>
          <DefaultSubtitle style={styles.subtitle}>{RatingController.user().name}</DefaultSubtitle>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: "#A82A5F", true: "#259474" }}
            thumbColor={this.state.isEnabled ? "#ffffff" : "#ffffff"}
            onValueChange={this.state.toggle}
            value={this.state.isEnabled}
            style={styles.switch}
          />
          <DefaultText style={[styles.switchText, this.state.isEnabled ? styles.textActive : styles.textInactive]}>{this.state.isEnabled ? 'DISPONIBLE' : 'INACTIVO'}</DefaultText>
        </View>
      </BaseScreen>
    );
  }

}