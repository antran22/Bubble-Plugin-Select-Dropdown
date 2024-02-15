function(instance, properties, context) {
	properties.options =  {
        array: properties.options ? properties.options.get(0, properties.options.length()) : [], _id: Date.now()
    };
    properties.defaultValues = {
        array: properties.defaultValues ? properties.defaultValues.get(0, properties.defaultValues.length()) : [], _id: Date.now()
    };
    instance.data.properties = properties;
    instance.data._tryInject(25, properties);
}
