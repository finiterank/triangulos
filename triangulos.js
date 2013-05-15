var ctx = $('#cv').get(0).getContext('2d');

var points = [
    { x: 102, y:  28, r: 3 },
    { x: 730, y: 398, r: 3 },
    { x:  37, y: 546, r: 3 },
    { x: 285, y: 352, r: 3 }
];

function drawPoint(data) {
    ctx.beginPath();
    ctx.arc(data.x, data.y, data.r, 0, Math.PI * 2);
    ctx.fill();
}

function orthoCutPoint(p, a, b){
    var result = {}
    dy = b.y - a.y;
    dx = b.x - a.x;
    if (dx != 0 && dy != 0){
        m = dy/dx;
        xcoord = ((p.x/m) + p.y + (a.x * m) - a.y) / (m + 1/m);
        ycoord = m * (xcoord - a.x) + a.y;
        result = { x: xcoord, y: ycoord, r: 3};
    }
    if (dx == 0) {
        result = { x: a.x, y: p.y, r: 3};
    }
    if (dy == 0) {
        result = { x: p.x, y: a.y, r: 3};   
    }
    return result;
}

function threePoints(centerPoint, threePoints) {
    var result = [];
    uno = orthoCutPoint(centerPoint, threePoints[0], threePoints[1]);
    dos = orthoCutPoint(centerPoint, threePoints[1], threePoints[2]);
    tres = orthoCutPoint(centerPoint, threePoints[2], threePoints[0]);
    result.push(uno);
    result.push(dos);
    result.push(tres);
    return result;
}


function drawLine(from, to) {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
}

function drawTriangle(data, color) {
    ctx.beginPath();
    ctx.moveTo(data[0].x,data[0].y);
    ctx.lineTo(data[1].x,data[1].y);
    ctx.lineTo(data[2].x,data[2].y);    
    ctx.lineTo(data[0].x,data[0].y);
    ctx.strokeStyle = color;
    ctx.stroke();
    }    

function drawPicture(e){
drawTriangle(points);

iterationOne = threePoints(points[3], points);
iterationTwo = threePoints(points[3], iterationOne);
iterationThree = threePoints(points[3], iterationTwo);

drawTriangle(iterationOne, "#FF8400");
drawTriangle(iterationTwo, "#FF8400");
drawTriangle(iterationThree, "red");



$.each(points, function() {
    drawPoint(this);
});
ctx.strokeStyle = "#000000";
}

drawPicture();

var focused_point, lastX, lastY ; 
 
function test_distance( n, test_point ){  //see if the mouse is clicking points
    if( focused_point ) return false;
    var dx = lastX - test_point.x,
    dy = lastY - test_point.y;

    //see if the distance between the click is less than radius
    if( dx * dx + dy * dy < test_point.r * test_point.r  ){
        focused_point = n;
        $(document).bind( 'mousemove.move_circle' , drag_point );
        $(document).bind( 'mouseup.move_circle' , clear_bindings);
        return false; // in jquery each, this is like break; stops checking future points
    }
}
$('#cv').mousedown( function( e ){
    lastX = e.pageX - $(this).offset().left;
    lastY = e.pageY - $(this).offset().top;
    $.each( points, test_distance );
});

function drag_point( e ){
    var    newX = e.pageX - $('#cv').offset().left,
        newY = e.pageY - $('#cv').offset().top;
    

    points[ focused_point ].x += newX - lastX;
    points[ focused_point ].y += newY - lastY;

    lastX = newX, lastY = newY;

    //clear canvas and redraw everything
    ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );
    drawPicture();
}

function clear_bindings( e ){ // mouse up event, clear the moving and mouseup bindings
    $(document).unbind( 'mousemove.move_circle mouseup.move_circle' );
    focused_point=undefined;
}
