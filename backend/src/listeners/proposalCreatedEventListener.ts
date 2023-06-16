/**
 * Contract: Governor
 * Event name: ProposalCreated
 * args: proposalId, proposer,targets, signatures, calldatas, voteStart,voteEnd,description
 */

import { ethers } from "ethers";
import * as GovernorContract from "../ABIs/GovernorContract.json";
import { PROVIDER_URL, GOVERNOR_ADDRESS } from "../helper-contract";
import ProposalService from "../services/proposal.service";
import {ProposalModel} from "../models/proposal/proposal.model";

export class EventListener {
  private provider: ethers.providers.JsonRpcProvider;
  private contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
    this.contract = new ethers.Contract(
      GOVERNOR_ADDRESS,
      GovernorContract.abi,
      this.provider
    );
  }
  public startListening(eventName: string): void {
    const eventFilter = this.contract.filters[eventName]();

    this.contract.on(eventFilter, (...args: any[]) => {
      const payload = {
        proposalId: args[0],
        proposer: args[1],
        targetContractAddress: args[2],
        etherSent: args[3],
        encodedCallData: args[5],
        voteStart: args[6],
        voteEnd: args[7],
        proposalDescription: args[8],
      };
      let proposalService = new ProposalService(new ProposalModel());
      proposalService.insertProposal(payload);
    });

    this.provider.on("error", (error: Error) => {
      console.error("Error:", error);
    });
  }
}
