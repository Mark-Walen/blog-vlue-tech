import {
  flowRendererV2,
  flowStyles
} from "./chunk-Z6I5LGBU.js";
import "./chunk-UYQ2WUJB.js";
import {
  flowDb,
  parser$1
} from "./chunk-J76JEI5P.js";
import "./chunk-CKA2ORGO.js";
import "./chunk-I5QTNXUX.js";
import "./chunk-4UFF4LJD.js";
import "./chunk-UC64OMR7.js";
import "./chunk-Q4MPXY4M.js";
import "./chunk-4FS3NCS3.js";
import {
  require_dist
} from "./chunk-7S4WKUPM.js";
import {
  require_dayjs_min,
  setConfig
} from "./chunk-3MP44TXF.js";
import {
  __toESM
} from "./chunk-OZI5HTJH.js";

// node_modules/mermaid/dist/flowDiagram-v2-8e52592d.js
var import_sanitize_url = __toESM(require_dist(), 1);
var import_dayjs = __toESM(require_dayjs_min(), 1);
var diagram = {
  parser: parser$1,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};
export {
  diagram
};
//# sourceMappingURL=flowDiagram-v2-8e52592d-DCAQIH7G.js.map
