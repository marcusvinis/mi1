// Sticky widget by Bloggersentral.com
// Tutorial at http://www.bloggersentral.com/2013/04/how-to-make-any-widget-sticky.html 
// Free to use or share, but please keep this notice intact.
//<![CDATA[
bs_makeSticky("Label1"); // enter your widget ID here
function bs_makeSticky(elem) {
    var bs_sticky = document.getElementById(elem);
    var scrollee = document.createElement("div");
    bs_sticky.parentNode.insertBefore(scrollee, bs_sticky);
    var width = bs_sticky.offsetWidth;
    var iniClass = bs_sticky.className + ' bs_sticky';
    window.addEventListener('scroll', bs_sticking, false);
    function bs_sticking() {
        var rect = scrollee.getBoundingClientRect();
        if (rect.top < 0) {
            bs_sticky.className = iniClass + ' bs_sticking';
            bs_sticky.style.width = width + "px";
        } else {
            bs_sticky.className = iniClass;
        }
    }
}


social_makeSticky("socialbar"); // enter your widget ID here
function social_makeSticky(elem) {
    var social_sticky = document.getElementById(elem);
    var scrollee = document.createElement("div");
    social_sticky.parentNode.insertBefore(scrollee, social_sticky);
    var width = social_sticky.offsetWidth;
    var iniClass = social_sticky.className + ' bs_sticky';
    window.addEventListener('scroll', social_sticking, false);
    function social_sticking() {
        var rect = scrollee.getBoundingClientRect();
        if (rect.top < 0) {
            social_sticky.className = iniClass + ' bs_sticking';
            social_sticky.style.width = width + "px";
        } else {
            social_sticky.className = iniClass;
        }
    }
}
//]]>
