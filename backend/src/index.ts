import * as apiSever from "./app";
import  * as ProposalCreatedEventListener from "./listeners/proposalCreatedEventListener";
import  * as VoteCastEventListener from "./listeners/voteCastEventListener";
import  * as ProposalQueuedEventListener from "./listeners/proposalQueuedEventListener";
import  * as ProposalExecutedEventListener from "./listeners/proposalExecutedEventListener";


const proposalCreatedEventListener =  new ProposalCreatedEventListener.EventListener();
const voteCastEventListener =  new VoteCastEventListener.EventListener();
const proposalQueuedEventListener =  new ProposalQueuedEventListener.EventListener();
const proposalExecutedEventListener =  new ProposalExecutedEventListener.EventListener();

proposalCreatedEventListener.startListening('ProposalCreated')
voteCastEventListener.startListening('VoteCast')
proposalQueuedEventListener.startListening('ProposalQueued')
proposalExecutedEventListener.startListening('ProposalExecuted')

apiSever.start();