// Development
/*//build tile_types
let tile_types = [];
tile_types.push(new Tile_Type("Absen", "A3 Pro", 3.9, 128, 128, 500, 500, 12.7, 1, 1, 1));

//build processor_types
let processor_types = [];
processor_types.push(new Processor_Type("Brompton", "Tessera SX40", 3840, 2160, 555555, 8, 4));

let output_types = [];
output_types.push(new Output_Type(1280,720));
*/

//default counters
let next_project = 0;
let next_led_screen = 0;
let next_output = 0;


//trackers
let active_project = 0;
let active_led_screen = 0;
let active_output = 0;
let active_packed_output = 0;

//containers
let projects = [];

// vars for directions
let flows = {
  none: -1,
  right: 0,
  down: 1,
  left: 2,
  up: 3,
  end: 4, // for end of flow
  start: 5, // for start
  upright: 6,
  downright: 7,
  upleft: 8,
  downleft: 9,
  dirs: [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 0],
    [1, 0],
    [1, -1],
    [1, 1],
    [1, -1],
    [1, 1]
  ], // x,y step for each direction
  // Maps are used to workout the flow layout
  // x,y is the starting position with 0 as top or left and 1 as bottom or right
  // directions has an array for each direction. the first item is the travel
  // direction and the second item is the max number of steps befor turning
  map1: { // top left start right, down, left, down
    x: 0,
    y: 0,
    directions: [
      [0, Infinity],
      [1, 1],
      [2, Infinity],
      [1, 1]
    ],
  },
  map2: { // top left start, down, right, up, right
    x: 0,
    y: 0,
    directions: [
      [1, Infinity],
      [0, 1],
      [3, Infinity],
      [0, 1]
    ],
  },
  map3: {
    x: 0,
    y: 1, // bottom left start, right, up, left, up
    directions: [
      [0, Infinity],
      [3, 1],
      [2, Infinity],
      [3, 1]
    ],
  },
  map4: {
    x: 0,
    y: 1, // bottom left start, up, right, down, right
    directions: [
      [3, Infinity],
      [0, 1],
      [1, Infinity],
      [0, 1]
    ],
  },
  map5: {
    x: 0,
    y: 0, // top left start, down, diagonal up to the right, repeat.
    directions: [
      [1, Infinity],
      [6, 1]
    ],
  },
  map6: {
    x: 0,
    y: 1, // bottom left start, up, diagonal down to the right, repeat.
    directions: [
      [3, Infinity],
      [7, 1]
    ],
  },
  map7: {
    x: 0,
    y: 0, // top left start, right, diagonal down to the left, repeat.
    directions: [
      [0, Infinity],
      [9, 1]
    ],
  },
  map8: {
    x: 0,
    y: 1, // bottom left start, right, diagonal up to the left, repeat.
    directions: [
      [0, Infinity],
      [8, 1]
    ],
  },
};

let flow_maps = [flows.map1, flows.map2, flows.map3, flows.map4, flows.map5, flows.map6, flows.map7, flows.map8];

//set default data flow
//let current_flow = 0;
//let current_flow = +document.querySelector('input[name = "flow-map"]:checked').value;

let colors = [
  ["#D8544F", "#448CCA"],
  ["#60D394", "#FFD97D"],
  ["#ADA8B6", "#DE6B48"],
  ["#9AADBF", "#C6878F"]
];

let bizzaro_colors = [
  ["#448CCA","#D8544F"],
  ["#FFD97D", "#60D394"],
  ["#DE6B48", "#ADA8B6"],
  ["#C6878F", "#9AADBF"]
];

let resistor_colors = ['#996633', '#FF0000', '#FF9900', '#FFFF00', '#00FF00', '#0000FF', '#FF00FF', '#CCCCCC', '#FFFFFF', '#303030'];
var rainbow_colors = ["#FF0000", "#FF0700", "#FF0E00", "#FF1500", "#FF1C00", "#FF2300", "#FF2A00", "#FF3200", "#FF3900", "#FF4000", "#FF4700", "#FF4E00", "#FF5500", "#FF5D00", "#FF6400", "#FF6B00", "#FF7200", "#FF7900", "#FF8000", "#FF8800", "#FF8E00", "#FF9400", "#FF9A00", "#FFA100", "#FFA700", "#FFAD00", "#FFB300", "#FFBA00", "#FFC000", "#FFC600", "#FFCC00", "#FFD300", "#FFD900", "#FFDF00", "#FFE500", "#FFEC00", "#FFF200", "#FFF800", "#FFFF00", "#F1FE03", "#E4FE06", "#D7FE0A", "#C9FD0D", "#BCFD11", "#AFFD14", "#A2FD17", "#94FC1B", "#87FC1E", "#7AFC22", "#6DFC25", "#5FFB29", "#52FB2C", "#45FB2F", "#38FB33", "#2AFA36", "#1DFA3A", "#10FA3D", "#03FA41", "#02FA4A", "#02FA54", "#02FA5D", "#02FB67", "#02FB70", "#02FB7A", "#01FB84", "#01FC8D", "#01FC97", "#01FCA0", "#01FCAA", "#01FDB3", "#00FDBD", "#00FDC7", "#00FDD0", "#00FEDA", "#00FEE3", "#00FEED", "#00FFF7", "#01F1F7", "#02E4F7", "#03D6F8", "#04C9F8", "#05BBF9", "#06AEF9", "#07A1F9", "#0893FA", "#0986FA", "#0B78FB", "#0C6BFB", "#0D5DFC", "#0E50FC", "#0F43FC", "#1035FD", "#1128FD", "#121AFE", "#130DFE", "#1500FF", "#1A00FE", "#1F00FD", "#2400FC", "#2900FB", "#2F00FA", "#3400F9", "#3900F8", "#3E00F7", "#4400F6", "#4900F5", "#4E00F4", "#5300F3", "#5800F2", "#5E00F1", "#6300F0", "#6800EF", "#6D00EE", "#7300ED", "#7A00EC", "#8200EB", "#8A00EA", "#9200E9", "#9900E8", "#A100E7", "#A900E6", "#B100E5", "#B900E5", "#C000E4", "#C800E3", "#D000E2", "#D800E1", "#DF00E0", "#E700DF", "#EF00DE", "#F700DD", "#FF00DD", "#FF00D0", "#FF00C4", "#FF00B8", "#FF00AB", "#FF009F", "#FF0093", "#FF0087", "#FF007A", "#FF006E", "#FF0062", "#FF0055", "#FF0049", "#FF003D", "#FF0031", "#FF0024", "#FF0018", "#FF000C", "#FF0000"];
let red_100_50 = ['#FF0000','#800000'];
let green_100_50 = ['#00FF00','#008000'];
let blue_100_50 = ['#0000FF','#000080'];
let white_100_50 = ['#FFFFFF','#808080'];
let checkerboard = ['#FFFFFF','#000000'];

let string_color = "#FFFFFF";
let tile_border_color = "#000000";
let processor_border_color = "#FFFFFF";
let tile_index_color = "#000000";

//load default blinkingthings asterisk logo
let logo = new Image();
logo.src = "img/asterisklogo.png";
logo.onload = function() {

};

//every other pixel pattern
var every_other_pixel_checker = new Image();
  every_other_pixel_checker.src = 'img/checker.png';

let default_line_width = 2;

//DOM inputs
//######################################################################
//project
//let $project_name, $project_author, $project_company, $project_email;

//constraints
//let $processor_type, $tile_type, $output_type;

//screen
//let $screen_name, $screen_width, $screen_height;
//######################################################################


