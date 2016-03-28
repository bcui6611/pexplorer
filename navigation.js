function load() {
	var root;
	d3.json("objects.json", function(err, jsondata) {
		if (err) throw err;
		root = jsondata;
		root.forEach(function(d, i) {
            	buildNav(null, d)})
	});


    function buildNav(parent_ul, node){
        var current_ul, current_li;
        if(parent_ul == null)
            parent_ul = d3.select("body").append("ul");
        current_li = parent_ul.append("li").text(node.name);
        if (node.children) {
            current_ul = current_li.append("ul");  
            node.children.forEach(function(d, i){
            	buildNav(current_ul, d)})
        };
    };
};

function buildItem(parent, name) {
    return parent.append("ul").append("li").text(name);
}

function loadFlat() {
    var root;

    d3.json("flat.json", function(err, jsondata){
        if (err) return;
        root = jsondata;
        root.filter(function(y) {
            return (y.class === "show");
        }).forEach(function(year, i) {
            buildMonth(buildItem(d3.select("body"), year.name), year);
        })
    });

    function buildMonth(parent, year)
    {
        root.filter(function(m) {
            return (m.class === "family" && m.pid == year.id);
        }).forEach(function(month, i) {
        buildDay(buildItem(parent, month.name), month)})
    };

    function buildDay(parent, mon) 
    {
        root.filter(function(d) {
            return (d.class === "members" && d.pid == mon.id)
        }).forEach(function(day, i) {
            buildItem(parent, day.name)
        })
    }
};