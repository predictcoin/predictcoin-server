import Bugsnag from "@bugsnag/js";
Bugsnag.start({ 
  apiKey: process.env.BUGSNAG_API_KEY!,
  releaseStage: process.env.NODE_ENV
});

export default Bugsnag;