//Project Constructor
//######################################################################
function Project(name) {
  this.setup = function(){
    //auto incrementing id
    this.id = next_project;

    //properties based on initial arguments supplied by Project()
    this.name = name;


    //defaults for each new Project
    this.screen_count = 0;
    this.output_count = 0;
    this.processor_count = 0;
    this.total_processors=[];

    //container for screens in this project
    this.led_screens = [];

    //container for outputs in this project
    this.outputs = [];

    //container for packed outputs, might replace preceding outputs array
    this.packed_outputs=[];
    this.didnt_fit=[];

    //index for counting tiles by screen
    this.tile_index = 0;

    //switches project to screen view
    this.output = document.getElementById('output-view');
    this.screen = document.getElementById('screen-view');
    this.output_view_button = document.getElementById('output-view-button');
    this.screen_view_button = document.getElementById('screen-view-button');
  };
  this.setup();

  //get constraints from selected tile, processor and output
  this.check_inputs = function() {
    //save values from inputs on DOM
    $project_name = document.getElementById('project-name').value;



    $tile_type = +document.getElementById('tile-type').options[document.getElementById('tile-type').selectedIndex].value;
    $processor_type = +document.getElementById('processor-type').options[document.getElementById('processor-type').selectedIndex].value;
    $output_type = +document.getElementById('output-type').options[document.getElementById('output-type').selectedIndex].value;

    //reset this Processor's values based on DOM inputs
    this.name = $project_name;
    //this.author = $project_author;
    //this.company = $project_company;
    //this.email = $project_email;
    //this.output_type = $output_type;
  };
  this.check_inputs();

  this.update = function() {
    //Project
    this.check_inputs();
  };

  this.add_screen = function(w, h) {

    //add a screen to this project
    this.led_screens.push(new Screen(w, h));

    //increase this project's screen count
    this.screen_count = this.led_screens.length;

    let $options = $('#tile-color-scheme').find('option');
    let random = ~~(Math.random() * $options.length);

    $options.eq(random).prop('selected', true);

  };

  this.add_outputs = function(w, h) {


    //add a screen to this project
    for (let i = 0; i < this.packed_outputs.length; i++){

      this.outputs.push(new Output(w, h));
    }
    //always make a single master output that can contain all outputs
    //this.outputs.push(new Output(this.total_output_width, this.total_output_height));


    //increase this project's screen count
    this.output_count = this.outputs.length;
  };

  this.switch_output = function(output_id){
    active_output = output_id;
    projects[active_project].outputs[active_output].load_output_to_output_view();

  }

  this.remove_screen = function(screen_id) {
    delete projects[active_project].led_screens[screen_id];
  };
  //calculate outputs required
  this.outputs_required = function() {

    let total_width, total_height;
    this.right_limit = 0;
    this.bottom_limit = 0;
    for (let i = 0; i < this.led_screens.length; i++){
      let rightmost = this.led_screens[i].pixels_wide + this.led_screens[i].screen_offset_x;
      let bottommost = this.led_screens[i].pixels_high + this.led_screens[i].screen_offset_y;
      if (rightmost > this.right_limit){
        this.right_limit = rightmost;
      }
      if (bottommost > this.bottom_limit){
        this.bottom_limit = bottommost;
      }
    }

    //what is the output resolution for our project?
    this.outputs_wide = Math.ceil(this.right_limit / output_types[this.output_type].width);
    this.outputs_high = Math.ceil(this.bottom_limit / output_types[this.output_type].height);
    this.total_output_width = this.outputs_wide * output_types[this.output_type].width;
    this.total_output_height = this.outputs_high * output_types[this.output_type].height;
    /*for (let y = 0; y < this.outputs_high; y++){
      for (let x = 0; x < this.outputs_wide; x++){
      //for each output required
       this.outputs.push(new Output(output_types[this.output_type].width,output_types[this.output_type].height));
      }
    }*/

    //return outputs required for this project
    return (this.outputs_high * this.outputs_wide);
  };
  //this.outputs_required();

  this.fix_output_thumbnails = function(){
    //for each thumbnail output excluding the last one. master thumbnail (-1)
    let thumbnail_count = 0;
    for (let i = 0; i < this.outputs_high; i++){
      for (let j = 0; j < this.outputs_wide; j ++){
      //switch canvas and ctx to that of thumbnail
      let canvas = document.getElementById('thumbnail'+thumbnail_count);
      let ctx = canvas.getContext('2d');

      //clear thumbnail
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      //let master_output = document.getElementById("project_"+active_project+"_output_"+(this.outputs.length-1));

      //ctx.drawImage(master_output,j * output_types[$output_type].width,i * output_types[$output_type].height,output_types[$output_type].width,output_types[$output_type].height,0,0,canvas.width,canvas.height);
      thumbnail_count +=1;
      }
    }
  };

  this.fix_stored_outputs = function(){
    //for each thumbnail output excluding the last one. master thumbnail (-1)
    let output_count = 0;
    for (let i = 0; i < this.outputs_high; i++){
      for (let j = 0; j < this.outputs_wide; j ++){
      //switch canvas and ctx to that of thumbnail
      let canvas = document.getElementById('project_'+active_project+'_output_'+j);
      let ctx = canvas.getContext('2d');

      //clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      //master output
      //let master_output = document.getElementById("project_"+active_project+"_output_"+(this.outputs.length-1));

      //ctx.drawImage(master_output,j * output_types[$output_type].width,i * output_types[$output_type].height,output_types[$output_type].width,output_types[$output_type].height,0,0,canvas.width,canvas.height);
      output_count +=1;
      }
    }
  };

  this.sort = {


   random  : function (a,b) { return Math.random() - 0.5; },
   w       : function (a,b) { return b.w - a.w; },
   h       : function (a,b) { return b.h - a.h; },
   a       : function (a,b) { return b.area - a.area; },
   max     : function (a,b) { return Math.max(b.w, b.h) - Math.max(a.w, a.h); },
   min     : function (a,b) { return Math.min(b.w, b.h) - Math.min(a.w, a.h); },

   height  : function (a,b) { return projects[active_project].sort.msort(a, b, ['h', 'w']);               },
   width   : function (a,b) { return projects[active_project].sort.msort(a, b, ['w', 'h']);               },
   area    : function (a,b) { return projects[active_project].sort.msort(a, b, ['a', 'h', 'w']);          },
   maxside : function (a,b) { return projects[active_project].sort.msort(a, b, ['max', 'min', 'h', 'w']); },

   msort: function(a, b, criteria) { /* sort by multiple criteria */
     var diff, n;
     for (n = 0 ; n < criteria.length ; n++) {
       diff = projects[active_project].sort[criteria[n]](a,b);
       if (diff != 0)
         return diff;
     }
     return 0;
   },

   now: function(blocks) {
     //demo had this point to a DOM element, i'm giving it values here
     //var sort = this.sort.val();
     var sort = 'maxside';
     if (sort != 'none')
       blocks.sort(projects[active_project].sort[sort]);
   }

  };

  this.count_processors = function(){

    for (let i = 0; i < this.led_screens.length; i++){
      //each screen
      for (let j= 0; j < this.led_screens[i].processors.length; j++){
        //each processor
        this.total_processors.push(this.led_screens[i].processors[j]);
      }
    }
    //console.log("Total Procs : "+this.total_processors);
    //bin pack to output size

    let blocks = [];
    this.total_processors.forEach(function(e){

      blocks.push({"w":e.width,"h":e.height,"proc":e.id,"screen":e.screen_id});

    });
    this.pack = function(blocks){
    //trying to fit processors
    let packed_output = new Packer(processor_types[$processor_type].resolutions[$output_type][0],processor_types[$processor_type].resolutions[$output_type][1]);
    //adjust different sort methods here

    this.sort.now(blocks);
    console.log("active packed output:"+active_packed_output);
    console.log("sorted incoming blocks:");
    console.dir(blocks);
    //blocks.sort(function(a,b) { return Math.max(b.w, b.h) - Math.max(a.w, a.h);  }); // sort inputs for best results
    packed_output.fit(blocks);
    //empty out previous didn't fit array
    this.didnt_fit = [];
    //console.log(blocks);

      //for each attempted packed processor
      let full =[];
      this.packed_outputs[active_packed_output]= [];
      for(var n = 0 ; n < blocks.length ; n++) {
        var block = blocks[n];
        //if the processors fit, add them to current packed output
        if (block.fit) {

          full.push({block});
          //blocks.splice(n,1);
        } else {
          console.log("something doesn't fit");
          //console.log(block);
          //didnt fit, add non-fitters to non-fit array
          //let output = {"w":block.w,"h":block.h};
          //console.log(output+" didnt fit");
          this.didnt_fit.push(block);
          //rerun this loop.
        }
      }
        full.forEach(function(e){
          projects[active_project].packed_outputs[active_packed_output].push(e);
        });
        //this.packed_outputs.push(full);
        //console.dir(this.didnt_fit);
        //console.log(blocks.length);
        //console.dir(blocks);

        //finished with one packed output, increase count
        if(this.didnt_fit.length > 0 && active_packed_output < 100 ){
          active_packed_output += 1;
          this.packed_outputs[active_packed_output]= [];
          //empty didnt fit
          console.log("We have leftovers, rerunning. ");
          //console.dir(this.didnt_fit[1]);
          this.pack(this.didnt_fit);
        } else {
        //this.pack(blocks);
        //alert(blocks.length);
      }


        console.log("Done Packing");
        console.dir(this.packed_outputs);
    };
    this.pack(blocks);

    //console.log(this.packed_outputs);


  };

  //function to wipe outputs from memory and dom when they change
  this.wipe_outputs = function(){
    //wipe packed outputs
    this.packed_outputs = [];
    active_packed_output = 0;

    //wipe thumbnails
    let output_thumbnails = document.getElementById("output-thumbs");
    output_thumbnails.innerHTML = '';

    let stored_project_canvases = document.getElementById('project_'+active_project).children;

    //wipe memory
    this.outputs = [];
    active_output = 0;
    next_output = 0;




    //remove stored output_canvases
    for (let i = 0; i < stored_project_canvases.length; i++){
      if (stored_project_canvases[i].className !== 'screen_canvas' || stored_project_canvases[i].id == 'project_0_output_0'){
        //delete all output canvases from dom
        stored_project_canvases[i].remove();

      }
      //flag - this is a super dirty fix for a bug I can't figure out
      let fixer;
      for (let i = 0; i < 10; i++){
        if (document.getElementById('project_0_output_'+i)){
        fixer = document.getElementById('project_0_output_'+i);
        fixer.remove();
        }
      }
    }
    this.count_processors();
    //create a new output object as we've just deleted them all
    this.add_outputs(processor_types[$processor_type].resolutions[$output_type][0],processor_types[$processor_type].resolutions[$output_type][1]);
    //this.add_outputs(output_types[$output_type].width,output_types[$output_type].height);
    //this.fix_output_thumbnails();
    //this.fix_stored_outputs();
  };


  //one master canvas per project. Will need to be updated.
  this.create_blank_master_canvas = function() {
    //create new <canvas> for each project

    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "project_"+active_project+"_master");
    this.canvas.setAttribute("class", "master_canvas");
    this.canvas.setAttribute("style", "position: absolute; left: 0; top: 0; display: none;");

    //create screen_storage for current output if it doesnt exist yet
    if (document.getElementById("project_"+active_project)){
      //alert("Already exists");
    } else {
      this.screen_storage = document.createElement("div");
      this.screen_storage.setAttribute("id", "project_" + active_project);
      let canvas_storage = document.getElementById('storage');
      canvas_storage.insertBefore(this.screen_storage, canvas_storage.childNodes[0]);

    }

    //switch context to new canvas's context
    this.ctx = this.canvas.getContext("2d");

    //find place to insert canvas
    this.screen_storage = document.getElementById("project_"+active_project);
    this.screen_storage.insertBefore(this.canvas, this.screen_storage.childNodes[0]);
  };
  this.create_blank_master_canvas();

  /*this.store_output = function(){
    //set context and canvas to screen-view to draw screen
    let canvas = document.getElementById("project_"+active_project+"_output_"+active_output);
    let ctx = canvas.getContext('2d');


    //set output-view to match output size from dropdowns
    switch(this.output_type){
      case 0:
        canvas.width = 1280;
        canvas.height = 720;
        break;
      case 1:
        canvas.width = 1920;
        canvas.height = 1080;
        break;
      case 2:
        canvas.width = 3840;
        canvas.height = 2160;
        break;
      case 3:
        canvas.width = 4096;
        canvas.height = 2160;
        break;
    }

    //clear map-view
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //building output canvas from screens
    for (let i = 0; i < this.screen_count; i++){

      //recall canvas that has been drawn already
      let canvasFromStorage = document.getElementById("project_"+active_project+"_screen_"+i);
      let screen_offset_x = this.led_screens[i].screen_offset_x;
      let screen_offset_y = this.led_screens[i].screen_offset_y;

      //draw stored canvas image to map-view
      //alert(document.getElementById("processor_" + id).width);
      ctx.drawImage(canvasFromStorage, screen_offset_x, screen_offset_y );

      //label the map offsets
      if ($screen_draw_offsets) {
        ctx.font = "18px Helvetica";
        ctx.fillStyle = "#FFFF00";
        let offset_x_text = screen_offset_x + "px";
        let offset_y_text = screen_offset_y + "px";
        ctx.fillText(offset_x_text, screen_offset_x / 2, screen_offset_y);
        ctx.fillText(offset_y_text, screen_offset_x, screen_offset_y / 2);

        //draw dimension lines from map corner to edge of output
        ctx.strokeStyle = "#FFFF00";
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 2]);
        ctx.beginPath();
        ctx.moveTo(screen_offset_x, screen_offset_y);
        ctx.lineTo(screen_offset_x, 0);
        ctx.moveTo(screen_offset_x, screen_offset_y);
        ctx.lineTo(0, screen_offset_y);
        ctx.stroke();

        //draw map label and offset above map in output
        let screen_label = "Screen " + i + " (" + offset_x_text + ", " + offset_y_text + ")";
        ctx.fillText(screen_label, screen_offset_x + 5, (screen_offset_y - 5));
      }
      //for each screen
    }
    //this.outputs.push(new Output(w, h));

  };*/


  /*this.recall_output = function (){
    //recall saved image of screen to output-view

      //set context and canvas to screen-view to draw screen
      let canvas = document.getElementById("output-view");
      let ctx = canvas.getContext('2d');

      let canvasFromStorage = document.getElementById("project_"+active_project+"_output_"+active_output);

      //set output-view to match output size from dropdowns
      switch(this.output_type){
        case 0:
          canvas.width = 1280;
          canvas.height = 720;
          break;
        case 1:
          canvas.width = 1920;
          canvas.height = 1080;
          break;
        case 2:
          canvas.width = 3840;
          canvas.height = 2160;
          break;
        case 3:
          canvas.width = 4096;
          canvas.height = 2160;
          break;
      }



      //clear map-view
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      //draw stored output canvas image to output-view
      ctx.drawImage(canvasFromStorage, 0, 0);

  };*/
  //this.recall_output();


  this.screen_view = function() {
    //show or hide appropriate view
    this.output.classList.add("hidden");
    this.screen.classList.remove("hidden");
    this.output_view_button.classList.remove("selected");
    this.screen_view_button.classList.add("selected");

  };

  //switches project to output view
  this.output_view = function() {
    //show or hide appropriate view
    this.output.classList.remove("hidden");
    this.screen.classList.add("hidden");
    this.output_view_button.classList.add("selected");
    this.screen_view_button.classList.remove("selected");

    //first run of output_view after screens have been drawn
    //this.create_blank_output_canvas(active_output);

  };


  this.center_screen = function(){


    this.led_screens[active_led_screen].screen_offset_x = ((this.total_output_width / 2) - (this.led_screens[active_led_screen].pixels_wide / 2));
    this.led_screens[active_led_screen].screen_offset_y = ((this.total_output_height / 2) - (this.led_screens[active_led_screen].pixels_high / 2));
    console.log("centered offset x : "+this.led_screens[active_led_screen].screen_offset_x);
    console.log("centered offset y : "+this.led_screens[active_led_screen].screen_offset_y);

    document.getElementById('screen-offset-x').value = this.led_screens[active_led_screen].screen_offset_x;
    document.getElementById('screen-offset-y').value = this.led_screens[active_led_screen].screen_offset_y;

    this.outputs[active_output].store_output_canvas();
    this.outputs[active_output].load_output_to_output_view();
    //this.fix_output_thumbnails();
    //this.fix_stored_outputs();
  };



  //increase id count
  next_project += 1;
  active_project = this.id;
} //end of Project Constructor

