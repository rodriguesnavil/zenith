// src/services/ApiService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getUser = async (address) => {
  try {
    const response = await apiClient.get(`/v1/user/${address}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user: ${error}`);
    throw error;
  }
};

export const registerUser = async (user) => {
  try {
    const response = await apiClient.post('/v1/user', user);
    return response.data;
  } catch (error) {
    console.error(`Failed to register user: ${error}`);
    throw error;
  }
};

export const submitPaper = async (paperFormData) => {
  try {
    const response = await apiClient.post('/v1/article', paperFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to submit paper: ${error}`);
    throw error;
  }
};

export const getAllArticles = async () => {
  try {
    const response = await apiClient.get('/v1/getAllArticles');
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch articles: ${error}`);
    throw error;
  }
}

export const getReviewers = async () => {
  try {
    const response = await apiClient.get('/v1/reviewers');
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch reviewers: ${error}`);
    throw error;
  }
}

export const assignReviewer = async (payload) => {
  try {
    const response = await apiClient.post(`/v1/article/assignReviewers`, payload);
    return response.data;
  } catch (error) {
    console.error(`Failed to assign reviewer: ${error}`);
    throw error;
  }
}

export const getUserByWalletAddress = async (walletAddress) => {
  try {
    const response = await apiClient.get(`/v1/user/${walletAddress}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user: ${error}`);
    throw error;
  }
}

export const getAssignedArticles = async (walletAddress) => {
  try {
    let payload = {
      reviewersWalletAddress: walletAddress
    }
    const response = await apiClient.post(`/v1/article/getAssignedArticles`, payload);
    // in above response add new field pdf with the value https://www.orimi.com/pdf-test.pdf
    console.log(`response.data.response ${JSON.stringify(response.data.data.response)}`)
    response.data.data.response.forEach(element => {
      element.pdf = "https://www.orimi.com/pdf-test.pdf"
    });

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch assigned articles: ${error}`);
    throw error;
  }
}

export const proposeArticle = async (articleId) => {
  try {
    const response = await apiClient.get(`/v1/article/propose/${articleId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to propose article: ${error}`);
    throw error;
  }
}

export const queueAndExecuteArticle = async (articleId, walletAddressArray, filePath) => {
  try {
    let fileName = filePath.split('/').pop();
    console.log(`fileName ${fileName}`)
    const response = await apiClient.get(`/v1/article/getParams/${fileName}`);
    console.log(`response.data ${JSON.stringify(response)}`)

    let queueAndExecutePayload = {
      payloadCID: response.data.data.response.label,
      authorWalletAddress: walletAddressArray[0],
      description: "New description 34",
    }

    const queueResponse = await apiClient.post(`/v1/article/queue`, queueAndExecutePayload);

    const executeResponse = await new Promise((resolve, reject) => {
      // Use setTimeout to delay the execution of the next API call
      setTimeout(async () => {
        try {
          const result = await apiClient.post(`/v1/article/execute`, queueAndExecutePayload);
          resolve(result);
        } catch (error) {
          console.error(`Failed to execute article: ${error}`);
          reject(error);
        }
      }, 90000); // 90000 milliseconds is equivalent to 1 minute and 30 seconds
    });

    if (queueResponse && executeResponse) {
      return {
        queueResponse: queueResponse,
        executeResponse: executeResponse
      };
    } else {
      throw new Error('Failed to get successful responses from queue or execute operations');
    }

  } catch (error) {
    console.error(`Failed to queue and execute article: ${error}`);
    throw error;
  }
}

export const publishArticle = async (articleId, filePath) => {
  try {
    console.log(`now in publishArticle`)
    let filename = filePath.split('/').pop();
    let payload = {
      filename,
      startEpoch: "20000",
      endEpoch: "1000000",
    }
    const response = await apiClient.post(`/v1/makeDeal`, payload);
    return response.data;
  } catch (error) {
    console.error(`Failed to publish article: ${error}`);
    throw error;
  }
}

export const getProposalsWithVotingStatus = async () => {
  try {
    const response = await apiClient.get(`/v1/proposal/getProposalsWithVotingStatus`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch proposals with voting status: ${error}`);
    throw error;
  }
}

export const castVote = async (payload) => {
  try {
    const response = await apiClient.post(`/v1/article/vote`, payload);
    return response.data;
  } catch (error) {
    console.error(`Failed to cast vote: ${error}`);
    throw error;
  }
}

export const insetComment = async (payload) => {
  try {
    const response = await apiClient.post(`/v1/comment/insertComment`, payload);
    return response.data;
  } catch (error) {
    console.error(`Failed to submit review: ${error}`);
    throw error;
  }
}