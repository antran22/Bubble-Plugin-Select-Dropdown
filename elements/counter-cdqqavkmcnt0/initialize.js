function(instance, context) {
    /* SETUP: replace this variable accordingly. Make sure this matches the other instances. */
    const ELEMENT_NAME = "cz-multiselect";
    
    instance.data._elementReady = false;
    instance.data._element = document.createElement(ELEMENT_NAME);
    instance.canvas.append(instance.data._element);
    
    function tryInject(retryLeft, properties) {
        const element = instance.data._element;
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
        }
        if (!element.bubbleContext) {
            element.bubbleContext = context;
        }
    }
    
    instance.data._tryInject = tryInject;
    
    window.addEventListener("cz_plugin_loaded", (event) => {
        if (event.detail.packageName === "@citizendev/bubble-multi-select" && instance.data.properties) {
        	tryInject(10, instance.data.properties);
        }
    });
    
}