//Output Constructor
//######################################################################
function Output(width, height) {
  this.id = next_output;
  active_output = this.id;

  this.name = "Output "+this.id;

  //properties based on initial arguments supplied by Output();
  this.width = width;
  this.height = height;

  /*this.create_output_canvas = function(){
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "project_"+active_project+"_output_"+active_output);
    canvas.setAttribute("class", "output_canvas");
    canvas.setAttribute("style", "position: absolute; left: 0; top: 0; display: none;");

    //create screen_storage for current output if it doesnt exist yet
    if (document.getElementById("project_"+active_project)){
      //alert("Already exists");
    } else {
      this.output_storage = document.createElement("div");
      this.output_storage.setAttribute("id", "project_" + active_project);
      let canvas_storage = document.getElementById('storage');
      canvas_storage.insertBefore(this.output_storage, canvas_storage.childNodes[0]);

    }

    //switch context to new canvas's context
    ctx = canvas.getContext("2d");

    //find place to insert canvas
    this.output_storage = document.getElementById("project_"+active_project);
    this.output_storage.insertBefore(canvas, this.output_storage.childNodes[0]);
  };*/
  //this.create_output_canvas();
  //create canvas in dom for this output
  this.create_blank_output_canvas = function(){

    //create new <canvas> for each map

    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "project_"+active_project+"_output_"+active_output);
    this.canvas.setAttribute("class", "output_canvas");
    this.canvas.setAttribute("class", "output_canvas");
    this.canvas.setAttribute("style", "position: absolute; left: 0; top: 0; display: none;");

    //create screen_storage for current output if it doesnt exist yet
    if (document.getElementById("project_"+active_project)){
      //alert("Already exists");
    } else {
      this.screen_storage = document.createElement("div");
      this.screen_storage.setAttribute("id", "project_" + active_project);
      let canvas_storage = document.getElementById('storage');
      canvas_storage.insertBefore(this.screen_storage, canvas_storage.childNodes[0]);

    }

    //switch context to new canvas's context
    this.ctx = this.canvas.getContext("2d");

    //find place to insert canvas
    this.screen_storage = document.getElementById("project_"+active_project);
    this.screen_storage.insertBefore(this.canvas, this.screen_storage.childNodes[0]);


  };

  this.create_output_thumbnail = function(){
    //create thumbnail for each output
    let thumbnail = document.createElement("canvas");
    thumbnail.setAttribute("id", "output-thumbnail" + this.id);
    thumbnail.setAttribute("class", "output-thumbnail-canvas card-img-top");
    thumbnail.setAttribute("width", "100px");

    let canvas = thumbnail;
    let ctx = canvas.getContext('2d');
    let canvasFromStorage = document.getElementById("project_"+active_project+"_output_"+active_output);
    thumbnail.height = thumbnail.width * canvasFromStorage.height / canvasFromStorage.width;
    //ctx.drawImage(canvasFromStorage, 0, 0);
    //scaled version of output canvas for thumbnail

    //canvas.width = "100%";

    let width = canvas.width;
    //canvas.height = width * canvasFromStorage.height / canvasFromStorage.width;
    //playing with pthumbnail sizing
    ctx.drawImage(canvasFromStorage, 0, 0, width, width * canvasFromStorage.height / canvasFromStorage.width);
    //ctx.drawImage(canvasFromStorage, 0, 0,canvasFromStorage.width, canvasFromStorage.height);

    //find place to insert selector button
    let thumbnails = document.getElementById('output-thumbs');
    //thumbnails.appendChild(thumbnail);
    //  thumbnail = document.getElementById('output-thumbnail'+this.id);
    ////

    ////$$$$$$$$$
    //create card for each screen thumb
    let output_card = document.createElement("div");
    output_card.setAttribute("id","output-card-"+this.id);
    output_card.setAttribute("class","card");

    let output_card_body = document.createElement("div");
    output_card_body.setAttribute("id","output-card-body-"+this.id);
    output_card_body.setAttribute("class","card-body text-center");



    //<img class="card-img-top" src="..." alt="Card image cap">


    //create new screen selector button for each screen
    let selector = document.createElement("button");
    selector.setAttribute("id", "output-selector" + this.id);
    selector.setAttribute("type","button");
    selector.setAttribute("class", "output-selector btn btn-outline-secondary btn-sm");
    selector.setAttribute("onclick", "projects[active_project].switch_output(" + this.id + ");");
    selector.innerHTML = "output" + this.id;

    //insert selector button into card
    thumbnails.append(output_card);
    output_card.append(output_card_body);
    output_card_body.append(thumbnail);
    output_card_body.append(selector);
    ///$$$$$$$$$$



    //create new screen selector button for each screen
    /*let selector = document.createElement("button");
    selector.setAttribute("id", "output-selector" + this.id);
    selector.setAttribute("class", "output-selector");
    selector.setAttribute("onclick", "projects[active_project].switch_output(" + this.id + ");");
    selector.innerHTML = "output" + this.id;

    ////
    let label_span = document.createElement('button');
    let label = document.createTextNode("output "+active_output);
    label_span.appendChild(label);
    label_span.setAttribute("id", "output-thumbnail" + this.id+"-label");
    //thumbnails.appendChild(label_span);
    thumbnails.insertBefore(selector,thumbnails.lastChild);*/



  };


  this.store_output_canvas_by_screen = function(){
    //set context and canvas to output canvas to draw screen
    let canvas = document.getElementById("project_"+active_project+"_output_"+active_output);
    let ctx = canvas.getContext('2d');

    //set heights equal to output objects width and height;
    canvas.width = this.width;
    canvas.height = this.height;

    //clear map-view
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //building output canvas from screens
    for (let i = 0; i < projects[active_project].screen_count; i++){

      //recall canvas that has been drawn already
      let canvasFromStorage = document.getElementById("project_"+active_project+"_screen_"+i);
      let screen_offset_x = projects[active_project].led_screens[i].screen_offset_x;
      let screen_offset_y = projects[active_project].led_screens[i].screen_offset_y;

      //draw stored canvas image to map-view
      //alert(document.getElementById("processor_" + id).width);
      ctx.drawImage(canvasFromStorage, screen_offset_x, screen_offset_y );

      //label the map offsets
      if ($screen_draw_offsets) {
        ctx.font = "18px Helvetica";
        ctx.fillStyle = "#FFFF00";
        let offset_x_text = screen_offset_x + "px";
        let offset_y_text = screen_offset_y + "px";
        ctx.fillText(offset_x_text, screen_offset_x / 2, screen_offset_y);
        ctx.fillText(offset_y_text, screen_offset_x, screen_offset_y / 2);

        //draw dimension lines from map corner to edge of output
        ctx.strokeStyle = "#FFFF00";
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 2]);
        ctx.beginPath();
        ctx.moveTo(screen_offset_x, screen_offset_y);
        ctx.lineTo(screen_offset_x, 0);
        ctx.moveTo(screen_offset_x, screen_offset_y);
        ctx.lineTo(0, screen_offset_y);
        ctx.stroke();

        //draw map label and offset above map in output
        let screen_label = "Screen " + i + " (" + offset_x_text + ", " + offset_y_text + ")";
        ctx.fillText(screen_label, screen_offset_x + 5, (screen_offset_y - 5));
      }
      //for each screen
    }
  };
  //trying to switch from building outputs by screen to by processor
  this.store_output_canvas = function(){


    //

      //for each packed output

      this.create_blank_output_canvas();


      //set context and canvas to output canvas to draw screen
      let canvas = document.getElementById("project_"+active_project+"_output_"+this.id);
      let ctx = canvas.getContext('2d');

      //set heights equal to output objects width and height;
      canvas.width = this.width;
      canvas.height = this.height;

      //clear map-view
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let j = 0; j < projects[active_project].packed_outputs[this.id].length; j++){
        console.log("packed output "+this.id+" packed processor "+j);
        console.log(projects[active_project].packed_outputs[this.id][j].block.screen);

      //recall canvas that has been drawn already
      let canvasFromStorage = document.getElementById("screen_"+projects[active_project].packed_outputs[this.id][j].block.screen+"_processor_"+projects[active_project].packed_outputs[this.id][j].block.proc);
      let screen_offset_x = projects[active_project].packed_outputs[this.id][j].block.fit.x;
      let screen_offset_y = projects[active_project].packed_outputs[this.id][j].block.fit.y;

      //draw stored canvas image to map-view
      //alert(document.getElementById("processor_" + id).width);
      ctx.drawImage(canvasFromStorage, screen_offset_x, screen_offset_y );

      //label the map offsets
      if ($screen_draw_offsets) {
        ctx.font = "18px Helvetica";
        ctx.fillStyle = "#FFFF00";
        let offset_x_text = screen_offset_x + "px";
        let offset_y_text = screen_offset_y + "px";
        ctx.fillText(offset_x_text, screen_offset_x / 2, screen_offset_y);
        ctx.fillText(offset_y_text, screen_offset_x, screen_offset_y / 2);

        //draw dimension lines from map corner to edge of output
        ctx.strokeStyle = "#FFFF00";
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 2]);
        ctx.beginPath();
        ctx.moveTo(screen_offset_x, screen_offset_y);
        ctx.lineTo(screen_offset_x, 0);
        ctx.moveTo(screen_offset_x, screen_offset_y);
        ctx.lineTo(0, screen_offset_y);
        ctx.stroke();

        //draw map label and offset above map in output
        let screen_label = "Processor " + j + " (" + offset_x_text + ", " + offset_y_text + ")";
        ctx.fillText(screen_label, screen_offset_x + 5, (screen_offset_y - 5));
      }
      //for each packed processor
    }
      //for each packed output



    this.create_output_thumbnail();


  };
  this.store_output_canvas();

  //recall saved output to output-view
  this.load_output_to_output_view = function(){
    //set context and canvas to output-view to draw output
    let canvas = document.getElementById("output-view");
    let ctx = canvas.getContext('2d');
    //set output-view size to match that of the entire output we are drawing
    canvas.width = this.width;
    canvas.height = this.height;

    //change css on page to keep screen within window size
    if (canvas.height > canvas.width){
      //taller than wider
      canvas.style.width ="";
      //canvas.style.height="100%";

    } else {
      //wider than taller
      canvas.style.height ="";
      //canvas.style.width="98%";
    }

    //recall canvas that has been drawn already
    let canvasFromStorage = document.getElementById("project_"+active_project+"_output_"+active_output);

    //clear map-view
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw stored canvas image to map-view
    //alert(document.getElementById("processor_" + id).width);
    ctx.drawImage(canvasFromStorage, 0, 0);
    //for each processor


  };




  this.load_output_to_output_view();
  //increase output number
  //active_output += 1;
  next_output += 1;
}

