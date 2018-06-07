import web3 from '../web3';
import StarterCrowdsale from '../abi-json/StarterCrowdsale.json';

const address = '<crowdsale contract address here>';

export default new web3.eth.Contract(StarterCrowdsale.abi, address);
