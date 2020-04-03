import { options } from "preact";

export const installTracer = path => {
  let old = options.vnode;
  options.vnode = vnode => {
    const trace = new Error().stack;
    console.log(trace);
    let lines = trace.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (
        (lines[i].indexOf("at h ") > 0 || lines[i].indexOf("h@") > 0) &&
        (lines[i + 1].indexOf("!./") > 0 || lines[i + 1].indexOf("/./") > 0)
      ) {
        console.log(lines[i + 1]);
        const values = lines[i + 1].split(":");
        const col = values[values.length - 1].replace(/\D/g, "");
        const line = values[values.length - 2].replace(/\D/g, "");
        const fileParts = values[values.length - 3].split("/");
        let file = fileParts[fileParts.length - 1];
        file = file === "" ? "index.html" : file;
        let subPath = "";
        for (let i = fileParts.length - 2; i > 0; i--) {
          if (!fileParts[i].endsWith(".")) {
            subPath = fileParts[i] + "/" + subPath;
          } else {
            break;
          }
        }

        const url = `vscode://file${path}/${subPath}${file}:${line}:${col}`;
        vnode.attributes = vnode.attributes || {};
        if (!vnode.attributes.title) {
          vnode.attributes.title = url;
          vnode.attributes.onmousedown = event => {
            if (event.shiftKey) {
              window.open(url, "_blank");
            }
          };
          console.log(url);
        }
      }
      if (old) old(vnode);
    }
  };
};
