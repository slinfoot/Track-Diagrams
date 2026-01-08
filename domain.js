// Domain Logic
// Pure functions for handling track data calculations

const TrackDomain = (function() {
  function normalizeElr(elr) {
    const norm = (elr ?? '').toString().trim().toUpperCase();
    return norm || null;
  }

  function buildTracksByTid(route) {
    const tracksByTid = new Map();
    if (Array.isArray(route?.tracks)) {
      route.tracks.forEach(track => {
        const tid = track?.tid;
        if (tid === null || tid === undefined) return;
        const bucket = tracksByTid.get(tid);
        if (bucket) {
          bucket.push(track);
        } else {
          tracksByTid.set(tid, [track]);
        }
      });
    }
    return tracksByTid;
  }

  return {
    normalizeElr,
    buildTracksByTid
  };
})();
