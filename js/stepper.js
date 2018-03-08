$('#textShow').toggle();
var navListItems = $('div.setup-panel div a'),
    allWells = $('.setup-content'),
    allNextBtn = $('.nextBtn');

allWells.hide();

navListItems.click(function (e) {
    e.preventDefault();
    var $target = $($(this).attr('href')),
        $item = $(this);

    if (!$item.hasClass('disabled')) {
        navListItems.removeClass('btn-success').addClass('btn-default');
        $item.addClass('btn-success');
        allWells.hide();
        $target.show();
        $target.find('input:eq(0)').focus();
    }
});

allNextBtn.click(function () {
    var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
        curInputs = curStep.find("input[type='text'],input[type='url'],input[type='date'],select,textarea"),
        isValid = true;

    $(".form-group").removeClass("has-error");
    $('.error').text('')
    $('#telefonoError').text('');
    $('#URLerror').text('');
    for (var i = 0; i < curInputs.length; i++) {
        if (!curInputs[i].validity.valid) {
            isValid = false;
            $(curInputs[i]).closest(".form-group").addClass("has-error");
            if ($(curInputs[i]).attr('id') == "telefono") $('#telefonoError').text("Tiene que ingresar 8 dígitos, sin letras o símbolos")
            if ($(curInputs[i]).attr('id') == "url") $('#URLerror').text("El URL debe llevar el formato http://www.sitio.com")
            $(curInputs[i]).parent().find('span.error').text("Este campo es requerido")
        }

    }
    if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');

});

$('div.setup-panel div a.btn-success').trigger('click');

const convertirAJSON = () => {
    let isValid = true;
    const curStep = $('#step-1')
    const curInputs = curStep.find("input[type='text'],input[type='url'],input[type='date'],select,textarea")
    for (var i = 0; i < curInputs.length; i++) {
        if (!curInputs[i].validity.valid) {
            isValid = false;
            $(curInputs[i]).closest(".form-group").addClass("has-error");
            if ($(curInputs[i]).attr('id') == "telefono") $('#telefonoError').text("Tiene que ingresar 8 dígitos, sin letras o símbolos")
            if ($(curInputs[i]).attr('id') == "url") $('#URLerror').text("El URL debe llevar el formato http://www.sitio.com")
            $(curInputs[i]).parent().find('span.error').text("Este campo es requerido")
        }

    }
    if (isValid) {
        var info = {
            fecha: $('#fecha').val(),
            telefono: $('#telefono').val(),
            url: $('#url').val(),
            edad: $('#edad').val(),
            genero: $('#genero').val(),
            titulo: $('#titulo').val(),
            informacion: $('#info').val()
        }

        $('#json').val(JSON.stringify(info, null, 4));
        $('#step-1').children().toggle();
    };
}

const volver = () => $('#step-1').children().toggle();

const preview = () => {
    const file = ($("#imagen"))[0].files[0];
    const img = ($("#preview"))[0];
    const reader = new FileReader();
    reader.onload = function (e) { img.src = e.target.result }
    reader.readAsDataURL(file);
    const canvas = ($("#canvas"))[0];
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const dataurl = canvas.toDataURL("image/png");
    sessionStorage.setItem('imagen', dataurl);
};

const resize = () => {
    $('#preview').hide();

    const file = ($("#imagen"))[0].files[0];
    const img = ($("#preview"))[0];
    const reader = new FileReader();
    reader.onload = function (e) { img.src = e.target.result }
    reader.readAsDataURL(file);
    let width = img.width;
    let height = img.height;
    if (width !== height) {
        height = width;
    }
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    const dataurl = canvas.toDataURL("image/png");
    sessionStorage.setItem('imagen', dataurl);
}

$('form').submit(e => {
    e.preventDefault();
    var info = {
        fecha: $('#fecha').val(),
        telefono: $('#telefono').val(),
        url: $('#url').val(),
        edad: $('#edad').val(),
        genero: $('#genero').val(),
        titulo: $('#titulo').val(),
        informacion: $('#info').val()
    }
    $('#paso1').text(JSON.stringify(info, null, 4));
    if (sessionStorage.getItem('imagen'))
        $('#paso2 img').attr('src', sessionStorage.getItem('imagen'))
    else {
        const file = ($("#imagen"))[0].files[0];
        const img = ($('#paso2 img'))[0];
        const reader = new FileReader();
        reader.onload = function (e) { img.src = e.target.result }
        reader.readAsDataURL(file);
    }
    $('#paso3').text("Latitud: "+ $('#lat').val() + " Longitud:" + $('#lon').val());
})