//Screen Constructor
//######################################################################
function Screen(tiles_wide, tiles_high) {

  //auto incrementing id

  this.id = next_led_screen;
  active_led_screen = this.id;

  //default name
  this.name = "Screen "+this.id;
  document.getElementById('screen-name').value = this.name;

  //properties based on initial arguments supplied by Project()
  this.tiles_wide = tiles_wide;
  this.tiles_high = tiles_high;

  //defaults for each new Screen
  this.offset_x = 0;
  this.offset_y = 0;

  //containers for processors
  this.next_processor = 0;
  this.active_processor = 0;
  this.processors = [];

  //default logo
  this.logo = logo;

  //get constraints from selected tile, processor and output
  this.get_constraints = function() {
    $tile_type = +document.getElementById('tile-type').options[document.getElementById('tile-type').selectedIndex].value;
    $processor_type = +document.getElementById('processor-type').options[document.getElementById('processor-type').selectedIndex].value;
    //$output_type = +document.getElementById('output-type').options[document.getElementById('output-type').selectedIndex].value;

    this.tile_type = $tile_type;
    this.processor_type = $processor_type;
    this.output_type = $output_type;
  };
  this.get_constraints();

  this.colors = colors;

  //index for counting tiles by screen
  this.tile_index = 0;

  this.poll_inputs = function() {
    //update this screen

    //##################################
    // User Defined Variables 1/4
    //##################################

    //save values from inputs on DOM
    //dropdowns
    $screen_tile_color_option = +document.getElementById('tile-color-scheme').options[document.getElementById('tile-color-scheme').selectedIndex].value;
    $screen_coord_style = +document.getElementById('coord-style').options[document.getElementById('coord-style').selectedIndex].value;
    $screen_string_color_option = +document.getElementById('string-color-scheme').options[document.getElementById('string-color-scheme').selectedIndex].value;

    //text inputs
    $screen_name = document.getElementById('screen-name').value;
    $screen_width = +document.getElementById('screen-width').value;
    $screen_height = +document.getElementById('screen-height').value;
    $screen_offset_x = +document.getElementById('offset-x').value;
    $screen_offset_y = +document.getElementById('offset-y').value;

    //colors
    $screen_color1 = document.getElementById('user-color-1').value;
    $screen_color2 = document.getElementById('user-color-2').value;
    $screen_color3 = document.getElementById('user-color-3').value;
    $screen_color4 = document.getElementById('user-color-4').value;
    $screen_color5 = document.getElementById('user-color-5').value;
    $screen_color6 = document.getElementById('user-color-6').value;
    $screen_color7 = document.getElementById('user-color-7').value;
    $screen_color8 = document.getElementById('user-color-8').value;
    $screen_string_color = document.getElementById('string-color').value;
    $screen_tile_index_color = document.getElementById('tile-index-color').value;
    $screen_tile_border_color = document.getElementById('tile-border-color').value;
    $screen_processor_border_color = document.getElementById('processor-border-color').value;
    $screen_border_color = document.getElementById('screen-border-color').value;

    //text+numbers
    $screen_processor_border_width = +document.getElementById('processor-border-width').value;
    $screen_tile_border_width = +document.getElementById('tile-border-width').value;
    $screen_border_width = +document.getElementById('screen-border-width').value;
    $screen_test_line_width = +document.getElementById('test-pattern-width').value;
    $screen_test_line_color = document.getElementById('test-pattern-color').value;

    //booleans
    $screen_auto_clean_port = document.getElementById('fit-port-strings').checked;
    $screen_auto_average_limits = document.getElementById('balance-processor-load').checked;
    $screen_data_flow_badge = document.getElementById('show-string-icon').checked;
    $screen_tile_border = document.getElementById('tile-border').checked;
    $screen_processor_border = document.getElementById('processor-border').checked;
    $screen_border = document.getElementById('screen-border').checked;
    $screen_show_processor_label = document.getElementById('show-processor-label').checked;
    $screen_show_screen_label = document.getElementById('show-screen-label').checked;
    $screen_show_stats = document.getElementById('show-screen-stats').checked;
    $screen_show_logo = document.getElementById('show-logo').checked;
    $screen_show_data_flow = document.getElementById('show-data-flow').checked;
    $screen_every_other_pixel = document.getElementById('every-other-pixel').checked;
    $screen_test_draw_cross = document.getElementById('draw-cross').checked;
    $screen_test_draw_circle = document.getElementById('draw-circle').checked;
    //$screen_test_draw_corners = document.getElementById('draw-corners').checked;
    $screen_draw_offsets = document.getElementById('draw-offsets').checked;

    //radios
    $screen_data_flow = +document.querySelector('input[name = "data_flow"]:checked').value;
    //$screen_string_color_option = +document.querySelector('input[name = "flow-color-option"]:checked').value;
    $screen_tile_index_option = +document.querySelector('input[name = "tile_index_option"]:checked').value;
    $screen_tile_index_color_iterator = +document.querySelector('input[name = "tile_index_color_iterator"]:checked').value;
    $screen_string_color_iterator = +document.querySelector('input[name = "string_color_iterator"]:checked').value;
    $screen_tile_color_iterator = +document.querySelector('input[name = "tile_color_iterator"]:checked').value;
    $screen_string_break_option = +document.querySelector('input[name = "string_break_option"]:checked').value;
    //$screen_index_color_by_port = document.getElementById('tile-index-color-by-port').checked;
    //$screen_flow_break = document.getElementById('screen-flow-break').checked;


    //##################################
    // User Defined Variables 2/4
    //##################################
    //reset this Processor's values based on DOM inputs
    this.name = $screen_name;
    this.tiles_wide = $screen_width;
    this.tiles_high = $screen_height;

    // numbers
    this.tile_border_width = $screen_tile_border_width;
    this.processor_border_width = $screen_processor_border_width;
    this.screen_border_width = $screen_border_width;
    this.test_line_width = $screen_test_line_width;
    this.screen_offset_x = $screen_offset_x;
    this.screen_offset_y = $screen_offset_y;

    //colors
    this.colors[0][0] = $screen_color1;
    this.colors[0][1] = $screen_color2;
    this.colors[1][0] = $screen_color3;
    this.colors[1][1] = $screen_color4;
    this.colors[2][0] = $screen_color5;
    this.colors[2][1] = $screen_color6;
    this.colors[3][0] = $screen_color7;
    this.colors[3][1] = $screen_color8;
    this.string_color = $screen_string_color;
    this.tile_index_color = $screen_tile_index_color;
    this.tile_border_color = $screen_tile_border_color;
    this.processor_border_color = $screen_processor_border_color;
    this.screen_border_color = $screen_border_color;
    this.test_line_color = $screen_test_line_color;

    //dropdowns
    this.coord_style = $screen_coord_style;
    this.tile_color_option = $screen_tile_color_option;
    this.string_color_option = $screen_string_color_option;
    //booleans

    this.auto_clean_port = $screen_auto_clean_port;
    this.auto_average_limits = $screen_auto_average_limits;
    this.show_data_flow = $screen_show_data_flow;
    this.screen_border = $screen_border;
    this.tile_border = $screen_tile_border;
    this.processor_border = $screen_processor_border;
    this.show_processor_label = $screen_show_processor_label;
    this.show_screen_label = $screen_show_screen_label;
    this.show_stats = $screen_show_stats;
    this.show_logo = $screen_show_logo;
    this.every_other_pixel = $screen_every_other_pixel;
    this.test_draw_cross = $screen_test_draw_cross;
    this.test_draw_circle = $screen_test_draw_circle;
    //this.test_draw_corners = $screen_test_draw_corners;
    //this.draw_offsets = $screen_draw_offsets;

    //radios
    this.flow = $screen_data_flow;
    //this.string_color_option = $screen_string_color_option;
    this.tile_index_option = $screen_tile_index_option;
    this.tile_index_color_iterator = $screen_tile_index_color_iterator;
    this.tile_color_iterator = $screen_tile_color_iterator;
    this.string_break_option = $screen_string_break_option;
    // /this.get_constraints();
    //this.calculate_size();

    //reset select ammount of dom fields
    //read only's
    document.getElementById('tile-brand-name').value = tile_types[$tile_type].brand;
    document.getElementById('tile-model-name').value = tile_types[$tile_type].model;
    document.getElementById('tile-pixels-wide').value = tile_types[$tile_type].width;
    document.getElementById('tile-pixels-high').value = tile_types[$tile_type].height;
    document.getElementById('tile-physical-width').value = tile_types[$tile_type].physical_width;
    document.getElementById('tile-physical-height').value = tile_types[$tile_type].physical_height;

    document.getElementById('processor-brand-name').value = processor_types[$processor_type].brand;
    document.getElementById('processor-model-name').value = processor_types[$processor_type].model;
    document.getElementById('processor-width-limit').value = processor_types[$processor_type].resolutions[$output_type][0];
    document.getElementById('processor-height-limit').value = processor_types[$processor_type].resolutions[$output_type][1];
    document.getElementById('processor-pixel-limit').value = processor_types[$processor_type].pixel_limit;
    document.getElementById('processor-port-limit').value = processor_types[$processor_type].ports;

  };
  this.poll_inputs();

  //set input values from this screen to dom inputs
  this.reset_inputs = function() {
    //##################################
    // User Defined Variables 3/4
    //##################################
    //text inputs
    document.getElementById('screen-name').value = this.name;
    document.getElementById('screen-width').value = this.tiles_wide;
    document.getElementById('screen-height').value = this.tiles_high;
    document.getElementById('user-color-1').value = this.colors[0][0];
    document.getElementById('user-color-2').value = this.colors[0][1];
    document.getElementById('user-color-3').value = this.colors[1][0];
    document.getElementById('user-color-4').value = this.colors[1][1];
    document.getElementById('user-color-5').value = this.colors[2][0];
    document.getElementById('user-color-6').value = this.colors[2][1];
    document.getElementById('user-color-7').value = this.colors[3][0];
    document.getElementById('user-color-8').value = this.colors[3][1];
    document.getElementById('string-color').value = this.string_color;
    document.getElementById('tile-index-color').value = this.tile_index_color;
    document.getElementById('tile-border-color').value = this.tile_border_color;
    document.getElementById('processor-border-color').value = this.processor_border_color;
    document.getElementById('screen-border-color').value = this.screen_border_color;
    document.getElementById('tile-border-width').value = this.tile_border_width;
    document.getElementById('processor-border-width').value = this.processor_border_width;
    document.getElementById('screen-border-width').value = this.screen_border_width;
    document.getElementById('test-pattern-width').value = this.test_line_width;
    document.getElementById('test-pattern-color').value = this.test_line_color;
    document.getElementById('offset-x').value = this.screen_offset_x;
    document.getElementById('offset-y').value = this.screen_offset_y;

    //dropdowns
    document.getElementById('tile-type').options[this.tile_type].selected = true;
    document.getElementById('processor-type').options[this.processor_type].selected = true;
    document.getElementById('output-type').options[this.output_type].selected = true;
    document.getElementById('tile-color-scheme').options[this.tile_color_option].selected = true;
    document.getElementById('coord-style').options[this.coord_style].selected = true;

    //booleans checkboxes
    document.getElementById('fit-port-strings').checked = this.auto_clean_port;
    document.getElementById('balance-processor-load').checked = this.auto_average_limits;
    document.getElementById('show-string-icon').checked = this.data_flow_badge;
    document.getElementById('tile-border').checked = this.tile_border;
    document.getElementById('processor-border').checked = this.processor_border;
    document.getElementById('screen-border').checked = this.screen_border;
    document.getElementById('show-processor-label').checked = this.show_processor_label;
    document.getElementById('show-screen-label').checked = this.show_screen_label;
    document.getElementById('show-screen-stats').checked = this.show_stats;
    document.getElementById('show-logo').checked = this.show_logo;
    document.getElementById('every-other-pixel').checked = this.every_other_pixel;
    document.getElementById('draw-cross').checked = this.test_draw_cross;
    document.getElementById('draw-circle').checked = this.test_draw_circle;
    document.getElementById('show-data-flow').checked = this.show_data_flow;
    //document.getElementById('test-corners').checked = this.test_draw_corners;
    //document.getElementById('draw-offsets').checked = this.draw_offsets;


    //radios
    //document.querySelector('input[name = "flow-map"]:checked').value;
    document.getElementById("flow-"+this.flow).checked = true;
    //document.getElementById("flow-color-option-"+this.flow).checked = true;
    //document.getElementById("tile-index-"+this.tile_index_option).checked = true;
    //document.getElementById('string-break-option').checked = true;
    //document.getElementById('tile-index-color-scheme').checked = this.tile_index_color_by_port;

    //read only's
    document.getElementById('tile-brand-name').value = tile_types[this.tile_type].brand;
    document.getElementById('tile-model-name').value = tile_types[this.tile_type].model;
    document.getElementById('tile-pixels-wide').value = tile_types[this.tile_type].width;
    document.getElementById('tile-pixels-high').value = tile_types[this.tile_type].height;
    document.getElementById('tile-physical-width').value = tile_types[this.tile_type].physical_width;
    document.getElementById('tile-physical-height').value = tile_types[this.tile_type].physical_height;

    document.getElementById('processor-brand-name').value = processor_types[this.processor_type].brand;
    document.getElementById('processor-model-name').value = processor_types[this.processor_type].model;
    document.getElementById('processor-width-limit').value = processor_types[this.processor_type].resolutions[this.output_type][0];
    document.getElementById('processor-height-limit').value = processor_types[this.processor_type].resolutions[this.output_type][1];
    document.getElementById('processor-pixel-limit').value = processor_types[this.processor_type].pixel_limit;
    document.getElementById('processor-port-limit').value = processor_types[this.processor_type].ports;



  };

  //create button  in dom to represent this new screen
  this.create_selector = function() {

    //create new screen selector button for each screen
    let selector = document.createElement("button");
    selector.setAttribute("id", "screen-selector" + this.id);
    selector.setAttribute("class", "screen-selector");
    selector.setAttribute("onclick", "switch_screen(" + this.id + ");");
    selector.innerHTML = "screen" + this.id;

    //find place to insert selector button
    let screen_buttons = document.getElementById('screen-thumbs');
    screen_buttons.appendChild(selector);
  };
  //this.create_selector();

  this.create_screen_thumbnail = function(){
    //create thumbnail for each output
    let thumbnail = document.createElement("canvas");
    thumbnail.setAttribute("id", "screen_thumbnail" + this.id);
    thumbnail.setAttribute("class", "screen_thumbnail_canvas card-img-top");
    thumbnail.setAttribute("width", "100px");

    let canvas = thumbnail;
    let ctx = canvas.getContext('2d');
    let canvasFromStorage = document.getElementById("project_"+active_project+"_screen_"+active_led_screen);

    //ctx.drawImage(canvasFromStorage, 0, 0);
    //scaled version of output canvas for thumbnail

    //canvas.width = "100%";
    //canvas.height = canvas.width * canvasFromStorage.height / canvasFromStorage.width;
    let width = canvas.width;
    //playing with pthumbnail sizing
    ctx.drawImage(canvasFromStorage, 0, 0, width, width * canvasFromStorage.height / canvasFromStorage.width);
    //ctx.drawImage(canvasFromStorage, 0, 0,canvasFromStorage.width, canvasFromStorage.height);

    //find place to insert selector button
    let thumbnails = document.getElementById('screen-thumbs');
    //thumbnails.appendChild(thumbnail);
    //thumbnail = document.getElementById('screen_thumbnail'+this.id);

    //create card for each screen thumb
    let screen_card = document.createElement("div");
    screen_card.setAttribute("id","screen-card-"+this.id);
    screen_card.setAttribute("class","card");

    let screen_card_body = document.createElement("div");
    screen_card_body.setAttribute("id","screen-card-body-"+this.id);
    screen_card_body.setAttribute("class","card-body text-center");



    //<img class="card-img-top" src="..." alt="Card image cap">


    //create new screen selector button for each screen
    let selector = document.createElement("button");
    selector.setAttribute("id", "screen-selector" + this.id);
    selector.setAttribute("type","button");
    selector.setAttribute("class", "screen-selector btn btn-outline-secondary btn-sm");
    selector.setAttribute("onclick", "switch_screen(" + this.id + ");");
    selector.innerHTML = "screen" + this.id;

    //create new screen selector button for each screen
    let destructor = document.createElement("button");
    destructor.setAttribute("id", "screen-destructor" + this.id);
    destructor.setAttribute("type","button");
    destructor.setAttribute("class", "screen-destructor btn btn-danger btn-sm");
    destructor.setAttribute("onclick", "projects[active_project].led_screens[active_led_screen].self_destruct("+this.id+")");
    destructor.innerHTML = "delete";

    //insert selector button into card
    thumbnails.append(screen_card);
    screen_card.append(screen_card_body);
    screen_card_body.append(thumbnail);
    screen_card_body.append(selector);
    //screen_card_body.append(destructor);

    //screen_card_body.append(thumb_img);

    /////
    //thumbnails.appendChild(label_span);




  };
  //this.create_thumbnail();

  this.refresh_thumbnail = function(){
    //create thumbnail for each output
    let thumbnail = document.getElementById("screen_thumbnail" +active_led_screen);
    let canvas = thumbnail;
    let ctx = canvas.getContext('2d');
    let canvasFromStorage = document.getElementById("project_"+active_project+"_screen_"+active_led_screen);

    let width = canvas.width;
    //let height = canvasFromStorage.height;
    canvas.height = width * canvasFromStorage.height / canvasFromStorage.width;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //playing with pthumbnail sizing
    ctx.drawImage(canvasFromStorage, 0, 0, width, width * canvasFromStorage.height / canvasFromStorage.width);
    //ctx.drawImage(canvasFromStorage, 0, 0,canvasFromStorage.width, canvasFromStorage.height);
  };

  //visual indicator to see which screen is active
  this.selected = function(){
      //change layer button to denote selection
      let button = document.getElementsByClassName("screen-selector");
      let thumbnail = document.getElementsByClassName("screen_thumbnail_canvas");
      for (let i = 0; i < button.length; i++) {
        button[i].classList.remove("selected");
        //thumbnail[i].classList.remove("selected");
      }

      button = document.getElementById("screen-selector" + active_led_screen);
      thumbnail = document.getElementById("screen_thumbnail" + active_led_screen);
      button.classList.add("selected");
      //thumbnail.classList.add("selected");
    };



  //calculate size of inner processors
  this.calculate_size = function() {
    //calculate number of processors neeeded
    //calculate locations of processors to be drawn
    //draw maps
    this.processor_width_limit = processor_types[$processor_type].resolutions[$output_type][0];
    this.processor_height_limit = processor_types[$processor_type].resolutions[$output_type][1];
    this.tile_width = tile_types[$tile_type].width;
    this.tile_height = tile_types[$tile_type].height;
    this.pixels_wide = this.tiles_wide * tile_types[$tile_type].width;
    this.pixels_high = this.tiles_high * tile_types[$tile_type].height;

    this.cols_limit = Math.floor(this.processor_width_limit / tile_types[$tile_type].width);
    this.rows_limit = Math.floor(this.processor_height_limit / tile_types[$tile_type].height);
    this.maps_wide = Math.ceil(this.tiles_wide/this.cols_limit);
    this.maps_high = Math.ceil(this.tiles_high/this.rows_limit);

    if (this.auto_average_limits){
      this.processor_width_limit = Math.ceil(this.pixels_wide/this.maps_wide);
      this.processor_height_limit = Math.ceil(this.pixels_high/this.maps_high);
      this.cols_limit = Math.ceil(this.processor_width_limit / tile_types[$tile_type].width);
      this.rows_limit = Math.ceil(this.processor_height_limit / tile_types[$tile_type].height);
    }

    this.pixel_limit = processor_types[$processor_type].pixel_per_port_limit;




    //change global offset to base the rest of this screen's map's offset's
    //offset_x = screen_offset_x;
    //offset_y = screen_offset_y;

    this.required_maps = this.maps_wide * this.maps_high;
    this.remaining_cols = this.tiles_wide;
    this.remaining_rows = this.tiles_high;

    this.processor_to_build = [];

    //alert("Limits - Map Width : "+this.processor_width_limit+" Height : "+this.processor_height_limit+" Cols : "+this.cols_limit+" Rows : "+this.rows_limit);
    //alert("Required Screens : "+this.required_maps+". "+this.maps_wide+" wide by "+this.maps_high+" high.");

  };
  this.calculate_size();

  //function to add processor to screen
  this.add_processor = function(id,screen_id, tile_width,tile_height, offset_x,offset_y, width, height, odd_or_even, pixel_limit, processor_width_limit, processor_height_limit, pixels_wide, pixels_high) {

      this.processors.push(new Processor(id,screen_id,tile_width,tile_height, offset_x,offset_y, width, height, odd_or_even, pixel_limit, processor_width_limit, processor_height_limit, pixels_wide, pixels_high));


  };


  //build an array for the inner processors
  this.build_layout = function() {
    let processor_id = 0;
    let processor_odd_or_even = -1;
    //this.maps = [];


    //add processors for screen
    let cols, rows,offset_x,offset_y;
    offset_x = 0;
    offset_y = 0;

    for (let y = 0; y < this.maps_high; y++) {
      for (let x = 0; x < this.maps_wide; x++){
        //change cols and rows of each processor to be added depending on constraints
        //top left corner of screen
        if (this.remaining_cols >= this.cols_limit && this.remaining_rows >= this.rows_limit) {
            cols = this.cols_limit;
            rows = this.rows_limit;
            //alert("Processor "+processor_id+" @ layout position ("+x+","+y+") Cols: "+this.cols_limit+" left : "+this.rows_limit);
        } //bottom edge of screen
          else if (this.remaining_cols >= this.cols_limit) {
            cols = this.cols_limit;
            rows = this.remaining_rows;
            //alert("Processor "+processor_id+" @ layout position ("+x+","+y+") Cols left : "+this.cols_limit+" Rows left : "+this.remaining_rows);
        } //right edge of screen
          else if (this.remaining_rows >= this.rows_limit) {
            cols = this.remaining_cols;
            rows = this.rows_limit;
            //alert("Processor "+processor_id+" @ layout position ("+x+","+y+") Cols left : "+this.remaining_cols+" Rows left : "+this.rows_limit);
        } //bottom right corner of screen.
          else {
            cols = this.remaining_cols;
            rows = this.remaining_rows;
          //alert("Processor "+processor_id+" @ layout position ("+x+","+y+") Cols left : "+this.remaining_cols+" Rows left : "+this.remaining_rows);
        }

        //odd or even per checkerboard
        if (x%2 == 0){
          if (y%2 == 0){
            processor_odd_or_even = 0;
          } else {
            processor_odd_or_even = 1;
          }
        }else {
          if (y%2 == 0){
            processor_odd_or_even = 1;
          } else {
            processor_odd_or_even = 0;
          }
        }
        //alert("Draw - Processor "+processor_id+" @ layout position ("+x+","+y+") Cols : "+cols+" Rows: "+rows+" Offsets ("+offset_x+","+offset_y+") odd or even : "+processor_odd_or_even);
        //let data = {"id":processor_id,"x":x,"y":y,"cols":cols,"rows":rows,"offset_x":offset_x,"offset_y":offset_y,"odd_or_even":processor_odd_or_even};
        //this.processor_to_build.push(data);
        this.add_processor(processor_id,active_led_screen,this.tile_width, this.tile_height, offset_x,offset_y, cols, rows, processor_odd_or_even, this.pixel_limit, this.processor_width_limit, this.processor_height_limit, this.pixels_wide, this.pixels_high);
        //alert(processor_id,active_led_screen,this.tile_width, this.tile_height, offset_x,offset_y, cols, rows, processor_odd_or_even, this.pixel_limit, this.processor_width_limit, this.processor_height_limit, this.pixels_wide, this.pixels_high);
        //increase processor_id
        processor_id += 1;
        //change offsets
        offset_x = ((cols * x) + cols) * this.tile_width;
        //subtract drawn map row width from remaining cols
        //but prevent remaining_cols from going negative
        this.remaining_cols = this.remaining_cols - this.cols_limit;
        if (this.remaining_cols < 0) this.remaining_cols = 0;

      }
      //change offsets;
      offset_x = 0;
      offset_y = ((rows * y) + rows) * this.tile_height;
      //subtract drawn map row height from remaining rows
      //but prevent remaining_rows from going negative
      this.remaining_rows = this.remaining_rows - this.rows_limit;
      if (this.remaining_rows < 0) this.remaining_rows = 0;
      //reset column count back to count of total colums for screen
      this.remaining_cols = this.tiles_wide;
    }
  };

  this.build_layout();


  //create canvas in dom for this screen
  this.create_blank_screen_canvas = function(){
    //create new <canvas> for each map
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "project_"+active_project+"_screen_"+active_led_screen);
    this.canvas.setAttribute("class", "screen_canvas");
    this.canvas.setAttribute("style", "position: absolute; left: 0; top: 0; display: none;");

    //create project wide screen storage div for current project if it doesnt exist yet
    if (document.getElementById("project_"+active_project)){
      //alert("Already exists");
    } else {
      this.screen_storage = document.createElement("div");
      this.screen_storage.setAttribute("id", "project_" + active_project);
      //insert into storage div
      let canvas_storage = document.getElementById('storage');
      canvas_storage.insertBefore(this.screen_storage, canvas_storage.childNodes[0]);

    }

    //switch context to new canvas's context
    this.ctx = this.canvas.getContext("2d");

    //find place to insert canvas
    this.screen_storage = document.getElementById("project_"+active_project);
    this.screen_storage.insertBefore(this.canvas, this.screen_storage.childNodes[0]);
  };
  this.create_blank_screen_canvas();

  //function to delete processor to screen
  this.wipe_processors = function() {
    //let processor_buttons = document.getElementById("processor-buttons");
    //processor_buttons.innerHTML = '';

    this.processors.length = 0;
    projects[active_project].total_processors.length = 0;
  };

  this.wipe_canvases = function(){
    let canvas_storage = document.getElementById('screen_'+active_led_screen);
    canvas_storage.innerHTML = '';
  };

  //save image of screen to memory
  this.save_image = function() {

  };

  //store screen image to be recalled at view
  this.store_screen_canvas = function() {
    //set context and canvas to screen-view to draw screen
    let canvas = document.getElementById("project_"+active_project+"_screen_"+active_led_screen);
    let ctx = canvas.getContext('2d');
    //set screen-view size to match that of the entire screen we are drawing
    canvas.width = this.pixels_wide;
    canvas.height = this.pixels_high;

    //recall canvas that has been drawn already
    //let canvasFromStorage = document.getElementById("processor_"+ id);

    //clear map-view
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw stored canvas image to map-view
    //alert(document.getElementById("processor_" + id).width);
    //ctx.drawImage(canvasFromStorage, 0, 0);
    //for each processor



    //loop through all processors to build screen canvas from processor canvases
    for (let j = 0; j < this.processors.length; j++){
      //recall canvas that has been drawn already
      //alert(active_led_screen);
      let canvasFromStorage = document.getElementById("screen_"+active_led_screen+"_processor_"+j);
      //alert(canvasFromStorage);
      ctx.drawImage(canvasFromStorage, this.processors[j].offset_x, this.processors[j].offset_y);
    }

    //##########################################
    // Screen-Wide  Overlays (layers on top of recalled processor canvases)
    //##########################################

    //test patterns
    ctx.strokeStyle = this.test_line_color;
    ctx.lineWidth = this.test_line_width;
    //cross
    if (this.test_draw_cross){
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(this.pixels_wide,this.pixels_high);
      ctx.moveTo(this.pixels_wide,0);
      ctx.lineTo(0,this.pixels_high);
      ctx.stroke();
      ctx.closePath();
    }
    //circle
    if (this.test_draw_circle){
      ctx.moveTo(this.pixels_wide/2,this.pixels_high/2);
      ctx.beginPath();
      ctx.arc(this.pixels_wide/2,this.pixels_high/2, this.pixels_high/2 * 0.9, 0, Math.PI * 2);
      ctx.closePath();
      ctx.stroke();
    }

    ctx.lineWidth = default_line_width;

    //draw text field or not
    if (this.screen_border) {
      ctx.strokeStyle = this.screen_border_color;
      ctx.lineWidth = this.screen_border_width;
      ctx.strokeRect(0 + (ctx.lineWidth / 2), 0 + (ctx.lineWidth / 2), this.pixels_wide - (ctx.lineWidth), this.pixels_high - (ctx.lineWidth));
      ctx.lineWidth = default_line_width;
    }

    //draw text field or not
    if (this.show_screen_label) {
      let text_height = 72;

      //ctx.font = this.smaller_side / 2 + "px Helvetica";
      ctx.font = text_height + "px Helvetica";
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.strokeStyle = "#000000";


      text_to_draw = projects[active_project].name+" - "+this.name;


      let text_width = ctx.measureText(text_to_draw).width;
      let margin = 50;
      let label_x = (this.pixels_wide / 2 - (text_width / 2) - (margin/2));
      let label_y = (this.pixels_high * 1 / 4 - (text_height/2) - (margin/2));
      //ctx.strokeRect(this.pixels_wide / 2 - (text_width / 2) - (margin / 2), this.tile_height * 1.5, text_width + margin, this.tile_smaller_side / 2 + margin);
      //ctx.fillRect(this.pixels_wide / 2 - (text_width / 2) - (margin / 2), this.tile_height * 1.5, text_width + margin, this.tile_smaller_side / 2 + margin);
      ctx.fillRect(label_x,label_y, text_width + margin , text_height + margin);
      ctx.strokeRect(label_x,label_y, text_width + margin, text_height  +margin);
      ctx.fillStyle = "#000000";
      ctx.textAlign = "center";
      ctx.fillText(text_to_draw, label_x + (text_width/2) + (margin/2),label_y + (text_height/1.2) + (margin/2));
      ctx.textAlign = "left";
    }

    //draw stats or not
    if (this.show_stats) {
      ///////
      let text_height = 36;

      ctx.font = text_height + "px Helvetica";
      ctx.fillStyle = "rgba(128, 128, 128, 0.5)";
      ctx.strokeStyle = "#000000";

      let stats_text = [];
      stats_text[0] = "Screen " + this.id + " : " + this.pixels_wide + "px x " + this.pixels_high + "px, Total resolution: " + numberWithCommas(this.pixels_wide * this.pixels_high) + " pixels.";
      stats_text[1] = "Tiles : " + this.tile_width + "px, " + this.tile_height + "px. " + this.tiles_wide + " columns by " + this.tiles_high + " rows. " + this.tiles_high * this.tiles_wide + " total tiles.";
      stats_text[2] = "Processors Required : "+this.processors.length;
      let widest = Math.max(ctx.measureText(stats_text[0]).width, ctx.measureText(stats_text[1]).width, ctx.measureText(stats_text[2]).width);

      //text_to_draw = "Processor " + this.id;
      //let text_width = this.ctx.measureText(text_to_draw).width;
      let margin = 40;
      let x = (this.pixels_wide  / 2) - (widest / 2) - (margin / 2);
      let y = (this.pixels_high * 3 / 8) - (text_height / 2) - (margin / 2);
      ctx.strokeRect(x, y, widest + margin,text_height*stats_text.length + margin);
      ctx.fillRect(x, y, widest + margin, text_height*stats_text.length + margin);
      ctx.fillStyle = "#000000";

      for(let i = 0; i < stats_text.length; i++){
        let height = (text_height/1.2);
          ctx.fillText(stats_text[i], x + (margin/2) ,y + height + (height * i) + (margin/2));
        }
    }

    //show logo per screen
    if(this.show_logo){

      let logo_dims = [this.logo.width, this.logo.height];
      let logo_divisor, logo_width, logo_height;
      //logo size limit in pixels, handles vertical and horizontal
      let logo_limit = this.pixels_wide / 4;

      if (indexOfMax(logo_dims) == 0) {
        //logo width is greater than height
        logo_divisor = this.logo.width / (logo_limit);
      } else {
        logo_divisor = this.logo.height / (logo_limit);
      }

      logo_width = this.logo.width / logo_divisor;
      logo_height = this.logo.height / logo_divisor;

      //draw custom logo if one has been uploaded
      let logo_x = this.pixels_wide - logo_width - (this.tile_width);
      let logo_y = this.pixels_high - logo_height - (this.tile_height);

      //check to see if logo is too big
      if((logo_height + this.tile_height) > this.pixels_high ){

        logo_limit = this.pixels_high;
        logo_x = this.pixels_wide - (logo_width - this.tile_width);
        logo_y = 0;
      }

      //check for widest side
      if (indexOfMax(logo_dims) == 0) {
        //logo width is greater than height
        logo_divisor = this.logo.width / (logo_limit);
      } else {
        logo_divisor = this.logo.height / (logo_limit);
      }

      logo_width = this.logo.width / logo_divisor;
      logo_height = this.logo.height / logo_divisor;

      //transparency for logos?
      //this.ctx.globalAlpha = 0.9;
      ctx.drawImage(this.logo, logo_x, logo_y, logo_width, logo_height);


    }


  };
  this.self_destruct = function(id){
    //this.canvas.setAttribute("id", "screen_"+active_led_screen+"_processor_" + this.id);
    let screen_canvas = document.getElementById('project_'+active_project+'_screen_'+id);
    let screen_processor_canvases = document.getElementById('screen_'+id);
    let screen_thumb = document.getElementById('screen-card-'+id);
    screen_canvas.remove();
    screen_processor_canvases.remove();
    screen_thumb.remove();
    //remove screen object from memory
    projects[active_project].led_screens.splice(id, 1);

    //correct active led screen counter
    active_led_screen = projects[active_project].led_screens[0].id;
    //alert(active_led_screen);
  };
  this.store_screen_canvas();
  this.create_screen_thumbnail();
  //recall saved image of screen to screen-view
  this.load_screen_to_screen_view = function() {
    //set context and canvas to screen-view to draw screen
    let canvas = document.getElementById("screen-view");
    let ctx = canvas.getContext('2d');
    //set screen-view size to match that of the entire screen we are drawing
    canvas.width = this.pixels_wide;
    canvas.height = this.pixels_high;

    //change css on page to keep screen within window size
    if (canvas.height > canvas.width){
      //taller than wider
      canvas.style.width ="";
      //canvas.style.height="100%";

    } else {
      //wider than taller
      canvas.style.height ="";
      //canvas.style.width="98%";
    }

    //recall canvas that has been drawn already
    let canvasFromStorage = document.getElementById("project_"+active_project+"_screen_"+active_led_screen);

    //clear map-view
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw stored canvas image to map-view
    //alert(document.getElementById("processor_" + id).width);
    ctx.drawImage(canvasFromStorage, 0, 0);
    //for each processor

    //update screen thumbnail
    this.refresh_thumbnail();
  };
  this.load_screen_to_screen_view();
  this.selected();
  //increase id count
  next_led_screen += 1;


} //end of Screen constructor

