import axios from 'axios';

const client = axios.create()

client.defaults.baseURL = 'https://api.vandvietnam.com/api/pokemon-api';

// https://api.vandvietnam.com/api/pokemon-api/pokemons?page=1&limit=10
// https://api.vandvietnam.com/api/pokemon-api/pokemons/id
// https://api.vandvietnam.com/api/pokemon-api/types
// https://api.vandvietnam.com/api/pokemon-api/pokemons

client.interceptors.request.use(function (config) {
  if(config.params && Object.keys(config.params).length) {
    Object.keys(config.params).forEach((key) => {
      if(config.params[key] === '') {
        delete config.params[key]
      }
    })
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

client.interceptors.response.use(function (response) {
  
  if(response.data.status === false) {
    if(response?.data?.data?.errors) {
      // show error ['email is required', 'name is requied']
      throw new Error(Object.values(response.data.data.errors).flat()[0] as string) // 'email is requied'
    }
    if(response.data.messages) {
      throw new Error(response.data.messages)
    } 
    throw new Error('Unknow error')
  }
  return response;
}, function (error) {
    console.log(error.response.status === 401);
    return Promise.reject(error);
  });

export default client