/*
This Javascript code has been heavily inspired by this codepen by Michael Leonard, link: https://codepen.io/mikel301292/pen/dMYRYZ
*/

document.addEventListener('DOMContentLoaded', function() {
    var height = window.innerHeight,
        x = 0, y = height / 2,
        curveX = 10, curveY = 0,
        targetX = 0,
        xitteration = 0, yitteration = 0;

    var blobPath = document.getElementById('blob-path');

    document.addEventListener('mousemove', function(e) {
        x = e.pageX;
        y = e.clientY + window.scrollY; 
    });

    function easeOutExpo(currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
    }

    var hoverZone = 75;
    var expandAmount = 15;

    function svgCurve() {

        if ((curveX > x - 1) && (curveX < x + 1)) {
            xitteration = 0;
        } 
        
        else {
            xitteration = 0;
           
            if (x > hoverZone) {
                targetX = 0;
            } 
            
            else {
                targetX = -(((100 + expandAmount) / 100) * (x - hoverZone));
            }
            xitteration++;
        }

        if ((curveY > y - 1) && (curveY < y + 1)) {
            yitteration = 0;
        } 
        
        else {
            yitteration = 0;
            yitteration++;
        }

        curveX = easeOutExpo(xitteration, curveX, targetX - curveX, 100);
        curveY = easeOutExpo(yitteration, curveY, y - curveY, 100);

        var anchorDistance = 200;
        var curviness = anchorDistance - 40;

        var newCurve2 = "M60," + height + "H0V0h60v" + (curveY - anchorDistance) +
                        "c0," + curviness + "," + curveX + "," + curviness + "," +
                        curveX + "," + anchorDistance + "S60," + (curveY) + ",60," +
                        (curveY + (anchorDistance * 2)) + "V" + height + "z";

        blobPath.setAttribute('d', newCurve2);

        window.requestAnimationFrame(svgCurve);
    }

    window.requestAnimationFrame(svgCurve);

    window.addEventListener('resize', function() {
        height = window.innerHeight;
    });
});