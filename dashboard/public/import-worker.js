// Reads dropped results files off the page's thread with zp_core.js — the
// phone's own parsers compiled from Dart (rangeai packages/zp_core,
// tool/build_js.sh copies it here). Message in: { id, request } where
// request is ImportApi.plan's JSON; message out: { id, reply }.
self.importScripts("/zp_core.js");

self.onmessage = (e) => {
  const { id, request } = e.data;
  let reply;
  try {
    reply = JSON.parse(self.zpCore.plan(JSON.stringify(request)));
  } catch (err) {
    reply = { error: String(err), code: "failed" };
  }
  self.postMessage({ id, reply });
};
