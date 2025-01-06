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
    obstacle_array_rect.push(new create_obstacle_rect(ground_x, resolutionY - 20, 20, 20, false));
    ground_x += 22;
  }

  text_x = 20;
  text_y = 20;
  text_amounts = 0;
  text_i = mapInt;
  if(text_i > 40){
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
    obstacle_array.push(new create_obstacle(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20));
    obstacle_array.push(new create_obstacle(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20));
    obstacle_array.push(new create_obstacle(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20));
    obstacle_array_rect.push(new create_obstacle_rect(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20, 20));
    obstacle_array_rect.push(new create_obstacle_rect(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20, 20));
    obstacle_array_rect.push(new create_obstacle_rect(randomInt(0, resolutionX), randomInt(0, resolutionY) - 40, 20, 20));
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
      if(i >= 20 && i <= 35){
        obstacle_array_rect[i].position.x = -20;
      }
      
      obstacle_array_rect[i].haveCollision = true;
    }

  }

  if (map > 4) {
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



}


