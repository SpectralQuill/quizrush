$(document).ready(function(){
    bkgd_eq = 0, bkgd_a = [
        "to top, #a18cd1 0%, #fbc2eb 100%",
        "to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%",
        "120deg, #f6d365 0%, #fda085 100%",
        "120deg, #84fab0 0%, #8fd3f4 100%",
        "to right, #4facfe 0%, #00f2fe 100%",
        "to right, #43e97b 0%, #38f9d7 100%",
        "to right, #fa709a 0%, #fee140 100%",
        "to top, #f43b47 0%, #453a94 100%",
        "to top, #0250c5 0%, #d43f8d 100%",
        "to top, #ff0844 0%, #ffb199 100%",
        "-20deg, #b721ff 0%, #21d4fd 100%",
        "60deg, #abecd6 0%, #fbed96 100%",
        "to top, #5f72bd 0%, #9b23ea 100%",
        "60deg, #64b3f4 0%, #c2e59c 100%",
        "to top, #0fd850 0%, #f9f047 100%",
        "-20deg, #fc6076 0%, #ff9a44 100%",
        "to top, #e14fad 0%, #f9d423 100%",
        "to top, #b224ef 0%, #7579ff 100%",
        "-225deg, #2CD8D5 0%, #6B8DD6 48%, #8E37D7 100%",
        "-225deg, #FF057C 0%, #8D0B93 50%, #321575 100%",
        "120deg, #a1c4fd 0%, #c2e9fb 100%",
        "120deg, #e0c3fc 0%, #8ec5fc 100%",
        "to top, #5ee7df 0%, #b490ca 100%",
        "to top, #96fbc4 0%, #f9f586 100%",
        "to top, #3f51b1 0%, #5a55ae 13%, #7b5fac 25%, #8f6aae 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #f7c978 100%"
    ], c_bkgd_i = Math.floor(Math.random() * bkgd_a), hsty = [], qd = false;
    document.querySelector("body").onhashchange = function(){
        var s1 = location.hash, s2 = hsty[hsty.length - 1];
        if(s1 != "#"){
            s1 == "#menu" & s2 == "pfrn" ? qd = true : null;
            s1 == "#play" & s2 == "scr" ? back(3) : s1 == "#play" & qd ? back() : tran(location.hash.substr(1));
        };
    };
    $("#menu button").eq(0).click(function(){hash("pfrn")});
    $("input[type='file']").change(function(e){
        var v = $(this).val();
        if(v.endsWith(".quiz")){
            var e1 = $("#pfrn ul");
            if(v.includes("\\")){var n = v.substr(v.lastIndexOf("\\") + 1)}else{var n = v};
            var b1 = false;
            $("#pfrn li").each(function(){if($(this).text() == n){
                b1 = $(this);
                return false;
            }});
            if(b1 != false){if(confirm("A file was already opened with this name. Should it be replaced with this one?") == false){
                $(this).val(undefined);
                return;
            }};
            var r1 = new FileReader();
            r1.onload = function(){
                var e2 = $("#pfrn li");
                if(e2.length > 5){e2[e2.length - 2].remove()};
                var c1 = 0, a1 = r1.result.split("\r\n");
                a1[a1.length - 1] != "," ? a1 = a1.concat([","]) : null;
                while(c1 < a1.length){
                    var c2 = 0, a2 = ["<", "&", "\"", "'"], a3 = ["&lt;", "&amp;", "&quot;", "&#39;"];
                    while(c2 < 4){
                        a1[c1] = a1[c1].split(a2[c2]).join(a3[c2]);
                        c2++;
                    };
                    c1++;
                };
                var c2 = 0, s1, a2 = [], a3 = [], a4 = [];
                while(c2 < a1.length){
                    var v1 = a1[c2], l1 = a2.length;
                    if(v1 != ","){if(s1 == undefined){s1 = v1}else if(v1 != "" & l1 < 20 & !a2.includes(v1)){if(v1.endsWith("/")){
                        a2.push(v1.substr(0, v1.length - 1));
                        a3.push(l1);
                    }else{a2.push(v1)}}}else{
                        var l2 = a3.length;
                        if(s1 != undefined & (l1 == 1 || (l1 > 1 & l2 > 0 & l1 != l2))){
                            l1 == 1 ? a3 = a2[0] : null;
                            var j1 = {q: s1, a: a3};
                            l1 > 1 ? j1.c = a2 : null;
                            a4.push(j1);
                        }else if(c2 > 1 & c2 == a1.length - 1 & !isNaN(+s1)){a4.push(+s1)};
                        s1 = undefined, a2 = [], a3 = [];
                    };
                    c2++;
                };
                if(a4.length > 0){
                    var s2 = JSON.stringify(a4);
                    e1.prepend("<li quiz='" + s2 + "'>" + n + "</li>");
                    if(b1 != false){b1.remove()};
                    var e3 = $("#pfrn div div button");
                    !e3.hasClass("active") ? e3.addClass("active down") : null;
                    e3.hasClass("up") ? e3.click() : null;
                    $(document).ready(function(){
                        qzsw();
                        $("#pfrn li").eq(0).click();
                    });
                }else{alert("This file does not contain valid questions!")};
            };
            r1.readAsText(e.target.files[0]);
        }else{alert("File not supported!")};
        $(this).val(undefined);
    });
    $("#pfrn div div button").click(function(){if($(this).hasClass("active")){if($(this).hasClass("down")){
        $("#pfrn div div").css("max-height", "100vh");
        $(this).removeClass("down").addClass("up");
    }else{
        $("#pfrn div div").css("max-height", "");
        $(this).removeClass("up").addClass("down");
    }}});
    $("#nqr").on("input", function(){$("#nqn").val($(this).val())});
    $("#nqn").change(function(){
        var v = Math.round($(this).val()), e1 = $("#nqr"), mi = e1.attr("min"), ma = e1.attr("max");
        v < mi ? v = mi : v > ma ? v = ma : null;
        $("#nqr, #nqn").val(v);
    });
    $("#pfrn>section>div>button").click(function(){
        var s1 = "active", e1 = $("#tmr");
        if($(this).hasClass(s1)){
            $(this).removeClass(s1);
            e1.val(0);
        }else{
            $(this).addClass(s1);
            e1.val(e1.attr("hsty"));
        };
        if(typeof Storage != undefined){
            localStorage.setItem("tmr", e1.val());
            localStorage.setItem("t_hsty", e1.attr("hsty"));
        };
    });
    $("#tmr").change(function(){
        var t = $(this), v = Math.round(t.val());
        v < 0 ? v = 0 : v > 1800 ? v = 1800 : null;
        var e1 = $("#pfrn>section>div>button");
        if(v == 0){e1.click()}else{
            t.attr("hsty", v);
            !e1.hasClass("active") ? e1.click() : null;
        };
        t.val(v);
        if(typeof Storage != undefined){
            localStorage.setItem("tmr", v);
            localStorage.setItem("t_hsty", t.attr("hsty"));
        };
    });
    var s1 = "#pfrn>section>button";
    $(s1 + ":eq(0), " + s1 + ":eq(3), #play>button, #rvw button").click(function(){back()});
    var e1 = $(s1);
    e1.eq(1).click(function(){if($("#pfrn li").length > 1){
        var e1 = $("#play span"), ql = $("#nqn").val();
        e1.eq(0).text(0);
        e1.eq(1).text(ql);
        tmr = $("#tmr").val();
        if(tmr > 0){
            e1.filter(":eq(2), :eq(4)").text("00");
            e1.eq(3).text(":");
        }else{
            e1.filter(":eq(2), :eq(4)").text("");
            e1.eq(3).text("- -");
        };
        $("#play h4").last().text(0);
        qd = false, done = [], rvw = [];
        $(document).ready(function(){nq()});
    }else{alert("No quiz selected!")}});
    e1.eq(2).click(function(){
        hash("play");
        setTimeout(function(){timer()}, 625);
    });
    $("#play div button").click(function(){
        $("#cvr").show();
        typeof i1 != "undefined" ? clearInterval(i1) : null;
        $(".ans").css({color: "lime", borderColor: "lime"});
        if($(this).hasClass("ans")){
            var e1 = $("#play h4").eq(2);
            e1.text(+e1.text() + 1);
        }else{
            $(this).css({color: "#ff3f34", borderColor: "#ff3f34"});
            rvw[rvw.length - 1].u = $(this).find("span").text();
        };
        setTimeout(function(){nq()}, 625);
    });
    $("#play input").keyup(function(e){if(e.keyCode == 13){
        $("#cvr").show();
        typeof i1 != "undefined" ? clearInterval(i1) : null;
        var v = $(this).val(), s1 = $(this).attr("ans").toLowerCase();
        if(v.toLowerCase() == s1){
            var e1 = $("#play h4").eq(2);
            e1.text(+e1.text() + 1);
            $(this).css({color: "lime", borderColor: "lime"});
        }else{
            $(this).css({color: "#ff3f34", borderColor: "#ff3f34"}).val(s1);
            rvw[rvw.length - 1].u = v;
        };
        setTimeout(function(){nq()}, 625);
    }});
    $("#play h1").click(function(){
        $(this).css("opacity", 0);
        setTimeout(function(){
            $("#play h1").hide();
            nq();
        }, 625);
    });
    $("#scr button").eq(0).click(function(){hash("rvw")});
    $("#scr button").eq(1).click(function(){back(3)});
    if(typeof Storage != undefined){
        var s = eval(localStorage.getItem("save")), t = localStorage.getItem("tmr"), h = localStorage.getItem("t_hsty");
        if(s != null){
            var c1 = s.length;
            while(c1 > 0){
                c1--;
                $("#pfrn ul").prepend("<li quiz='" + s[c1].q + "'>" + s[c1].n + "</li>");
                var e1 = $("#pfrn div div button");
                !e1.hasClass("active") ? e1.addClass("active down") : null;
                e1.hasClass("up") ? e1.click() : null;
                qzsw();
                $("#pfrn li").eq(0).click();
            };
        };
        $(document).ready(function(){if(t != null){$("#tmr").val(+t).attr("hsty", h).change()}});
    };
    location.hash != "#menu" ? hash("menu") : tran("menu");
});
function tran(i){
    typeof(t1) != "undefined" ? clearTimeout(t1) : null;
    $("#cvr").show();
    while(0 == 0){
        var r = Math.floor(Math.random() * bkgd_a.length);
        if(r != c_bkgd_i){break};
    };
    c_bkgd_i = r;
    $(".bkgd").eq(bkgd_eq).css({opacity: 1, background: "linear-gradient(" + bkgd_a[c_bkgd_i] + ")"});
    var n_bkgd_eq = bkgd_eq == 0 ? 1 : 0;
    $(".bkgd").eq(n_bkgd_eq).css("opacity", 0);
    bkgd_eq = n_bkgd_eq;
    $("article").css("opacity", 0);
    $("article#" + i).show(0, function(){$(this).css("opacity", 1)});
    var v1 = hsty[hsty.length - 1], e1 = $("#pfrn section");
    if(location.hash == "#pfrn" & v1 == "play"){
        typeof i1 != "undefined" ? clearInterval(i1) : null;
        e1.eq(0).hide();
        e1.eq(1).show();
    }else{setTimeout(function(){
        e1.eq(0).show();
        e1.eq(1).hide();
    }, 625)};
    if(!hsty.includes(i)){i != v1 ? hsty.push(i) : null}else if(i != hsty[hsty.length - 1]){
        var c1 = 0, n1 = hsty.length - hsty.indexOf(i) - 1;
        while(c1 < n1){
            hsty.pop();
            c1++;
        };
    };
    t1 = setTimeout(function(){
        $("article:not(#" + i + ")").hide();
        $("#cvr").hide();
    }, 625);
}
function hash(s){location.hash = s}
function back(n){
    typeof(t2) != "undefined" ? clearTimeout(t2) : null;
    n == undefined ? n = -1 : n *= -1;
    window.history.go(n);
}
function qzsw(){$("#pfrn li").eq(0).click(function(){
    if($(this).index() > 0){
        $(this).remove();
        $("#pfrn ul").prepend($(this));
        qzsw();
        $("#pfrn div div button").click();
    };
    $(document).ready(function(){
        if(typeof Storage != "undefined"){
            var a1 = [];
            $("#pfrn li:not(:last-child)").each(function(){a1.push({n: $(this).html(), q: $(this).attr("quiz")})});
            localStorage.setItem("save", JSON.stringify(a1));
        };
        quiz = eval($("#pfrn li").eq(0).attr("quiz")), t = quiz[quiz.length - 1];
        if(!isNaN(t)){
            quiz.pop();
            $("#tmr").val(t).change();
        };
        var l = quiz.length;
        $("#nqr").attr({min: 1, max: l});
        $("#nqr, #nqn").val(l);
        $("#nqn").removeAttr("readonly");
    });
})}
function nq(){var ql = $("#nqn").val(); if(done.length < ql){
    location.hash != "#play" ? hash("play") : tran("play");
    setTimeout(function(){
        var e1 = $("#play span");
        e1.eq(0).text(+e1.eq(0).text() + 1);
        if(tmr > 0){
            m = Math.floor(tmr / 60), s = tmr % 60;
            var e2 = $("#play h4").eq(1);
            m == 0 & s <= 10 ? e2.attr("class", "red") : e2.attr("class", "");
            e1.eq(2).text(dgt(m));
            e1.eq(4).text(dgt(s));
            timer();
        };
        while(0 == 0){
            var r = Math.floor(Math.random() * ql);
            if(!done.includes(r)){
                done.push(r);
                q = quiz[r];
                break;
            };
        };
        $("p").text(q.q);
        rvw.push({q: q.q});
        var e2 = $("#play div");
        e2.hide();
        $("#play div button, #play input").blur().css({transition: "none", color: "", borderColor: "", transition: ""});
        if(Array.isArray(q.a)){
            e2.eq(0).show();
            var c1 = 0, l1 = q.c.length, l2 = q.a.length, c = [];
            while(c1 < l1 - l2 & c.length < 3){
                while(0 == 0){
                    var r = Math.floor(Math.random() * l1);
                    if(!c.includes(r) & !q.a.includes(r)){
                        c.push(r);
                        break;
                    };
                };
                c1++;
            };
            c.push(q.a[Math.floor(Math.random() * l2)]);
            var l1 = c.length;
            rvw[rvw.length - 1].a = q.c[c[l1 - 1]];
            var e3 = $("#play div button");
            e3.removeClass("ans").hide();
            var c1 = 0, d = [];
            while(c1 < l1){
                while(0 == 0){
                    var r = Math.floor(Math.random() * l1);
                    if(!d.includes(r)){
                        d.push(r);
                        break;
                    };
                };
                $("#play div button span").eq(c1).text(q.c[c[r]]);
                r == l1 - 1 ? e3.eq(c1).addClass("ans") : null;
                e3.eq(c1).show();
                c1++;
            };
        }else{
            e2.eq(1).show();
            $("#play input").val("").attr("ans", q.a);
            rvw[rvw.length - 1].a = q.a;
        };
    }, 625);
}else{
    var e1 = $("#scr td"), n1 = +$("#play h4").eq(2).text(), n2 = +$("#play span").eq(1).text();
    e1.eq(1).text(n1 + "/" + n2);
    e1.eq(3).text(+(n1 / n2 * 100).toFixed(2) + "%");
    qd = true;
    hash("scr");
    var c1;
    for(c1 of rvw){
        var e1 = $("#rvw table"), b1 = c1.u == undefined;
        e1.append("<tr><td><h3>" + (e1.children().length + 1) + ".) " + c1.q + "<i class='fas fa-" + (b1 ? "check" : "times") + "'></i></h3>" + (b1 ? "" : "<h3>Your answer: <span>" + c1.u + "</span></h3>") + "<h3>Answer: <u>" + c1.a + "</u></h3></td></tr>");
    };
}}
function dgt(n){if(n > 9){return n.toString()}else{return "0" + n}}
function timer(){
    i1 = setInterval(function(){
        if(m > 0 & s == 0){
            m--;
            s = 60;
        };
        s--;
        var e1 = $("#play span");
        m == 0 & s <= 10 ? e1.attr("class", "red") : e1.attr("class", "");
        e1.eq(2).text(dgt(m));
        e1.eq(4).text(dgt(s));
        if(m == 0 & s == 0){
            clearInterval(i1);
            var e2 = $("#cvr");
            e2.show();
            var e3 = $("#play h1");
            e3.css("display", "flex");
            $(document).ready(function(){
                if(Array.isArray(q.a)){$(".ans").css({color: "lime", borderColor: "lime"})}else{
                    var e4 = $("#play input");
                    e4.blur().css({color: "#ff3f34", borderColor: "#ff3f34"}).val(e4.attr("ans"));
                };
                e3.css("opacity", 1);
                setTimeout(function(){e2.hide()}, 625);
            });
        };
    }, 1000);
}