import { App } from "vue";
import { Button } from "vant";

const components = [Button];

const Vant = {
  install: (app: App): void => {
    for (const component of components) {
      app.use(component);
    }
  },
};

export default Vant;
