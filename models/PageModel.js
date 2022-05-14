import axios from 'axios';
import * as cheerio from 'cheerio';

let pageModel;

export default pageModel = {
  URLS_LIST: new Set(),

  recoverURLs: async function (url) {

      try {
        // Get Content Page
        const contentPage = await axios.get(url);
        // Load DOM Content page
        const $ = cheerio.load(contentPage.data);
        // Hydrate links SET & check if absolut url to add baseUrl
        $('a').map( async (_,link) => {
          await this.setUrl(link.attribs.href);
        });

      } catch (error) {
          console.error(error);
      }
  },
  setUrl: function(url) {
    // console.log("URL ADDED : ", url)
    this.URLS_LIST.add(url)
  },
  getUrls: async function () {
    return [...this.URLS_LIST];
  },
  resetUrls: function () {
    if (this.URLS_LIST.size > 0) {
      this.URLS_LIST.clear
      console.log("PageModal -  CLEAR SET", this.URLS_LIST.size + " url deleted")
    }
  }
}

// export default class PageModel {

//   constructor(url) {
//     this.URL_Object = new URL(url)
//     this.PROTOCOL = this.URL_Object.protocol + "//";
//     this.BASE_URL = this.PROTOCOL + this.URL_Object.hostname;
//     this.URL_tested = url;

//     this.URLS_LIST_LIST = new Set()
//   }

//   async recoverURLs(url, already_tested = false) {
//     try {

//       console.log("URL TESTED \n =>", this.URL_tested)

//       // Get Content Page
//       const contentPage = await axios.get(this.URL_tested);
//       // Load DOM Content page
//       const $ = cheerio.load(contentPage.data);
//       // Hydrate links SET & check if absolut url to add baseUrl
//       $('a').map((_, link) => {
//         this.validURL(link).then((u) => {
//           if(u) this.setUrl(u)
//         })
//       });
      
//     } catch (error) {
//       // if(error = axios.isAxiosError) console.error("L'url fournie n'est pas valide");
//       console.error(error)
//     }
//   }
//   async setUrl (url) {
//     this.URLS_LIST.add(url)
//   }
//   async getUrls () {
//     return [...this.URLS_LIST];
//   }
//   validURL (url) {
//     if(url) {
//       let valid_url = false;
//       if (url.indexOf(this.PROTOCOL) !== 0 && url.indexOf("/") === 0) {
//         valid_url = this.BASE_URL + url;
//       } else if(url.indexOf(this.BASE_URL) === 0) {
//         valid_url = url;
//       } 
//       this.setUrl(valid_url);
//       return valid_url
//     }
//     return false;
//   }
//   // async resetUrls () {
//   //   if (this.URLS_LIST.size > 0) {
//   //     this.URLS_LIST.clear
//   //     console.log("PageModal -  CLEAR SET", this.URLS_LIST.size + " url deleted")
//   //   }
//   // }
// }