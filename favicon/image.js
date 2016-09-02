function FASymbol(name, id, unicode, $icon) {
    this.name = name;
    this.id = id;
    this.unicode = unicode;
    this.$icon = $icon;
}

$(window).on('load', function () {

    var symbol = "\uf004";
    var canvas = document.getElementById('canvas');
    var sideLength = 1024;
    canvas.width = sideLength;
    canvas.height = sideLength;
    var ctx = canvas.getContext('2d');
    draw();


    $("#size").on("input", draw);
    $("#color, #background_color").minicolors({
        change: draw,
        format: "rgb",
        opacity: true
    });

    var symbols = [];
    $("#search").on("input", function () {
        var phrase = $("#search").val().toLowerCase();
        for (var i = 0; i < symbols.length; i++) {
            if (symbols[i].id.indexOf(phrase) !== -1) {
                symbols[i].$icon.parent().show();
            } else {
                symbols[i].$icon.parent().hide();
            }
        }
    });

    $("#download").on("click", function () {
        canvas.toBlob(function (blob) {
            saveAs(blob, "favicon.png");
        });
    });

    var $iconContainer = $('#icon_container');
    $.each(icons, function (index, icon) {
        var $iconOuter = $("<div>").addClass("icon_outer");
        var $icon = $("<div>").addClass("icon").append($('<i class="fa fa-' + icon.id + '"></i>'));
        $icon.append($("<div>").addClass("icon_text").text(icon.id));
        $iconOuter.append($icon);
        $iconContainer.append($iconOuter);

        symbols.push(new FASymbol(icon.name, icon.id, icon.unicode, $icon));
    });

    $(".icon").on("click", function () {
        symbol = window.getComputedStyle($(this).children().get()[0], ':before').content.substring(1, 2);
        draw();
    });

    function draw() {
        if (sideLength > 0) {
            var color = $("#color").val();
            var backgroundColor = $("#background_color").val();
            var i = sideLength;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            do {
                ctx.font = i + "px FontAwesome";
                i--;
            } while (ctx.measureText(symbol).width > sideLength);
            ctx.font = (i * ($("#size").val() / 100)) + "px FontAwesome";


            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillText(symbol, sideLength / 2, sideLength / 2);
            ctx.fillStyle = color;
            ctx.globalCompositeOperation = "source-over";
            ctx.fillText(symbol, sideLength / 2, sideLength / 2);
            canvasToFavicon(canvas);
        }
    }

    function updateIcons() {
        $.get('https://rawgit.com/FortAwesome/Font-Awesome/master/src/icons.yml', function (data) {
            var parsedYaml = jsyaml.load(data);
            console.log(JSON.stringify(parsedYaml));
        });
    }
});
