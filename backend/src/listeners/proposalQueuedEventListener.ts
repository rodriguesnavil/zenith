/** 
 * contract:Governor
 * event Name: ProposalQueued
 * Args: proposalId, eta(timelock)
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
         proposalId : args[0],
         eta : args[1]
        }
         let proposalService = new ProposalService(new ProposalModel());
         proposalService.updateProposalStatusToQueued(payload);
      });
  
      this.provider.on("error", (error: Error) => {
        console.error("Error:", error);
      });
    }
  }
  