import axios from "axios";
export const API_URL = "https://assesmen-api-f48c633df132.herokuapp.com/api/";
// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
  baseURL: API_URL,
});

/**
 * Use this to create an menu item.
 *
 * @function
 * @param   {string} data  Object
 * @return  {object}
 */
export const createMenu = async (data) => {
  return api({
    url: "menuitems/",
    method: "post",
    data: data,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

/**
 * Use this to update menu item.
 *
 * @function
 * @param   {string} id  String
 * @param   {string} data  Object
 * @return  {object}
 */
export const updateMenu = async (id, data) => {
  return api({
    url: `menuitems/${id}/`,
    method: "put",
    data: data,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

/**
 * Get Menu list .
 *
 * @function
 * @return  {object}
 */
export const getMenus = async () => {
  return api({
    url: "menuitems",
    method: "get",
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

/**
 * Use this to get one item.
 *
 * @function
 * @param   {string} id  String
 * @return  {object}
 */
export const getOneMenu = async (id) => {
  return api({
    url: `menuitems/${id}`,
    method: "get",
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

/**
 * Use this to delete menu.
 *
 * @function
 * @param   {string} id  String
 * @return  {object}
 */
export const deleteMenu = async (id) => {
  return api({
    url: `menuitems/${id}/`,
    method: "delete",
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
