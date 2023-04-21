import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
  selectContainer: {
    borderRadius: 50,
    padding: 0,
    color: "#363837",
    borderWidth: 2,
    borderColor: "#099070",
    padding: 0,
    margin: 0,
    overflow: "hidden",
    backgroundColor: "#FFF",
    height: 40
  },
  defaultSelect: {
    fontSize: 15,
    backgroundColor: "#FFF",
    height: 40,
    position: "relative",
    top: -10
  },
  item: {
    padding: 0,
    margin: 0,
    lineHeight: 0,
  }
});

export default class DefaultSelect extends Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <View
        style={styles.selectContainer}>
        <Picker
          {...this.props}
          style={[styles.defaultSelect, this.props.style]}
          itemStyle={styles.item}
          mode="dialog"
          >
          {this.props.items.map( el => <Picker.Item label={el.label} value={el.value} style={styles.item} /> )}
        </Picker>
      </View>
    );
  }

}