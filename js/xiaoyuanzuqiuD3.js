
		var width = 800;
		var height = 400;

		var svg = d3.select("#china")
					.append("svg") 
					.attr("width", width)
					.attr("height", height);

		var china_g = svg.append("g");

		var projection = d3.geoMercator()

		var geoGenerator = d3.geoPath()
			.projection(projection);

		var colorScale = d3.scaleOrdinal(d3.schemeCategory20b);
		var colorScale2 = d3.scaleLinear().range(["#99f1cb", "#3d775e"]);

var tooltip = d3.select("#china").append("div").classed("tooltip", true);




		// we use queue because we have 2 data files to load.
		queue()
		    .defer(d3.json, "data/china_diaoyudao.json")
		    .defer(d3.csv, "data/zuqiuxuexiao.csv", typeAndSet)
		    .await(loaded);

     // var district11 = ["北京","新疆","上海"]

		var districtByName = d3.map();
		

		function typeAndSet(d){
			d.zongshu = +d.zongshu;
			d.xiaoxue = +d.xiaoxue;
			d.zhongxue = +d.zhongxue;
			districtByName.set(d.district, d)
			return d;
		}

//districtByName.keys(district)
//		console.log(districtByName)

		
		function getColor(d){
			var district = districtByName.get(d.properties.name);
			// console.log(district)

			if(district){
				//console.log(colorScale2(district.wenmang))
				return colorScale2(district.zongshu);
			}else{
				return "#ccc";
			}
		}

		function loaded(error, china, gdp){
			if(error) throw error;

			console.log(gdp);

			colorScale2.domain(d3.extent(gdp, function(g){
				return g.zongshu;
			}))

			projection.fitSize([800, 400], china);

			var china = china_g.selectAll("path")
				.data(china.features);

			china.enter()
				.append("path")
				.attr("d", geoGenerator)
				// .attr("fill", function(d,i){ return colorScale(i); })
				.attr("fill", function(d){ return getColor(d); })
			   .on("mouseover",overFunc)
		       .on("mousemove",moveFunc)
			   .on("mouseout",outFunc);

			// The d3-legend component is called here:

			var linear = colorScale2;

			svg.append("g")
				.attr("class", "legendLinear")
				.attr("transform", "translate(20,20)");

			var legendLinear = d3.legendColor()
				.shapeWidth(30)
				.orient("vertical")
				.labelFormat(d3.format(".0f"))
				.scale(linear);

			svg.select(".legendLinear")
				.call(legendLinear);

		}


function overFunc(d){
	 d3.select(this)
            .transition()
            .style("stroke", "#fcecaa")
            .style("stroke-width","2px");
//var parent = d3.select(this).node().parentNode.__data__;

		tooltip.style("display",null)
		.html(
			"<p>地区: " + d.properties.name+ 
                "<br>总数：" + districtByName.get(d.properties.name)["zongshu"]
                +
                "<br>特色小学：" + districtByName.get(d.properties.name)["xiaoxue"]
                +
                 "<br>特色中学：" + districtByName.get(d.properties.name)["zhongxue"]
                +
                 /* "<br>Year: " + formatDate(parseDate(d.data.Year)) +*/ " </p>" )
		
	;
		/*
		       .html(function(){
					 if(formatTime(d.Year)  === "2003年"){  //youwenti
						return "<p>" + formatTime(d.Year) + "<br>至少做1次产检的比例：" + d.NationalRate + "%" + "<br>非典的出现一定程度影响了就医情况</p>";
					 }else{
					    return  "<p>" + formatTime(d.Year) + "<br>至少做1次产检的比例：" + d.NationalRate + "%</p>";
					 }});
					 */
		
			   
		
	}
	
	function moveFunc(d){
		tooltip.style("top",(d3.event.pageY -10) + "px")
		       .style("left",(d3.event.pageX + 10) + "px");
	}
	
	function outFunc(d){
		d3.select(this)
            .transition()
            .style("stroke", "white")
            .style("stroke-width","0.5px");
		tooltip.style("display","none");
		
		
		  
	}