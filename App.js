import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Container} from 'native-base';

import InputNumberButton from './src/component/inputNumberButton';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  resultContent: {
    flex: 2,
    backgroundColor: '#1E1240',
    justifyContent: 'center',
  },
  resultText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 70,
    textAlign: 'right',
  },
  inputContent: {
    flex: 8,
    backgroundColor: '#3D0075',
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
  },
});

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);

  const buttons = [
    ['CLEAR', 'DEL'],
    ['7', '8', '9', '÷'],
    ['4', '5', '6', 'x'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  function handleInput(input) {
    switch (input) {
      case '+':
      case '-':
      case '÷':
      case 'x': {
        const dot = displayValue.toString().slice(-1);
        if (dot === '.') {
          setDisplayValue(displayValue.substr(0, displayValue.length - 1));
        }
        if (operator !== null) {
          setDisplayValue(
            displayValue.substr(0, displayValue.length - 1) + input
          );
          setOperator(input);
        } else {
          setDisplayValue(displayValue + input);
          setOperator(input);
        }
        return;
      }
      case '.': {
        const dot = displayValue.toString().slice(-1);
        if (dot !== '.' && operator === null)
          setDisplayValue(displayValue + input);
        return;
      }
      case 'CLEAR': {
        setDisplayValue('0');
        return;
      }
      case 'DEL': {
        if (operator !== null) {
          setOperator(null);
        }
        if (displayValue.length === 1) {
          setDisplayValue('0');
        } else {
          setDisplayValue(displayValue.substr(0, displayValue.length - 1));
        }
        return;
      }
      case '=': {
        return;
      }
      default: {
        const newValue = displayValue === '0' ? input : displayValue + input;
        setDisplayValue(newValue);
        setOperator(null);
      }
    }
  }

  function renderButton() {
    const layouts = buttons.map((buttonRows, index) => {
      const rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        const string = `btn-${buttonIndex}`;
        return (
          <InputNumberButton
            value={buttonItems}
            handleOnPress={() => {
              handleInput(buttonItems);
            }}
            key={string}
          />
        );
      });
      const rowString = `row-${index}`;
      return (
        <View style={styles.inputRow} key={rowString}>
          {rowItem}
        </View>
      );
    });

    return layouts;
  }

  return (
    <Container style={styles.Container}>
      <View style={styles.resultContent}>
        <Text style={styles.resultText}>{displayValue}</Text>
      </View>
      <View style={styles.inputContent}>{renderButton()}</View>
    </Container>
  );
};

export default App;
