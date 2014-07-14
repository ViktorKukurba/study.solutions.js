(function () {
  d3.helper = {};
  d3.helper.tooltip = function () {
    return function (selection) {
      var tooltipDiv;
      var bodyNode = d3.select('body').node();
      selection.on("mouseover",function (e) {
        d3.select('body').selectAll('div.tooltip').remove();
        tooltipDiv = d3.select('body').append('div').attr('class', 'tooltip');
        var absoluteMousePos = d3.mouse(bodyNode);
        tooltipDiv.style('left', (absoluteMousePos[0] + 10) + 'px')
          .style('top', (absoluteMousePos[1] - 15) + 'px')
          .style('position', 'absolute')
          .style('z-index', 1001);
      }).on('mousemove',function (e) {
          var absoluteMousePos = d3.mouse(bodyNode);
          tooltipDiv.style('left', (absoluteMousePos[0] - 30) + 'px')
            .style('top', (absoluteMousePos[1] - 45) + 'px');
          tooltipDiv.html(e.properties.NAME10);

        }).on("mouseout", function () {
          tooltipDiv.remove();
        });
    };
  };
  var CHART_CONFIG = { width: 870,
      height: 500
    },
    //GEO_JSON = 'json/us2.json',
    GEO_JSON = 'json/states-counties.json',
    _topology,
    _path,
    _zoom,
    _projection,
    _svg,
    _gStates,
    _centered,
    _gCounties,
    contains = function (a, value) {
      if (!a || !value) return false;
      for (var i = 0; i < a.length; i++) {
        if (a[i] === value) {
          return true;
        }
      }
      return false;
    },
    drawResolution = {
      states: function (states) {
        if (!_gStates) {
          _svg.append("rect")
            .attr("class", "background")
            .attr("width", CHART_CONFIG.width)
            .attr("height", CHART_CONFIG.height)
            //.on("click", clicked);
          _gStates = _svg.append("g").call(_zoom);
          var data = topojson.feature(_topology, _topology.objects['states']).features;
          _gStates.append("g")
            .attr("id", "states")
            .selectAll("path")
            .datum(topojson.mesh(_topology, _topology.objects['states'], function(a, b) {
              console.log(a.properties.STUSPS10, b.properties.STUSPS10);
              return true;//a !== b;
            }))
            .append("path")
            //.on("click", clicked)
            .attr("d", _path).call(d3.helper.tooltip());

          _gStates.append("path")
            .attr("id", "state-borders")
            .attr("d", _path);
          _gStates.selectAll("text")
            .data(data)
            .enter()
            .append("svg:text")
            .text(function (d) {
              return d.properties.STUSPS10;
            })
            .attr("x", function (d) {
              return _path.centroid(d)[0];
            })
            .attr("y", function (d) {
              return  _path.centroid(d)[1];
            })
            .attr("text-anchor", "middle")
            .attr('font-size', '6pt').classed("active", function (d) {
              return contains(states, d.properties.GEOID10);
            })
        }
        showStates(states);
      },
      counties: function (counties) {
        if (!_gCounties) {
          _gCounties = _svg.append("g").call(_zoom);;
          var data = topojson.feature(_topology, _topology.objects['counties']).features;
          _gCounties.append("g")
            .attr("id", "counties")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .attr("d", _path)
            .classed("county", true);
        }
        showCounties(counties);
      }
    };

  function showStates(states) {
    if (_gCounties) {
      _gCounties.selectAll('path.county').each(function (d, i) {
        this.style.display = 'none';
      });
    }
    _gStates.selectAll("path").classed("active", function (d) {
      if (d && d.properties) {
        return contains(states, d.properties.GEOID10);
      }
    });
  }

  function showCounties(counties) {
    if (_gStates) {
      _gStates.selectAll('path.active').attr('class', '');
    }
    _gCounties.selectAll('path.county').each(function (d, i) {
      this.style.display = 'block';
    }).classed("active", function (d) {
        if (d && d.properties) {
          return contains(counties, d.properties.GEOID10);
        }
      });
  }

  function clicked(d) {
    var x, y, k;
    if (d && _centered !== d) {
      var centroid = _path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = 4;
      _centered = d;
    } else {
      x = CHART_CONFIG.width / 2;
      y = CHART_CONFIG.height / 2;
      k = 1;
      _centered = null;
    }

    _gStates.selectAll("path")
      .classed("zoomed", _centered && function (d) {
        return d === _centered;
      });

    _gStates.transition()
      .duration(750)
      .attr("transform", "translate(" + CHART_CONFIG.width / 2 + "," + CHART_CONFIG.height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
  }
  var zooming = false;
  function zoomed(e) {
    if(zooming) return;
    zooming = true;
    console.log(e, 'zoomed', zooming);
    _projection.translate(d3.event.translate).scale(d3.event.scale);
    var test = _gStates.selectAll("path").attr("d", _path);
    var test2 = _gCounties && _gCounties.selectAll("path").attr("d", _path);
    console.log(test.length, test2 && test2.length);
    _gStates.selectAll("text").attr("x", function (d) {
        return _path.centroid(d)[0];
      })
      .attr("y", function (d) {
        return  _path.centroid(d)[1];
      })
      .attr("text-anchor", "middle").classed("active", function (d) {
        return contains(states, d.properties.GEOID10);
      });
    zooming = false;
  }

  window.GeoChart = {
    init: function (resolution) {
      resolution = resolution || 'states';
      _projection = d3.geo.albersUsa()
        .scale(1070)
        .translate([CHART_CONFIG.width / 2, CHART_CONFIG.height / 2])
        .precision(.1);
      _path = d3.geo.path().projection(_projection);
        _zoom = d3.behavior.zoom()
          .translate(_projection.translate())
          .scale(_projection.scale())
          .scaleExtent([CHART_CONFIG.width, 8 * CHART_CONFIG.height])
          .on("zoom", zoomed);
      _svg = d3.select("#market-chart svg")
        .attr("width", CHART_CONFIG.width)
        .attr("height", CHART_CONFIG.height);
      d3.json(GEO_JSON, function (error, topology) {
        _topology = topology;
        drawResolution[resolution]();
      });
    },
    render: function (resolution, selected) {
      resolution = resolution || 'states';
      selected = selected || (resolution === 'counties' ? ["02014", "03013", "03213", "01013", "01023", "01019"] : ['02', '24', '34', '51']);
      drawResolution[resolution] && drawResolution[resolution](selected);
    }
  };
})();
