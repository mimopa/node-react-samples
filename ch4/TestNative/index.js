// 必要なモジュールを読み込む --- (※1)
import React, { Component } from 'react'
import {
  AppRegistry, StyleSheet, Text, View, TextInput, Button, Alert
} from 'react-native'

// Amazon API Gatewayのエンドポイント指定
const apiEndpoint = 'https://g2v6i3as6i.execute-api.ap-northeast-1.amazonaws.com/prod/regist'

// Amazon API Gatewayを呼び出す関数を定義
function callAPI (apiEndpoint, options, callback) {
    console.log(options)
    fetch(apiEndpoint, options)
      .then((response) => response.json())
      .then(response => {
          Alert.alert(
          "POST Response",
          "Response Body -> " + JSON.stringify(response.body)
          )
      })
      .catch((error) => {
          console.log(error)
      })
}

// メインコンポーネントの定義 --- (※2)
export default class TestNative extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: ''
    }
  }
  render() {
    return (
      <View style={styles.base}>
        <TextInput style={styles.input}
          placeholder="メールアドレス"
          onChangeText={e => this.setState({email: e})}
        />
        <TextInput style={styles.input}
          placeholder="氏名"
          onChangeText={e => this.setState({username: e})}
        />
        <Button
          onPress={e => this.regist(e)}
          title="登録"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    )
  }
  alertMessage (e) {
    Alert.alert('Button has been pressed!'+String(this.state.email));
　}
  regist (e) {
      const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: String(this.state.email),
              username: String(this.state.username)
          })
      }
//      Alert.alert(options)
      callAPI(apiEndpoint, options, e => {
          console.log(e)
      })
  }
}

// スタイルの設定 --- (※3)
const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0FF'
  },
  title: {
    fontSize: 46
  },
  input: {
    height: 40,
    width: '100%'
  },
  padding: {
    padding: 10
  }
})

// アプリにコンポーネントを登録 --- (※4)
AppRegistry.registerComponent('TestNative', () => TestNative)
