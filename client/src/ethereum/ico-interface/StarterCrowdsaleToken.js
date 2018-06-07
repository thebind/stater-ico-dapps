import web3 from '../web3';
import StarterCrowdsaleToken from '../abi-json/StarterCrowdsaleToken.json';

const address = '<token contract address here>';

export default new web3.eth.Contract(StarterCrowdsaleToken.abi, address);