//Processor Constructor
//######################################################################
function Processor(id,screen_id,tile_width,tile_height, offset_x, offset_y,tiles_wide,tiles_high,odd_or_even,pixel_limit,processor_width_limit,processor_height_limit, screen_pixels_wide, screen_pixels_high) {
  //auto incrementing id
  //this.id = projects[active_project].led_screens[active_led_screen].next_processor;
  this.id = id;
  this.screen_id = screen_id;

  //properties based on initial arguments supplied by Project()
  this.offset_x = offset_x;
  this.offset_y = offset_y;
  this.tiles_wide = tiles_wide;
  this.tiles_high = tiles_high;
  this.odd_or_even = odd_or_even;
  this.tile_width = tile_width;
  this.tile_height = tile_height;
  this.screen_pixels_wide = screen_pixels_wide;
  this.screen_pixels_high = screen_pixels_high;
  //this.tile_width = projects[active_project].led_screens[active_led_screen].tile_width;
  //this.tile_height = projects[active_project].led_screens[active_led_screen].tile_height;

  //processor options
  this.color1 = colors[0][0];
  this.color2 = colors[0][1];
  this.color3 = colors[1][0];
  this.color4 = colors[1][1];
  this.color5 = colors[2][0];
  this.color6 = colors[2][1];
  this.color7 = colors[3][0];
  this.color8 = colors[3][1];

  this.colors = colors;

  //##################################
  // User Defined Variables 4/4
  //##################################

  //read values from user input on creation
  //dropdowns
  this.tile_color_option = $screen_tile_color_option;
  this.coord_style = $screen_coord_style;

  //number inputs
  this.processor_border_width = $screen_processor_border_width;
  this.tile_border_width = $screen_tile_border_width;
  this.screen_border_width = $screen_border_width;
  this.test_line_width = $screen_test_line_width;

  //colors
  this.string_color = $screen_string_color;
  this.tile_index_color = $screen_tile_index_color;
  this.tile_border_color = $screen_tile_border_color;
  this.processor_border_color = $screen_processor_border_color;
  this.screen_border_color = $screen_border_color;
  this.test_line_color = $screen_test_line_color;

  //booleans
  this.auto_clean_port = $screen_auto_clean_port;
  this.auto_average_limits = $screen_auto_average_limits;
  //this.flow_break = $screen_flow_break;
  this.data_flow_badge = $screen_data_flow_badge;
  //this.tile_index_color_by_port = $screen_index_color_by_port;
  this.tile_border = $screen_tile_border;
  this.processor_border = $screen_processor_border;
  this.screen_border = $screen_border;
  this.show_processor_label = $screen_show_processor_label;
  this.show_screen_label = $screen_show_screen_label;
  this.show_stats = $screen_show_stats;
  this.show_logo = $screen_show_logo;
  this.every_other_pixel = $screen_every_other_pixel;
  this.test_draw_cross = $screen_test_draw_cross;
  this.test_draw_circle = $screen_test_draw_circle;
  this.show_data_flow = $screen_show_data_flow;
  //this.test_draw_corners = $screen_test_draw_corners;
  //this.draw_offsets = $screen_draw_offsets;

  //radios
  this.flow = $screen_data_flow;
  this.string_color_option = $screen_string_color_option;
  this.tile_index_option = $screen_tile_index_option;
  this.tile_color_iterator = $screen_tile_color_iterator


  //container for screens in this project
  this.tile_map = [];

  //create button  in dom to represent this new processor
  this.create_selector = function() {
    //create new screen selector button for each processor
    let selector = document.createElement("button");
    selector.setAttribute("id", "processor-selector" + this.id);
    selector.setAttribute("class", "processor-selector");
    selector.setAttribute("onclick", "");
    selector.innerHTML = "processor" + this.id;

    //find place to insert selector button
    //let processor_buttons = document.getElementById('processor-buttons');
    //processor_buttons.appendChild(selector);
  };
  //this.create_selector();

  //create canvas in dom for this processor
  this.create_blank_processor_canvas = function(){
    //create new <canvas> for each map
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "screen_"+active_led_screen+"_processor_" + this.id);
    this.canvas.setAttribute("class", "processor_canvas");
    this.canvas.setAttribute("style", "position: absolute; left: 0; top: 0; display: none;");

    //create screen_storage for current if it doesnt exist yet
    if (document.getElementById("screen_"+active_led_screen)){
      //alert("Already exists");
    } else {
      this.screen_storage = document.createElement("div");
      this.screen_storage.setAttribute("id", "screen_" + active_led_screen);
      let canvas_storage = document.getElementById('storage');
      canvas_storage.insertBefore(this.screen_storage, canvas_storage.childNodes[0]);

    }

    //switch context to new canvas's context
    this.ctx = this.canvas.getContext("2d");

    //find place to insert canvas
    this.screen_storage = document.getElementById("screen_"+active_led_screen);
    this.screen_storage.insertBefore(this.canvas, this.screen_storage.childNodes[0]);
  };
  this.create_blank_processor_canvas();

  //set sizes
  this.resize = function() {
    //reset sizes
    this.tiles = this.tiles_wide * this.tiles_high;
    this.width = this.tiles_wide * this.tile_width;
    this.height = this.tiles_high * this.tile_height;
    this.pixels_per_tile = this.tile_width * this.tile_height;

    //pixel limit based on screen's processor type
    this.pixel_limit = processor_types[$processor_type].pixel_limit;

    //variable for smaller side of the two, for controlling inner-tile overlays
    this.tile_smaller_side = Math.min(this.tile_width, this.tile_height);
    this.processor_cols_limit = Math.floor(processor_width_limit / this.tile_width);
    this.processor_rows_limit = Math.floor(processor_height_limit / this.tile_height);


    //auto offset
    /*if (this.auto_offset) {
      //map0 offsets default to 0
      if (this.id == 0) {
        this.offset_x = 0;
        this.offset_y = 0;
      } else {
        //update offsets as maps are added
        this.offset_x = maps[this.id - 1].width + maps[this.id - 1].offset_x;

        //if offset is out of output bounds
        let next_x_offset = this.offset_x + this.width;
        console.log(this.width);
        if (next_x_offset >= document.getElementById('output-view').width) {
          //move it to left side of screen and down a map height
          //alert("width exceeded");
          this.offset_x = 0;
          map_row += 1;
        }
        this.offset_y = this.height * map_row;
        document.getElementById('offset-x').value = this.offset_x;
        document.getElementById('offset-y').value = this.offset_y;
      }
    } else {
      //otherwise
      //commented out below to get add_screen offsets working. might ditch auto_offset entirely now.
      this.offset_x = +document.getElementById('offset-x').value;
      this.offset_y = +document.getElementById('offset-y').value;
      //alert("offsetx : "+this.offset_x+" offset y : "+this.offset_y);
    }*/





    //this.tile_limit = +document.getElementById('tile-limit').value;
    //this.pixel_limit = this.tile_limit * this.pixels_per_tile;
    //flag - try changing auto clean here

    this.tile_limit = Math.floor(this.pixel_limit / this.pixels_per_tile);

    //document.getElementById('tile-limit').value = this.tile_limit;

    //clean row/col detection
    //find last clean coloumn - last whole number of pixel limit / map width or height
    //pixel limit = pixels per tile * number of tiles in last clean section
    this.clean_col = Math.floor((this.pixel_limit / this.height) / this.tile_width);
    this.clean_row = Math.floor((this.pixel_limit / this.width) / this.tile_height);


    //auto clean port
    if (this.auto_clean_port){
      let clean_port_limit;
      if (this.flow == 0 || this.flow == 2 || this.flow == 6 || this.flow == 7) {
        clean_port_limit = this.pixels_per_tile * (this.tiles_wide * this.clean_row);

      } else {
        clean_port_limit = this.pixels_per_tile * (this.tiles_high * this.clean_col);

      }

      //must update tile_limit here as that is what the end of a port flow is based on.
      //when processor tile map got to wide, clean port limit would end up being less than a tile so we were getting one tile sections
      if (clean_port_limit > this.pixels_per_tile){
        this.tile_limit = clean_port_limit / this.pixels_per_tile;
      }
      this.clean_col = Math.floor((clean_port_limit / this.height) / this.tile_width);
      this.clean_row = Math.floor((clean_port_limit / this.width) / this.tile_height);

    }


    //alert("Pixel Limit : "+this.pixel_limit+" / this Height : "+this.height+" ) / tile_width :"+this.tile_width+" = last clean col : "+this.clean_col);


  };
  //this.resize();

  //function to handle building the tile map
  this.build_map = function() {
    //empty tile_map
    this.tile_map = [];
    //each row
    for (let y = 0; y <= this.height - this.tile_height; y += this.tile_height) {
      //each column
      for (let x = 0; x <= this.width - this.tile_width; x += this.tile_width) {
        //odd or even
        let c = (Math.floor(y / this.tile_height) % 2 + Math.floor(x / this.tile_width) % 2) % 2;
        //store individual tile info
        let width = this.tile_width;
        let height = this.tile_height;
        this.tile_map.push({
          x,
          y,
          width,
          height,
          flow: flows.none,
          col: c ? this.color1 : this.color2,
          c: c,
          //flag - had to define a port var and put 0 for now. Otherwise certain size add_screens woudln't work
          port: 0,
          index_per_port: 0,
          index_per_screen: 0,
          index_per_project: 0,
        });
      }
    }
  };
  //this.build_map();

  //assign flow value to each tile based on different available flow maps
  this.create_flow = function(tiles, flow_map) {
    let i = 0;
    let index = 0;
    let index_per_port = 0;
    let port = 0;
    let prev_tile, tile;
    let count = 0;
    let x = flow_map.x * (this.tiles_wide - 1);
    let y = flow_map.y * (this.tiles_high - 1);
    let moving = true;
    let index_per_screen = 0;
    if (this.id > 0){
      //alert(projects[active_project].led_screens[active_led_screen].processors[this.id-1].tiles);

//      prev_processors_tiles = projects[active_project].led_screens[active_led_screen].processors[this.id-1].tiles;

    }




    while (moving) {

      let ind = x + y * this.tiles_wide;
      prev_tile = tile;

      tile = tiles[ind];

      let dir = flow_map.directions[i % flow_map.directions.length];

      //flow 6 requires dynamic resizing based on map row count
      flows.dirs[6][1] = -this.tiles_high + 1;
      //flow 7 requires dynamic resizing based on map row count
      flows.dirs[7][1] = this.tiles_high - 1;

      //flow 9 requires dynamic resizing based on map cols count
      flows.dirs[9][0] = -this.tiles_wide + 1;
      //flow 8 requires dynamic resizing based on map cols count
      flows.dirs[8][0] = -this.tiles_wide + 1;

      let nx = x + flows.dirs[dir[0]][0];
      let ny = y + flows.dirs[dir[0]][1];

      //trying to figure out the index routing
      tile.index = index;
      tile.index_per_port = index_per_port;
      tile.port = port;






      //debug alert for finding specific tile info
      //alert("tile id : "+index+" count : "+count+" x : "+x+" y : "+y+" nx : "+nx+" ny : "+ny);

      if (nx >= this.tiles_wide || nx < 0 || ny >= this.tiles_high || ny < 0 || count >= dir[1]) {
        i += 1;
        dir = flow_map.directions[i % flow_map.directions.length];
        nx = x + flows.dirs[dir[0]][0];
        ny = y + flows.dirs[dir[0]][1];
        if (nx >= this.tiles_wide || nx < 0 || ny >= this.tiles_high || ny < 0) {
          tile.flow = flows.end;
          break;
        }
        count = 0;
      }
      if (tile === undefined) {
        prev_tile.flow = flows.end;
        break;
      }
      if (prev_tile === undefined) {
        tile.flow = flows.start;
      } else {
        tile.flow = dir[0];
      }

      //conditions to accomidate visually breaking up flow stops and starts by pixel_limit
      if ($screen_string_break_option == 0) {
        //alert(user_inputs.string_break_option);
        //port tile limits
        if (index_per_port == 0) {
          tile.flow = flows.start;
        } else if (index_per_port == this.tile_limit - 1) {
          tile.flow = flows.end;
        }

        //port resolution limits
        /*if((tile.x / tile.width) % this.processor_cols_limit== 0 && (tile.y / tile.height) % this.processor_rows_limit== 0 && (tile.y * tile.width) > this.processor_cols_limit && (tile.y * tile.height) > this.processor_rows_limit){
          tile.flow = flows.start;
        }*/
      }



      count += 1;
      index += 1;

      projects[active_project].tile_index += 1;
      //if current tile exceeds tile limit, reset index_per_port, increase port #
      //complicated conditions that were part of the if check below, trying to implement processor width and height limits elsewhere.
      //|| (((tile.y / tile.height) % this.processor_rows_limit) == this.processor_rows_limit - 1) || (((tile.x / tile.width) % this.processor_cols_limit) == this.processor_cols_limit - 1)
      if (index_per_port >= this.tile_limit - 1 ) {

        //alert("Tile #: "+tile.index+"Tile x:"+tile.x+"Tile y: "+tile.y+" - "+((tile.y/tile.height) % this.processor_rows_limit));
        index_per_port = 0;

        tile.port = port;
        port += 1;
      } else {
        index_per_port += 1;
      }


      x = nx;
      y = ny;
    }
  };
  //this.create_flow(this.tile_map,flow_maps[0]);

  //draw an arrow for a given tile, direction based on flow
  this.arrow = function(tile) {
    if (tile.flow === flows.none) {
      return;
    }
    let step = this.tile_smaller_side * (1 / 4);
    let center = this.tile_smaller_side * (1 / 2);
    let x = tile.x + step;
    let y = tile.y + step;

    switch (this.string_color_option) {
      case 0:
        //data flow color default
        this.ctx.strokeStyle = this.string_color;
        break;
      case 1:
        //change arrow color absed on port number
        this.ctx.strokeStyle = resistor_colors[tile.port % resistor_colors.length];
        break;
        case 2:
          //change arrow color absed on port number
          this.ctx.strokeStyle = rainbow_colors[tile.index % rainbow_colors.length];
          break;
    }
    //this.ctx.strokeStyle = "white";
    //change arrow color absed on port number
    //this.ctx.strokeStyle = resistor_colors[tile.port % resistor_colors.length];


    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    if (tile.flow === flows.end) {
      this.ctx.setTransform(1, 0, 0, 1, x, y);
      this.ctx.moveTo(-step / 2, -step / 2);
      this.ctx.lineTo(step / 2, step / 2);
      this.ctx.moveTo(step / 2, -step / 2);
      this.ctx.lineTo(-step / 2, step / 2);

      this.ctx.stroke();
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      return;
    } else if (tile.flow === flows.start) {
      if ($screen_data_flow_badge) {
        //data badge - label first tile in chain per port * option later
        //this.ctx.moveTo(tile.x+center, tile.y+center);
        this.ctx.beginPath();
        this.ctx.arc(tile.x + center, tile.y + center, center * 0.8, 0, Math.PI * 2);
        this.ctx.fillStyle = this.string_color;
        this.ctx.fill();
        //this.ctx.strokeStyle = resistor_colors[tile.port % resistor_colors.length];
        this.ctx.strokeStyle = "#000000";
        this.ctx.stroke();
        this.ctx.fillStyle = "#000000";
        this.ctx.font = this.tile_smaller_side / 4 + "px Helvetica";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.screen_id +"."+this.id+" - "+tile.port, tile.x + center, tile.y + center + step/3);
        this.ctx.textAlign = "left";
      } else {
        this.ctx.font = this.tile_smaller_side / 5 + "px Helvetica";
        this.ctx.fillStyle = "#000000";

        //this.ctx.strokeStyle = "#000000";
        this.ctx.setTransform(1, 0, 0, 1, x, y);
        //this.ctx.fillText(tile.port,-step/4.5,step/3.5);
        this.ctx.moveTo(step / 2, 0);
        this.ctx.arc(0, 0, step / 2, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.closePath();
      }

      return;
    } else if (tile.flow === flows.right) {
      this.ctx.setTransform(1, 0, 0, 1, x, y);
    } else if (tile.flow === flows.left) {
      this.ctx.setTransform(-1, 0, 0, 1, x, y);
    } else if (tile.flow === flows.down) {
      this.ctx.setTransform(0, 1, 1, 0, x, y);
    } else if (tile.flow === flows.up) {
      this.ctx.setTransform(0, -1, 1, 0, x, y);
      //this.ctx.setTransform(0,1,-1,0,0,0);
    } else if (tile.flow === flows.upright) {
      this.ctx.setTransform(0, -1, 1, 0, x, y);
      this.ctx.rotate(-112.5);
    } else if (tile.flow === flows.downright) {
      this.ctx.setTransform(0, 1, 1, 0, x, y);
      this.ctx.rotate(-112.5);
    } else if (tile.flow === flows.upleft) {
      this.ctx.setTransform(0, -1, 1, 0, x, y);
      this.ctx.rotate(112.5);
    } else if (tile.flow === flows.downleft) {
      this.ctx.setTransform(0, 1, 1, 0, x, y);
      this.ctx.rotate(112.5);
    }


    this.ctx.moveTo(-step / 2, 0);
    this.ctx.lineTo(step / 2, 0);
    this.ctx.moveTo(step / 4, -step / 4);
    this.ctx.lineTo(step / 2, 0);
    this.ctx.lineTo(step / 4, step / 4);


    this.ctx.stroke();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  };

  canvas = document.getElementById('screen_'+active_led_screen+'_processor_'+this.id);

  //draw tiles and any per tile overlays
  this.draw_tiles = function() {
    let tiles = this.tile_map;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    //auto-rotate new canvas colors
    //this.ctx.filter = 'hue-rotate('+Math.ceil(this.id*20)+'deg)';
    let i = 0;
    while (i < tiles.length) {
      let l = tiles[i++];
      let color1 = document.getElementById('color-1-label');
      let color2 = document.getElementById('color-2-label');
      let color3 = document.getElementById('color-3-label');
      let color4 = document.getElementById('color-4-label');

      //tile color iterator

      switch ($screen_tile_color_iterator) {
        case 0:
          tile_color_iterator = l.index;
          break;
        case 1:
        tile_color_iterator = l.port;
          break;
        case 2:
        tile_color_iterator = l.index_per_port;
          break;
        case 4:
        tile_color_iterator = l.c;
      };
      //tile color
      switch ($screen_tile_color_option) {
        case 0:
          //default every other tile coloring
          //tile color given from tile_map array
          this.ctx.fillStyle = this.colors[0][l.c % this.colors[0].length];
          break;
        case 1:
          //alternate color sets between every other processor port
          //tile background by resistor_colors and port
          //this.ctx.fillStyle = resistor_colors[l.port % resistor_colors.length];
          if (this.odd_or_even == 1){
              this.colors = bizzaro_colors;
          }
          this.ctx.fillStyle = this.colors[l.port % this.colors.length][l.c % this.colors[0].length];
          break;
        case 2:
          //rainbow colored tiles, could be used for gradients?
          this.ctx.fillStyle = rainbow_colors[l.index % rainbow_colors.length];

          break;
        case 3:
          //gradient by port?
          let port_color_hex = resistor_colors[l.port % resistor_colors.length];
          let port_color_rgb = "rgb(" + hexToRgb(port_color_hex).r + "," + hexToRgb(port_color_hex).g + "," + hexToRgb(port_color_hex).b + ")";
          let port_gradient = [];
          //generate array of colors between port color and black, as long as each processor port string (tile_limit)
          port_gradient = interpolateColors(port_color_rgb, "rgb(0,0,0)", this.tile_limit * 1.75);
          this.ctx.fillStyle = rgbToHex(port_gradient[l.index_per_port % port_gradient.length][0], port_gradient[l.index_per_port % port_gradient.length][1], port_gradient[l.index_per_port % port_gradient.length][2]);
          break;
        case 4:
          //gradient between two colors per port?
          let rainbow_color_hex = rainbow_colors[0];
          let rainbow_color_rgb = "rgb(" + hexToRgb(rainbow_color_hex).r + "," + hexToRgb(rainbow_color_hex).g + "," + hexToRgb(rainbow_color_hex).b + ")";
          let rainbow_color_hex_2 = rainbow_colors[Math.floor(rainbow_colors.length/2)];
          let rainbow_color_rgb_2 = "rgb(" + hexToRgb(rainbow_color_hex_2).r + "," + hexToRgb(rainbow_color_hex_2).g + "," + hexToRgb(rainbow_color_hex_2).b + ")";

          let rainbow_gradient = [];
          //generate array of colors between port color and black, as long as each processor port string (tile_limit)
          rainbow_gradient = interpolateColors(rainbow_color_rgb, rainbow_color_rgb_2, this.tile_limit);
          this.ctx.fillStyle = rgbToHex(rainbow_gradient[l.index % rainbow_gradient.length][0], rainbow_gradient[l.index % rainbow_gradient.length][1], rainbow_gradient[l.index % rainbow_gradient.length][2]);
            break;
        case 5:
          //red 100 50
            this.ctx.fillStyle = red_100_50[l.index % red_100_50.length];
            break;
        case 6:
          //red 100 50
            this.ctx.fillStyle = green_100_50[l.index % green_100_50.length];
            break;
        case 7:
          //red 100 50
            this.ctx.fillStyle = blue_100_50[l.index % blue_100_50.length];
            break;
        case 8:
          //red 100 50
            this.ctx.fillStyle = white_100_50[l.index % white_100_50.length];
            break;
        case 9:
        //different color by processor
          console.log(this);
          this.ctx.fillStyle = resistor_colors[l.port % resistor_colors.length];
          break;
      }

      //temporary until I reinstate tile color options
      //this.ctx.fillStyle = colors[l.port % colors.length][l.c % colors[0].length];

      //draw tile
      this.ctx.fillRect(l.x, l.y, l.width, l.height);
      //draw tile overlays

      if (this.every_other_pixel){
        let checker_pattern = this.ctx.createPattern(every_other_pixel_checker, 'repeat');
        this.ctx.fillStyle = checker_pattern;
        this.ctx.fillRect(l.x, l.y, l.width, l.height);
      }

      //tile index color options
      if (this.tile_index_color_by_port) {
        this.ctx.fillStyle = resistor_colors[l.port % resistor_colors.length];
      } else {
        this.ctx.fillStyle = this.tile_index_color;
      }

      //tile indexes

      let index_x = l.x + this.tile_smaller_side / 10;
      let index_y = l.y + this.tile_smaller_side * 9 / 10;

      this.ctx.font = this.tile_smaller_side / 4 + "px Helvetica";
      switch (this.tile_index_option) {
        case 0:
          //draw index per port
          //this.ctx.fillStyle = resistor_colors[l.port % resistor_colors.length];
          this.ctx.fillText(l.port + "." + l.index_per_port,  index_x, index_y);
          break;
        case 1:
          //draw index per map

          //this.ctx.fillStyle = this.tile_index_color;
          //this.ctx.fillStyle = resistor_colors[l.port % resistor_colors.length];
          this.ctx.fillText(l.index, index_x, index_y);
          break;
        case 2:
          //hide indexes
          break;
        case 3:
          //draw tile coordinates
          //this.ctx.fillStyle = resistor_colors[l.port % resistor_colors.length];
          let x, y;
          switch (this.coord_style) {
            case 0:
              //1,A
              x = (l.x / l.width) + 1;
              y = ((((l.y / l.height) + 1) % 26) + 9).toString(36).toUpperCase();
              break;
            case 1:
              //A,1
              x = ((((l.x / l.width) + 1) % 26) + 9).toString(36).toUpperCase();
              y = (l.y / l.height) + 1;
              break;
            case 2:
              //1,1
              x = (l.x / l.width) + 1;
              y = (l.y / l.height) + 1;
              break;
            case 3:
              //A,A
              x = ((((l.x / l.width) + 1) % 26) + 9).toString(36).toUpperCase();
              //alert (x);
              y = ((((l.y / l.height) + 1) % 26) + 9).toString(36).toUpperCase();
              break;

          }
          //this.ctx.fillText(x + ", " + y,l.x,l.y);
          this.ctx.fillText(x + ", " + y, index_x, index_y);
          break;
      }



      //tile border
      switch (this.tile_border) {
        //draw tile border
        case true:
          this.ctx.strokeStyle = this.tile_border_color;
          this.ctx.lineWidth = this.tile_border_width;
          //weird offsets for stroke
          this.ctx.strokeRect(l.x + (this.ctx.lineWidth / 2), l.y + (this.ctx.lineWidth / 2), l.width - (this.ctx.lineWidth), l.height - (this.ctx.lineWidth));
          break;

        case false:
          break;
      }


      //optionally draw data flow arrow
      if (this.show_data_flow){
          this.arrow(l);
      }

    }
    //draw map wide overlays

    //draw processor border
    if (this.processor_border) {
      //this.ctx.strokeStyle = this.processor_border_color;
      this.ctx.strokeStyle = resistor_colors[this.id % resistor_colors.length];
      this.ctx.lineWidth = this.processor_border_width;
      this.ctx.strokeRect(0 + (this.ctx.lineWidth / 2), 0 + (this.ctx.lineWidth / 2), this.width - (this.ctx.lineWidth), this.height - (this.ctx.lineWidth));
    }
  };

  this.stats = function() {


    //draw text field or not
    if (this.show_processor_label) {


      ///////
      let text_height = 24;

      this.ctx.font = text_height + "px Helvetica";
      this.ctx.fillStyle = "rgba(128, 128, 128, 0.5)";
      this.ctx.strokeStyle = "#000000";

      let stats_text = [];
      stats_text[0] = "processor " + this.id + " - x : "+this.offset_x+". y : "+this.offset_y;
      stats_text[1] = "w : "+this.width + "px. h : " + this.height + "px";
      stats_text[2] = this.tile_height + "px. " + this.tiles_wide + " wide by " + this.tiles_high + " high. ";
      stats_text[3] = "total pixels: " + numberWithCommas(this.width * this.height);
      stats_text[4] = "tile size : " + this.tile_width + "px";
      stats_text[5] = this.tiles + " total tiles.";
      stats_text[6] = "port limit : " + this.tile_limit + ". required ports : " + (this.tile_map[this.tile_map.length - 1].port + 1);

      let widest = Math.max(this.ctx.measureText(stats_text[0]).width, this.ctx.measureText(stats_text[1]).width, this.ctx.measureText(stats_text[2]).width, this.ctx.measureText(stats_text[3]).width, this.ctx.measureText(stats_text[4]).width, this.ctx.measureText(stats_text[5]).width, this.ctx.measureText(stats_text[6]).width);

      //text_to_draw = "Processor " + this.id;
      //let text_width = this.ctx.measureText(text_to_draw).width;
      let margin = 20;
      //let x = (this.width * 1 / 4) - (widest / 2) - (margin / 2);
      //let y = (this.height * 3 / 4) - (text_height / 2) - (margin / 2);
      let x = 0;
      let y = 0;
      this.ctx.strokeRect(x, y, widest + margin,text_height*stats_text.length + margin);
      this.ctx.fillRect(x, y, widest + margin, text_height*stats_text.length + margin);
      this.ctx.fillStyle = "#000000";

      for(let i = 0; i < stats_text.length; i++){
        let height = (text_height/1.2);
          this.ctx.fillText(stats_text[i], x + (margin/2) ,y + height + (height * i) + (margin/2));
        }

    }
  };

  //clear out canvas
  this.reset = function() {

    //set stored canvas to required size
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    //clear out stored canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  //fuction to handle the drawing
  this.draw = function(id) {
    //let tiles = this.tile_map
    this.resize();

    this.build_map();
    this.reset();
    this.create_flow(this.tile_map, flow_maps[this.flow]);
    this.draw_tiles();
    //draw stats on top of tiles
    this.stats();



    //set context and canvas to screen-view to draw screen
    let canvas = document.getElementById("screen-view");
    let ctx = canvas.getContext('2d');
    //set screen-view size to match that of the entire screen we are drawing
    canvas.width = this.width;
    canvas.height = this.height;
    //recall canvas that has been drawn already
    let canvasFromStorage = document.getElementById("screen_"+active_led_screen+"_processor_"+ id);

    //clear map-view
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw stored canvas image to map-view
    //alert(document.getElementById("processor_" + id).width);
    //ctx.drawImage(canvasFromStorage, 0, 0);



  };



  //function to report
  this.report = function() {
    alert("tiles: " + this.tiles);
  };

  this.update = function() {
    //Project

    //save values from inputs on DOM
    //$project_name = document.getElementById('project-name').value;
    //$project_author = document.getElementById('project-author').value;
    //$project_company = document.getElementById('project-company').value;
    //$project_email = document.getElementById('project-email').value;

    //reset this Processor's values based on DOM inputs
    //this.name = $project_name;
    //this.author = $project_author;
    //this.company = $project_company;
    //this.email = $project_email;

  };


  this.draw(this.id);

} //end of Processor Constructor

