import React, { Component } from "react";
import AdvertisementContract from "./contracts/Advertisement.json";
import getWeb3 from "./getWeb3";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Advertisement from "./components/Advertisement";
import ChangeAd from "./components/ChangeAd";
import "./App.css";
import { create } from 'ipfs-http-client'
const ipfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});
class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    title: "No Title",
    desc: "No Desc",
    link: "https://www.google.com",
    imgHash: "",
    highestAmount: 0,
    highestBidder: "",
    moneyCollected: 0,
  };
  initAd = async () => {
    const { web3, accounts, contract } = this.state;
    const response = await contract.methods.getAd().call();
    this.setState({
      title: response[0],
      desc: response[1],
      link: response[2],
      imgHash: response[3],
      highestAmount: web3.utils.fromWei(response[4], 'ether'),
      highestBidder: response[5],
      moneyCollected: web3.utils.fromWei(response[6], 'ether')
    });
    console.log(response);
  };
  adSubmit = async (e, title, desc, link, value, img) => {
    const { web3, accounts, contract } = this.state;
    var imgHash;
    console.log("hello");
    if (img) {
      try {
        const postResponse = await ipfsClient.add(img);
        console.log("postResponse", postResponse);
        imgHash = postResponse.path;
        await contract.methods.putAd(title,desc,link,imgHash).send({
          from: accounts[0],
          value: web3.utils.toWei(value, "ether"),
          gas: 1000000,
        });
        this.initAd();
      } catch (e) {
        console.log("Error: ", e);
      }
    } else {
      alert("No files submitted. Please try again.");
      console.log("ERROR: No data to submit");
    }
  };
  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = AdvertisementContract.networks[networkId];
      const instance = new web3.eth.Contract(
        AdvertisementContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      this.setState({ web3, accounts, contract: instance }, this.initAd);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <header>
          <Header />
        </header>
        <main>
          <h1 className="my-4">Advertisement Auction Homepage</h1>
          <div className="maincontainer d-flex ">
            <ChangeAd adSubmit={this.adSubmit} 
            highestAmount={this.state.highestAmount} />
            <Advertisement
              title={this.state.title}
              desc={this.state.desc}
              link={this.state.link}
              imgHash={this.state.imgHash}
              highestAmount={this.state.highestAmount}
              highestBidder={this.state.highestBidder}
              moneyCollected = {this.state.moneyCollected}
            />
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
