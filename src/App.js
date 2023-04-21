import TransferFunds from './Components/Transfer';
import CreateWallet from './Components/Createawallet';
import GetWallet from './Components/Getwallet';
import Payouts from './Components/Payouts';
import WireBankAccountForm from './Components/Creatingawire';
import PayoutsList from './Components/Readpayouts';
import CreateRecipient from './Components/CreateRecipient';
import RecipientsList from './Components/ListRecipient';
import CreateAddress from './Components/CreateBlockchainAddress';
import BlockWalletAddresses from './Components/GetBlockchainAddress';
import CreateBlockTransfer from './Components/CreateBlocktransfers';
import CreateDepositAddress from './Components/CreateDepositAddress';
function App() {
  
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '20px', backgroundColor: '#F3F4F6', padding: '20px'}}>
      <div style={{backgroundColor: '#FFF', padding: '20px'}}>
        <TransferFunds />
      </div>
      <div style={{backgroundColor: '#FFF', padding: '20px'}}>
        <CreateBlockTransfer />
      </div>
      <div style={{backgroundColor: '#FFF', padding: '20px'}}>
        <Payouts />
      </div>
      <div style={{backgroundColor: '#FFF', padding: '20px'}}>
        <CreateWallet />
      </div>
      <div style={{backgroundColor: '#FFF', padding: '20px'}}>
        <BlockWalletAddresses />
      </div>
      <div style={{backgroundColor: '#FFF', padding: '20px'}}>
        <CreateAddress />
      </div>
      <div style={{backgroundColor: '#FFF', padding: '20px'}}>
        <GetWallet />
      </div>
      <div style={{backgroundColor: '#FFF', padding: '20px'}}>
        <PayoutsList />
      </div>
      <div style={{backgroundColor: '#FFF', padding: '20px'}}>
        <WireBankAccountForm />
      </div>
      <div style={{backgroundColor: '#FFF', padding: '20px'}}>
        <PayoutsList />
      </div>
      <div style={{backgroundColor: '#FFF', padding: '20px'}}>
        <CreateRecipient />
      </div>
      <div style={{backgroundColor: '#FFF', padding: '20px'}}>
        <RecipientsList />
      </div>
      <div style={{backgroundColor: '#FFF', padding: '20px'}}>
        <CreateDepositAddress />
      </div>
    </div>
  );
}

export default App;
