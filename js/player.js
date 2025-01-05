let player = [];

function create_player(x, y, vel_x, vel_y) {
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
  this.isPlayer = true;
}
player.push(new create_player(50, resolutionY - 50, 0, 0));

function playerMovement() {
  player[0].position.x += player[0].vel_x;
  player[0].position.y += player[0].vel_y;

  if (randomInt(0, 20) == 0 && player[0].bloodCollectedLevel > 0 && player[0].isAttached == false) {
    player[0].bloodCollectedLevel -= 5;
  }

  // Falling
  if (player[0].position.y < resolutionY - player[0].radius - 20) {
    player[0].vel_y += 0.1;

    if (player[0].isAttached == true) {
      for (let i = 0; i < player[0].segments.length; i++) {
        player[0].segments[i].y += 2;
      }
    }
  } else {
    player[0].position.y = resolutionY - player[0].radius - 20;
    player[0].vel_y = 0;
    player[0].jumped = false;
  }

  var maxSpeed = 2;

  if (player[0].isAttached == true) {
    return;
  }

  if (keyIsDown(LEFT_ARROW) === true) {
    player[0].vel_x -= player[0].speed;
  }

  if (keyIsDown(RIGHT_ARROW) === true) {
    player[0].vel_x += player[0].speed;
  }

  if (keyIsDown(LEFT_ARROW) === true && player[0].vel_x <= -maxSpeed) {
    player[0].vel_x = -maxSpeed;
  }

  if (keyIsDown(RIGHT_ARROW) === true && player[0].vel_x >= maxSpeed) {
    player[0].vel_x = maxSpeed;
  }

  if (keyIsDown(LEFT_ARROW) === false && keyIsDown(RIGHT_ARROW) === false && player[0].vel_x < 0) {
    player[0].vel_x += player[0].speed;
  }

  if (keyIsDown(LEFT_ARROW) === false && keyIsDown(RIGHT_ARROW) === false && player[0].vel_x > 0) {
    player[0].vel_x -= player[0].speed;
  }

}

function jumpMovement() {
  if (player[0].jumped == true) {
    return;
  }

  if (player[0].vel_y <= -player[0].jumpPower) {
    return;
  }

  if (keyIsDown(UP_ARROW) === true) {
    player[0].jumped = true;
    player[0].vel_y -= player[0].jumpPower;
  }
}

function dragSegment(i, xin, yin, being, shell) {
  var dx = xin - being.segments[i].x;
  var dy = yin - being.segments[i].y;
  var angle = atan2(dy, dx);
  being.segments[i].x = xin - cos(angle) * being.segLength;
  being.segments[i].y = yin - sin(angle) * being.segLength;

  push();
  strokeWeight(player[0].radius * 2);
  stroke(color(player[0].bloodCollectedLevel, 50, 50));
  translate(being.segments[i].x, being.segments[i].y);
  if (shell == true) {
    strokeWeight(player[0].radius * 3);
  }

  rotate(angle);
  line(0, 0, being.segLength, 0);
  pop();
}

function collisionCheckAttach(obstacle, object) {
  if (player[0].position.x > resolutionX && player[0].isAttached == false || player[0].position.x < 0 && player[0].isAttached == false) {
    return;
  }

  if (player[0].bloodCollectedLevel >= 255) {
    player[0].isAttached = false;
  }

  let d = p5.Vector.dist(object.position, obstacle.position);

  if (d < object.radius + obstacle.radius) {
    let shift = p5.Vector.sub(object.position, obstacle.position);
    shift.setMag(object.radius + obstacle.radius - d);
    object.position.add(shift);

    player[0].vel_y = 0;
    player[0].vel_x = 0;
    player[0].jumped = true;
    player[0].isAttached = true;

    if (player[0].bloodCollectedLevel < 255) {
      player[0].bloodCollectedLevel += 1;
      player[0].position.x = obstacle.position.x;
      player[0].position.y = obstacle.position.y;
      obstacle.vel_x = 0;
    }

    if (object.bloodCollectedLevel >= 255) {
      player[0].bloodCollectedLevel = 255;
      player[0].vel_y += 2;
      obstacle.vel_x = -0.5;
    }
    return;
  }
}

function navigateToNextMap() {
  var currentMap = map;

  if (player[0].position.x > resolutionX + 50) {
    player[0].position.x = -20;
    player[0].position.y = player[0].position.y - 25;
    player[0].vel_y = 0;
    map++;
  }
  if (player[0].position.x < -50 && map > 1) {
    player[0].position.x = resolutionX + 20;
    player[0].position.y = player[0].position.y - 25;
    player[0].vel_y = 0;
    map--;
  }
  if (player[0].position.x < 0 && map == 1) {
    player[0].position.x = 0;
  }

  if (currentMap != map) {
    loadMap(map);
  }
}