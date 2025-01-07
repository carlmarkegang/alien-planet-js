let friend = [];

function create_friend(x, y, vel_x, vel_y) {
  this.position = new p5.Vector(x, y);
  this.vel_x = vel_x;
  this.vel_y = vel_y;
  this.radius = 3;
  this.speed = 1;
  this.jumpPower = 5;
  this.jumped = 1;
  this.bloodCollectedLevel = 1;
  this.isAttached = false;
  this.segments = this.segments = [new p5.Vector(x, y), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0)];
  this.segLength = 2;
}


function friendMovement(i) {
  friend[i].position.x += friend[i].vel_x;
  friend[i].position.y += friend[i].vel_y;

  if (randomInt(0, 50) == 0 && friend[i].bloodCollectedLevel > 0 && friend[i].isAttached == false) {
    friend[i].bloodCollectedLevel -= 5;
  }

  if (friend[i].position.y < resolutionY - friend[i].radius - 20) {
    friend[i].vel_y += 0.1;

    if (friend[i].isAttached == true) {
      for (let i2 = 0; i2 < friend[i].segments.length; i2++) {
        friend[i].segments[i2].y += 2;
      }
    }
  } else {
    friend[i].position.y = resolutionY - friend[i].radius - 20;
    friend[i].vel_y = 0;
    friend[i].jumped = false;
  }


  if (friend[i].isAttached == true) {
    return;
  }

  randomMovement = randomInt(1, 50);

  if (friend[i].position.x < 0) {
    friend[i].vel_x = 1;
  }

  if (friend[i].position.x > resolutionX) {
    friend[i].vel_x = -1;
  }

  if (randomMovement == 1) {
    friend[i].vel_x = randomInt(-1, 1);
  }

  if (randomMovement == 2) {
    friend[i].vel_x = randomInt(-1, 1);
  }

  if (randomMovement == 3) {
    friendJumpMovement(i)
  }
}

function friendJumpMovement(i) {
  if (friend[i].jumped == true) {
    return;
  }

  if (friend[i].vel_y <= -friend[i].jumpPower) {
    return;
  }

  friend[i].jumped = true;
  friend[i].vel_y -= friend[i].jumpPower;

}

function friendDragSegment(i, xin, yin, being, shell) {
  var dx = xin - being.segments[i].x;
  var dy = yin - being.segments[i].y;
  var angle = atan2(dy, dx);
  being.segments[i].x = xin - cos(angle) * being.segLength;
  being.segments[i].y = yin - sin(angle) * being.segLength;

  push();
  strokeWeight(being.radius * 2);
  stroke(color(being.bloodCollectedLevel, 50, 50));
  translate(being.segments[i].x, being.segments[i].y);
  if (shell == true) {
    strokeWeight(being.radius * 3);
  }

  rotate(angle);
  line(0, 0, being.segLength, 0);
  pop();
}

function friendCollisionCheckAttach(obstacle, object) {
  
  if (object.position.x > resolutionX && object.isAttached == false || object.position.x < 0 && object.isAttached == false) {
    return;
  }
  
  if (object.bloodCollectedLevel >= 255) {
    object.isAttached = false;
  }

  let d = p5.Vector.dist(object.position, obstacle.position);
  if (d < object.radius + obstacle.radius) {
    debugger;
    object.vel_y = 0;
    object.vel_x = 0;
    object.jumped = true;
    object.isAttached = true;

    if (object.bloodCollectedLevel < 255) {
      object.bloodCollectedLevel += 1;
      object.position.x = obstacle.position.x;
      object.position.y = obstacle.position.y;
      obstacle.vel_x = 0;
    }

    if (object.bloodCollectedLevel >= 255) {
      object.bloodCollectedLevel = 255;
      object.vel_y += 2;
      obstacle.vel_x = -0.5;
    }
    return;
  }
}

