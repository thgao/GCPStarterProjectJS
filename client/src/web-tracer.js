const {CollectorExporter} = require('@opentelemetry/exporter-collector');
const {SimpleSpanProcessor} = require( '@opentelemetry/tracing');
const {DocumentLoad} = require('@opentelemetry/plugin-document-load');
const {WebTracerProvider} = require( '@opentelemetry/web');
const {BatchSpanProcessor} = require( '@opentelemetry/tracing');
const {XMLHttpRequestPlugin} = require( '@opentelemetry/plugin-xml-http-request');
const {ZoneScopeManager} = require( '@opentelemetry/scope-zone');
const opentelemetry = require('@opentelemetry/api');

module.exports = (serviceName) => {
    const collectorURL = 'http://34.69.66.237:80/v1/trace'; //collector currently doployed on GKE
    const webTracer = new WebTracerProvider({
    plugins: [
        new DocumentLoad(),
    ],
    });
    const collectorOptions = {
    url: collectorURL,
    };
    const exporter = new CollectorExporter(collectorOptions);
    webTracer.addSpanProcessor(new SimpleSpanProcessor(exporter));

    const webTracerWithZone = new WebTracerProvider({
        scopeManager: new ZoneScopeManager(),
        plugins: [
        new XMLHttpRequestPlugin({
            ignoreUrls: ['/log', '/trace'],
        }),
        ],
    });

  webTracerWithZone.addSpanProcessor(new BatchSpanProcessor(exporter));
  opentelemetry.trace.setGlobalTracerProvider(webTracerWithZone);
    return opentelemetry.trace.getTracer('default');
};

