$(window).scroll(() => {
	var top = $(window).scrollTop()
    
    if (top > 50) {
        $('#main-nav').css('background', 'white')
        $('.nav-link').css('color', '#e42c76')
        $("#dropdown-menu").css('top', '72px')
	} else {
        $('#main-nav').css('background', 'transparent')
        $('.nav-link').css('color', 'white')
        $("#dropdown-menu").css('top', '70px')
    }
    $("#run-head-img").css('margin-top', top/10)
    slideAnim()
})

let fbLink = "https://www.facebook.com/SpectrumatCal/";
let instagramLink = "https://www.instagram.com/spectrum_at_cal/";
let twitterLink =  "https://twitter.com/SpectrumCal1/";

const footer = "<div class=\"row\"> <div class=\"col-md-2\" id=\"footer-socials\"><a href="+ fbLink + " target='_blank'><i class=\"fab fa-facebook\"></i></a><a href=" + instagramLink +" target='_blank'><i class=\"fab fa-instagram\"></i></a><a href=" + twitterLink + " target='_blank'><i class=\"fab fa-twitter\"></i></a></div><div class=\"col-md-6\"></div><div class=\"col-md-2\"><a href=\"index\">Home</a><a href=\"about\">About</a><a href=\"columns\">Columns</a></div><div class=\"col-md-2\"><a href=\"acceptance\">Awareness Week</a><a href=\"run\">5k Run</a> <a href=\"mentoring\">Mentoring</a></div></div><hr/><p>Spectrum @Cal 2019.</p>"
const mainNav = "<div id=\"nav-links\"><a href=\"index\" class=\"nav-link\">Home</a><a href=\"about\" class=\"nav-link\">About</a><div id=\"dropdown\"><a href=\"#\" class=\"nav-link\">Programs <i class=\"fas fa-angle-down\"></i></a><div id=\"dropdown-menu\"><a href=\"acceptance\" style=\"border-radius: 5px 5px 0px 0px\">Awareness Week</a><a href=\"run\" style=\"border-radius: 0px 0px 5px 5px\"><i class=\"far fa-star fa-icon\"></i> 5k Run</a><a href=\"mentoring\" style=\"border-radius: 5px 5px 0px 0px\">Mentoring</a></div></div><a href=\"columns\" class=\"nav-link\">Columns</a><a href=\"index.html#contact\" class=\"nav-link\">Contact</a></div>"
const phoneNav = "<div id=\"menuToggle\"><input type=\"checkbox\" /><span></span><span></span><span></span><ul id=\"menu\"><li><a href=\"index\">Home</a></li><li><a href=\"about\">About</a></li><li id=\"mobile-programs\"><a >Programs <i class=\"fas fa-angle-down\"></i></a></li><div id=\"dropdown2\"><li><a href=\"acceptance\">Awareness Week</a></li><li><a href=\"run\">5k Run</a></li><li><a href=\"mentoring\">Mentoring</a></li></div><li><a href=\"columns\">Columns</a></li><li><a href=\"index.html#contact\" id=\"contact-link\">Contact</a></li></ul></div>"


$(document).ready(() => {
    $("#main-nav").html(mainNav)
    $("#phone-nav").html(phoneNav)
    $("#footer").html(footer)
    $("#dropdown").mouseenter(e => {
        if($("#dropdown-menu").css('display') == 'none')
        $("#dropdown-menu").fadeIn(300)
    })
    $("#dropdown").mouseleave(e => {
        if($("#dropdown-menu").css('display') == 'block')
            $("#dropdown-menu").fadeOut(200)
    })
    $("#home-about #img-border").css('height', $('#home-about #img-border img').height()*1.06)
    let runLeft = 0
    $("#carousel-right").click(() => {
        if(runLeft+300 < 8000-$(window).width()*0.8)
            runLeft+=300
        $("#inner-imgs").css('left', -1*runLeft)
    })
    $("#carousel-left").click(() => {
        if(runLeft-300 >= 0)
            runLeft-=300
        $("#inner-imgs").css('left', -1*runLeft)
    })
    $("#mobile-programs").click(() => {
        $("#dropdown2").slideToggle()
    })
    slideAnim()
})
$(window).resize(() => {
    $("#home-about #img-border").css('height', $('#home-about #img-border img').height()*1.06)
})

submit = () => {
    alert('hi')
}

toggleSection = () => {
    let secID = event.currentTarget.parentNode.id;
    $("#" + secID + " section").slideToggle(500)
    $("#" + secID + " .line1").toggleClass("short")
}

slideAnim = () => {

    //working slide animation with DELAYS controlled
    const scrollTop = $(window).height()*0.9
    const slideThis = (object, func) => {
        let pos = object.offset().top, winTop = $(window).scrollTop()
        if (pos <= winTop + scrollTop) {
            if(object.attr('class').includes('delay1')) 
                $(function() {setInterval(func, 400)})
            else if(object.attr('class').includes('delay2')) 
                $(function() {setInterval(func, 800)})
            else
                func()
        }
    }

    $(".slideanim").each(function() {
        const slide = () => $(this).addClass("slideUp")
        slideThis($(this), slide)
    })
    $(".slideanim2").each(function() {
        const slide = () => $(this).addClass("slideLeft")
        slideThis($(this), slide)
    })

    $(".slideanim3").each(function() {
        const slide = () => $(this).addClass("sizer")
        slideThis($(this), slide)
    })

    $(".slideanim4").each(function() {
        const slide = () => $(this).addClass("opaque")
        slideThis($(this), slide)
    })
}

const url = 'https://script.google.com/macros/s/AKfycbzJGEqxEhtI2NXXOYWoH6XEmeZxp1e5nOdZU8vkTEQR6dnA-Us/exec'

$('#submit-message').on('click', function(e) {
    e.preventDefault()
    const name = $("#message_name").val()
    const email = $("#message_email").val()
    const message = $("#message_msg").val()
    let errors = []
    if(name.length == 0) 
        errors.push('name')
    if(!/^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/.test(email))
        errors.push("valid email address")
    if(message.length < 2)
        errors.push('your message')
    if(errors.length == 0) {
        const formData = {
            "name": name,
            "email": email,
            "message": message
        }
    
        var jqxhr = $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: formData
        }).then(() => {
                $("#form-errors").html('Thank you for your message! We will get back to you as soon as possible.')
                $("#form-errors").css('color', 'lightgreen')
                $("#message_name").val('')
                $("#message_email").val('')
                $("#message_msg").val('')
                console.log('success!')
            }
        ).catch(err =>
            console.log(err)
        )
    } else {
        $("#form-errors").html('Error: please enter the following: ' + errors.join(', '))
        $("#form-errors").css('color', 'red')
    }
})