// Utilities
//######################################################################

//switch between screens - reloads stored screen values
function switch_screen(screen_id) {

  active_led_screen = screen_id;
  projects[active_project].led_screens[active_led_screen].reset_inputs();
  //projects[active_project].led_screens[active_led_screen].wipe_canvases();
  //projects[active_project].led_screens[active_led_screen].wipe_processors();
  //projects[active_project].led_screens[active_led_screen].update();
  //projects[active_project].led_screens[active_led_screen].build_layout();
  projects[active_project].led_screens[active_led_screen].store_screen_canvas();
  projects[active_project].led_screens[active_led_screen].load_screen_to_screen_view();
  projects[active_project].led_screens[active_led_screen].selected();
}

//fullscreen mode
function fullscreen_mode() {
  projects[active_project].output_view();
  let el = document.getElementById('output-view');

  if (el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen();
  } else {
    el.mozRequestFullScreen();
  }
}

//function rainbowCanvas
function rainbow_faster() {
  let canvas = document.getElementById("output-view");
  canvas.classList.toggle("hue-rotate");
  let button = document.getElementById("rainbow-mode-button");
  button.classList.toggle("backgroundRed");
}


//color conversion functions
function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Returns a single rgb color interpolation between given rgb color
// based on the factor given; via https://codepen.io/njmcode/pen/axoyD?editors=0010
function interpolateColor(color1, color2, factor) {
  if (arguments.length < 3) {
    factor = 0.5;
  }
  let result = color1.slice();
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return result;
}

