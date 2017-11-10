import React from 'react'
import ReactDOM from 'react-dom'
import FormInput from './FormInput'

class CustomForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      allok: false
    }
    this.oks = {}
  }
  handleChange (e) {
    // すべての項目がOKになったか?
    this.oks[e.name] = e.isOK
    this.setState({
      [e.name]: e.value,
      allok: (this.oks['email'] && this.oks['username'])
    })
  }
  handleSubmit (e) {
    //window.alert(JSON.stringify(this.state))
    //e.preventDefault()
  }
  render () {
    const doChange = e => this.handleChange(e)
    const doSubmit = e => this.handleSubmit(e)
    // Eメールを表すパターン
    const emailPat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    // ASCII文字以外全部
    const asciiFilter = /[^\u0020-\u007e]+/g
    return (
      <form method="POST" onSubmit={doSubmit} action="https://g2v6i3as6i.execute-api.ap-northeast-1.amazonaws.com/prod/regist">
        <FormInput type="text" name='email' label='メール'
          value={this.state.email}
          filter={asciiFilter}
          pattern={emailPat}
          onChange={doChange} />
        <FormInput type="text" name='username' label='氏名'
          value={this.state.username}
          //filter={/[^0-9-()+]/g}
          //pattern={/^[0-9-()+]+$/}
          onChange={doChange} />
        <input type='submit' value='送信'
          disabled={!this.state.allok} />
      </form>
    )
  }
}

// DOMを書き換える
ReactDOM.render(
  <CustomForm />,
  document.getElementById('root')
)
