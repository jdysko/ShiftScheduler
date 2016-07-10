/**
 * Created by Jedrek on 2016-04-01.
 */


$(
    $('#loginBtn').click(
        function (e) {
            e.preventDefault();
            var u = document.getElementById("login_txt");
            var pass = document.getElementById("password_txt");
            var utxt = u.value;
            var ptxt = pass.value;
            var dt = {"user": utxt, "pass": ptxt};
            $.ajax({
                url: "logme",
                method: "GET",
                contentType: 'application/json; charset=utf-8',
                data: dt,
                success: function (data) {
                    console.log(data);
                    if (data[0].result == 1) {
                        location.href = "./home"
                    }


                }
            });
        }
    )
);