//function to interpolate between two colors completely, returning an array (author: Zach Saucier)
function interpolateColors(color1, color2, steps) {
  let stepFactor = 1 / (steps - 1),
    interpolatedColorArray = [];

  color1 = color1.match(/\d+/g).map(Number);
  color2 = color2.match(/\d+/g).map(Number);

  for (let i = 0; i < steps; i++) {
    interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
  }

  return interpolatedColorArray;
}

//function to return number with thousands seperators Author : Elias Zamaria
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//function to find index of largest number in array (Authoer: Ry-)
function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }

  let max = arr[0];
  let maxIndex = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}

//logo upload
// custom logo upload
function el(id) {
  return document.getElementById(id);
} // Get elem by ID

function read_image() {
  // console.log("readImage called");
  if (this.files && this.files[0]) {
    // console.log("drawImage called");
    let FR = new FileReader();
    FR.onload = function(e) {
      let logo = new Image();
      logo.addEventListener('load', function() {
        //alert();
        projects[active_project].led_screens[active_led_screen].logo = logo;
        //maps[active_map].draw(active_map);
        //maps[active_map].ctx.drawImage(logo, 0,0);
        $( "#show-logo" ).prop( "checked", true );
        $( "#show-logo" ).trigger( "change");
      });
      logo.src = e.target.result;
    };
    FR.readAsDataURL(this.files[0]);
  }


}
el('logo-upload').addEventListener('change', read_image, false);

