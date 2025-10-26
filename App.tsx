import { View, Text, TextInput, Touchable, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState } from 'react';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const handleDelete = () => {
    setInputValue((prev) => prev.slice(0, -1)); // remove last character
  };
  const handleSignChange = () => {
    if (inputValue !== "") {
      if (inputValue.startsWith("-")) {
        setInputValue(inputValue.substring(1)); // remove the negative sign
      } else {
        setInputValue("-" + inputValue); // add the negative sign
      }
    }// logic to change sign
  };
const handlePercentage = () => {
  try {
    // Remove spaces
    const input = inputValue.replace(/\s+/g, "");

    if (input.includes("/")) {
      const parts = input.split("/");
      if (parts.length === 2) {
        const part = parseFloat(parts[0]);
        const total = parseFloat(parts[1]);

        if (!isNaN(part) && !isNaN(total) && total !== 0) {
          const percent = (part / total) * 100;
          setInputValue(percent.toString());
          return;
        }
      }
      setInputValue("Error");
      return;
    }

    // If not a fraction, handle as simple number
    const number = parseFloat(input);
    if (!isNaN(number)) {
      setInputValue((number / 100).toString());
      return;
    }

    setInputValue("Error"); // fallback
  } catch (error) {
    setInputValue("Error");
  }
};


  const handleEqual = () => {
  try {
    // Evaluate the expression
    const result = eval(inputValue); // ⚠️ Only works for trusted input
    setInputValue(result.toString());
  } catch (error) {
    setInputValue("Error");
  }
};

  return (
    <View style={styles.wrapper}>
      <View style={styles.headingContainer}>
        <Text style={styles.textHeading}>Calculator App</Text>
      </View>
      <View>
        <TextInput style={styles.input} value={inputValue} editable={false}>
        </TextInput>
      </View>
      
      {/* Buttons will go here */}
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.sbtn} onPress={()=>setInputValue('')}>
          <Text style={styles.sbtnText}>AC</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sbtn} onPress={handleDelete}>
          <Text style={styles.sbtnText}>DEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sbtn} onPress={handleSignChange}>
          <Text style={styles.sbtnText}>+/-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sbtn} onPress={()=>setInputValue(inputValue+'/')}>
          <Text style={styles.sbtnText}>÷</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.btn} onPress={()=>setInputValue(inputValue+'7')}>
          <Text style={styles.btnText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>setInputValue(inputValue+'8')}>
          <Text style={styles.btnText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>setInputValue(inputValue+'9')}>
          <Text style={styles.btnText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sbtn} onPress={()=>setInputValue(inputValue+'*')}>
          <Text style={styles.sbtnText}>x</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.btn} onPress={()=>setInputValue(inputValue+'4')}>
          <Text style={styles.btnText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>setInputValue(inputValue+'5')}>
          <Text style={styles.btnText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}onPress={()=>setInputValue(inputValue+'6')} >
          <Text style={styles.btnText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sbtn} onPress={()=>setInputValue(inputValue+'-')}>
          <Text style={styles.sbtnText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.btn} onPress={()=>setInputValue(inputValue+'1')}>
          <Text style={styles.btnText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}onPress={()=>setInputValue(inputValue+'2')} >
          <Text style={styles.btnText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}onPress={()=>setInputValue(inputValue+'3')} >
          <Text style={styles.btnText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sbtn} onPress={()=>setInputValue(inputValue+'+')}>
          <Text style={styles.sbtnText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.btn} onPress={handlePercentage}>
          <Text style={styles.btnText}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>setInputValue(inputValue+'0')}>
          <Text style={styles.btnText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>setInputValue(inputValue+'.')}>
          <Text style={styles.btnText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eqbtn} onPress={handleEqual}>
          <Text style={styles.eqbtnText}>=</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  headingContainer: {
    height: 100,
    marginTop: 30,
  },
  textHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  input: {
    backgroundColor: '#f0f0f0',
    height: 110,
    fontSize: 30,
    marginTop: 50,
    marginBottom: 50,
    padding: 20,
    textAlign: 'right',
  },
  btnRow: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
  },
  btn: {
    flex: 1,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: '#d0d0d0',
  },
  btnText: {
    fontSize: 24,
  },
  sbtnText: {
    fontSize: 24,
    color:'blue'
  },
  sbtn: {
    flex: 1,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: '#9fc6faff',
    borderRadius: 40,
    borderWidth: 0.5,
  },
  eqbtn: {
    flex: 1,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: '#2579e6ff',
    borderRadius: 40,
    borderWidth: 0.5,
  },
  eqbtnText: {
    fontSize: 24,
    color:'white'
  },
});

export default App;