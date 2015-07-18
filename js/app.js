var w = 800;
var h = 800;

var svg = d3.select("#map-body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

var color = d3.scale.category10();

d3.json("../data/japan.topojson", function(json) {
  var japan = topojson.object(json, json.objects.japan).geometries;
  // 投影法設定
  var projection = d3.geo.mercator()
    .center([137, 34])
    .translate([w/2, h/2])
    .scale(900);

  // 緯度経度 ⇒ パスデータ変換設定
  var path = d3.geo.path().projection(projection);

  // パスデータとして日本地図描画
  svg.selectAll("path")
    .data(japan)
    .enter()
    .append("path")
    .attr({
      "d": path,
      "stroke": "black",
      "stroke-width": 0.5
    })
    .style({
      "fill": function(d, i){ return color(i); },
    }).on({
      'click': function(d, i){
        console.log(d, i);
        console.log(d.x, d.y);
      }
    });

});
