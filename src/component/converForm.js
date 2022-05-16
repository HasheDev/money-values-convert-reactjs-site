import React, { useState } from 'react'

import Select from "react-select";

import dollarImg from '../img/dollar.png';
import brlImg from '../img/brl.png';


export const formatNumber = inputNumber => {
  let formetedNumber=(Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.');
  let splitArray=formetedNumber.split(',');
  if(splitArray.length>1){
    formetedNumber=splitArray[0];
  }
  return(formetedNumber);
};
export const formatNumberEx = inputNumber => {
  let formetedNumber=(Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\,)/g, '$&,');
  let splitArray=formetedNumber.split('.');
  if(splitArray.length>1){
    formetedNumber=splitArray[0];
  }
  return(formetedNumber);
};


const convertions = [
  { value: "USD $", label: "Dólar (EUA)" },
  { value: "BRL R$", label: "Real Brasileiro" }
];

function strcmp (...arg){
  if(arg[0] === arg[1] && arg[2] == arg[3])
  {
    return true
  }
  return false
}
function moneyValuesConvert(...arg){

  if(strcmp(arg[0], arg[1]))
  {
    return formatNumberEx(arg[2])
  }
  if(strcmp(arg[0], "USD $") && strcmp(arg[1], "BRL R$"))
  {
    return formatNumberEx(arg[2])*5.07
  }else if(strcmp(arg[0], "BRL R$") && strcmp(arg[1], "USD $"))
  {
     return formatNumberEx(arg[2])*0.20
  }
  return 0;
}
class ConvertForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        valueAmount: 0,
        valueConverted: 0,
        selectedOptionFrom: '',
        selectedOptionTo: '',
        selectedImg: require('../img/select.png'),
        selectedSubImg: require('../img/select.png')
      }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleChangeFrom = this.handleChangeFrom.bind(this)
      this.handleChangeTo = this.handleChangeTo.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleInputChange(event) {
      
      const target = event.target
      const name = target.name
      
      this.setState({
        [name]: event.target.value.replace(",", ".")
      })

      console.log(name + "targeto" + target)
      
    }
    handleSubmit(event) {
      
      let value = moneyValuesConvert(this.state.selectedOptionFrom.value, this.state.selectedOptionTo.value, this.state.valueAmount, this.state.valueConverted)
      this.setState({valueConverted: value})
      event.preventDefault();
    }
    handleChangeFrom = (selectedOptionFrom) => {
      this.setState({ selectedOptionFrom });
      if(selectedOptionFrom.value === 'USD $')
      {
        this.setState({
          selectedImg: dollarImg
        })
      }else if(selectedOptionFrom.value === 'BRL R$')
      {
        this.setState({
          selectedImg: brlImg
        })
      }
      console.log(`Option selected:`, selectedOptionFrom);
    };

    handleChangeTo = (selectedOptionTo) => {
      this.setState({ selectedOptionTo });
      if(selectedOptionTo.value === 'USD $')
      {
        this.setState({
          selectedSubImg: dollarImg
        })
      }else if(selectedOptionTo.value === 'BRL R$')
      {
        this.setState({
          selectedSubImg: brlImg
        })
      }
      console.log(`Option selected:`, selectedOptionTo);
    };
    
    render() {

      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Money Values Convert.
          </label>
            <hr></hr>
          <img src={this.state.selectedImg} alt="select image" />
          <Select className='App-SelectColor' placeholder="" value={this.state.selectedOptionFrom } multi options={convertions}  onChange={this.handleChangeFrom} />
          <label>{this.state.selectedOptionFrom.value}</label>
          <input type="text" name='valueAmount' onChange={this.handleInputChange} />
          <br/>
          <img src={this.state.selectedSubImg} alt="select image" />
          <Select className='App-SelectColor' placeholder="" value={this.state.selectedOptionTo } multi options={convertions}  onChange={this.handleChangeTo} />
          <label>{this.state.selectedOptionTo.value}</label>        
          <input type="text" value={(this.state.valueConverted).toLocaleString(undefined, { maximumFractionDigits: 2 })} onChange={this.handleInputChange} />
          <br/>
          <input className='App-Button' type="submit" value="Convert" />
        </form>
        
      );
    }
  }
  export {ConvertForm}