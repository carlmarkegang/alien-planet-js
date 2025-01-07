let resolutionX = 640;
let resolutionY = 360;
let debugMode = false;

function preload() {
  img_background = loadImage("images/background.png");
  img_background_2 = loadImage("images/background_2.png");
  img_block = loadImage("images/block.png");
  img_ball = loadImage("images/ball.png");
}

function setup() {
  const myCanvas = createCanvas(resolutionX, resolutionY);
  myCanvas.parent("canvas-div");
  loadMap(1);
}

function draw() {
  background(color(221, 233, 202));
  if (map < 5) {
    image(img_background, 0, 0, resolutionX, resolutionY);
  } else {
    image(img_background_2, 0, 0, resolutionX, resolutionY);
  }

  strokeWeight(0);
  playerMovement();
  jumpMovement();

  // Text
  for (let i = 0; i < background_text_array.length; i++) {
    fill(color(17, 12, 4))
    rect(background_text_array[i].position.x + 2, background_text_array[i].position.y + 2, background_text_array[i].width, background_text_array[i].height);
    fill(color(55, 55, 55));
    rect(background_text_array[i].position.x, background_text_array[i].position.y, background_text_array[i].width, background_text_array[i].height);
    fill(color(background_text_array[i].color[0], background_text_array[i].color[1], background_text_array[i].color[2]));
    collisionCheckRect(background_text_array[i], player[0]);
    textSize(background_text_array[i].height);
    text(background_text_array[i].text, background_text_array[i].position.x + 2, background_text_array[i].position.y + 8);
  }

  // Obstacle
  fill(color(17, 12, 4));
  for (let i = 0; i < obstacle_array.length; i++) {

    // Shadow test
    /*
    if (map > 4) {
      strokeWeight(obstacle_array[i].radius * 2);
      stroke(color(0, 0, 0, 100));
      let directionX = obstacle_array[i].position.x - player[0].position.x;
      let directionY = obstacle_array[i].position.y - player[0].position.y;
      let length = Math.sqrt(directionX * directionX + directionY * directionY);
      let unitX = directionX / length;
      let unitY = directionY / length;
      let shadowLength = 500;
      let shadowX = obstacle_array[i].position.x + unitX * shadowLength;
      let shadowY = obstacle_array[i].position.y + unitY * shadowLength;
      line(obstacle_array[i].position.x, obstacle_array[i].position.y, shadowX, shadowY);
      strokeWeight(0);
    }
    */

    //ellipse(obstacle_array[i].position.x, obstacle_array[i].position.y, obstacle_array[i].radius * 2, obstacle_array[i].radius * 2);
    image(img_ball, obstacle_array[i].position.x - (obstacle_array[i].radius * 2 / 2), obstacle_array[i].position.y - (obstacle_array[i].radius * 2 / 2), obstacle_array[i].radius * 2, obstacle_array[i].radius * 2);
    collisionCheck(obstacle_array[i], player[0]);



    for (let e_1 = 0; e_1 < enemy_1.length; e_1++) {
      collisionCheck(obstacle_array[i], enemy_1[e_1]);
      for (var i2 = 0; i2 < enemy_1[e_1].segments.length; i2++) {
        enemy_1[e_1].segments[i2].y += 1;
        collisionCheck(obstacle_array[i], enemy_1[e_1].segments[i2], i2, enemy_1[e_1].segmentRadius);
      }
    }
  }

  // Obstacle rect
  for (let i = 0; i < obstacle_array_rect.length; i++) {
    if (obstacle_array_rect[i].image == false) {
      fill(color(0, 0, 0));
      rect(obstacle_array_rect[i].position.x + 2, obstacle_array_rect[i].position.y + 2, obstacle_array_rect[i].width, obstacle_array_rect[i].height);
      fill(color(17, 12, 4));
      rect(obstacle_array_rect[i].position.x, obstacle_array_rect[i].position.y, obstacle_array_rect[i].width, obstacle_array_rect[i].height);
    } else {
      // Vines
      if (i % 2 == 0) {
        fill(color(17, 12, 4));
        rect(obstacle_array_rect[i].position.x + 5, obstacle_array_rect[i].position.y + 19, 1, i - 10);
        rect(obstacle_array_rect[i].position.x + 15, obstacle_array_rect[i].position.y + 19, 1, i - 20);
      }

      image(img_block, obstacle_array_rect[i].position.x, obstacle_array_rect[i].position.y, obstacle_array_rect[i].width, obstacle_array_rect[i].height);

    }

    if (obstacle_array_rect[i].haveCollision) {
      collisionCheckRect(obstacle_array_rect[i], player[0]);
    }

    for (let e_1 = 0; e_1 < enemy_1.length; e_1++) {
      collisionCheckRect(obstacle_array_rect[i], enemy_1[e_1]);
      for (var i2 = 0; i2 < enemy_1[e_1].segments.length; i2++) {
        collisionCheckRect(obstacle_array_rect[i], enemy_1[e_1].segments[i2], i2, enemy_1[e_1].segmentRadius);
        enemy_1[e_1].segments[i2].y += 1;
      }
    }
  }

  // Enemy 1
  for (let e_1 = 0; e_1 < enemy_1.length; e_1++) {
    enemy_1Movements(e_1);
    if (enemy_1[e_1].position.x < -20) {
      enemy_1[e_1].position.x = resolutionX + 50;
      enemy_1[e_1].position.y = randomInt(0, resolutionY - 20)
    }
    enemy_1DragSegment(0, enemy_1[e_1].position.x, enemy_1[e_1].position.y, enemy_1[e_1]);
    for (var i2 = 0; i2 < enemy_1[e_1].segments.length - 1; i2++) {
      enemy_1DragSegment(i2 + 1, enemy_1[e_1].segments[i2].x, enemy_1[e_1].segments[i2].y, enemy_1[e_1]);
    }

    fill(color(200, 30, 30));
    ellipse(enemy_1[e_1].position.x, enemy_1[e_1].position.y, enemy_1[e_1].radius * 2, enemy_1[e_1].radius * 2);

    collisionCheckAttach(enemy_1[e_1], player[0]);
  }

  // Enemy 2
  fill(color(50, 50, 50));
  for (let e_2 = 0; e_2 < enemy_2.length; e_2++) {
    enemy_2Movements(e_2);
    if (enemy_2[e_2].position.x < -20) {
      enemy_2[e_2].position.x = resolutionX + 50;
      enemy_2[e_2].position.y = randomInt(0, resolutionY - 20)
    }
    ellipse(enemy_2[e_2].position.x, enemy_2[e_2].position.y, enemy_2[e_2].radius * 2, enemy_2[e_2].radius * 2);
    ellipse(enemy_2[e_2].position.x - 5, enemy_2[e_2].position.y + randomInt(-1, 1), enemy_2[e_2].radius, enemy_2[e_2].radius);
    ellipse(enemy_2[e_2].position.x + 5, enemy_2[e_2].position.y + randomInt(-1, 1), enemy_2[e_2].radius, enemy_2[e_2].radius);
    collisionCheck(player[0], enemy_2[e_2]);
  }

  // Enemy 4
  fill(color(0, 0, 0));
  for (let e_4 = 0; e_4 < enemy_4.length; e_4++) {
    enemy_4Movements(e_4);
    if (enemy_4[e_4].position.x < -20) {
      enemy_4[e_4].position.x = resolutionX + 50;
      enemy_4[e_4].position.y = randomInt(0, resolutionY - 20)
    }
    ellipse(enemy_4[e_4].position.x, enemy_4[e_4].position.y, enemy_4[e_4].radius * 2, enemy_4[e_4].radius * 2);
  }

  // Player
  fill(color(player[0].bloodCollectedLevel, 50, 50));
  ellipse(player[0].position.x, player[0].position.y, player[0].radius * 2, player[0].radius * 2);
  dragSegment(1, player[0].segments[2].x, player[0].segments[2].y, player[0], true);
  dragSegment(0, player[0].position.x, player[0].position.y, player[0]);
  for (var i2 = 0; i2 < player[0].segments.length - 1; i2++) {
    dragSegment(i2 + 1, player[0].segments[i2].x, player[0].segments[i2].y, player[0]);
  }

  // Friend
  for (let i = 0; i < friend.length; i++) {
    friendMovement(i);
    fill(color(friend[i].bloodCollectedLevel, 50, 50));
    ellipse(friend[i].position.x, friend[i].position.y, friend[i].radius * 2, friend[i].radius * 2);
    friendDragSegment(1, friend[i].segments[2].x, friend[i].segments[2].y, friend[i], true);
    friendDragSegment(0, friend[i].position.x, friend[i].position.y, friend[i]);
    for (var i2 = 0; i2 < friend[i].segments.length - 1; i2++) {
      friendDragSegment(i2 + 1, friend[i].segments[i2].x, friend[i].segments[i2].y, friend[i]);
    }

    for (let e_1 = 0; e_1 < enemy_1.length; e_1++) {
      friendCollisionCheckAttach(enemy_1[e_1], friend[i]);
    }
  }

  // Enemy 3
  fill(color(17, 12, 4))
  for (let e_3 = 0; e_3 < enemy_3.length; e_3++) {
    enemy_3Movements(e_3);
    if (enemy_3[e_3].position.x < -20) {
      enemy_3[e_3].position.x = resolutionX + 50;
      enemy_3[e_3].position.y = randomInt(0, resolutionY - 20)
    }
    ellipse(enemy_3[e_3].position.x, enemy_3[e_3].position.y, enemy_3[e_3].radius * 2, enemy_3[e_3].radius * 2);
    enemy_3DragSegment(0, enemy_3[e_3].position.x, enemy_3[e_3].position.y, enemy_3[e_3], [17, 12, 4]);
    for (var i2 = 0; i2 < enemy_3[e_3].segments.length - 1; i2++) {
      enemy_3[e_3].segments[i2].y -= 0.1;
      enemy_3DragSegment(i2 + 1, enemy_3[e_3].segments[i2].x, enemy_3[e_3].segments[i2].y, enemy_3[e_3], [17, 12, 4]);
      collisionCheck(player[0], enemy_3[e_3].segments[i2], i2, enemy_3[e_3].segmentRadius);
    }
  }

  if (loopCompleted == true && map == 5) {
    fill(255);
    stroke(1);
    textSize(12);
    text('You made it home!', resolutionX/2, 100);
  }

  if (loopCompleted == false && map == 1) {
    fill(0);
    stroke(1);
    textSize(12);
    text('Year 3542, unknown planet.\n\n You’ve been snatched from your cozy nest! \n Use arrow keys to get back home (UP, LEFT, RIGHT) -->', resolutionX/2, 50);
  }

  // Going to next map
  navigateToNextMap();
  debugModeText();
}

