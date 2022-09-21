const cacheName = "tiles";
const cacheAssets = [];

const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

self.addEventListener("install", (e) => {
  e.waitUntil(addResourcesToCache(["/tile.index.json"]));
});

const zxyregex = new RegExp(/worker\-server\/(\d+\/\d+\/\d+)\.webp/);

async function makeTile(tilearray) {
  const r = new Response(tilearray, {
    status: 200,
    headers: {
      "Content-Type": "image/webp",
    },
  });
  return r;
}

async function get(start, end) {
  const response = await fetch("/chunk.tile", {
    headers: {
      Range: `bytes=${start}-${end}`,
    },
  });

  const buf = await response.arrayBuffer();

  return buf;
}

self.addEventListener("fetch", (ev) => {
  const matches = zxyregex.exec(ev.request.url);
  if (matches) {
    ev.respondWith(
      caches
        .match("/tile.index.json")
        .then((r) => {
          return r.json();
        })
        .then((d) => {
          if (matches[1] in d) {
            // return new Response("hi")
            const [start, end] = d[matches[1]];
            return get(start, end).then((r) => {
              return makeTile(r);
            });
            // ev.respondWith(res);
          } else {
            return fetch(ev.request);
          }
        })
    );
  } else {
    console.log(`No matches found for ${ev.request}`);
    ev.respondWith(fetch(ev.request.url));
  }
});
