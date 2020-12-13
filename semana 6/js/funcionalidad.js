$("#agregar").on ('click', function(){
    $("#partidas").append("<tr>\
    <td><input type='text' class='Clave'></td>\
    <td><input type='text' class='descripcion'></td>\
    <td><input type='number' class='precio'></td>\
    <td><input type='number' class='unidades'></td>\
    <td><input type='number' class='importe'></td> \      </tr> \
    ");

    $(".precio:last, .unidades:last").on("change", function(e) {
        var tr = $(this).closest("tr");
        calcularImporte(tr);
        calcularTotales();
    });

    $(".clave:last").on("keydown", function(e) {
        var barra = 13;
        var keycode = e.which;
        console.log(barra)
        if (keycode === barra) {
            tr = $(this).closest("tr");
            $("#dialog").dialog("open");

        }
    });

});











function calcularImporte(tr) {

    var precio = Number($(tr).find(".precio").val());
    console.log(precio);

    var unidades = Number($(tr).find(".unidades").val());
    console.log(unidades);


    var importe = precio * unidades;
    console.log(importe);
    $(tr).find(".importe").val(importe);
}

function calcularTotales() {
    var subtotal = 0;
    $(".importe").each(function() {
        subtotal += Number($(this).val())
    });
    $("#subtotal").text(subtotal);
    var IVA = subtotal * 0.16;
    $(".subtotal").each(function(){
        IVA = .16($(this).text())
    });
    $("#iva").text(IVA);
    var total = subtotal + IVA;
    $("#total").text(total);
}




