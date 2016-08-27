function FASymbol(name, id, unicode, $icon) {
    this.name = name;
    this.id = id;
    this.unicode = unicode;
    this.$icon = $icon;
}

$(window).on('load', function () {
    var canvas = document.getElementById('canvas');
    var sideLength = 1024;
    canvas.width = sideLength;
    canvas.height = sideLength;
    var ctx = canvas.getContext('2d');

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
        window.open(canvas.toDataURL(), "_blank");

        //var w = window.open();
        //w.document.write('<img src="' + canvas.toDataURL() + '" width="48" height="48"/>');

        //canvas.toBlob(function (blob) {
        //    saveAs(blob, "Dashboard.png");
        //});
    });

    $("#size").on("input", function() {
        draw();
    });


    $.get('https://rawgit.com/FortAwesome/Font-Awesome/master/src/icons.yml', function (data) {
        var parsedYaml = jsyaml.load(data);
        var $iconContainer = $('#icon_container');

        $.each(parsedYaml.icons, function (index, icon) {
            var $iconOuter = $("<div>").addClass("icon_outer");
            var $icon = $("<div>").addClass("icon").append($('<i class="fa fa-' + icon.id + '"></i>'));
            $icon.append($("<div>").addClass("icon_text").text(icon.id));
            $iconOuter.append($icon);
            $iconContainer.append($iconOuter);

            symbols.push(new FASymbol(icon.name, icon.id, icon.unicode, $icon));
        });
        draw();

        $(".icon").on("click", function () {
            symbol = window.getComputedStyle($(this).children().get()[0], ':before').content.substring(1, 2);
            draw();
        });
    });

    var symbol = "\uf004";
    var color = "white";
    var backgroundColor = "#6184d8";

    updateColor = function () {
        color = "#" + $("#color").val();
        draw();
    };

    updateBackgroundColor = function () {
        backgroundColor = "#" + $("#background_color").val();
        draw();
    };

    function draw() {
        canvas.width = sideLength;
        canvas.height = sideLength;
        var i = sideLength;

        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = color;
        do {
            ctx.font = i + "px FontAwesome";
            i--;
        } while (ctx.measureText(symbol).width > sideLength);

        ctx.font = (i * ($("#size").val() / 100)) + "px FontAwesome";
        ctx.fillText(symbol, sideLength / 2, sideLength / 2);
        canvasToFavicon(canvas);
    }
});






