import { Request, Response, NextFunction } from "express";
import { ethers } from 'ethers';
import {getZenithAddressAndABI} from "../../helper-contract"

const helloWorld = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const zenithContract = await getZenithAddressAndABI();
      const data = await zenithContract.initialRep()
      console.log(data.toNumber())
        return res.send({
            success: true,
            data: "Hello Hell!"
        })
    } catch (e) {
        console.log(e);
        return next(e);
    }
}

export {
    helloWorld
}