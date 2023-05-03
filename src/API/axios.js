import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://randomuser.me/api/?results=100',
};

export function getUsers(){
    axios.request(options).then(function (response) {
        console.log(response.data.results);
        values = response.data.results;
    }).catch(function (error) {
        console.error(error);

    });
}
