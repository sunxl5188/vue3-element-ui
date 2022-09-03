import { fetch } from "../axios";

const home = {
  getList(): void {
    fetch("index/index/login").then((response: any) => {
      console.log(response);
    });
  },
};

export default home;
