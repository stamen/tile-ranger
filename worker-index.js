navigator.serviceWorker.register("./tile-worker.js", {
  scope: './',
});
(async function () {
  const map = new maplibregl.Map({
    container: "map", // container id
    style: {
      version: 8,
      sources: {
        "raster-tiles": {
          type: "raster",
          tiles: ["worker-server/{z}/{x}/{y}.webp"],
          tileSize: 256,
          maxzoom: 16,
        },
      },
      layers: [
        {
          id: "simple-tiles",
          type: "raster",
          source: "raster-tiles",
          minzoom: 0,
          maxzoom: 22,
        },
      ],
    },
    center: [-122.56572332003616, 47.31040904747115], // starting position
    zoom: 14,
  });
})();