function collisionCheck(obstacle, object, i_optional, radius_optional) {
  // For segments
  if (i_optional != undefined) {
    object.position = [];
    object.position = object;
    object.radius = radius_optional;
  }

  let d = p5.Vector.dist(object.position, obstacle.position);

  if (d < object.radius + obstacle.radius) {
    let shift = p5.Vector.sub(object.position, obstacle.position);
    shift.setMag(object.radius + obstacle.radius - d);
    object.position.add(shift);

    // For segments
    if (i_optional != undefined) {
      object.add(shift);
    }

    if (object.isPlayer) {
      if (object.vel_y >= 0) {
        object.vel_y = 1;
        object.jumped = false;
      }
    }
  }
}

function collisionCheckRect(obstacle, object, i_optional, radius_optional) {
  // For segments
  if (i_optional != undefined) {
    object.position = [];
    object.position = object;
    object.radius = radius_optional;
  }

  let closestX = constrain(object.position.x, obstacle.position.x, obstacle.position.x + obstacle.width);
  let closestY = constrain(object.position.y, obstacle.position.y, obstacle.position.y + obstacle.height);
  let d = dist(object.position.x, object.position.y, closestX, closestY);

  if (d < object.radius) {
    if (obstacle.text != undefined) {
      obstacle.color = [255, 255, 255];
      return;
    }

    let shift = createVector(object.position.x - closestX, object.position.y - closestY);
    shift.setMag(object.radius - d);
    object.position.add(shift);

    // For segments
    if (i_optional != undefined) {
      object.add(shift);
    }

    if (object.isPlayer && keyIsDown(UP_ARROW) == false) {
      object.vel_y = 0;
      object.jumped = false;
    }
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function debugModeText() {
  if (debugMode == true) {
    fill(255);
    stroke(1);
    textSize(10);
    text('Player X:' + player[0].position.x + "\n" +
      'Player Y:' + player[0].position.y + "\n" +
      'Player velX:' + player[0].vel_x + "\n" +
      'Player velY:' + player[0].vel_y + "\n"
      , 10, 20);
  }
}