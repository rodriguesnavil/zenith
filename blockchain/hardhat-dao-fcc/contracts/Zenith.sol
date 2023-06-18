// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Zenith is Ownable,ERC721("Zenith","Zen") {
  uint public initialRep = 500;
  uint public upStep = 10;
  uint public downStep = 5;
  uint public maxRep = 1000;
  uint public minRep = 1;

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  /** A mapping to store reputation of reviewers.
      If reviewer doesn't exsists, 0 is returned. 
      Otherwise some numeric value.     
  */
  mapping(address => uint) public reputation;
  /** A mapping to store article status.
      If article doesn't exsists, false is returned. 
      Otherwise true.     
  */
  mapping(uint256 => string) public payloadCID;

  // Emitted when the stored value changes
  event ReviewerAdded(address reviewer, uint rep);
  event ReviewerReputationUpdated(address reviewer, uint oldRep, uint newRep);
  event ArticlePublished(string id);

  function getReviewerReputation(address reviewer) public view returns (uint) {
    return reputation[reviewer];
  }

  function getPayloadCID(uint256 _tokenID) public view returns (string memory) {
    return payloadCID[_tokenID];
  }

  function addReviewer(address _reviewer) public onlyOwner {
    reputation[_reviewer] = initialRep;
    emit ReviewerAdded(_reviewer, initialRep);
  }

  function updateReviewerReputation(address _reviewer, bool action) public onlyOwner {
    uint oldRep = reputation[_reviewer];
    if (action) {
      reputation[_reviewer] = oldRep+upStep;
      if(reputation[_reviewer] > maxRep) {
        reputation[_reviewer] = maxRep;
      }
    } else {
      reputation[_reviewer] = oldRep-downStep;
      if(reputation[_reviewer] < minRep) {
        reputation[_reviewer] = minRep;
      }
    }
    emit ReviewerReputationUpdated(_reviewer, oldRep,  reputation[_reviewer]);
  }

  function addArticle(string memory _payloadCID, address author) public onlyOwner {
    _tokenIds.increment();
    uint256 newTokenId = _tokenIds.current();
    payloadCID[newTokenId] = _payloadCID;
    _mint(author,newTokenId);
    emit ArticlePublished(_payloadCID);
  }
}
