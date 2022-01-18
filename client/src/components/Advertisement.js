import React from "react";
import {Card,Button} from 'react-bootstrap';
const Advertisement = ({web3,accounts,contract,title,desc,link,imgHash, highestBidder, highestAmount}) => {
  return (
    <div className="carddiv">
      <Card className="d-block card" >
        {imgHash.length>0?
        <Card.Img variant="top" src= {`https://ipfs.infura.io/ipfs/${imgHash}`} />
        :<Card.Img variant="top" src="/blockchain.jpg" />
        }
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {desc}
          </Card.Text>
          <Button href={link} target="blank" variant="primary">Go to Link</Button>
        </Card.Body>
      </Card>
      Highest Bidder: {highestBidder} <br />
      highestAmount: {highestAmount} Ether
    </div>
  );
};

export default Advertisement;
