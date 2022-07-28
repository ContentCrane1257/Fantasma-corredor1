// dar de alta las variables 
// elementos : fondo de la torre, puerta, fantasma, climber
var fantasma, fantasIm, fantasmasalt;
var torre, torreIm;
var ventana, ventanaIm;
var barandal, barandalIm;
var sonidoRaro
var score = 0;

var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  // cargar imagenes y sonido
  fantasIm = loadImage("ghost-standing.png");
  fantasmasalt = loadImage("ghost-jumping.png");
  torreIm = loadImage("tower.png");
  ventanaIm = loadImage("door.png");
  barandalIm = loadImage("climber.png");

  sonidoRaro = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  //sonidoRaro.loop(); //REPRODUCCIÓN EN BUCLE
   
  //crear torre 
  torre = createSprite(300,300,10,10);
  torre.addImage(torreIm);
  torre.velocityY = 1
  

  // crear fantasma 
fantasma = createSprite(200,200,50,50);
fantasma.addImage(fantasIm);
fantasma.scale = 0.3; 
   // GRUPO DE PUERTAS
   grupVent = createGroup();
  // GRUPO DE CLIMBERS 
  grupBar = createGroup();

  invisibleBlockGroup = new Group();

}


function draw() {
  background(255);
//text("Puntuaión:"+score,300,500);
//score = frameCount %1

  
  if (gameState === "play") {

    
   
  
      //escribir aquí el código para mover el fantasma a la izquierda al presionar la flecha izquierda
  if(keyDown("d")){
    fantasma.x = fantasma.x + 4;
  }
   
  
      //escribir aquí el código para mover el fantasma a la derecha al presionar la flecha derecha
      if(keyDown("a")){
        fantasma.x = fantasma.x - 4;
      }
      
      //escribir aquí el código para QUE EL FANTASMA SALTE AL PRESIONAR SPACE
      if(keyDown("space")){
        fantasma.velocityY = - 10; 
      
      }
  
  fantasma.velocityY = fantasma.velocityY + 0.8; // TE ACUERDAS PARA QUE ERA ESTA INSTRUCCIÓN?
  
   
      //escribir una condición para desplazar infinitamente la torre
    if(torre.y >400){
      torre.y = 300
    }
      // LLAMA A LA FUNCIÓN DE PUERTAS! 

  
      //escribir el código = SI EL FANTASMA TOCA EL CLIMBERSGROUP SE DETIENE. 

      if(invisibleBlockGroup.isTouching(fantasma) || fantasma.y > 600){
        // Escribe el codigo para destruir al fantasma. 
        fantasma.destroy();
      // CAMBIA EL JUEGO A END
      gameState = "end";
      }
  
      ventanas();

  drawSprites();
}
  if (gameState === "end"){
    background("black");
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("¡Fin del juego!",150,310);

  text("Puntuaión:"+score,300,500);
  score = score + Math.round(frameCount/60);
  
    
   // TEXTO DE FIN DE JUEGO 
  }
}

function ventanas() // PARA QUE SIRVE ESTA FUNCION? 
 {
  if (frameCount % 240 === 0) {
    var ventana = createSprite(200, -50);
    ventana.addImage(ventanaIm);
ventana.lifetime = 800; 

    var barandal = createSprite(200,10);
    barandal.addImage(barandalIm);
    barandal.lifetime = 800; 

    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = barandal.width;
    invisibleBlock.height = 2;
grupVent.add(ventana);
grupBar.add(barandal);
    //agregar la función random para que la puerta aparezca al azar
ventana.x = Math.round(random(128,350,));

    barandal.x = ventana.x;
    invisibleBlock.x = ventana.x;
    
    // AGREGAR DOOR AL GRUPO
    // AGREGAR CLIMBER AL GRUPO 
    
    
    ventana.velocityY = 1;
    barandal.velocityY = 1;
    invisibleBlock.velocityY = 1;
fantasma.depth = ventana.depth; // PARA QUE SIRVE ESTA INSTRUCCIÓN? 
    fantasma.depth +=1;
    
     

    
    //asignar lifetime a la PUERTA, CIMBER E invisibleBlock = 800


    //agregar cada obstáculo al grupo obstaclesGroup.add(obstacle);
    //aquí los obstáculos son la puerta y  la barandilla o CLIMBER 
        invisibleBlock.debug = false;
    invisibleBlockGroup.add(invisibleBlock);
  }
}

