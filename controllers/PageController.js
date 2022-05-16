import pageModel from "../models/PageModel.js";

let PageController;

export default PageController = {
  URLS_list: new Set(),
  URL_Object: "",
  PROTOCOL: "",
  BASE_URL: "",
  seenUrl: {},
  LIMIT: 200,
  crawl: async function (url) {

    // console.log("CRAWL ON  => ", url)

    if (this.seenUrl[url]) {
      return;
    }

    this.URL_Object = new URL(url);
    this.PROTOCOL = this.URL_Object.protocol + "//";
    this.BASE_URL = this.PROTOCOL + this.URL_Object.hostname;

    // console.log("URL  :  ", this.URL_Object)
    
    await pageModel.recoverURLs(url)

    this.seenUrl[url] = true;

    const urls = await pageModel.getUrls();

    urls.map(async u => {
      
     const valid_url = await this.validURL(u);
      console.log("URLS RE-CRAWL : ", u)
      if(valid_url) {
        if(this.getListUrls.size >= this.LIMIT) return;
        await this.crawl(valid_url)
        // console.log("RE-CRAWL : ", valid_url)
      }
    })
      
  },
  validURL: async function (url) {
    let valid_url = false;
    if (url.indexOf(this.PROTOCOL) !== 0 && url.indexOf("/") === 0) {
      valid_url = this.BASE_URL + url;
    } else if(url.indexOf(this.BASE_URL) === 0) {
      valid_url = url;
    }
    if(valid_url) {
      if(valid_url.endsWith('/')) valid_url = valid_url.slice(0, -1)
      await this.setUrl(valid_url)
    }
    return valid_url;
  },
  setUrl: async function(url) {
    this.URLS_list.add(url)
  },
  getListUrls: async function() {
    return [...this.URLS_list]
  },
  getListUrlsSize: async function() {
    return this.URLS_list.size
  }
}