import React from "react";
import {Card,Button} from 'react-bootstrap';
const Advertisement = ({title,desc,link,imgHash, highestBidder, highestAmount, moneyCollected}) => {
  return (
    <div className="carddiv">
      <div className="py-4">Money Collected Till Now: {moneyCollected} ethers</div>
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
