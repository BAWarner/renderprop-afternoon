import React, { Component } from 'react';

class CurrencyConverter extends Component{
    constructor(){
        super();
        this.state = {
            currencyChosen: false,
            selectedCurrency: 'Selectt Currency',
            amount: 0
        }
    }
    handleAmountIncrease = () => {
        this.setState( prevState => { return { amount: prevState.amount + 1 } } );
    }
    handleAmountDecrease = () => {
        this.setState( prevState => {
            if( prevState.amount > 0 )
            return { amount: prevState.amount - 1 } 
        } );
    }
    handleOptionSelect = e => {
        const userValue = e.target.value;
        this.setState( () => {
            return {
                selectedCurrency: userValue,
                currencyChosen: userValue === 'Select Currency' ? false : true
            }
        });
    }
    render(){
        const currencyData = [
            { name: 'Japanese Yen', symbol: '¥', rate: 113.6, id: 0 },
            { name: 'British Pound', symbol: '£', rate: 0.77, id: 1 },
            { name: 'Canadian Dollar', symbol: 'CAD', rate: 1.32, id: 2 },
            { name: 'Mexican Peso', symbol: 'Mex$', rate: 20.41, id: 3 },
            { name: 'Swiss Franc', symbol: 'Fr.', rate: 1.01, id: 4 }
        ];
        var currencyOptions = currencyData.map( (option, i) => {
            let { id, name } = option;
            return (
                <option
                    key={id}
                    value={i}
                >
                    { name }
                </option>
            );
        });
        let { selectedCurrency, amount, currencyChosen } = this.state;
        return(
            <div>
                <select 
                    value={ selectedCurrency }
                    onChange={ this.handleOptionSelect }
                >
                    <option value='Select Currency'>Select Currency</option>
                    { currencyOptions }
                </select>
                <div>
                    <button
                        className='add'
                        onClick={ this.handleAmountIncrease }
                        disabled={ !currencyChosen }
                    >
                        +
                    </button>
                    <button
                        className='minus'
                        onClick={ this.handleAmountDecrease }
                        disabled={ !currencyChosen }
                    >
                        -
                    </button>
                    {
                        currencyChosen
                        ? this.props.render( currencyData[selectedCurrency], amount )
                        : 'Please Select Currency'
                    }
                </div>
            </div>
        ); 
    }
}

export default CurrencyConverter;