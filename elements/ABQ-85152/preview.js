function(instance, properties) {
    function loadJS(url, module = false, onFinish) {
        let scriptEle = document.createElement("script");
        if (onFinish) {
            scriptEle.onload = onFinish;
        }
        scriptEle.type =  module ? "module" : "text/javascript";
        scriptEle.async = false;
        scriptEle.src = url;
        document.head.appendChild(scriptEle);
    }

    const ELEMENT_NAME = "cz-single-select";

    loadJS("https://www.unpkg.com/@citizendev/plugin-loader@^0.0.4/dist/index.umd.js", false, () => {
        window.CDPluginLoader.loadPlugin({
            packageName: "@citizendev/bubble-multi-select",
			packageVersion: "0.0.12",
			/* Set it to something to load from Vite. For example http://localhost:5173/ (ending slash needed) */
            /* devServer: "http://localhost:5173/", */             
            dependencies: {
                preact: "^10.19.3",
                preactSignal: "^1.2.2",
                preactSignalCore: "^1.5.1",
                preactCE: "^4.2.1",
            },
        });
        
        
        const element = document.createElement(ELEMENT_NAME);
        instance.canvas.append(element);

        function tryInject(retryLeft, properties) {
            if (!retryLeft || retryLeft <= 0 || !element) {
                return;
            }
            if (!element._vdom) {
                setTimeout(() => tryInject(retryLeft - 1, properties), 200);
                return;
            }

            element.properties = properties;

            if (!element.instance) {
                element.instance = instance;
                element.isPreview = true;
            }
        }

        tryInject(100, properties);
    });
}