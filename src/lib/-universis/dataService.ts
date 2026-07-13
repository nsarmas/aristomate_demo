// import { universisGet as internalUniversisGet } from "./universisAuthentication/universisDataService";
import { apiRequest as internalUniversisGet } from "./dataService/core";

// This is a wrapper for the Universis API.
// It's a simple GET request with a token in the header.
export const universisGet = async (endpoint: string) => {

  const response = await internalUniversisGet(endpoint);
  return response;
  
};
