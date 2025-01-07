let obstacle_array = [];
let obstacle_array_rect = [];
let background_text_array = [];
let map = 1;
let loopCompleted = false;

function create_obstacle(x, y, radius) {
  this.position = new p5.Vector(x, y);
  this.radius = radius;
}

function create_obstacle_rect(x, y, width, height, image = true, haveCollision = true) {
  this.position = new p5.Vector(x, y);
  this.width = width;
  this.height = height;
  this.image = image;
  this.haveCollision = haveCollision;
}

function create_background_text(x, y, width, height, text, color) {
  this.position = new p5.Vector(x, y);
  this.width = width;
  this.height = height;
  this.text = text;
  this.color = color;
}

function loadMap(mapInt) {
  obstacle_array = [];
  obstacle_array_rect = [];
  background_text_array = [];
  background_text_array = [];
  enemy_1 = [];
  enemy_2 = [];
  enemy_3 = [];
  enemy_4 = [];

  // ground
  var ground_x = -80;
  for (let i = 0; i < 35; i++) {
    obstacle_array_rect.push(new create_obstacle_rect(ground_x, resolutionY - 20, 20, 20, false, false));
    ground_x += 22;
  }

  text_x = 20;
  text_y = 20;
  text_amounts = 0;
  text_i = mapInt;
  if (text_i > 40) {
    text_i = 40;
  }
  for (let i = 0; i < text_i; i++) {
    background_text_array.push(new create_background_text(text_x, text_y, 10, 10, '+', [0, 0, 0],));
    text_x += 20;
    if (text_amounts == 7) {
      text_y += 20;
      text_amounts = 0;
      text_x = 20;
    }
    text_amounts++;
  }

  for (let i = 0; i < 10; i++) {
    enemy_3.push(new create_enemy_3(randomInt(0, resolutionX), resolutionY - 15, 0, 0));
  }


  if (map == 1) {

  }

  if (map == 2) {
    obstacle_array.push(new create_obstacle(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20));
    obstacle_array.push(new create_obstacle(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20));
    obstacle_array.push(new create_obstacle(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20));
    obstacle_array_rect.push(new create_obstacle_rect(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20, 20));
    obstacle_array_rect.push(new create_obstacle_rect(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20, 20));
    obstacle_array_rect.push(new create_obstacle_rect(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20, 20));

    enemy_2.push(new create_enemy_2(randomInt(0, resolutionX), randomInt(0, resolutionY - 20), 0, 0));
    enemy_2.push(new create_enemy_2(randomInt(0, resolutionX), randomInt(0, resolutionY - 20), 0, 0));

    enemy_1.push(new create_enemy_1(resolutionX + randomInt(50, 200), randomInt(0, resolutionY - 20), -0.5, -0.1));
    enemy_1.push(new create_enemy_1(resolutionX + randomInt(50, 200), randomInt(0, resolutionY - 20), -0.5, -0.1));
  }

  if (map == 3) {
    obstacle_array.push(new create_obstacle(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20));
    obstacle_array.push(new create_obstacle(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20));
    obstacle_array.push(new create_obstacle(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20));
    obstacle_array_rect.push(new create_obstacle_rect(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20, 20));
    obstacle_array_rect.push(new create_obstacle_rect(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20, 20));
    obstacle_array_rect.push(new create_obstacle_rect(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20, 20));

    for (let i = 0; i < 100; i++) {
      enemy_4.push(new create_enemy_4(randomInt(0, resolutionX), resolutionY - 20, 0, 0));
    }
  }

  if (map == 4) {
    enemy_3 = [];
    obstacle_array.push(new create_obstacle(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20));
    obstacle_array.push(new create_obstacle(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20));
    obstacle_array.push(new create_obstacle(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20));
    obstacle_array_rect.push(new create_obstacle_rect(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20, 20));
    obstacle_array_rect.push(new create_obstacle_rect(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20, 20));
    obstacle_array_rect.push(new create_obstacle_rect(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20, 20));

    for (let i = 0; i < obstacle_array_rect.length; i++) {
      if (i >= 20 && i <= 35) {
        obstacle_array_rect[i].position.x = -20;
      }

      obstacle_array_rect[i].haveCollision = true;
    }

  }



  if (map == 8) {
    player[0].position.y = resolutionY - 80;
    map = 1;
    loopCompleted = true;
    loadMap(map);
  }

  if (loopCompleted == false && map > 4) {
    obstacle_array.push(new create_obstacle(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20));
    obstacle_array.push(new create_obstacle(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20));
    obstacle_array.push(new create_obstacle(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20));
    obstacle_array_rect.push(new create_obstacle_rect(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20, 20));
    obstacle_array_rect.push(new create_obstacle_rect(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20, 20));
    obstacle_array_rect.push(new create_obstacle_rect(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20, 20));

    enemy_2.push(new create_enemy_2(randomInt(0, resolutionX), randomInt(0, resolutionY - 20), 0, 0));
    enemy_2.push(new create_enemy_2(randomInt(0, resolutionX), randomInt(0, resolutionY - 20), 0, 0));

    enemy_1.push(new create_enemy_1(resolutionX + randomInt(50, 200), randomInt(0, resolutionY - 20), -0.5, -0.1));
    enemy_1.push(new create_enemy_1(resolutionX + randomInt(50, 200), randomInt(0, resolutionY - 20), -0.5, -0.1));

    for (let i = 0; i < 5; i++) {
      enemy_4.push(new create_enemy_4(randomInt(0, resolutionX), resolutionY - 20, 0, 0));
    }
  }

  if (map == 7) {
    enemy_1 = [];
    var wallY = 98;
    for (let i = 0; i < 11; i++) {
      obstacle_array_rect.push(new create_obstacle_rect(resolutionX - 22, wallY, 20, 20, false));
      wallY += 22;
    }

    obstacle_array_rect.push(new create_obstacle_rect(resolutionX - 80, 40, 20, 20));
    obstacle_array_rect.push(new create_obstacle_rect(resolutionX - 100, 100, 20, 20));
    obstacle_array_rect.push(new create_obstacle_rect(resolutionX - 80, 250, 20, 20));
    obstacle_array_rect.push(new create_obstacle_rect(resolutionX - 150, 150, 20, 20));
  }

  if (loopCompleted == true && map == 5) {
    for (let i = 0; i < 7; i++) {
      obstacle_array.push(new create_obstacle(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20));
    }

    for (let i = 0; i < 7; i++) {
      enemy_1.push(new create_enemy_1(resolutionX + randomInt(50, 200), randomInt(0, resolutionY - 20), -0.5, -0.1));
    }

    for (let i = 0; i < 10; i++) {
      friend.push(new create_friend(randomInt(0, resolutionX), resolutionY - 20, randomInt(-1, 1), 0));
    }
  }


}


