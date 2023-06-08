// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Zenith is Ownable {
  
  uint public initialRep  = 500;
  
  mapping(address=>uint) public reputation;
  mapping(string=>bool) public isPublished;
  

  // Emitted when the stored value changes
  event ReviewerAdded(address reviewer, uint rep);
  event ReviewerReputationUpdated(address reviewer, uint oldRep, uint newRep);
  event ArticlePublished(string id);

  /** A mapping to store reputation of reviewers.
      If reviewer doesn't exsists, 0 is returned. 
      Otherwise some numeric value.     
  */ 
  function getReviewerReputation(address reviewer) view public returns(uint) {
    return reputation[reviewer];
  }

  function isArticlePublished(string memory _id) view public returns(bool){
    return isPublished[_id];
  }

  function addReviewer(address _reviewer) public onlyOwner {
    reputation[_reviewer] = initialRep;
    emit ReviewerAdded(_reviewer, initialRep);
  }
  function updateReviewerReputation(address _reviewer, uint newRep) public onlyOwner{
    uint oldRep =  reputation[_reviewer];
    reputation[_reviewer] = newRep;
    emit ReviewerReputationUpdated(_reviewer,oldRep,newRep);
  }
  function addArticle(string memory _id) public onlyOwner {
    isPublished[_id] = true;
   emit ArticlePublished(_id); 
  }
  
 }
