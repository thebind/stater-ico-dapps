import React, { Component } from 'react';
import web3 from '../../ethereum/web3';
import StarterCrowdsaleToken from '../../ethereum/ico-interface/StarterCrowdsaleToken';
import StarterCrowdsale from '../../ethereum/ico-interface/StarterCrowdsale';

class TestContract extends Component {
  state = {
    //StarterCrowdSale
    rate: '',
    token: '',
    wallet: '',
    weiRaised: '',
    goal: '',
    vault: '',
    crowdsalOowner: '',
    cap: '',
    openingTime: '',
    closingTime: '',

    //StarterCrowdSaleToken
    owner: '',
    tokenName: '',
    symbol: '',
    decimals: '',
    investor: '',
    tokenAmount: ''
  };

  async componentDidMount() {
    console.log('start');

    // Crowdsale Token
    //const owner = await StarterCrowdsaleToken.methods.owner().call();

    const owner = await StarterCrowdsaleToken.methods
      .owner()
      .call()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });

    console.log('end');

    const tokenName = await StarterCrowdsaleToken.methods.name().call();
    const symbol = await StarterCrowdsaleToken.methods.symbol().call();
    const decimals = await StarterCrowdsaleToken.methods.decimals().call();

    const accounts = await web3.eth.getAccounts();
    const investor = accounts[0];
    const tokenAmount = await StarterCrowdsaleToken.methods
      .balanceOf(accounts[0])
      .call();

    // let account = web3.eth.accounts[0];
    // const accountInterval = setInterval(function() {
    //   if (web3.eth.accounts[0] !== account) {
    //     account = web3.eth.accounts[0];
    //     //updateInterface();
    //   }
    // }, 100);

    // Crowdsale
    const rate = await StarterCrowdsale.methods.rate().call();
    const token = await StarterCrowdsale.methods.token().call();
    const wallet = await StarterCrowdsale.methods.wallet().call();
    const weiRaised = await StarterCrowdsale.methods.weiRaised().call();
    const goal = await StarterCrowdsale.methods.goal().call();
    const vault = await StarterCrowdsale.methods.vault().call();
    const crowdsalOowner = await StarterCrowdsale.methods.owner().call();
    const cap = await StarterCrowdsale.methods.cap().call();
    const openingTime = await StarterCrowdsale.methods.openingTime().call();
    const closingTime = await StarterCrowdsale.methods.closingTime().call();

    let value;

    this.setState({
      //StarterCrowdSale
      rate,
      token,
      wallet,
      weiRaised,
      goal,
      vault,
      crowdsalOowner,
      cap,
      openingTime,
      closingTime,

      //StarterCrowdSaleToken
      owner,
      tokenName,
      symbol,
      decimals,
      investor,
      tokenAmount
    });
  }

  onSubmit = async event => {
    event.preventDefault();
    await StarterCrowdsale.methods.buyTokens(this.state.investor).send({
      from: this.state.investor,
      value: web3.utils.toWei(this.state.value, 'ether')
    });
  };

  render() {
    return (
      <React.Fragment>
        <p>
          token owner: {this.state.owner}
          <br />
          token name: {this.state.tokenName}
          <br />
          symbol: {this.state.symbol}
          <br />
          decimals: {this.state.decimals}
          <br />
          balanceOf: {this.state.tokenAmount}
          <br />
          rate: {this.state.rate}
          <br />
          goal: {this.state.goal}
          <br />
          cap: {this.state.cap}
          <br />
          waiRaised: {this.state.weiRaised}
          <br />
          <br />
          investor: {this.state.investor}
        </p>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Buy PCE Token</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
            <button>Buy</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default TestContract;
