//List of Variables
var font;
var vehicles = [];

var slider;
// var gui;
// var params;

var texts = ['Creative', 'Coding', 'Ca', 'Interactive', 'Typography'];
var nextT = 0;
var maxChangeForce = 5;

var instructions = [];
var insText = 'Click to change the Text';


function preload(){
  font = loadFont('fonts/FreeSans.otf')
}

function setup() {
  createCanvas(1200,500);
  background(51);

  colorMode(HSB);
  slider = createSlider(0, 360, 60, 40);
  slider.position(10, 10);
  slider.style('width', '80px');

  // params = new Parameters();
  //
  // gui = new dat.GUI();
  // var f2 = gui.addFolder('Interaction');
  //
  // f2.add(params, 'message').listen();
  // gui.add(params, 'Save')

  // textFont(font);
  // textSize(128);
  //
  // fill(0,128,128);
  // noStroke();
  //
  // text('Alex', 100, 250);

  var bounds = font.textBounds(texts[nextT], 125, 125, 300);
    var posx = width / 2 - bounds.w / 2;
    var posy = height / 2 + bounds.h / 2;

    var points = font.textToPoints(texts[nextT], posx, posy, 128, {
        sampleFactor: 0.1
    });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);
    }

    var boundsIns = font.textBounds(insText, 100, 100, 20);
       var posxIns = width / 4 + boundsIns.w / 2;
       var posyIns = height / 4 + boundsIns.h / 2;

       var insAr = split(insText,  ' ');

       for (var i = 0; i < insAr.length; i++) {
           var bounds2 = font.textBounds(insAr[i], 0, 0, 10);
           var posx2 = posxIns;
           var posy2 = posyIns;

           posxIns += bounds2.w + 10;

           var points2 = font.textToPoints(insAr[i], posx2, posy2, 30, {
            sampleFactor: 0.3
        });

        for (var j = 0; j < points2.length; j++) {
            var pt = points2[j];
            var v = new Vehicle(pt.x, pt.y, 3);
            instructions.push(v);
        }
    }
}


  // var points = font.textToPoints('Alex', 100, 250, 128);
  // // console.log(points);
  //
  // for (var i = 0; i < points.length; i++) {
  //   var pt = points[i];
  //
  //   var vehicle = new Vehicle(pt.x, pt.y);
  //   vehicles.push(vehicle);
  //   // stroke(255);
  //   // strokeWeight(6);
  //   // point(pt.x, pt.y);
  // }



function draw() {
  let val = slider.value();
    background(val, 100, 100, 1);
  // background(51);

  // for (var i = 0; i < vehicles.length; i++) {
  //   var v = instructions[i];
  //   v.behaviors();
  //   v.update();
  //   v.show();
  // }

  for (var i = 0; i < vehicles.length; i++) {
        var v = vehicles[i];
        v.behaviors();
        v.update();
        v.show();
    }
}

function mouseClicked() {
    nextT++;
    if (nextT > texts.length - 1) {
        nextT = 0;
    }

    var bounds = font.textBounds(texts[nextT], 0, 0, 192);
    var posx = width / 2 - bounds.w / 2;
    var posy = height / 2 + bounds.h / 2;

    var points = font.textToPoints(texts[nextT], posx, posy, 192, {
        sampleFactor: 0.1
    });

    //particles get split to make up new longer/shorter words
    if (points.length < vehicles.length) {
        var toSplice = vehicles.length - points.length;
        vehicles.splice(points.length - 1, toSplice);

        for (var i = 0; i < points.length; i++) {
            vehicles[i].target.x = points[i].x;
            vehicles[i].target.y = points[i].y;

            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            vehicles[i].applyForce(force);
        }
    } else if (points.length > vehicles.length) {

        for (var i = vehicles.length; i < points.length; i++) {
            var v = vehicles[i - vehicles.length].clone();

            vehicles.push(v);
        }

        for (var i = 0; i < points.length; i++) {
            vehicles[i].target.x = points[i].x;
            vehicles[i].target.y = points[i].y;

            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            vehicles[i].applyForce(force);
        }

    } else {
        for (var i = 0; i < points.length; i++) {
            vehicles[i].target.x = points[i].x;
            vehicles[i].target.y = points[i].y;

            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            vehicles[i].applyForce(force);
        }
    }
}




// var Parameters = function(){
//   this.message = 'Hello';
// }

// this.save = function(){
//   saveCanvas()
// }

// function keyPressed(){
//     if (key =='s' || key == 'S') saveCanvas('Typography_' + gd.timestamp(), 'png');
// }