//function to download canvas
function download_canvas(canvasId, filename) {
  let link = document.createElement('a');
  document.body.appendChild(link); // required for firefox
  link.download = filename+".png";
  link.href = document.getElementById(canvasId).toDataURL();
  link.target="_self" ;
  link.click();
}

function download_all_output_canvases(filename){

  for (let i = 0; i < projects[active_project].outputs.length; i++){
    download_canvas("project_"+active_project+"_output_"+i,filename+"- output_"+i);
  }
}

function download_all_processor_canvases(filename){

  for (let i = 0; i < projects[active_project].led_screens.length; i++){
    for (let j = 0; j < projects[active_project].led_screens[i].processors.length; j++){

    download_canvas("screen_"+i+"_processor_"+j,filename+"-screen"+i+"_processor_"+j);
    }
  }
}

//download json object of maps Author: volzotan
function downloadObjectAsJson(exportObj, exportName) {
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  let downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function countProperties(obj) {
    var count = 0;

    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count;
    }

    return count;
}

// Event Listeners
//######################################################################
document.addEventListener('click', function(e) {
  if (/add-screen-button/.test(e.target.id)) {
    projects[active_project].update();
    projects[active_project].led_screens[active_led_screen].wipe_canvases();
    projects[active_project].led_screens[active_led_screen].wipe_processors();
    projects[active_project].led_screens[active_led_screen].get_constraints();
    projects[active_project].led_screens[active_led_screen].poll_inputs();
    projects[active_project].led_screens[active_led_screen].calculate_size();
    projects[active_project].led_screens[active_led_screen].build_layout();
    projects[active_project].led_screens[active_led_screen].store_screen_canvas();
    projects[active_project].led_screens[active_led_screen].load_screen_to_screen_view();
    projects[active_project].wipe_outputs();
  }
}, false);

document.addEventListener('change', function(e) {
  //only apply these event listeners if an led screen has been added
  if (projects[active_project].led_screens.length > 0){
  //Project inputs
  if (/user-input/.test(e.target.className)) {
    console.log("user-input detected, canvas refreshing");
    projects[active_project].update();

    projects[active_project].led_screens[active_led_screen].wipe_canvases();
    projects[active_project].led_screens[active_led_screen].wipe_processors();
    projects[active_project].led_screens[active_led_screen].get_constraints();
    projects[active_project].led_screens[active_led_screen].poll_inputs();
    projects[active_project].led_screens[active_led_screen].calculate_size();
    projects[active_project].led_screens[active_led_screen].build_layout();
    projects[active_project].led_screens[active_led_screen].store_screen_canvas();
    projects[active_project].led_screens[active_led_screen].load_screen_to_screen_view();
    projects[active_project].wipe_outputs();



    //projects[active_project].outputs[active_output].create_blank_output_canvas();
    //projects[active_project].create_blank_output_canvas(active_output);
    //projects[active_project].create_output_canvases();
    //projects[active_project].store_output();
    //projects[active_project].recall_output();
    //projects[active_project].outputs_required();
  }


    //Constraint type inputs
    if (/type/.test(e.target.className)) {
      projects[active_project].update();

      projects[active_project].led_screens[active_led_screen].wipe_canvases();
      projects[active_project].led_screens[active_led_screen].wipe_processors();
      projects[active_project].led_screens[active_led_screen].get_constraints();
      projects[active_project].led_screens[active_led_screen].poll_inputs();
      projects[active_project].led_screens[active_led_screen].calculate_size();
      projects[active_project].led_screens[active_led_screen].build_layout();
      projects[active_project].led_screens[active_led_screen].store_screen_canvas();
      projects[active_project].led_screens[active_led_screen].load_screen_to_screen_view();
      projects[active_project].wipe_outputs();



      //projects[active_project].outputs[active_output].create_blank_output_canvas();
      //projects[active_project].create_blank_output_canvas(active_output);
      //projects[active_project].create_output_canvases();
      //projects[active_project].store_output();
      //projects[active_project].recall_output();
      //projects[active_project].outputs_required();
    }

    //Screen inputs
    if (/screen/.test(e.target.className)) {
      //alert("change");
      //comepletely rebuild processors if screen settings are changed
      projects[active_project].led_screens[active_led_screen].wipe_canvases();
      projects[active_project].led_screens[active_led_screen].wipe_processors();
      projects[active_project].led_screens[active_led_screen].get_constraints();
      projects[active_project].led_screens[active_led_screen].poll_inputs();
      projects[active_project].led_screens[active_led_screen].calculate_size();
      projects[active_project].led_screens[active_led_screen].build_layout();
      projects[active_project].led_screens[active_led_screen].store_screen_canvas();
      projects[active_project].led_screens[active_led_screen].load_screen_to_screen_view();
      projects[active_project].wipe_outputs();



      //projects[active_project].outputs[active_output].create_blank_output_canvas();
      //projects[active_project].create_blank_output_canvas(active_output);
      //projects[active_project].create_output_canvases();
      //projects[active_project].store_output();
      //projects[active_project].recall_output();
      //projects[active_project].outputs_required();
    }
  }

}, false);

//On Page Load
//######################################################################
//check to see if projects exist
if (projects.length <= 0){
  // start new default project with default dom values
  projects.push(new Project(this.name));

  //draw new screen to start
  //add screen for project
  projects[active_project].add_screen(projects[active_project].tiles_wide,projects[active_project].tiles_high);

  //add output for project
  projects[active_project].add_outputs(processor_types[$processor_type].resolutions[0][0],processor_types[$processor_type].resolutions[0][1]);
  projects[active_project].wipe_outputs();
  //projects[active_project].led_screens[active_led_screen].reset_inputs();
  //projects[active_project].store_output();
  //projects[active_project].recall_output();
  //projects[active_project].outputs_required();
} else {
  //load project from memory
}
