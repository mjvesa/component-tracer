export const installTracer = path => {
  document.createElement = (create => {
    return function() {
      const el = create.apply(this, arguments);
      const trace = new Error().stack;
      const lines = trace.split("\n");
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].indexOf("createElement") > 0) {
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
          el.setAttribute("title", `${subPath}${file}:${line}:${col}`);
          el.onmousedown = event => {
            if (event.shiftKey) {
              window.open(url, "_blank");
            }
          };
        }
      }
      return el;
    };
  })(document.createElement);
};
