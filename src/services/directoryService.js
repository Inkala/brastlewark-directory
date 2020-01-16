import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://raw.githubusercontent.com/rrafols/mobile_test/master'
});

export default axiosInstance;

// class DirectoryService {
//   constructor() {
//     this.directory = axios.create({
//       baseURL: 'https://raw.githubusercontent.com/rrafols/mobile_test/master'
//     });
//   }

//   getAllGnomes() {
//     return this.directory.get('/data.json').then(response => response);
//   }

//   // getOneGnome(id) {
//   //   return this.directory.get(`gnomes/${id}`).then(response => response);
//   // }
// }

// const directoryService = new DirectoryService();

// export default directoryService;