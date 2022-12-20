/** Helper functions for retrieving and searching for contacts */
import { getUserId } from "../../Tools/utils";
import dp3 from "../../Assets/dp3.svg";
import apiService from "../../Tools/apiIndex";
import "./People.css";

export const loadFullData = async () => {
  let response = await apiService.getPeople();
  // temporary profile pic
  response.forEach((e) => {
    e.profilePic = dp3;
  });
  return response;
};

export const searchByParams = async (by, value) => {
  let response = await apiService.query(getUserId(), by, value);
  // temporary profile pic
  response.forEach((e) => {
    e.profilePic = dp3;
  });
  return response;
}

export const getFavorites = async () => {
  let response = await apiService.query(getUserId(), 'favorite', 'all' );
  response.forEach((e) => {
    e.profilePic = dp3;
  });
  return response;
}

let peopleService = {
  loadFullData,
  searchByParams,
  getFavorites
}

export default peopleService;
