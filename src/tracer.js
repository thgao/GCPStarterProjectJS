const {NodeTracerProvider} = require('@opentelemetry/node');
const opentelemetry = require('@opentelemetry/api');
const {SimpleSpanProcessor} = require('@opentelemetry/tracing');
const { TraceExporter } = require('@google-cloud/opentelemetry-cloud-trace-exporter');
const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");
const { B3Propagator } = require("@opentelemetry/core");

module.exports = (serviceName) => {
const projectId ='healthy-earth-276916';

const traceExporter = new TraceExporter({
  // If you are not in a GCP environment, you will need to provide your
  // service account key here. See the Authentication section below.
  //serviceName: serviceName,
  projectId: projectId,
  // keyFile: '~/.config/gcloud/application_default_credentials.json',
  // keyFileName: '~/.config/gcloud/application_default_credentials.json',
});

// const traceExporter = new ZipkinExporter({
//   serviceName: serviceName,
//   // If you are running your tracing backend on another host,
//   // you can point to it using the `url` parameter of the
//   // exporter config.
// })

const tracerProvider = new NodeTracerProvider({
  plugins: {
    express: {
      enabled: true,
      // You may use a package name or absolute path to the file.
      path: '@opentelemetry/plugin-express',
      // http plugin options
    }
  }
});

/**
 * The SimpleSpanProcessor does no batching and exports spans
 * immediately when they end. For most production use cases,
 * OpenTelemetry recommends use of the BatchSpanProcessor.
 */

tracerProvider.addSpanProcessor(new SimpleSpanProcessor(traceExporter));
tracerProvider.register({
  // Use B3 Propagation
  propagator: new B3Propagator(),
});

opentelemetry.trace.setGlobalTracerProvider(tracerProvider);
return opentelemetry.trace.getTracer('default');
};