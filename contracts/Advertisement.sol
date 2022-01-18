// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Advertisement {
    struct Ad{
        address AdOwner;
        string title;
        string desc;
        string link;
        string imgHash;
    }

    uint moneyCollected;
    uint highestAmount;
    address payable highestBidder;

    Ad public currentAd;

    constructor() public {
        moneyCollected=0 ether;
        highestAmount=0 ether;
    }
    modifier allowToPut(string memory _title, string memory _desc, string memory _link, string memory _imgHash,uint value){
        require(value>highestAmount);
        require(bytes(_title).length>0, "Invalid Title");
        require(bytes(_desc).length>0, "Invalid Description");
        require(bytes(_link).length>0, "Invalid Link");
        require(bytes(_imgHash).length>0, "Invalid Image Hash");
        require(msg.sender!=address(0), "Invalid Address");
        _;
    }

    event newAd(string _title,string _desc, string  _link, string _imgHash, uint currentValue,address currentOwner);

    function putAd(string memory _title, string memory _desc, string memory _link, string memory _imgHash) allowToPut(_title,_desc,_link,_imgHash,msg.value) public payable{
        moneyCollected += msg.value;
        currentAd.title = _title;
        currentAd.desc = _desc;
        currentAd.link = _link;
        currentAd.imgHash = _imgHash;
        highestAmount = msg.value;
        highestBidder = msg.sender;
        emit newAd(_title,_desc,_link,_imgHash,msg.value, msg.sender);
    }

    function getAd() public view returns(string memory,string memory,string memory,string memory,uint,address payable, uint){
        return(currentAd.title, currentAd.desc, currentAd.link, currentAd.imgHash, highestAmount, highestBidder, moneyCollected);
    }

}
