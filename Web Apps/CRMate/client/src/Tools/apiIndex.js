// all the http related api goes here
import axios from "axios";
import {getUserId} from "../Tools/utils"

export const url =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_URL
    : process.env.REACT_APP_PROD_URL;

export const logoutUrl = process.env.NODE_ENV === "development" 
? process.env.REACT_APP_FRONTEND_URL : process.env.REACT_APP_PROD_URL; 

 const exportData = (filename, format) => {
   return axios.get(`${url}/data/${getUserId()}/export?filename=${filename}&format=${format}`,     {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access token")}`,
    },
  })
 }

 const importData = (file) => {
   const data = new FormData()
   data.append('file', file)
   return axios.post(`${url}/data/${getUserId()}/import`, data,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access token")}`,
    },
  } )

 }

 const makeNewContact = (id, body) => {
  return axios.post(`${url}/users/${id}/people/add`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access token")}`,
    },
  });
};

// TODO: should be async?
 const updateContact = (id, contactId, body) => {
  return axios.post(`${url}/users/${id}/people/${contactId}`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access token")}`,
    },
  });
};


// TODO: should be async?
 const deleteContact = (id, contactId) => {
  return axios.delete(`${url}/users/${id}/people/${contactId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access token")}`,
    },
  });
};

export const getPeople = async (id) => {
  const response = await axios.get(`${url}/users/${getUserId()}/people`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access token")}`,
    },
  });
  return response.data;
};

 const query = async (id, searchBy, value) => {
  var query = "";

  if (searchBy === "Tags") {
    // handle multiple tag search
    const splitVal = value.split(" ");

    if (splitVal.length === 1) {
      query += `tag=${splitVal[0]}`;
    } else {
      for (var i = 0; i < splitVal.length; i++) {
        if (i === splitVal.length - 1) {
          query += `tag=${splitVal[i]}`;
        } else {
          query += `tag=${splitVal[i]}&`;
        }
      }
    }
  } else {
    // searching by other than tags
    query = `${searchBy.toLowerCase()}=${value}`;
  }

  const response = await axios.get(
    `${url}/users/${id}/people/search?${query}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access token")}`,
      },
    }
  );
  return response.data;
};





const apiService = {
  makeNewContact,
  updateContact,
  deleteContact,
  getPeople,
  query,
  exportData,
  importData

}


export default apiService;