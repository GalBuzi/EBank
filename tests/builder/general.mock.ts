import { IChangeStatusAccounts, IChangeStatusResponse } from "../../src/types/models.types";
import * as individualMock from '../builder/individual.mock.js';
import * as businessMock from '../builder/business.mock.js';
export const changeStatusAccounts : IChangeStatusAccounts = {
    "action" : "deactivate",
    "individuals" : [individualMock.individualDto],
    "businesses" : [businessMock.businessDto]
};

export const changeStatus : IChangeStatusResponse = {
    "ids" : [31,3],
    "status" : "INACTIVE"
}