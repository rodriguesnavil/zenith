// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Zenith is Ownable {
  uint public initialRep = 500;
  uint public upStep = 10;
  uint public downStep = 5;
  uint public maxRep = 1000;
  uint public minRep = 1;

  /** A mapping to store reputation of reviewers.
      If reviewer doesn't exsists, 0 is returned. 
      Otherwise some numeric value.     
  */
  mapping(address => uint) public reputation;
  /** A mapping to store article status.
      If article doesn't exsists, false is returned. 
      Otherwise true.     
  */
  mapping(string => bool) public isPublished;

  // Emitted when the stored value changes
  event ReviewerAdded(address reviewer, uint rep);
  event ReviewerReputationUpdated(address reviewer, uint oldRep, uint newRep);
  event ArticlePublished(string id);

  function getReviewerReputation(address reviewer) public view returns (uint) {
    return reputation[reviewer];
  }

  function isArticlePublished(string memory _id) public view returns (bool) {
    return isPublished[_id];
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

  function addArticle(string memory _id) public onlyOwner {
    isPublished[_id] = true;
    emit ArticlePublished(_id);
  }
}
